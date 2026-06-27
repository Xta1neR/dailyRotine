import { Sun, Dumbbell, Coffee, BookOpen, Utensils, PenTool, Moon } from 'lucide-react';
import styles from './Routine.module.css';

const routineItems = [
  { time: '08:00 AM', title: 'Wake Up', icon: Sun },
  { time: '08:30 AM', title: 'Breakfast + Office', icon: Coffee },
  { time: '05:15 AM', title: 'Workout', icon: Dumbbell },
  { time: '06:30 PM', title: 'IAS Classes - StudyIQ', icon: BookOpen },
  { time: '09:00 PM', title: 'Dinner', icon: Utensils },
  { time: '10:00 PM', title: 'IAS Classes - StudyIQ', icon: PenTool },
  { time: '03:00 AM', title: 'Sleep', icon: Moon },
];

export default function Routine() {
  return (
    <section>
      <h2 className="section-title">My Routine</h2>
      <div className={styles.scrollContainer}>
        {routineItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className={styles.card}>
              <Icon size={24} className={styles.icon} />
              <div className={styles.details}>
                <span className={styles.time}>{item.time}</span>
                <span className={styles.title}>{item.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
