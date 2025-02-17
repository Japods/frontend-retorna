import { Document } from "mongoose";
import { TaskStatus } from "../enums/TaskStatus";

export interface ITask extends Document {
    title: string;
    status: TaskStatus;
    createdAt: Date;
    order: number;
}