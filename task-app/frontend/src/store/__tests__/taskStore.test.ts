// src/store/__tests__/taskStore.test.ts

import { useTaskStore } from "../useTaskStore";
import { taskService } from "../../api/services/TaskService"; // Asegúrate de que la ruta sea correcta
import { TaskStatus } from "../../enums/TaskStatus";

// Hacemos mock de taskService
jest.mock("../../api/services/TaskService");

describe("Task Store", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("fetchTasks debería cargar tareas correctamente", async () => {
        // Mock de la respuesta de taskService.getTasks
        const mockTasks = [
            { _id: "1", title: "Task 1", status: TaskStatus.ACTIVE },
            { _id: "2", title: "Task 2", status: TaskStatus.COMPLETED },
        ];
        (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

        // Llamamos a la acción fetchTasks
        const fetchTasks = useTaskStore.getState().fetchTasks;
        await fetchTasks();

        // Comprobamos que las tareas se han actualizado en el store
        expect(useTaskStore.getState().tasks).toEqual(mockTasks);
    });

    test("addTask debería agregar una tarea al store", async () => {
        const newTask = { _id: "3", title: "Task 3", status: TaskStatus.ACTIVE };
        (taskService.addTask as jest.Mock).mockResolvedValue(newTask);

        const addTask = useTaskStore.getState().addTask;
        await addTask(newTask);

        expect(useTaskStore.getState().tasks).toContainEqual(newTask);
    });

    test("updateTask debería actualizar una tarea correctamente", async () => {
        const initialTasks = [
            { _id: "1", title: "Task 1", status: TaskStatus.ACTIVE },
        ];
        useTaskStore.setState({ tasks: initialTasks });

        const updatedTask = { title: "Updated Task 1", status: TaskStatus.COMPLETED };
        (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

        const updateTask = useTaskStore.getState().updateTask;
        await updateTask("1", updatedTask);

        expect(useTaskStore.getState().tasks[0].title).toBe("Updated Task 1");
        expect(useTaskStore.getState().tasks[0].status).toBe(TaskStatus.COMPLETED);
    });

    test("deleteTask debería eliminar una tarea", async () => {
        const initialTasks = [
            { _id: "1", title: "Task 1", status: TaskStatus.ACTIVE },
            { _id: "2", title: "Task 2", status: TaskStatus.COMPLETED },
        ];
        useTaskStore.setState({ tasks: initialTasks });

        (taskService.deleteTask as jest.Mock).mockResolvedValue(undefined);

        const deleteTask = useTaskStore.getState().deleteTask;
        await deleteTask("1");

        expect(useTaskStore.getState().tasks).toHaveLength(1);
        expect(useTaskStore.getState().tasks).not.toContainEqual(initialTasks[0]);
    });

    test("deleteCompletedTasks debería eliminar todas las tareas completadas", async () => {
        const initialTasks = [
            { _id: "1", title: "Task 1", status: TaskStatus.ACTIVE },
            { _id: "2", title: "Task 2", status: TaskStatus.COMPLETED },
        ];
        useTaskStore.setState({ tasks: initialTasks });

        (taskService.deleteCompletedTasks as jest.Mock).mockResolvedValue(undefined);

        const deleteCompletedTasks = useTaskStore.getState().deleteCompletedTasks;
        await deleteCompletedTasks();

        expect(useTaskStore.getState().tasks).toHaveLength(1);
        expect(useTaskStore.getState().tasks[0].status).toBe(TaskStatus.ACTIVE);
    });

    test("allTasks debería devolver todas las tareas", () => {
        const tasks = [
            { _id: "1", title: "Task 1", status: TaskStatus.ACTIVE },
            { _id: "2", title: "Task 2", status: TaskStatus.COMPLETED },
        ];
        useTaskStore.setState({ tasks });

        const allTasks = useTaskStore.getState().allTasks();
        expect(allTasks).toEqual(tasks);
    });

    test("activeTasks debería devolver solo las tareas activas", () => {
        const tasks = [
            { _id: "1", title: "Task 1", status: TaskStatus.ACTIVE },
            { _id: "2", title: "Task 2", status: TaskStatus.COMPLETED },
        ];
        useTaskStore.setState({ tasks });

        const activeTasks = useTaskStore.getState().activeTasks();
        expect(activeTasks).toEqual([tasks[0]]);
    });

    test("completedTasks debería devolver solo las tareas completadas", () => {
        const tasks = [
            { _id: "1", title: "Task 1", status: TaskStatus.ACTIVE },
            { _id: "2", title: "Task 2", status: TaskStatus.COMPLETED },
        ];
        useTaskStore.setState({ tasks });

        const completedTasks = useTaskStore.getState().completedTasks();
        expect(completedTasks).toEqual([tasks[1]]);
    });
});
