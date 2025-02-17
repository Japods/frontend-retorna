import TaskService from "../services/TaskService";
import { ITask } from "../interfaces/ITask";
import { Task } from '../models/tasks-model';

class TaskController {
    async getAllTasks() {
        return await TaskService.getAllTasks();
    }

    async getTaskById(id: string) {
        return await TaskService.getTaskById(id);
    }

    async createTask(taskData: Partial<ITask>): Promise<ITask> {
        try {
            const lastTask = await Task.findOne().sort({ order: -1 }).lean();
            const newOrder = lastTask ? lastTask.order + 1 : 1;

            const newTask = new Task({
                ...taskData,
                order: taskData.order ?? newOrder,
            });

            return await newTask.save();
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Failed to create task");
        }
    }

    async updateTask(id: string, updates: Partial<ITask>) {
        return await TaskService.updateTask(id, updates);
    }

    async deleteTask(id: string) {
        return await TaskService.deleteTask(id);
    }

    async clearCompletedTasks() {
        try {
            return await TaskService.clearCompletedTasks();
        } catch (error) {
            console.error("Error clearing completed tasks:", error);
            throw new Error("Failed to clear completed tasks");
        }
    }
}

export default new TaskController();
