import { useTaskStore } from "../store/useTaskStore";
import { ITask } from "../models/Task";

export const useTask = () => {
    const { tasks, loading, addTask, updateTask, deleteTask, deleteCompletedTasks, allTasks, activeTasks,
        completedTasks } = useTaskStore();

    const validateAndAddTask = (task: ITask) => {
        if (task.title.trim() === "") {
            alert("El título de la tarea no puede estar vacío.");
            return;
        }
        addTask(task);
    };

    return {
        tasks,
        loading,
        addTask: validateAndAddTask,
        updateTask: (id: string, updatedTask: Partial<ITask>) => updateTask(id, updatedTask),
        deleteTask: (id: string) => deleteTask(id),
        deleteCompletedTasks,
        allTasks,
        activeTasks,
        completedTasks
    };
};
