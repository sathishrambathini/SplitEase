const activitySchema  = require("../modals/activityModal");

createActivity = async (req) => {
    return await activitySchema.create(req);
};

getActivity = async (req) => {
    return await activitySchema.find(req);
}

deleteGroup = async (req) => {
    return await activitySchema.deleteMany(req);
}

module.exports = {
    createActivity,
    getActivity,
    deleteGroup
};