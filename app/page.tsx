'use client';

import Header from '../components/Header';
import TodoList from '../components/TodoList';
import Routine from '../components/Routine';
import WorkoutList from '../components/WorkoutList';
import FitnessChallenge from '../components/FitnessChallenge';

export default function Home() {
  return (
    <main className="container">
      <Header />
      <TodoList />
      <Routine />
      <WorkoutList />
      <FitnessChallenge />
    </main>
  );
}
