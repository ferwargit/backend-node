import { getTodosPost, crearPost } from "../models/postsModels.js";
import fs from "fs";

export async function listarPosts(req, res) {
    // Obtiene de forma asíncrona todas las publicaciones de la base de datos utilizando la función `getTodosPost`.
    const posts = await getTodosPost();

    // Envía una respuesta HTTP exitosa con un código de estado 200 y los posts obtenidos como datos JSON.
    res.status(200).json(posts);
};

export async function crearNuevoPost(req, res) {
    const nuevoPost = req.body;
    try {
        const postCreado = await crearPost(nuevoPost);
        res.status(200).json(postCreado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Solicitud fallida" });
    }
};

export async function uploadImagen(req, res) {
    const nuevoPost = {
        descripcion: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCreado = await crearPost(nuevoPost);
        const imagenActualizada = `uploads/${postCreado.insertedId}.png`
        fs.renameSync(req.file.path, imagenActualizada)
        res.status(200).json(postCreado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Error al crear el post o guardar la imagen"})
    }
}
