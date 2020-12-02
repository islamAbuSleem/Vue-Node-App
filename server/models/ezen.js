const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ezenEnserafSchema = new Schema({
    userName: { type: String, required: true },
    date: { type: String, required: true },
    userId: { type: String, required: true },
    time: { type: String, required: true },
    userId: { type: String, required: true },
    dept: { type: String, required: true },
    type: { type: String, required: true },
    endDate: { type: String },
    means: { type: String },
    startDate: { type: String },
    period: { type: String },
    desc: { type: String },
});

const EzenEnseraf = mongoose.model('EzenEnseraf', ezenEnserafSchema);

module.exports = EzenEnseraf;