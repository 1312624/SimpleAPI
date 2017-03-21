import memberModel from '../models/Member';
import { checkExistAwardByListID } from '../services/awardService';
import _ from 'lodash';

export function addMember(memberInfo) {
    return new Promise((resolve, reject) => {
        const newMember = new memberModel(memberInfo);

        if (!memberInfo.Awards) {
            resolve(newMember.save());
        }

        checkExistAwardByListID(memberInfo.Awards)
            .then(() => {
                resolve(newMember.save());
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteMember(memberCode) {
    return memberModel.remove({ memberCode }).exec();
}

export function associateMemberAndReward(memberCode, awardsID) {
    return new Promise((resolve, reject) => {
        checkExistAwardByListID(awardsID)
            .then(() => {
                //resolve(memberModel.findOneAndUpdate({ memberCode }, { Awards: [...Awards, ...awardsID] }));
                memberModel.findOne({ memberCode })
                    .then((member) => {
                        member.Awards.push(...awardsID);
                        member.Awards = (_.uniqWith(member.Awards, _.isEqual));
                        resolve(member.save());
                    })
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function retrieveMember(memberCode) {
    return memberModel.findOne({ memberCode })
        .populate('Awards', '-__v')
        .exec();
}

export function getAllMember() {
    return memberModel.find({}, 'memberCode Name')
        .sort('Name')
        .exec();
}