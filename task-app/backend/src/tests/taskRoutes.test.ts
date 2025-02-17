import request from 'supertest';
import { Server } from 'http';
import mongoose from 'mongoose';
import { server } from '../server';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jvivas97:ZLFja3zfcQcOpxMC@money.fkqeo.mongodb.net/task-app";

let httpServer: Server;

beforeAll(async () => {
    // Conectar a la base de datos
    await mongoose.connect(MONGO_URI);

    // Iniciar el servidor HTTP
    httpServer = server.listen(4000);
});

afterAll(async () => {
    // Cerrar la conexión a la base de datos y el servidor
    await mongoose.connection.close();
    httpServer.close();
});

describe('Task API', () => {
    test('should fetch all tasks', async () => {
        // Crear una tarea antes de hacer la solicitud GET
        const newTask = { title: 'Test Task' };
        const createResponse = await request(httpServer).post('/tasks').send(newTask);
        expect(createResponse.status).toBe(201); // Verificar que la tarea se creó correctamente

        // Hacer la solicitud GET
        const response = await request(httpServer).get('/tasks');

        // Verificar la respuesta
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy(); // Asegurarse de que la respuesta sea un array

        // Filtrar la respuesta para buscar la tarea creada
        const createdTask = response.body.find((task: any) => task.title === newTask.title);
        expect(createdTask).toBeDefined(); // Verificar que la tarea creada esté en la respuesta
        expect(createdTask.title).toBe(newTask.title); // Verificar que el título coincida
    });
    test('should create a new task', async () => {
        const newTask = { title: 'Test Task' };
        const response = await request(httpServer).post('/tasks').send(newTask);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTask.title);
    });

    test('should update a task', async () => {
        // Crear una tarea
        const newTask = { title: 'Test Task' };
        const created = await request(httpServer).post('/tasks').send(newTask);
        expect(created.status).toBe(201); // Verificar que la tarea se creó correctamente

        // Actualizar solo el título de la tarea
        const updatedTask = { ...created.body, title: 'Updated Task' }; // Usar spread operator
        const response = await request(httpServer)
            .put(`/tasks/${created.body._id}`)
            .send(updatedTask);

        // Verificar la respuesta
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedTask.title); // Verificar que el título se actualizó
        expect(response.body._id).toBe(created.body._id); // Verificar que el ID no cambió
    });

    test('should delete a task', async () => {
        const newTask = { title: 'Test Task' };
        const created = await request(httpServer).post('/tasks').send(newTask);
        const response = await request(httpServer).delete(`/tasks/${created.body._id}`);
        expect(response.status).toBe(204);
    });
});