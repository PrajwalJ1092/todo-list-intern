// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import './taskform.css';

const TaskForm = ({ onSave, currentTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className='mainbox'>
    <form onSubmit={handleSubmit}>
      <div className='main2'>
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      </div>
      <div>
      <textarea 
        placeholder="Task Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      ></textarea>
      </div>
      <div>
      <button type="submit">Save Task</button>
      </div>
    </form>
    </div>
  );
};

export default TaskForm;
