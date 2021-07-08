import express from "express"
const router = express.Router();
import Match from '../models/match.model.js';

router.route('/').get((req, res) => {
    Match.find()
        .populate('user opponentFighter playerFighter stage')
        .then(matches => res.json(matches))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const newMatch = new Match({ 
            user: req.body.user,
            battleType: req.body.battleType,
            matchType: req.body.matchType,
            stockNumber: req.body.stockNumber,
            time: req.body.time,
            playerFighter: req.body.playerFighter,
            opponentFighter: req.body.opponentFighter,
            opponentLevel: req.body.opponentLevel,
            stage: req.body.stage,
            matchDate: req.body.matchDate,
            matchLengthInSeconds: req.body.matchLengthInSeconds,
            result: req.body.result,
            playerKOs: req.body.playerKOs,
            opponentKOs: req.body.opponentKOs,
        });

    newMatch.save()
        .then(() => res.json(`Match added!`))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Match.findById(req.params.id)
        .then(match => res.json(match))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Match.findByIdAndDelete(req.params.id)
        .then(() => res.json('Match deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    const match = {
        user: req.body.user,
        battleType: req.body.battleType,
        matchType: req.body.matchType,
        stockNumber: req.body.stockNumber,
        time: req.body.time,
        playerFighter: req.body.playerFighter,
        opponentFighter: req.body.opponentFighter,
        opponentLevel: req.body.opponentLevel,
        stage: req.body.stage,
        matchDate: req.body.matchDate,
        matchLengthInSeconds: req.body.matchLengthInSeconds,
        result: req.body.result,
        playerKOs: req.body.playerKOs,
        opponentKOs: req.body.opponentKOs,
    };

    Match.findByIdAndUpdate(req.params.id,
        match,
        {
            new: true,
            useFindAndModify: false
        })
        .then(match => res.json(match))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;