import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, "Title is required."]
    },
    description: {
        type: String,
        required: [true, "Title is required."]
    },
    dueDate: {
        type: Date,
        required: [true, "Title is required."]
    },
    completed: {
        type: Boolean,
        default: false
    },
    attatchmentPath: {
        type: String,
        required: false,
        default: null
    },
},
    {
        timestamps: true
    });

const TaskModel = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default TaskModel;