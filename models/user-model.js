const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    id: {type: String, unique: true, required: true},
    id_type: {type: String, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: true},
   

module.exports = model('User', UserSchema);
