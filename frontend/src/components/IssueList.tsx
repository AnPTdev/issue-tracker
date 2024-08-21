import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueForm from './IssueForm';
import IssueItem from './IssueItem';
import EditIssueForm from './EditIssueForm';
import './IssueList.css';

type Issue = {
  id: number;
  title: string;
  description: string;
};

const IssueList: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/issues')
      .then((response) => setIssues(response.data));
  }, []);

  const createIssue = (newIssue: { title: string; description: string }) => {
    if (newIssue.title && newIssue.description) {
      axios.post('http://localhost:3001/api/issues', newIssue)
        .then((response) => {
          const createdIssue = response.data;
          setIssues([...issues, createdIssue]);
        })
        .catch((error) => {
          console.error('There was an error creating the issue:', error);
        });
    } else {
      alert('Please fill in both fields');
    }
  };
  

  const startEditing = (issue: Issue) => {
    setEditingIssue(issue);
  };

  const cancelEditing = () => {
    setEditingIssue(null);
  };

  const updateIssue = (updatedIssue: Issue) => {
    if (updatedIssue.title && updatedIssue.description) {
      axios.put(`http://localhost:3001/api/issues/${updatedIssue.id}`, updatedIssue)
        .then(() => {
          setIssues(issues.map((issue) =>
            issue.id === updatedIssue.id ? updatedIssue : issue
          ));
          cancelEditing();
        });
    } else {
      alert('Please fill in both fields');
    }
  };

  const deleteIssue = (id: number) => {
    axios.delete(`http://localhost:3001/api/issues/${id}`)
      .then(() => setIssues(issues.filter((issue) => issue.id !== id)));
  };

  return (
    <div className="container">
      <h1 className="header">Issue Tracker</h1>
      <IssueForm onIssueCreated={createIssue} />
      <ul className="list">
        {issues.map((issue) => (
          <li key={issue.id} className="list-item">
            {editingIssue?.id === issue.id ? (
              <EditIssueForm
                issue={editingIssue}
                onSave={updateIssue}
                onCancel={cancelEditing}
              />
            ) : (
              <IssueItem
                issue={issue}
                onEdit={() => startEditing(issue)}
                onDelete={() => deleteIssue(issue.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
