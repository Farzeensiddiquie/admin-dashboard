import mongoose from "mongoose";
const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Ready","Scheduled", "in-progress", "completed"],
        required: true,
    },
    
    priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            required: true,
        },
     hoursLogged: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        estimatedHours: {
            type: Number,
            required: true,
        },
        category:{
            type: String,
            enum: ["Development", "Testing", "Design", "Meeting","Maintenance"],
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

},{ timestamps: true });
tasksSchema.index({ userId: 1});
const Tasks = mongoose.model("Tasks", tasksSchema);
export default Tasks;