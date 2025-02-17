import * as http from "http";
import { handleRequest } from "./routes";
import { config } from "./config";
import { connectDB } from "./config/database";

const matchRoute = (url: string): { route: string; params: Record<string, string> } | null => {
    for (const path of Object.keys(handleRequest)) {
        const paramMatch = path.match(/:(\w+)/);
        if (paramMatch) {
            const regex = new RegExp(`^${path.replace(/:\w+/g, "(\\w+)")}$`);
            const match = url.match(regex);
            if (match) {
                return {
                    route: path,
                    params: { [paramMatch[1]]: match[1] },
                };
            }
        } else if (path === url) {
            return { route: path, params: {} };
        }
    }
    return null;
};

// Crear el servidor HTTP
const server = http.createServer(async (req, res) => {
    const url = req.url || "/";
    const method = req.method || "GET";

    res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir cualquier origen
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Manejo de preflight request
    if (method === "OPTIONS") {
        res.writeHead(204); // Sin contenido
        return res.end();
    }

    // Buscar la ruta y los parámetros
    const matchedRoute = matchRoute(url);

    if (matchedRoute) {
        const { route, params } = matchedRoute;

        if (handleRequest[route] && handleRequest[route][method]) {
            handleRequest[route][method](req, res, params);
        } else {
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Method Not Allowed" }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route Not Found" }));
    }
});

// Función para iniciar el servidor
const startServer = async () => {
    try {
        await connectDB();

        // Imprimir todas las rutas declaradas
        console.log("🛣️  Rutas declaradas:");
        Object.keys(handleRequest).forEach((route) => {
            const methods = Object.keys(handleRequest[route]).join(", ");
            console.log(`- ${route} [${methods}]`);
        });

        server.listen(config.PORT, () => {
            console.log(`🚀 Server running on http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
};

if (require.main === module) {
    startServer();
}

// Exportar el servidor y la función de inicio
export { server, startServer };
