const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    index,
    new : newFlight,
    create,
    show
}

function index(req, res) {
    const today = new Date()
    Flight.find({}, function (err, flights) {
        res.render('flights/index', {
            flights, 
            today,
            title: 'All Flights'
        })
    }).sort('departs')
}

function newFlight(req, res) {
    const flight = new Flight()
    const dt = flight.departs
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`
    res.render('flights/new', {
        departsDate,
        title: 'Enter New Flight Info'
    })
}

function create(req, res) {
    const flight = new Flight(req.body)
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        console.log(flight)
        res.redirect('/flights')
    })
}

function show(req,res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets){
            res.render('flights/show', { title: 'Flight Detail', flight, tickets});  
        })
    });
}