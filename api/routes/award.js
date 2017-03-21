import express from 'express';
import * as awardService from '../services/awardService';

const router = module.exports = express.Router();

router.route('/')
    .get((req, res) => {
        awardService.getAllAward()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

    .post((req, res) => {
        const { Name} = req.body
        awardService.addAward({ Name })
            .then(newAward => {
                res.status(200).json(newAward);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    });