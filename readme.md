# Calendar Application

A comprehensive calendar application with event management, goal tracking, and interactive UI features.

![Calendar App](./frontend/src/assets/Screenshot%202025-04-13%20225903.png)

## Features

### Event Management
- Create, edit, and delete events on specific dates
- Set start and end times for events
- Automatic deletion of events when end time is exceeded

### Interactive UI
- Drag and drop events between dates
- Expandable and contractable event cards
- Color-coding of events based on associated goals

### Goal Tracking
- Create and manage goals
- Associate events with specific goals
- Interactive sidebar to view and filter events by goals
- Highlight all events under a selected goal

### Event Creation Form
- Event title input
- Goal/category selection
- Start time and end time pickers

## Technology Stack

### Frontend
- **React.js**: UI library for building the user interface
- **Redux**: State management for application data
- **HTML5 & CSS3**: Structure and styling
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **RESTful API**: GET, POST, PUT and DELETE endpoints

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm i

# Start development server
npm start
```
The application will be available at http://localhost:3000

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm i

# Seed the database with initial data
npm run seed

# Start development server
npm run dev
```
The API server will be available at http://localhost:5000

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an existing event
- `DELETE /api/events/:id` - Delete an event

### Goals
- `GET /api/goals` - Get all goals
- `GET /api/goals/:id` - Get goal by ID
- `POST /api/goals` - Create a new goal
- `PUT /api/goals/:id` - Update an existing goal
- `DELETE /api/goals/:id` - Delete a goal

## Project Structure

```
calendar-app/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calendar/
│   │   │   ├── EventForm/
│   │   │   ├── Sidebar/
│   │   │   └── ...
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   ├── reducers/
│   │   │   └── store.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── server.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
