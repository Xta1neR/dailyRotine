import { Activity, PersonStanding, RotateCcw, Crosshair } from 'lucide-react';
import styles from './WorkoutList.module.css';

const exercises = [
  { name: 'Plank', details: '3 sets • 45 seconds', icon: PersonStanding },
  { name: 'Mountain Climbers', details: '3 sets • 20 reps per leg', icon: Activity },
  { name: 'Russian Twists', details: '3 sets • 15 reps per side', icon: RotateCcw },
  { name: 'Bird-Dog', details: '3 sets • 10 reps per side', icon: Crosshair },
];

export default function WorkoutList() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Activity size={20} color="#c27568" />
        </div>
        <h2 className={styles.title}>Daily Workout</h2>
      </div>
      <p className="section-subtitle">Core Activation & Fat Loss</p>

      <div className={styles.list}>
        {exercises.map((ex, idx) => {
          const Icon = ex.icon;
          return (
            <div key={idx} className={styles.card}>
              <div className={styles.cardIconBox}>
                <Icon size={24} color="var(--accent-green)" />
              </div>
              <div className={styles.details}>
                <h3 className={styles.name}>{ex.name}</h3>
                <p className={styles.meta}>{ex.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
