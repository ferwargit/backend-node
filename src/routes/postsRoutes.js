import express from "express";
import multer from "multer";
import { listarPosts, crearNuevoPost, uploadImagen } from "../controllers/postsControllers.js";

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
    
    // Define las rutas para listar todos los posts
    app.get('/posts', listarPosts);
    // Define las rutas para crear un post
    app.post('/posts', crearNuevoPost);
    // Defino la ruta para subir imagenes
    app.post('/upload', upload.single("imagen"), uploadImagen);
}

export default routes;