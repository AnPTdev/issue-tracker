import React from 'react';
import IssueList from './components/IssueList';

const App: React.FC = () => {
  return (
    <div className="issue-tracker">
      <IssueList />
    </div>
  );
};

export default App;
