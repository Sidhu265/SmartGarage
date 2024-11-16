const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: {type:String,required: true},
    description: {type:String,required: true},
    image: Array,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true } 
});

const CarModel = mongoose.model('cars', carSchema);
module.exports = CarModel;