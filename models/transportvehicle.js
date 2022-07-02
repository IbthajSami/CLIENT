var mongoose = require ('mongoose');
var transportvehicleSchema = mongoose.Schema({
    title: String,
    body: String,
});
var transportvehicle = mongoose.model("Transportvehicle",transportvehicleSchema);
module.exports = transportvehicle;
