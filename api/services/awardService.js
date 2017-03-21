import awardModel from '../models/Award';

export function addAward(awardInfo) {
    const newAward = new awardModel(awardInfo);
    return newAward.save();
}

export function getAllAward() {
    return awardModel.find({}, '-__v')
        .sort('Name')
        .exec();
}

export function checkExistAwardByID(awardID) {
    return new Promise((resolve, reject) => {
        awardModel.findById(awardID)
            .exec()
            .then((award) => {
                resolve(true);
            })
            .catch(err => {
                reject(new Error('Award Not Found'));
            })
    });
}

export function checkExistAwardByListID(listID) {
    if (Array.isArray(listID)) {
        let promises = [];

        listID.map(awardID => {
            promises.push(checkExistAwardByID(listID));
        });

        return Promise.all(promises)
            .then(() => {
                Promise.resolve(true);
            })
            .catch((err) => {
                Promise.reject(new Error('Invalid List Award'));
            })
    }
    else {
        return checkExistAwardByID(listID);
    }
}