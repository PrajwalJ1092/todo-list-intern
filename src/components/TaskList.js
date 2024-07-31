import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './taskform.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Set initial tasks if local storage is empty
      const initialTasks = [
       
      ];
      setTasks(initialTasks);
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (task) => {
    if (currentTask) {
      setTasks(tasks.map(t => t.id === currentTask.id ? { ...t, ...task, timestamp: new Date().toISOString() } : t));
      setCurrentTask(null);
    } else {
      setTasks([...tasks, { ...task, id: tasks.length + 1, completed: false, timestamp: new Date().toISOString() }]);
    }
  };

  const handleUpdate = (task) => {
    setCurrentTask(task);
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='searchtask'>
      <TaskForm onSave={handleSave} currentTask={currentTask} />
      <input 
        type="text" 
        placeholder="Search Tasks" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <div>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} onUpdate={handleUpdate} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
