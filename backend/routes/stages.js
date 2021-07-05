import express from "express"
const router = express.Router();
import Stage from '../models/stage.model.js';

router.route('/').get((req, res) => {
    Stage.find().sort({ name: 1 })
        .then(stages => res.json(stages))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const profilePictureURL = req.body.profilePictureURL;
    const wikiURL = req.body.wikiURL;

    const newStage = new Stage({ 
        "name": name,
        "profilePictureURL": profilePictureURL,
        "wikiURL": wikiURL
    });

    newStage.save()
        .then(() => res.json(`Stage '${name}' added!`))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Stage.findById(req.params.id)
        .then(stage => res.json(stage))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').delete((req, res) => {
    Stage.findByIdAndDelete(req.params.id)
        .then(() => res.json('Stage deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/:id').put((req, res) => {
    Stage.findById(req.params.id)
        .then(stage => {
            stage.name = req.body.name;
            stage.profilePictureURL = req.body.profilePictureURL;
            stage.wikiURL = req.body.wikiURL;

            stage.save()
                .then(() => res.json('Stage updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;