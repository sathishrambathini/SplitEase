const activitySchema  = require("../modals/activityModal");

createActivity = async (req) => {
    return await activitySchema.create(req);
};

module.exports = {
    createActivity
};