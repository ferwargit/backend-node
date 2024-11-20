import express from 'express';
// Importa el framework Express.js para crear aplicaciones web.

import connectToDatabase from "./src/config/dbConfig.js";
// Importa una función desde el archivo `dbConfig.js` para establecer una conexión a la base de datos.

const conexion = await connectToDatabase(process.env.STRING_CONEXION);
// Establece de forma asíncrona una conexión a la base de datos usando la cadena de conexión proporcionada en la variable de entorno `STRING_CONEXION`. 
// Almacena la conexión en la variable `conexion`.

const app = express();
// Crea una instancia de una aplicación Express.

app.use(express.json());
// Habilita el análisis de cuerpos de solicitudes JSON, permitiendo manejar datos JSON en los endpoints de tu API.

app.listen(3000, () => {
    console.log('El servidor se está ejecutando en el puerto 3000');
});
// Inicia el servidor Express en el puerto 3000 y muestra un mensaje en la consola cuando el servidor está listo.

async function getTodosPost() {
    const db = conexion.db("inmersion-alura");
    // Obtiene una referencia a la base de datos "inmersion-alura" a partir de la conexión establecida.

    const coleccion = db.collection("posts");
    // Obtiene una referencia a la colección "posts" dentro de la base de datos.

    return coleccion.find().toArray();
    // Encuentra todos los documentos en la colección "posts" y los devuelve como un arreglo.
}

app.get('/posts', async (req, res) => {
    const posts = await getTodosPost();
    // Obtiene de forma asíncrona todas las publicaciones de la base de datos utilizando la función `getTodosPost`.

    res.status(200).json(posts);
    // Envía una respuesta HTTP exitosa con un código de estado 200 y los posts obtenidos como datos JSON.
});