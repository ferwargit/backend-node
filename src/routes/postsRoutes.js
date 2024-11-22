import express from "express";
import multer from "multer";
import { listarPosts, crearNuevoPost, uploadImagen, actualizarNuevoPost } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Linux o Mac
// const upload = multer({ dest: './uploads' });

const routes = (app) => {
    // Habilita el análisis de cuerpos de solicitudes JSON, permitiendo manejar datos JSON en los endpoints de tu API.
    app.use(express.json());

    app.use(cors(corsOptions));
    
    // Define las rutas para listar todos los posts
    app.get('/posts', listarPosts);
    // Define las rutas para crear un post
    app.post('/posts', crearNuevoPost);
    // Define las rutas para subir imagenes
    app.post('/upload', upload.single("imagen"), uploadImagen);
    // Define la ruta para actualizar un post
    app.put('/upload/:id', actualizarNuevoPost);
}

export default routes;