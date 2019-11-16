const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    originalpost: {
        type: String,
        
    },
    updatedpost: {
         type: String,
            
    }
},{timestamps: true});


module.exports = mongoose.model('History', historySchema);