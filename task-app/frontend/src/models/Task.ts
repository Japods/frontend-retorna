import { TaskStatus } from "../enums/TaskStatus";

export interface ITask {
    _id?: string;
    title: string;
    status: TaskStatus;
    createdAt?: Date;
    order?: number;
}