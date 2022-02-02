import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {ObjectID, ObjectId} from "mongodb";


const postSchema = new mongoose.Schema({
    author: {type: String, required: true, unique: false},
    name: {type: String, required: true, unique: false},
    surname: {type: String, required: true, unique: false},
    content: {type: String, required: true, unique: false},
    date: {type: String, required: true, unique: false},
    time: {type: String, required: true, unique: false},
    likes: {type: Number, required: true, unique: false},
    likedBy: [String]
}, {
    collection: 'post'
});

postSchema.plugin(uniqueValidator);

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;

async function remove(id) {
    return PostModel.deleteOne({ _id: { $eq: id } });
}

export default {
    remove: remove,
    model: PostModel
};
