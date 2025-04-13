import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../redux/actions/eventActions';

const Event = ({ event, goalColor, isHighlighted }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteEvent(event._id));
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Make the event draggable
  const handleDragStart = (e) => {
    e.dataTransfer.setData('eventId', event._id);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const eventStyle = {
    backgroundColor: goalColor,
    opacity: isHighlighted ? 1 : isHighlighted === null ? 1 : 0.5,
    borderLeft: isHighlighted ? '3px solid #333' : 'none'
  };
  
  return (
    <div 
      className={`event ${expanded ? 'event-expanded' : ''}`}
      style={eventStyle}
      draggable="true"
      onDragStart={handleDragStart}
      onClick={toggleExpand}
    >
      <div className="event-time">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </div>
      <div className="event-title">{event.title}</div>
      {expanded && (
        <div className="event-details">
          <div className="event-actions">
            <button className="delete-event" onClick={handleDelete}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;