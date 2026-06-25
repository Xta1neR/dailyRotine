import { useState, useEffect } from 'react';
import { MoreHorizontal, Plus, Trash2, Edit2, Check } from 'lucide-react';
import styles from './TodoList.module.css';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('daily_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      // Default tasks based on image if empty
      setTasks([
        { id: '1', text: 'Review Q3 Marketing Deck', completed: false },
        { id: '2', text: 'Send finalized assets to development team', completed: false },
        { id: '3', text: 'Drink 2L of water', completed: true },
        { id: '4', text: 'Journal for 10 minutes', completed: false },
      ]);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('daily_tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (!editText.trim()) {
      deleteTask(editingId);
    } else {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, text: editText.trim() } : t));
    }
    setEditingId(null);
  };

  if (!isLoaded) return null;

  return (
    <section>
      <div className="section-title">
        <h2>Tasks for the Day</h2>
        <button><MoreHorizontal size={20} color="var(--text-main)" /></button>
      </div>

      <div className={styles.card}>
        <ul className={styles.list}>
          {tasks.map(task => (
            <li key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
              <button 
                className={`${styles.checkbox} ${task.completed ? styles.checkboxChecked : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed && <Check size={14} strokeWidth={3} color="#fff" />}
              </button>
              
              {editingId === task.id ? (
                <input 
                  type="text" 
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                  className={styles.editInput}
                  autoFocus
                />
              ) : (
                <span className={styles.taskText} onDoubleClick={() => startEdit(task)}>
                  {task.text}
                </span>
              )}
              
              <div className={styles.actions}>
                <button onClick={() => startEdit(task)} className={styles.actionBtn}>
                  <Edit2 size={14} />
                </button>
                <button onClick={() => deleteTask(task.id)} className={styles.actionBtn}>
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={addTask} className={styles.addForm}>
          <input 
            type="text"
            placeholder="Add new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className={styles.addInput}
          />
          <button type="submit" className={styles.addBtn} disabled={!newTaskText.trim()}>
            <Plus size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
