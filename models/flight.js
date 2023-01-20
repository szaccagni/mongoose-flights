const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrival: {type: Date}
})

const flightSchema = Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest',  'United']
    },
    airport: {
        type: String, 
        enum:['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], 
        default: 'DEN'
    },
    flightNo: {
        type: Number, 
        min: 10, 
        max: 9999
    },
    departs: {
        type: Date, 
        default: function () {
            var d = new Date();
            d.setFullYear(d.getFullYear() + 1);
            return d
        }
    },
    destinations : [destinationSchema],
}, {
    timestamps: true
})


module.exports = mongoose.model('Flight', flightSchema);