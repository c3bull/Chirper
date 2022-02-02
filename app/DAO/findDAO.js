import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const findSchema = new mongoose.Schema({
    nickname: {type: String, required: true, unique: false},
}, {
    collection: 'user'
});

findSchema.plugin(uniqueValidator);

const FindModel = mongoose.model('find', findSchema);

module.exports = FindModel;

export default {
    model: FindModel,
};
