const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    photoUrl: String,
    securePhotoUrl: String,
    userId: mongoose.Schema.Types.ObjectId
});

const formModel = mongoose.model('FormData', formSchema);

module.exports = formModel;
