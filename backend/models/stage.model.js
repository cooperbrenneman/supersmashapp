import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var stageSchema = new Schema({
    name: { type: String, required: true },
    profilePictureURL: { type: String, required: true },
    wikiURL: { type: String, required: true },
}, {
    timestamps: true,
});

var Stage = mongoose.model('Stage', stageSchema);

export default Stage;