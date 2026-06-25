import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.greeting}>
          <div className={styles.avatar}>
            <img src="https://ui-avatars.com/api/?name=Rituraj&background=random" alt="User" />
          </div>
          <span className={styles.hello}>Hello Rituraj 👋</span>
        </div>
        <button className={styles.calendarBtn}>
          <Calendar size={20} color="var(--accent-green)" />
        </button>
      </div>
      
      <div className={styles.dateSection}>
        <h1 className={styles.date}>{dateStr || 'Loading...'}</h1>
        <p className={styles.time}>{timeStr || '--:--'}</p>
      </div>
    </header>
  );
}
