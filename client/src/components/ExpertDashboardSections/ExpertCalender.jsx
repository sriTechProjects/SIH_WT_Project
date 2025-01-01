import React, { useState } from 'react';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ExpertCalender = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [markedDates, setMarkedDates] = useState([]);
  const [newEventDate, setNewEventDate] = useState(dayjs());
  const [eventDescription, setEventDescription] = useState('');

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAddEvent = () => {
    if (eventDescription.trim()) {
      const newEvent = {
        date: newEventDate.format('YYYY-MM-DD'),
        description: eventDescription
      };
      
      // Prevent duplicate dates
      const existingEventIndex = markedDates.findIndex(
        event => event.date === newEvent.date
      );

      if (existingEventIndex !== -1) {
        const updatedEvents = [...markedDates];
        updatedEvents[existingEventIndex] = newEvent;
        setMarkedDates(updatedEvents);
      } else {
        setMarkedDates([...markedDates, newEvent]);
      }

      // Reset input fields
      setEventDescription('');
      setNewEventDate(dayjs());
    }
  };

  const isDateMarked = (date) => {
    return markedDates.some(
      event => dayjs(event.date).isSame(date, 'day')
    );
  };

  return (
    <div className="calendar-container bg-white h-fit py-3 px-1">
      <div className="rounded-md">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            views={["day"]}
            sx={{
              border: "1px solid #f1f1f1", 
              borderRadius: "10px", 
              padding: "none", 
              width: "100%",
              ".MuiDayCalendar-weekContainer": { 
                display: "flex" 
              },
              ".MuiDayCalendar-weekDayLabel": { 
                color: "#0E8CCA", 
                fontSize: "1rem" 
              },
              ".MuiDayCalendar-day": { 
                fontSize: "1rem",
                position: "relative" // For positioning the red dot
              },
              // Improved custom style for marked dates
              ".MuiPickersDay-root": {
                "&.Mui-selected.marked-date::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "5px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  zIndex: 1
                }
              }
            }}
            // Custom day render to add marked class
            renderDay={(day, _selected, pickersDayProps) => {
              const isMarked = isDateMarked(day);
              
              // Create a clone of the day component with additional props
              const dayComponent = React.cloneElement(pickersDayProps.children, {
                className: isMarked 
                  ? `${pickersDayProps.className} marked-date` 
                  : pickersDayProps.className
              });

              return dayComponent;
            }}
          />
        </LocalizationProvider>
      </div>

      <div className="event-box mt-2 rounded-[10px] p-3">
        <div className="flex space-x-2 mb-2">
          <input 
            type="text"
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="border rounded p-2 flex-grow"
          />
          <button 
            onClick={handleAddEvent}
            className="bg-blue-500 text-white rounded p-2"
          >
            Add Event
          </button>
        </div>

        {markedDates.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Marked Dates:</h3>
            <ul>
              {markedDates.map((event, index) => (
                <li key={index} className="border-b py-1">
                  {event.date}: {event.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertCalender;