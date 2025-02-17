import { ITask } from '../../models/Task';
import apiClient from "../apiClient";

export const taskService = {
    getTasks: async () => {
        const response = await apiClient.get("/tasks");
        console.log("Response", response)
        return response.data;
    },

    addTask: async (task: ITask) => {
        const response = await apiClient.post("/tasks", task);
        return response.data;
    },

    updateTask: async (id: string, updatedTask: Partial<ITask>) => {
        const response = await apiClient.put(`/tasks/${id}`, updatedTask);
        return response.data;
    },

    deleteTask: async (id: string) => {
        await apiClient.delete(`/tasks/${id}`);
    },

    deleteCompletedTasks: async () => {
        await apiClient.delete(`/tasks`);
    },
};