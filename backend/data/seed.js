import { } from 'dotenv/config'
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import prompt from 'prompt';
import chalk from 'chalk';

// Mongoose Models
import Fighter from '../models/fighter.model.js';
import Stage from '../models/stage.model.js';

const __dirname = path.resolve();

// Connection string
const uri = process.env.ATLAS_URI;

// Stages independent
// Fighters independent

// File Paths
var fighterPath = path.join(__dirname + path.normalize('/fighters.json'));
var stagePath = path.join(__dirname + path.normalize('/stages.json'));

var promptSchema = {
    properties: {
        continue: {
            description: 'This will reseed all of the data. Make sure you have correctly exported all match data before reseeding the database. Continue? (Y/N)',
            pattern: /^(?:YES|NO|Y|N)$/i,
            message: "Must be 'yes', 'no', 'y', or 'n'",
            hidden: false,
            default: 'N',
            required: true,
            before: function (val) { return val.toUpperCase(); }
        }
    }
};

prompt.start();

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log(chalk.green('success') + ": Connected successfully to DB");
    prompt.get(promptSchema, (err, result) => {
        if (err) {
            console.log('\n' + chalk.red('error') + ': There was an error getting your response...');
            cleanUp(1);
        } else if (result.continue === "YES" || result.continue === "Y") {
            seedDB();
        } else {
            cleanUp(0);
        }
    });
}).catch((err) => {
    console.log(err);
});

// Seeds the DB by:
// 1. Reading in the file
// 2. Deleting the documents if necessary
// 3. Updating the DB in the below order:
// #1 Fighters
// #2 Stages
function seedDB() {
    console.log("Processing all files.");
    // Read files
    var fighters = fsReadFileSynchToArray(fighterPath);
    var stages = fsReadFileSynchToArray(stagePath);
    console.log(chalk.green('success') + ": Loaded all files.");
    console.log("Attempting to delete all documents");

    // Add all documents
    deleteDocuments()
        .then(() => {
            console.log(chalk.green('success') + ": Successfully deleted all Collections.");
            console.log("Attempting to seed all Collections.");
            return seedFighters(fighters);
        }).then((fighterNumber) => {
            console.log(`Successfully seeded ${fighterNumber} Fighters.`);
            return seedStages(stages);
        }).then((stageNumber) => {
            console.log(`Successfully seeded ${stageNumber} Stages.`);
            console.log(chalk.green('success') + ": Successfully seeded the database.");
            cleanUp(0);
        }).catch((err) => {
            console.log(chalk.red('error') + ": Error seeding database.");
            console.log(err);
            console.log("Could not successfully seed the database...");
            cleanUp(1);
        });
}

//#region Helper Functions

// Read files
function fsReadFileSynchToArray(filePath) {
    var data = JSON.parse(fs.readFileSync(filePath));
    console.log(`Successfully loaded file at ${filePath}`);
    return data;
}

// Delete all documents if set
function deleteDocuments() {
    return new Promise((resolve, reject) => {
        Fighter.deleteMany({}, (err) => {
            if (err) reject(err);
            console.log("Successfully deleted all Fighters.");
            Stage.deleteMany({}, (err) => {
                if (err) reject(err);
                console.log("Successfully deleted all Stages.");
                resolve();
            });
        });
    });
}

// Seed Collections
function seedFighters(fighters) {
    return new Promise((resolve, reject) => {
        fighters.forEach((fighter, i) => {
            // Create the new fighter based on the data
            const newFighter = {
                name: fighter.name,
                profilePictureURL: fighter.profilePictureURL,
                iconURL: fighter.iconURL,
                wikiURL: fighter.wikiURL,
            };
            var newFighterObj = new Fighter(newFighter);
            newFighterObj.save((err) => {
                if (err) reject(err);
                if (i == fighters.length - 1) {
                    resolve(fighters.length);
                }
            });
        });
    });
}

function seedStages(stages) {
    return new Promise((resolve, reject) => {
        stages.forEach((stage, i) => {
            // Create the new stage based on the data
            const newStage = {
                name: stage.name,
                profilePictureURL: stage.profilePictureURL,
                wikiURL: stage.wikiURL,
            };
            var newStageObj = new Stage(newStage);
            newStageObj.save((err) => {
                if (err) reject(err);
                if (i == stages.length - 1) {
                    resolve(stages.length);
                }
            });
        });
    });
}

// Cleanup
function cleanUp(errorCode) {
    console.log("Closing the connection with the DB...");
    mongoose.connection.close();
    console.log("Exiting the program.");
    process.exitCode = errorCode;
}

//#endregion