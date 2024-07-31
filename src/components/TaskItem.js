import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onToggle, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div onClick={handleExpand}>
        <h3>{task.title}</h3>
      </div>
      {isExpanded && (
        <div>
          <p>{task.description}</p>
          <small>Last updated: {new Date(task.timestamp).toLocaleString()}</small>
          <button onClick={() => onUpdate(task)}>Edit</button>
          <button onClick={handleToggle}>
            {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
