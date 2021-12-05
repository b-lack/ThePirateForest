import express from 'express'
import ejs from 'ejs'

import addRepo from './process/add-repo.js';
console.log(addRepo);



const __dirname = new URL('.', import.meta.url).pathname;

const app = express()
app.use(express.json())

const router = express.Router();
const port = 3000

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render("index");
})
app.post("/add-repo",  async (req, res) => {
  console.log(req.body.repo, req.body.owner);
  const response = await addRepo(req.body.owner, req.body.repo, req.body.topics);
  
  res.setHeader('Content-Type', 'application/json');
  res.status(response.status);
  
  res.end(JSON.stringify(response.response, null, 2));
  
});

app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
