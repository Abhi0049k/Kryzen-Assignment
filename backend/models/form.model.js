const mongoose = require('mongoose');

const formSchema = new mongoose({
    name: String,
    age: Number,
    address: String,
    photoUrl: String,
    securePhotoUrl: String,
    pdfURL: String,
    securePdfUrl: String,
    userId: mongoose.Schema.Types.ObjectId
});

const formModel = mongoose.model('FormData', formSchema);

module.exports = formModel;
