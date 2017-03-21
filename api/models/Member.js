import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema({
    memberCode : {
        type : String,
        required : true,
        unique : true
    },
    Name : {
        type : String,
        required : true
    },
    Awards : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Awards'
        }
    ]
});

export default mongoose.model('Members', memberSchema, 'Members');