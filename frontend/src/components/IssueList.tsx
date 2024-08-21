import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueForm from './IssueForm';

type Issue = {
  id: number;
  title: string;
  description: string;
};

const IssueList: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/issues').then((response) => {
      setIssues(response.data);
    });
  }, []);

  const createIssue = (newIssue: { title: string; description: string }) => {
    if (newIssue.title && newIssue.description) {
      const issue = { id: Date.now(), ...newIssue };
      axios.post('http://localhost:3001/api/issues', issue).then(() => {
        setIssues([...issues, issue]);
      });
    } else {
      alert('Please fill in both fields');
    }
  };

  const startEditing = (issue: Issue) => {
    setEditingId(issue.id);
    setTitle(issue.title);
    setDescription(issue.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
  };

  const updateIssue = (id: number) => {
    if (title && description) {
      const updatedIssue = { id, title, description };
      axios.put(`http://localhost:3001/api/issues/${id}`, updatedIssue).then(() => {
        setIssues(issues.map((issue) => (issue.id === id ? updatedIssue : issue)));
        cancelEditing();
      });
    } else {
      alert('Please fill in both fields');
    }
  };

  const deleteIssue = (id: number) => {
    axios.delete(`http://localhost:3001/api/issues/${id}`).then(() => {
      setIssues(issues.filter((issue) => issue.id !== id));
    });
  };

  return (
    <div>
      <h1>Issue Tracker</h1>
      <IssueForm onIssueCreated={createIssue} />
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {editingId === issue.id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={() => updateIssue(issue.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                {issue.title} - {issue.description}
                <button onClick={() => startEditing(issue)}>Edit</button>
                <button onClick={() => deleteIssue(issue.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
