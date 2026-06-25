import { useState, useEffect } from 'react';
import { Target, Check } from 'lucide-react';
import styles from './FitnessChallenge.module.css';

const defaultChallenges = [
  { id: 'c1', text: '30 Push-ups' },
  { id: 'c2', text: '30 Pull-ups' },
  { id: 'c3', text: '30 Crunches' },
  { id: 'c4', text: '50 Sit-ups' },
  { id: 'c5', text: '50 Calf raises' },
  { id: 'c6', text: '100 Jumps' },
  { id: 'c7', text: '2-minute Plank' },
];

export default function FitnessChallenge() {
  const [completedIds, setCompletedIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reset daily or just save based on date
    const today = new Date().toDateString();
    const saved = localStorage.getItem('fitness_challenge_state');
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          setCompletedIds(parsed.completedIds || []);
        } else {
          // New day, reset
          setCompletedIds([]);
        }
      } catch (e) {
        setCompletedIds([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const today = new Date().toDateString();
      localStorage.setItem('fitness_challenge_state', JSON.stringify({
        date: today,
        completedIds
      }));
    }
  }, [completedIds, isLoaded]);

  const toggleChallenge = (id) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (!isLoaded) return null;

  const progress = Math.round((completedIds.length / defaultChallenges.length) * 100);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Target size={20} color="#e59846" />
        </div>
        <h2 className={styles.title}>Daily Fitness Challenge</h2>
      </div>
      <p className="section-subtitle">Non-negotiable daily checklist</p>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
        <span className={styles.progressText}>{progress}% Completed</span>
      </div>

      <div className={styles.card}>
        <ul className={styles.list}>
          {defaultChallenges.map(item => {
            const isDone = completedIds.includes(item.id);
            return (
              <li key={item.id} className={`${styles.item} ${isDone ? styles.completed : ''}`}>
                <button 
                  className={`${styles.checkbox} ${isDone ? styles.checkboxChecked : ''}`}
                  onClick={() => toggleChallenge(item.id)}
                >
                  {isDone && <Check size={14} strokeWidth={3} color="#fff" />}
                </button>
                <span className={styles.text} onClick={() => toggleChallenge(item.id)}>
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
