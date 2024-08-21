import React from 'react';
import './IssueItem.css';
import { Issue } from '../types/Types';

const IssueItem: React.FC<{
  issue: Issue;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ issue, onEdit, onDelete }) => (
  <div>
    <div>
      <strong>{issue.title}</strong> - {issue.description}
    </div>
    <div className="button-container">
      <button className="button" onClick={onEdit}>Edit</button>
      <button className="button" onClick={onDelete}>Delete</button>
    </div>
  </div>
);

export default IssueItem;
