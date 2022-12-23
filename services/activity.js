const activitySchema  = require("../modals/activityModal");

createActivity = async (req) => {
    return await activitySchema.create(req);
};

getActivity = async (req) => {
    return await activitySchema.find(req);
}

module.exports = {
    createActivity,
    getActivity
};