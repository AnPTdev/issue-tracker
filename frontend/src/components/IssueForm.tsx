import React, { useState } from 'react';
import './IssueForm.css';

type IssueFormProps = {
  onIssueCreated: (newIssue: { title: string; description: string }) => void;
};

const IssueForm: React.FC<IssueFormProps> = ({ onIssueCreated }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onIssueCreated({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        type="text"
        placeholder="Issue Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Issue Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="button" type="submit">Create Issue</button>
    </form>
  );
};

export default IssueForm;
