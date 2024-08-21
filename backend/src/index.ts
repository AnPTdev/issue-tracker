import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let issues = [
    { id: 1, title: 'Issue 1', description: 'This is issue 1' },
    { id: 2, title: 'Issue 2', description: 'This is issue 2' }
  ];
  
  app.get('/api/issues', (req, res) => {
    res.json(issues);
  });
  
  app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    issues.push(newIssue);
    console.log('Created:', newIssue);
    res.status(201).json(newIssue);
  });
  
  app.put('/api/issues/:id', (req, res) => {
    const { id } = req.params;
    const updatedIssue = req.body;
    issues = issues.map(issue => (issue.id === parseInt(id) ? updatedIssue : issue));
    console.log('Updated:', updatedIssue);
    res.json(updatedIssue);
  });
  
  app.delete('/api/issues/:id', (req, res) => {
    const { id } = req.params;
    issues = issues.filter(issue => issue.id !== parseInt(id));
    console.log('Deleted Issue with ID:', id);
    res.status(204).send();
  });
  
  app.listen(3001, () => {
    console.log('API Server running on http://localhost:3001');
  });