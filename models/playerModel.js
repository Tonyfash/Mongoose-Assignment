const mongoose = require('mongoose');

const tonyfash_FC = new mongoose.Schema({

    playerName:{
        type: String,
        require: true,
        unique: true
    }, 
    playerNumber:{
        type: Number,
        require: false
    },
    playerCountry:{
        type: String,
        require: true
    },
    playerAge:{
        type: Number,
        require: true
    },
    wing:{
        type: String,
        require: true
    },
    position:{
        type: String,
        require: true
    }
}, {
    timestamps: true

});

const playerModel = mongoose.model('player', tonyfash_FC);

module.exports = playerModel;