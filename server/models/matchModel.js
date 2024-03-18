const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Game schema
const gameSchema = new Schema({
    player1Score: {
        type: Number,
        required: true
    },
    player2Score: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        default: ""
    }
});

// Define the Match schema which embeds Game documents
const matchSchema = new Schema({
    creation:
        {
            createdBy: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
    matchModifications: [
        {
            modifiedBy: {
                type: String,
                required: true
            },
            modifiedAt: {
                type: Date,
                default: Date.now
            },
            comment: {
                type: String,
                default: ""
            }
        }
    ],
    players: [
        player1id = {
            type: String,
            required: true
        },
        player2id = {
            type: String,
            required: true
        }
    ],
    bestOf: {
        type: Number,
        required: true
    },
    games: [gameSchema] // Embedding Game documents as an array
}, {collection: 'matches'});

const Match = mongoose.model('Match', matchSchema);
const Game = mongoose.model('Game', gameSchema);

module.exports = {
    Match,
    Game
};