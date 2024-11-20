// Importa una función desde el archivo `dbConfig.js` para establecer una conexión a la base de datos.
import connectToDatabase from "../config/dbConfig.js";

// Establece de forma asíncrona una conexión a la base de datos usando la cadena de conexión proporcionada en la variable de entorno `STRING_CONEXION`. 
// Almacena la conexión en la variable `conexion`.
const conexion = await connectToDatabase(process.env.STRING_CONEXION);

export default async function getTodosPost() {
    // Obtiene una referencia a la base de datos "inmersion-alura" a partir de la conexión establecida.
    const db = conexion.db("inmersion-alura");
    
    // Obtiene una referencia a la colección "posts" dentro de la base de datos.
    const coleccion = db.collection("posts");
    
    // Encuentra todos los documentos en la colección "posts" y los devuelve como un arreglo.
    return coleccion.find().toArray();
    
}