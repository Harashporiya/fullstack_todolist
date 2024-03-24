const {Schema, model} = require("mongoose")

const todolistSchema = new Schema({
    content: {
        type: String,
        required:true,
    }
},{timestamps:true});


const Todo = model("Todo", todolistSchema);

module.exports = Todo;