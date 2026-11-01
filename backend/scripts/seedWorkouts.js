const mongoose = require('mongoose');
const Workout = require('../models/Workout');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const workouts = [
  { name: 'Upper Body Power', goal: 'upper body', difficulty: 'intermediate', day: 'Monday', duration: 60, exercises: [{ name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' }] },
  { name: 'Lower Body Strength', goal: 'lower body', difficulty: 'intermediate', day: 'Tuesday', duration: 60, exercises: [{ name: 'Squat', sets: 4, reps: '6-8', rest: '120s' }] },
  { name: 'Push Day', goal: 'upper body', difficulty: 'intermediate', day: 'Monday', duration: 60, exercises: [{ name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' }] },
  { name: 'Pull Day', goal: 'upper body', difficulty: 'intermediate', day: 'Tuesday', duration: 60, exercises: [{ name: 'Deadlift', sets: 3, reps: '5', rest: '120s' }] },
  { name: 'Legs Day', goal: 'lower body', difficulty: 'intermediate', day: 'Wednesday', duration: 60, exercises: [{ name: 'Squat', sets: 4, reps: '8-10', rest: '120s' }] },
  { name: 'Chest Day (Bro Split)', goal: 'upper body', difficulty: 'intermediate', day: 'Monday', duration: 60, exercises: [{ name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' }] },
  { name: 'Back Day (Bro Split)', goal: 'upper body', difficulty: 'intermediate', day: 'Tuesday', duration: 60, exercises: [{ name: 'Deadlift', sets: 3, reps: '5', rest: '120s' }] }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Workout.deleteMany({});
  await Workout.insertMany(workouts);
  console.log('Seeded successfully!');
  process.exit(0);
}
seed();