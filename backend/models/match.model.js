import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var matchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    battleType: {
        type: String,
        enum: ["Solo"],
        required: [true, "Must provide the battle type."],
        default: "Solo"
    },
    matchType: {
        type: String,
        enum: ["Stock"],
        required: [true, "Must provide the match type."],
        default: "Stock"
    },
    stockNumber: {
        type: Number,
        required: [true, "Must provide stock number."],
        default: 5
    },
    time: {
        type: String,
        default: "INF",
        required: true
    },
    playerFighter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fighter',
        required: true
    },
    opponentFighter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fighter',
        required: true
    },
    opponentLevel: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        default: 9,
        required: true
    },
    stage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stage',
        required: true
    },
    matchDate:
    {
        type: Date,
        default: Date.now,
        required: true
    },
    matchLengthInSeconds: Number,
    result: {
        type: String,
        enum: ["Win", "Loss"],
        required: [true, "Must provide match result."]
    },
    playerKOs: {
        type: Number,
        required: [true, "Must provide the player KO total."]
    },
    opponentKOs: {
        type: Number,
        required: [true, "Must provide the opponent KO total."]
    }
}, {
    timestamps: true,
});

var Match = mongoose.model('Match', matchSchema);

export default Match;