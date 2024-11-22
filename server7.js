// Importa el framework Express.js para crear aplicaciones web.
import express from 'express';
import routes from "./src/routes/postsRoutes.js";

// Crea una instancia de una aplicación Express.
const app = express();

// Servir archivos estáticos desde el directorio "uploads".
app.use(express.static("uploads"));

routes(app);

// Inicia el servidor Express en el puerto 3000 y muestra un mensaje en la consola cuando el servidor está listo.
app.listen(3000, () => {
    console.log('El servidor se está ejecutando en el puerto 3000');
});
