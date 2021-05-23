const mongoose = require ('mongoose');
 
const postSchema =new mongoose.Schema({
    pname:{type: String, required: true},
    desc:{type: String, required: true},
    psize:{type: Number, required: true}
});

module.exports =mongoose.model('Post', postSchema);