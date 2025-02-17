import mongoose, { Schema, Document } from "mongoose";
import { TaskStatus } from "../enums/TaskStatus";

export interface ITask extends Document {
    title: string;
    status: TaskStatus;
    order: number;
    createdAt: Date;
}

const TaskSchema: Schema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        status: {
            type: String,
            enum: Object.values(TaskStatus),
            default: TaskStatus.ACTIVE,
        },
        order: { type: Number, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } } // createdAt automático
);

TaskSchema.pre<ITask>("save", async function (next) {
    if (!this.order) {
        const lastTask = await Task.findOne().sort({ order: -1 });
        this.order = lastTask ? lastTask.order + 1 : 1;
    }
    next();
});

const Task = mongoose.model<ITask>("Task", TaskSchema);

export { Task };
