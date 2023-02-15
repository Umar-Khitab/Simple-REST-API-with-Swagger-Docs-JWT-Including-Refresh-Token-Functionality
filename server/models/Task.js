const mongoose = require('mongoose')

 const UserSchema = new mongoose.Schema({
    task: {type: String, required: true},
    assignee: {type: String, required: true},
    status: {type: String, required: true},

 },
 { timestamps: true}
 );
 module.exports = mongoose.model("Task", UserSchema)