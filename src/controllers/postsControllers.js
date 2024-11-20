import getTodosPost from "../models/postsModels.js";

export async function listarPosts(req, res) {
    // Obtiene de forma asíncrona todas las publicaciones de la base de datos utilizando la función `getTodosPost`.
    const posts = await getTodosPost();
    
    // Envía una respuesta HTTP exitosa con un código de estado 200 y los posts obtenidos como datos JSON.
    res.status(200).json(posts);
    
}