const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type:String,
    
    require:true,
  },
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
