import { Activity } from 'lucide-react';
import styles from './WorkoutList.module.css';
import Image from 'next/image';

import workoutImage from '@/public/workout.png'; // <-- Change the path to your image

export default function WorkoutList() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Activity size={20} color="#c27568" />
        </div>
        <h2 className={styles.title}>Daily Workout</h2>
      </div>

      <p className="section-subtitle">
        30 Minute Compound Workout
      </p>

      <div className={styles.imageContainer}>
        <Image
          src={workoutImage}
          alt="30 Minute Compound Workout Plan"
          className={styles.workoutImage}
        />
      </div>
    </section>
  );
}