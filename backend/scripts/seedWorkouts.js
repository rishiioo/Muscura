const mongoose = require('mongoose');
const Workout = require('../models/Workout');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

// Upper Body Plan (3 days/week: Mon, Wed, Fri)
const upperBodyPlan = [
  { name: 'Upper Body Power', goal: 'upper body', difficulty: 'intermediate', planType: 'upper', day: 'Monday', duration: 60, exercises: [{ name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' }] },
  { name: 'Shoulder & Arm Focus', goal: 'upper body', difficulty: 'intermediate', planType: 'upper', day: 'Wednesday', duration: 60, exercises: [{ name: 'Overhead Press', sets: 3, reps: '8-10', rest: '90s' }, { name: 'Lateral Raises', sets: 4, reps: '15', rest: '45s' }] },
  { name: 'Back & Biceps', goal: 'upper body', difficulty: 'intermediate', planType: 'upper', day: 'Friday', duration: 60, exercises: [{ name: 'Pull-Ups', sets: 4, reps: '8-10', rest: '90s' }, { name: 'Barbell Row', sets: 3, reps: '8-10', rest: '60s' }] },
];

// Lower Body Plan (3 days/week: Tue, Thu, Sat)
const lowerBodyPlan = [
  { name: 'Lower Body Strength', goal: 'lower body', difficulty: 'intermediate', planType: 'lower', day: 'Tuesday', duration: 60, exercises: [{ name: 'Barbell Squat', sets: 4, reps: '6-8', rest: '120s' }, { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s' }, { name: 'Leg Press', sets: 3, reps: '10-12', rest: '60s' }] },
  { name: 'Hamstring & Glute', goal: 'lower body', difficulty: 'intermediate', planType: 'lower', day: 'Thursday', duration: 60, exercises: [{ name: 'Deadlift', sets: 3, reps: '5', rest: '120s' }, { name: 'Bulgarian Split Squat', sets: 3, reps: '10', rest: '90s' }, { name: 'Calf Raises', sets: 4, reps: '15', rest: '45s' }] },
  { name: 'Core & Stability', goal: 'lower body', difficulty: 'intermediate', planType: 'lower', day: 'Saturday', duration: 45, exercises: [{ name: 'Plank', sets: 3, reps: '60s', rest: '30s' }, { name: 'Leg Raises', sets: 3, reps: '15', rest: '30s' }] },
];

// Bro Split (5 days/week: Mon-Fri, one muscle group per day, Sat & Sun rest)
const broSplit = [
  { name: 'Chest Day (Bro Split)', goal: 'upper body', difficulty: 'intermediate', planType: 'bro', day: 'Monday', duration: 60, exercises: [{ name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' }, { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: '60s' }] },
  { name: 'Back Day (Bro Split)', goal: 'upper body', difficulty: 'intermediate', planType: 'bro', day: 'Tuesday', duration: 60, exercises: [{ name: 'Deadlift', sets: 3, reps: '5', rest: '120s' }, { name: 'Pull-Ups', sets: 3, reps: '8-10', rest: '90s' }] },
  { name: 'Shoulders Day (Bro Split)', goal: 'upper body', difficulty: 'intermediate', planType: 'bro', day: 'Wednesday', duration: 60, exercises: [{ name: 'Seated Dumbbell Shoulder Press', sets: 4, reps: '8-10', rest: '90s' }, { name: 'Dumbbell Lateral Raises', sets: 5, reps: '15', rest: '45s' }] },
  { name: 'Arms Day (Bro Split)', goal: 'upper body', difficulty: 'intermediate', planType: 'bro', day: 'Thursday', duration: 50, exercises: [{ name: 'Barbell Bicep Curls', sets: 3, reps: '10', rest: '60s' }, { name: 'Skull Crushers', sets: 3, reps: '10', rest: '60s' }] },
  { name: 'Legs Day (Bro Split)', goal: 'lower body', difficulty: 'intermediate', planType: 'bro', day: 'Friday', duration: 60, exercises: [{ name: 'Barbell Back Squat', sets: 4, reps: '8-10', rest: '120s' }, { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s' }] },
];

// Include additional beginner/intermediate/advanced variations (optional)
const additionalWorkouts = [
  // Upper Body - Beginner
  { name: 'Upper Body Beginner', goal: 'upper body', difficulty: 'beginner', planType: 'upper', day: 'Monday', duration: 45, exercises: [{ name: 'Push-ups', sets: 3, reps: '10-12', rest: '60s' }] },
  // Upper Body - Advanced
  { name: 'Upper Body Advanced', goal: 'upper body', difficulty: 'advanced', planType: 'upper', day: 'Wednesday', duration: 75, exercises: [{ name: 'Weighted Push-ups', sets: 4, reps: '6-8', rest: '120s' }, { name: 'Pull-ups Weighted', sets: 4, reps: '6-8', rest: '120s' }] },
  // Lower Body - Beginner
  { name: 'Lower Body Beginner', goal: 'lower body', difficulty: 'beginner', planType: 'lower', day: 'Tuesday', duration: 45, exercises: [{ name: 'Goblet Squat', sets: 3, reps: '12', rest: '60s' }] },
  // Lower Body - Advanced
  { name: 'Lower Body Advanced', goal: 'lower body', difficulty: 'advanced', planType: 'lower', day: 'Thursday', duration: 75, exercises: [{ name: 'Power Cleans', sets: 4, reps: '5', rest: '120s' }, { name: 'Deadlift', sets: 4, reps: '5', rest: '120s' }] },
  // Bro Split - Beginner
  { name: 'Bro Split Beginner', goal: 'upper body', difficulty: 'beginner', planType: 'bro', day: 'Monday', duration: 45, exercises: [{ name: 'Dumbbell Bench Press', sets: 3, reps: '12', rest: '60s' }] },
  // Bro Split - Advanced
  { name: 'Bro Split Advanced', goal: 'upper body', difficulty: 'advanced', planType: 'bro', day: 'Friday', duration: 75, exercises: [{ name: 'Paused Bench Press', sets: 4, reps: '6', rest: '120s' }, { name: 'Weighted Pull-ups', sets: 4, reps: '6', rest: '120s' }] },
];

const workouts = [...upperBodyPlan, ...lowerBodyPlan, ...broSplit, ...additionalWorkouts];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Workout.deleteMany({});
  await Workout.insertMany(workouts);
  console.log('Seeded successfully!');
  process.exit(0);
}
seed();