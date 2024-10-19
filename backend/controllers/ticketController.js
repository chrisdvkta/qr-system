const Ticket = require("../models/Ticket");
const QRCode = require('qrcode');

exports.buyTicket = async (req, res) => {
    const { eventId } = req.params; 
  
    try {
      const qrString = await QRCode.toDataURL(eventId);
      const ticket = new Ticket({
        user: req.user._id,
        event: eventId,
        qrCode: qrString,
      });
      await ticket.save();
      res.status(201).json(ticket);
    } catch (err) {
      res.status(400).json({ message: "Error purchasing ticket" });
    }
  };

  exports.getMyTickets = async(req,res)=>{
    try{
        const tickets = await Ticket.find({user:req.user._id}).populate('event');
        if (!tickets.length){
            return res.status(404).json({message:"No tickets found"});
        }
        res.status(200).json(tickets);
    }catch(err){
        res.status(500).json({message:"error retrieving tickets"});
    }
  }