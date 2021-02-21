const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clubs",
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    approved: {
        type: Boolean,
        default: false,
    },


});

module.exports = mongoose.model("player", playerSchema);
