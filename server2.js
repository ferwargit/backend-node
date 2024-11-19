import express from 'express'

const posts = [
  {
    id: 1,
    descripcion: "Una foto de prueba",
    imagen: "https://placecats.com/millie/300/150"
  },
  {
    id: 2,
    descripcion: "Un paisaje hermoso",
    imagen: "https://source.unsplash.com/random"
  },
  {
    id: 3,
    descripcion: "Un gato muy lindo",
    imagen: "https://placekitten.com/200/300"
  },
  {
    id: 4,
    descripcion: "Comida deliciosa",
    imagen: "https://unsplash.com/photos/food"
  },
  {
    id: 5,
    descripcion: "Un viaje inolvidable",
    imagen: "https://picsum.photos/id/1018/500/300"
  }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

function buscarPostPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get('/posts/:id', (req, res) => {
  const index = buscarPostPorId(req.params.id);
  res.status(200).json(posts[index]);
});