const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function newTicket(req,res) {
    res.render('tickets/new', {title: 'New Ticket', flightId : req.params.id})
}

function create(req, res) {
    req.body.flight = req.params.id
    Ticket.create(req.body, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`)
    })
}

function deleteTicket(req, res) {
    Ticket.findById(req.params.id, function(err, ticket) {
        console.log(ticket)
        Ticket.deleteOne({_id: ticket._id}).then(function() {res.redirect(`/flights/${ticket.flight}`)})
    })
    
}