import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var fighterSchema = new Schema({
    name: { type: String, required: true },
    profilePictureURL: { type: String, required: true },
    iconURL: { type: String, required: true },
    wikiURL: { type: String, required: true },
}, {
    timestamps: true,
});

var Fighter = mongoose.model('Fighter', fighterSchema);

export default Fighter;