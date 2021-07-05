import express from "express"
const router = express.Router();
import Fighter from '../models/fighter.model.js';

router.route('/').get((req, res) => {
    Fighter.find().sort({ name: 1 })
        .then(fighters => res.json(fighters))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const profilePictureURL = req.body.profilePictureURL;
    const iconURL = req.body.iconURL;
    const wikiURL = req.body.wikiURL;

    const newFighter = new Fighter({
        "name": name, 
        "profilePictureURL": profilePictureURL, 
        "iconUrl": iconUrl, 
        "wikiUrl": wikiUrl
    });

    newFighter.save()
        .then(() => res.json(`Fighter '${name}' added!`))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Fighter.findById(req.params.id)
        .then(fighter => res.json(fighter))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Fighter.findByIdAndDelete(req.params.id)
        .then(() => res.json('Fighter deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Fighter.findById(req.params.id)
        .then(fighter => {
            fighter.name = req.body.name;
            fighter.profilePictureURL = req.body.profilePictureURL;
            fighter.iconURL = req.body.iconURL;
            fighter.wikiURL = req.body.wikiURL;

            fighter.save()
                .then(() => res.json('Fighter updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;