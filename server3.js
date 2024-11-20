import express from 'express';
import connectToDatabase from "./src/config/dbConfig.js";
const conexion = await connectToDatabase(process.env.STRING_CONEXION);

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

async function getTodosPost() {
  const db = conexion.db("inmersion-alura");
  const coleccion = db.collection("posts");
  return coleccion.find().toArray();
}

app.get('/posts', async (req, res) => {
  const posts = await getTodosPost();
  res.status(200).json(posts);
});

// function buscarPostPorId(id) {
//   return posts.findIndex((post) => {
//     return post.id === Number(id);
//   });
// }

// app.get('/posts/:id', (req, res) => {
//   const index = buscarPostPorId(req.params.id);
//   res.status(200).json(posts[index]);
// });