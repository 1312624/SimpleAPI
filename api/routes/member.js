import express from 'express';
import * as memberService from '../services/memberService';

const router = module.exports = express.Router();

router.route('/')
    .get((req, res) => {
        memberService.getAllMember()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    })

    .post((req, res) => {
        const { memberCode, Name, Awards } = req.body
        memberService.addMember({ memberCode, Name, Awards })
            .then(newMember => {
                res.status(200).json(newMember);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    });

router.route('/:memberCode')
    .get(( req, res ) => {
        memberService.retrieveMember( req.params.memberCode )
            .then((member) => {
                res.status(200).json(member);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })

    .put(( req, res ) => {
        const awardID = req.body.Awards;
        const memberCode = req.params.memberCode;

        memberService.associateMemberAndReward(memberCode, awardID)
            .then(updateMember => {
                res.status(200).json(updateMember);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

    .delete((req, res) => {
        memberService.deleteMember(req.params.memberCode)
            .then(deletedMember => {
                res.status(200).json({ message : 'Member deleted', deletedMember });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });