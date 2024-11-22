import { getTodosPost, crearPost, actualizarPost } from "../models/postsModels.js";
import fs from "fs";
import generarDescripciónConGeminis from "../services/geminiService.js";

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
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Error al crear el post o guardar la imagen" })
    }
}

export async function actualizarNuevoPost(req, res) {
    const id = req.params.id;
    const urlImagen = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descripcion = await generarDescripciónConGeminis(imgBuffer);


        const post = {
            imgUrl: urlImagen,
            descripcion: descripcion,
            alt: req.body.alt
        };

        const postCreado = await actualizarPost(id, post);
        res.status(200).json(postCreado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Solicitud fallida" });
    }
};