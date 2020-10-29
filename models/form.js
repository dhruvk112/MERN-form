const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const FormSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String
});

//Model
const Form = mongoose.model('Form', FormSchema);

module.exports = Form;