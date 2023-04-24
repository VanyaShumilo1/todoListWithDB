import mongoose, {Schema} from "mongoose";

const TodoModel = new Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})


export default mongoose.model('Todos', TodoModel)