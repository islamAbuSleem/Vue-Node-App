const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dayOffSchema = new Schema({
    userName: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    period: { type: String, required: true },
    offType: { type: String, required: true },
    returnDay: { type: String, required: true },
    returnDate: { type: String, required: true },
    doWorkName: { type: String, required: true },
    userId: { type: String, required: true },
    dept: { type: String, required: true },
    team: { type: String },
    status: { type: String },
});

const DayOff = mongoose.model('DayOff', dayOffSchema);

module.exports = DayOff;