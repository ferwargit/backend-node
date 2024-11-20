import express from "express";
import { listarPosts } from "../controllers/postsControllers.js";

const routes = (app) => {
    // Habilita el análisis de cuerpos de solicitudes JSON, permitiendo manejar datos JSON en los endpoints de tu API.
    app.use(express.json());
    
    app.get('/posts', listarPosts);
}

export default routes;