const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/calendar-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/goals', goalRoutes);

// Event Expiration Check
const Event = require('./models/Event');

const cleanExpiredEvents = async () => {
  try {
    const now = new Date();
    await Event.deleteMany({ endTime: { $lt: now } });
    console.log('Expired events cleanup completed');
  } catch (error) {
    console.error('Error cleaning expired events:', error);
  }
};

// Run initial cleanup
cleanExpiredEvents();

// Schedule cleanup every minute
setInterval(cleanExpiredEvents, 60000);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});