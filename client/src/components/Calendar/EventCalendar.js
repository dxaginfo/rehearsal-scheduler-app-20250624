import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../../redux/slices/eventsSlice';
import EventDialog from './EventDialog';

/**
 * EventCalendar component displays all rehearsal events in a calendar view
 * Allows creation, viewing, and editing of events
 */
const EventCalendar = ({ bandId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  // Get events from Redux store
  const { events, loading, error } = useSelector((state) => state.events);
  
  // Local state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('view'); // 'view', 'edit', 'create'
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Fetch events on component mount
  useEffect(() => {
    if (bandId) {
      dispatch(fetchEvents(bandId));
    }
  }, [bandId, dispatch]);
  
  // Format events for FullCalendar
  const formattedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start_time,
    end: event.end_time,
    backgroundColor: getEventColor(event.event_type),
    borderColor: getEventColor(event.event_type),
    extendedProps: {
      description: event.description,
      location: event.location,
      eventType: event.event_type,
      responses: event.responses
    }
  }));
  
  // Get color based on event type
  function getEventColor(eventType) {
    switch (eventType) {
      case 'rehearsal':
        return theme.palette.primary.main;
      case 'performance':
        return theme.palette.error.main;
      case 'meeting':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  }
  
  // Handle event click
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setDialogMode('view');
    setIsDialogOpen(true);
  };
  
  // Handle date click for new event creation
  const handleDateClick = (arg) => {
    setSelectedDate({
      start: arg.date,
      end: new Date(arg.date.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours
    });
    setDialogMode('create');
    setIsDialogOpen(true);
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };
  
  // Edit existing event
  const handleEditEvent = () => {
    setDialogMode('edit');
  };
  
  return (
    <Paper elevation={3} sx={{ p: 2, height: '80vh' }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error loading events: {error}
        </Typography>
      )}
      
      <Box sx={{ height: '100%' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={formattedEvents}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          firstDay={1} // Monday as first day
          height="100%"
          loading={loading}
        />
      </Box>
      
      {/* Event Dialog - Used for viewing, editing, and creating events */}
      {isDialogOpen && (
        <EventDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          event={selectedEvent}
          initialDate={selectedDate}
          mode={dialogMode}
          onEdit={handleEditEvent}
          bandId={bandId}
        />
      )}
    </Paper>
  );
};

export default EventCalendar;