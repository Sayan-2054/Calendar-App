import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/actions/eventActions';

const EventModal = ({ date, onClose, goals }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    goalId: '',
    startTime: '',
    endTime: ''
  });

  // Set default goalId and times when goals or date changes
  useEffect(() => {
    if (goals.length > 0 && date) {
      const startTime = new Date(date);
      startTime.setHours(9, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(10, 0, 0);

      setFormData((prev) => ({
        ...prev,
        goalId: goals[0]._id,
        startTime: startTime.toISOString().slice(0, 16),
        endTime: endTime.toISOString().slice(0, 16)
      }));
    }
  }, [goals, date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent({
      title: formData.title,
      goalId: formData.goalId,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString()
    }));
    onClose();
  };

  console.log('Goals passed to EventModal:', goals);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Goal</label>
            <select
              name="goalId"
              value={formData.goalId}
              onChange={handleChange}
              className="form-select"
              required
            >
              {goals.map((goal) => (
                <option key={goal._id} value={goal._id}>
                  {goal.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
