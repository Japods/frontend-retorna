import { Task } from "../models/tasks-model";
import { ITask } from "../interfaces/ITask";

class TaskService {
    // Obtener todas las tareas
    async getAllTasks(): Promise<ITask[]> {
        return await Task.find();
    }

    // Obtener una tarea por ID
    async getTaskById(id: string): Promise<ITask | null> {
        return await Task.findById(id);
    }

    // Crear una nueva tarea
    async createTask(task: ITask): Promise<ITask> {
        const newTask = new Task(task);
        return await newTask.save();
    }

    // Actualizar una tarea
    async updateTask(id: string, updates: Partial<ITask>): Promise<ITask | null> {
        return await Task.findByIdAndUpdate(id, updates, { new: true });
    }

    // Eliminar una tarea
    async deleteTask(id: string): Promise<ITask | null> {
        return await Task.findByIdAndDelete(id);
    }

    // Eliminar todas las tareas completadas
    async clearCompletedTasks(): Promise<{ deletedCount: number }> {
        const result = await Task.deleteMany({ status: "completed" });
        return { deletedCount: result.deletedCount };
    }
}

export default new TaskService();
