const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0)
  {
    return response.status(400).send('Error, repositorie id do not exist');
  }

  repositories[repositorieIndex].title = title;
  repositories[repositorieIndex].techs = techs;
  repositories[repositorieIndex].url = url;

  return response.json(repositories[repositorieIndex]);
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0 )
  {
    return res.status(400).send('Error, invalid ID');
  }

  repositories.splice(repositorieIndex,1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0 )
  {
    return response.status(400).send('Error, invalid ID');
  }

  repositories[repositorieIndex].likes ++;

  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
