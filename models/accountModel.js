// @ts-nocheck

const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ClubModel = require("../models/ClubsModel");
const playerModel = require("./playerModel");
const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    clubName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    role: {
        type: String,
        enum: ["player", "admin", "judge", "payment", "clubadmin"],
        default: "player",
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clubs",
    },
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "players",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Encrypt password using bcrypt
AccountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    console.log(this);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    try {
        if (this.role === "clubadmin") {
            const createdClub = await ClubModel.create({
                clubName: this.clubName,
                admin: this._id
            });
            this.clubId = createdClub._id;


        }
        if (this.role === "player") {
            const createdPlayer = await playerModel.create({
                firstName: this.name,
                clubId: this.clubId,
                account: this._id
            });
            this.playerId = createdPlayer._id;

            const addToClub = await ClubModel.findByIdAndUpdate(this.clubId, {
                $push: { clubPlayers: this.playerId }
            });

        }
    } catch (error) {
        throw new Error(error);
    }
});

// Sign JWT and return
AccountSchema.methods.getSignedJwtToken = function () {
    console.log(process.env.JWT_SECRET);

    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "20h",
    });
    return { token: token, role: this.role };
};

// Match user entered password to hashed password in database
AccountSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
AccountSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("accounts", AccountSchema);
