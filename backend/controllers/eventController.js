const Event = require('../models/Event');
const {format} = require('date-fns');

const createEvent = async (req, res) => {
    try {
        const { name, date, time, location, description } = req.body;
        const event = new Event({ name, date, time, location, description, userId: req.user.id });
        await event.save();
        const formattedEvent = {
          ...event.toObject(),
          date: format(new Date(event.date).toISOString(), 'dd/MM/yyyy'),
        };
        res.status(201).json({ message: 'Evento creado con éxito.', event });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear evento.', error });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        const eventsWithId = events.map(event => ({
            id: event._id,
            name: event.name,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location,
            userId: event.userId
        }));
        
        if (eventsWithId.length === 0) {
            return res.status(404).json({ message: 'No se encontraron eventos.' });
        }
        res.status(200).json(eventsWithId);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos.', error });
    }
};

const filterEvents = async (req, res) => {
    try {
        const { description, startDate, endDate, location } = req.query;

        
        const filter = {};
        if (description) {
            filter.description = { $regex: description, $options: 'i' }; // Filtro por coincidencia parcial

        }
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);

        }
        if (location){
            filter.location = {$regex: location, $options: 'i'};
        }
        const events = await Event.find(filter).sort({ date: 1 }); // Ordenar por fecha ascendente
        if (events.length === 0)
            return res.status(404).json({ message: 'No se encontraron eventos.' });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos.', error });
    }
};

const updateEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, date, time, location, description } = req.body;
  
      const event = await Event.findByIdAndUpdate(
        id,
        { name, date, time, location, description },
        { new: true }
      );
  
      if (!event) {
        return res.status(404).json({ message: 'Evento no encontrado.' });
      }
  
      res.status(200).json({ message: 'Evento actualizado con éxito.', event });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar evento.', error });
    }
  };

const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      const event = await Event.findByIdAndDelete(id);
  
      if (!event) {
        return res.status(404).json({ message: 'Evento no encontrado.' });
      }
  
      res.status(200).json({ message: 'Evento eliminado con éxito.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar evento.', error });
    }
  };

module.exports = { createEvent, getEvents, filterEvents, updateEvent, deleteEvent };