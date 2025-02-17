import { IncomingMessage, ServerResponse } from "http";
import TaskController from "./controllers/TaskController";
import { ITask } from "./interfaces/ITask";

const getRequestBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on("error", reject);
    });
};

export const handleRequest: Record<
    string,
    Record<string, (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => void>
> = {
    "/tasks": {
        GET: async (_req, res) => {
            try {
                const tasks = await TaskController.getAllTasks();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(tasks));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Error getting tasks" }));
            }
        },
        POST: async (req, res) => {
            try {
                const body = await getRequestBody(req);
                const task = body.task || body;

                if (!task || !task.title) {
                    throw new Error("Invalid task data");
                }

                const newTask = await TaskController.createTask(task);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(newTask));
            } catch (error) {
                console.error("Error en POST /tasks:", error);
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error instanceof Error ? error.message : "Invalid JSON or missing fields" }));
            }
        },
        DELETE: async (_req, res) => {
            try {
                const result = await TaskController.clearCompletedTasks();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Error clearing completed tasks" }));
            }
        },
    },
    "/tasks/:id": {
        GET: async (_req, res, params) => {
            try {
                const task = await TaskController.getTaskById(params!.id);
                if (task) {
                    res.writeHead(200);
                    res.end(JSON.stringify(task));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: "Task not found" }));
                }
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Error getting task" }));
            }
        },
        PUT: async (req, res, params) => {
            try {
                const updates: Partial<ITask> = await getRequestBody(req);
                const updatedTask = await TaskController.updateTask(params!.id, updates);

                if (updatedTask) {
                    res.writeHead(200, { "Content-Type": "application/json" });

                    res.end(JSON.stringify(updatedTask));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: "Task not found" }));
                }
            } catch {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid JSON or update fields" }));
            }
        },
        DELETE: async (_req, res, params) => {
            try {
                const deletedTask = await TaskController.deleteTask(params!.id);
                if (deletedTask) {
                    res.writeHead(204);
                    res.end();
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: "Task not found" }));
                }
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Error deleting task" }));
            }
        },
    },
};
