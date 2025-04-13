const mongoose = require('mongoose');
const Goal = require('./models/Goal');
const Event = require('./models/Event');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/calendar-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected for seeding'))
.catch(err => {
  console.log('MongoDB Connection Error:', err);
  process.exit(1);
});

// Sample goals
const goals = [
  {
    name: 'Work',
    color: '#4285F4' // Google Blue
  },
  {
    name: 'Personal',
    color: '#EA4335' // Google Red
  },
  {
    name: 'Health',
    color: '#34A853' // Google Green
  },
  {
    name: 'Education',
    color: '#FBBC05' // Google Yellow
  },
  {
    name: 'Family',
    color: '#8E24AA' // Purple
  }
];

// Function to generate dates in the near future
const getFutureDate = (daysOffset, hours, minutes) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// Seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Goal.deleteMany({});
    await Event.deleteMany({});
    
    // Insert goals
    const insertedGoals = await Goal.insertMany(goals);
    console.log('Goals seeded:', insertedGoals);
    
    // Sample events using the inserted goals
    const events = [
      {
        title: 'Team Meeting',
        goalId: insertedGoals[0]._id, // Work
        startTime: getFutureDate(0, 10, 0),
        endTime: getFutureDate(0, 11, 30)
      },
      {
        title: 'Grocery Shopping',
        goalId: insertedGoals[1]._id, // Personal
        startTime: getFutureDate(0, 17, 0),
        endTime: getFutureDate(0, 18, 0)
      },
      {
        title: 'Gym Session',
        goalId: insertedGoals[2]._id, // Health
        startTime: getFutureDate(1, 7, 0),
        endTime: getFutureDate(1, 8, 30)
      },
      {
        title: 'Online Course',
        goalId: insertedGoals[3]._id, // Education
        startTime: getFutureDate(1, 14, 0),
        endTime: getFutureDate(1, 16, 0)
      },
      {
        title: 'Dinner with Parents',
        goalId: insertedGoals[4]._id, // Family
        startTime: getFutureDate(2, 19, 0),
        endTime: getFutureDate(2, 21, 0)
      },
      {
        title: 'Project Deadline',
        goalId: insertedGoals[0]._id, // Work
        startTime: getFutureDate(3, 15, 0),
        endTime: getFutureDate(3, 17, 0)
      },
      {
        title: 'Doctor Appointment',
        goalId: insertedGoals[2]._id, // Health
        startTime: getFutureDate(4, 11, 0),
        endTime: getFutureDate(4, 12, 0)
      }
    ];
    
    // Insert events
    const insertedEvents = await Event.insertMany(events);
    console.log('Events seeded:', insertedEvents);
    
    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
