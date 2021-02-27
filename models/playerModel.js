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
        ref: "clubs",
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
    },
    approved: {
        type: Boolean,
        default: false,
    },


});

module.exports = mongoose.model("players", playerSchema);
