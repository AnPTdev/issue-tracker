import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/issues', (req, res) => {
  res.json('Hello');
});

app.listen(3001, () => {
  console.log('API Server running on http://localhost:3001');
});
