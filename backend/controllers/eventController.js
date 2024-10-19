const { TopologyDescription } = require('mongodb');
const Event = require('../models/Event');

exports.createEvent = async(req,res)=>{
    const {name, description, date} = req.body;

    try{
        const event = new Event({name, description, date })
        await event.save(); 
        res.status(201).json(event);
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Error creating event'});
    }
};

exports.editEvent = async (req,res)=>{
    const eventId = req.params.id; 
    try{
        const event = await Event.findByIdAndUpdate(eventId,req.body,{new:true});
        if (!event) return res.status(404).json({message:'Event not found'});
        res.json(event);
    }catch(err){
        res.status(400).json("error editing");
    }
};


exports.deleteEvent = async(req,res)=>{
    const eventId = req.params.id; 

    try{
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) return res.status(404).json("not found");
        res.json({message:"Event deleted"});
    }catch(err){
        res.status(400).json({message:"error deleting event"});
    }
};

exports.getAllEvents = async (req,res)=>{
    const events = await Event.find({});
    res.json(events);
}