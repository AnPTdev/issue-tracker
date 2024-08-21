import React, { useState } from 'react';
import './EditIssueForm.css';
import { Issue } from '../types/Types';

const EditIssueForm: React.FC<{
  issue: Issue;
  onSave: (updatedIssue: Issue) => void;
  onCancel: () => void;
}> = ({ issue, onSave, onCancel }) => {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);

  const handleSave = () => {
    onSave({ ...issue, title, description });
  };

  return (
    <div className="form-container">
      <input
        className="input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Issue Title"
      />
      <input
        className="input"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Issue Description"
      />
      <button className="button" onClick={handleSave}>Save</button>
      <button className="button" onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditIssueForm;
