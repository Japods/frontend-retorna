import { create } from "zustand";
import { ITask } from "../models/Task";
import { taskService } from "../api/services/TaskService";
import { TaskStatus } from '../enums/TaskStatus';

interface TaskState {
    tasks: ITask[];
    loading: boolean;
    fetchTasks: () => Promise<void>;
    addTask: (task: ITask) => Promise<void>;
    updateTask: (id: string, updatedTask: Partial<ITask>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    deleteCompletedTasks: () => Promise<void>;
    allTasks: () => ITask[];
    activeTasks: () => ITask[];
    completedTasks: () => ITask[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    loading: false,

    fetchTasks: async () => {
        set({ loading: true });
        try {
            const tasks = await taskService.getTasks();
            set({ tasks, loading: false });
        } catch (error) {
            console.error("Error fetching tasks:", error);
            set({ loading: false });
        }
    },

    addTask: async (task) => {
        try {
            const newTask = await taskService.addTask(task);
            set((state) => ({ tasks: [...state.tasks, newTask] }));
        } catch (error) {
            console.error("Error adding task:", error);
        }
    },

    updateTask: async (id, updatedTask) => {
        try {
            const updated = await taskService.updateTask(id, updatedTask);
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === id ? { ...task, ...updated } : task
                ),
            }));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    },

    deleteTask: async (id) => {
        try {
            await taskService.deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== id),
            }));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    },

    deleteCompletedTasks: async () => {
        try {
            await taskService.deleteCompletedTasks();
            set((state) => ({
                tasks: state.tasks.filter((task) => task.status !== TaskStatus.COMPLETED),
            }));
        } catch (error) {
            console.error("Error deleting completed tasks:", error);
        }
    },

    // Getter for Filters
    allTasks: () => get().tasks,  // Retorna todas las tareas sin filtro
    activeTasks: () => get().tasks.filter(task => task.status === TaskStatus.ACTIVE),
    completedTasks: () => get().tasks.filter(task => task.status === TaskStatus.COMPLETED),

}));