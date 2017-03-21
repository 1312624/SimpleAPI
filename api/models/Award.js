import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique : true
    },
});

export default mongoose.model('Awards', memberSchema, 'Awards');