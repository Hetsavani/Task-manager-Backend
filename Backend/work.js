const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        workId : String,
        workName : String,
        details : String,
        isPending : Boolean,
        AddingDate : Date,
        CompletionDate : Date
        // importance : Number
    }
);
module.exports = mongoose.model('Work',schema);