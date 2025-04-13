import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { highlightGoal } from '../redux/actions/goalActions';
import EventModal from './EventModal';

const Sidebar = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const goals = useSelector(state => state.goals.goals);
  const highlightedGoalId = useSelector(state => state.goals.highlightedGoalId);
  
  const [showModal, setShowModal] = useState(false);
  
  const handleGoalClick = (goalId) => {
    dispatch(highlightGoal(goalId === highlightedGoalId ? null : goalId));
  };
  
  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => new Date(event.startTime) > now)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      .slice(0, 5);
  };
  
  const formatEventTime = (event) => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    
    return `${start.toLocaleDateString()}, ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  const getGoalById = (goalId) => {
    return goals.find(goal => goal._id === goalId) || { color: '#cccccc', name: 'Uncategorized' };
  };
  
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Calendar</h2>
      
      <button className="add-event-button" onClick={() => setShowModal(true)}>
        Create
      </button>
      
      <div className="goals-section">
        <h3 className="goals-title">Goals</h3>
        {goals.map(goal => (
          <div
            key={goal._id}
            className="goal-item"
            onClick={() => handleGoalClick(goal._id)}
            style={{ backgroundColor: highlightedGoalId === goal._id ? '#e8f5e9' : 'transparent' }}
          >
            <div className="goal-color" style={{ backgroundColor: goal.color }}></div>
            <div className="goal-name">{goal.name}</div>
          </div>
        ))}
      </div>
      
      <div className="upcoming-events-section">
        <h3 className="upcoming-events-title">Upcoming Events</h3>
        {getUpcomingEvents().map(event => {
          const goal = getGoalById(event.goalId);
          return (
            <div 
              key={event._id} 
              className="upcoming-event"
              style={{ borderLeftColor: goal.color }}
            >
              <div className="upcoming-event-title">{event.title}</div>
              <div className="upcoming-event-goal">{goal.name}</div>
              <div className="upcoming-event-time">{formatEventTime(event)}</div>
            </div>
          );
        })}
      </div>
      
      {showModal && (
        <EventModal 
          date={new Date()} 
          onClose={() => setShowModal(false)} 
          goals={goals}
        />
      )}
    </div>
  );
};

export default Sidebar;