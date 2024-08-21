import express from 'express';
import bodyParser from 'body-parser';
import issuesRoutes from '../routes/issuesRoutes';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/issues', issuesRoutes);

export default app;
