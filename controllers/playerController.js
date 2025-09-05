const playerModel = require("../models/playerModel");

exports.createPlayers = async (req, res)=>{
    try {
        const {playerName, playerNumber, playerCountry, playerAge, wing, position} = req.body
        
        if (!playerName || !playerNumber || !playerCountry || !playerAge || !wing || !position) {
            res.status(400).json({
                message: 'Please enter all fields'
            })
        } else {
            const createdPlayer = await playerModel.create({
            playerName, 
            playerNumber, 
            playerCountry, 
            playerAge, 
            wing, 
            position
        })
        res.status(201).json({
            message: "Player created",
            data: createdPlayer

        })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getAllPlayers = async (req, res) =>{
    try {
        const allPlayers = await playerModel.find();
        res.status(200).json({
            message: "All players registered",
            total: allPlayers.length,
            data: allPlayers
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getPlayerByNumber = async (req, res) => {
    try {
        const {playerNumber} = req.params;

    if (playerNumber <= 14){
        const player = await playerModel.find({playerNumber})
            res.status(200).json({
            message: `Player ${playerNumber}`,
            data: player
        })
        }else {
            res.status(404).json({
                message: 'Player not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getPlayerByWing = async (req, res) => {
    try {
        const {wing} = req.params;

        if (wing == "Goalkeeper" || wing == "Right-back" || wing == "Center-back" || wing == "Left-back" || wing == "Defensive-midfielder" || wing == "Attacking-midfielder" || wing == "Left-wing" || wing == "Center-forward" || wing == "Right-wing") {

        const players = await playerModel.find({wing});
        res.status(200).json({
            message: `${wing}s`,
            data: players
        })
        } else {
            res.status(404).json({
                message: "Player's wing not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getPlayerByPosition = async (req, res) => {
    try {
        const {position} = req.params;

        if (position == "Goalie" || position == "Defender" || position == "Midfielder" || position == "Forward"){
        const players = await playerModel.find({position});
        res.status(200).json({
            message: `${position}s`,
            data: players
        })
        } else {
            res.status(404).json({
                message: "Player's position not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.updatePlayer = async (req, res) => {
    try {
        const {id: _id} = req.params;
        const {playerName, playerNumber, playerCountry, playerAge, wing, position} = req.body;
        const player = await playerModel.findById(_id)
        if (!player){
            res.status(404).json({
                message: `Player with id ${_id} not found`
            })
        }else {
            let updatedPlayer = {playerName, playerNumber, playerCountry, playerAge, wing, position}
        const data = await playerModel.findByIdAndUpdate(_id, updatedPlayer, {new: true})
        res.status(200).json({
            message: 'Updated player successfully',
            data
        })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}