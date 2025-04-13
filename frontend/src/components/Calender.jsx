import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, updateEvent } from '../redux/actions/eventActions';
import { fetchGoals } from '../redux/actions/goalActions';
import EventModal from './EventModal';
import Event from './Event';

const Calendar = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const goals = useSelector(state => state.goals.goals);
  const highlightedGoalId = useSelector(state => state.goals.highlightedGoalId);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGoals());
    
    // Set up interval to check for expired events
    const interval = setInterval(() => {
      const now = new Date();
      const expiredEvents = events.filter(event => new Date(event.endTime) < now);
      
      if (expiredEvents.length > 0) {
        // Refresh events to remove expired ones
        dispatch(fetchEvents());
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [dispatch]);
  
  const getCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week of the first day (0-6)
    const firstDayOfWeek = firstDay.getDay();
    
    // Add days from previous month
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to complete the grid (to make it 6 rows)
    const totalDaysNeeded = 42; // 6 weeks * 7 days
    const remainingDays = totalDaysNeeded - days.length;
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleDayCellClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };
  
  const handleDrop = (eventId, newDate) => {
    const draggedEvent = events.find(event => event._id === eventId);
    if (!draggedEvent) return;
    
    // Calculate the time difference between the original start date and the drop date
    const originalDate = new Date(draggedEvent.startTime);
    const timeDiff = newDate.getTime() - new Date(
      originalDate.getFullYear(),
      originalDate.getMonth(),
      originalDate.getDate()
    ).getTime();
    
    // Apply the same time difference to both start and end times
    const newStartTime = new Date(draggedEvent.startTime);
    newStartTime.setTime(newStartTime.getTime() + timeDiff);
    
    const newEndTime = new Date(draggedEvent.endTime);
    newEndTime.setTime(newEndTime.getTime() + timeDiff);
    
    // Update the event
    dispatch(updateEvent({
      ...draggedEvent,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString()
    }));
  };
  
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  const getGoalById = (goalId) => {
    return goals.find(goal => goal._id === goalId) || { color: '#cccccc' };
  };
  
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };
  
  const calendarDays = getCalendarDays();

  console.log('Parent component goals:', goals);

  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-title">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <div className="calendar-navigation">
          <button className="calendar-button" onClick={handleToday}>Today</button>
          <button className="calendar-button" onClick={handlePrevMonth}>&lt;</button>
          <button className="calendar-button" onClick={handleNextMonth}>&gt;</button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {weekdays.map((day, index) => (
          <div key={index} className="calendar-weekday">{day}</div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day.isCurrentMonth ? '' : 'other-month'} ${isToday(day.date) ? 'today' : ''}`}
            onClick={() => handleDayCellClick(day.date)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const eventId = e.dataTransfer.getData('eventId');
              handleDrop(eventId, day.date);
            }}
          >
            <div className="day-number">{day.date.getDate()}</div>
            <div className="day-events">
              {getEventsForDate(day.date).map(event => (
                <Event 
                  key={event._id} 
                  event={event} 
                  goalColor={getGoalById(event.goalId).color}
                  isHighlighted={highlightedGoalId === event.goalId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      
      {showModal && goals.length > 0 &&(
        <EventModal 
          date={selectedDate} 
          onClose={closeModal} 
          goals={goals}
        />
      )}
    </div>
  );
};

export default Calendar;