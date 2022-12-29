const service = require("../services/service");
const expense = require("../services/expense");
const activityS = require("../services/activity");
const mailService = require("../services/mailService");

createUser = async (req, resp) => {
    try{
        const exist = await service.checkUserExist(req.body);
        if(!exist){
            const data = await service.createUser(req.body);
            resp.status(200).json({data: data});
        }else{
            resp.status(400).json({"error": "email is exist"});
        }
    }catch(err){
        resp.status(500).json({"ersr" : err});
    }
}

loginUser = async (req, resp)=>{
    try{
        const valid = await service.validateLogin(req.body);
        if(!valid){
            resp.status(400).json({err: "invalid"});
        }else{
            resp.status(200).json({data: valid});
        }
    }catch(err){
        resp.status(500).json({err: err});
    }
}

createExpense = async (req, resp)=>{
    try{
        const userDetails = await service.checkUserIdExists(req.body);
        const group = await service.getGroupDetails({_id: req.body.groupId});
        if(!userDetails || !group){
            resp.status(400).json({err: "Invalid userId"});
        }else{
            let createExp = await expense.createExpenses(req.body)
            const obj = {
                uuid: group.uuid,
                userId: req.body.userId,
                groupName: group.name,
                groupId: group._id,
                userName: userDetails.name,
                email: userDetails.email,
            };
            const activityObj = {...obj};
            activityObj["activitytext"] = `${userDetails.name} has added an expense rs ${req.body.amount}/-`;
            await createActivity(activityObj)
            resp.status(200).json({data: createExp});
        }
    }catch(err){
        resp.status(500).json({err: "somethin failed"});
    }
}

updateExpense = async (req, resp) => {
    try{
       const upExp = await expense.updateExpenses(req.params.id, req.body);
       resp.status(200).json({"data": upExp})
    }catch(err){
        resp.status(500).json({"err": err});
    }
}

deleteExpense = async (req, resp) => {
    try{
       const deleExp = await expense.deleteExpenses(req.params.id);
       resp.status(200).json({"data": deleExp})
    }catch(err){
        resp.status(500).json({"err": err});
    }
}

createGroup = async (req, resp)=>{
    const checkName = {
        name: req.body.name,
        createdBy: req.body.userId,
    };
    const checkNameResp = await service.getGroupDetails(checkName);
    const userDetails = await service.getUser({"_id": req.body.userId});
    if(!checkNameResp){
        const uuid = Math.random().toString(36).substring(2,7);
        try{
            req.body["uuid"] = uuid;
            req.body["createdBy"] =  req.body.userId;
            const group = await service.createGroup(req.body);
            if(group){
                const obj = {
                    uuid,
                    userId: req.body.userId,
                    groupName: req.body.name,
                    groupId: group._id,
                    userName: userDetails.name,
                    email: userDetails.email,
                    createdBy: req.body.userId,
                };
                const activityObj = {...obj};
                activityObj["activitytext"] = `${userDetails.name} has created this group (${req.body.name})`;
                await createActivity(activityObj);
                await service.assigUserToGroup(obj);
                resp.status(200).json({"data": group});
            }else{
                resp.status(500).json({"err": "something went wrong"});
            }
         }catch(err){
             resp.status(500).json({"err": err});
         }
    }else{
        resp.status(400).json({"err": "name already exists"});
    }
}

joinGroup = async (req, resp) => {
    try{
        const grp = await service.getGroupDetails({uuid: req.body.uuid});
        const grpUser = await service.checkAssign({uuid: req.body.uuid, userId: req.body.userId});
        // console.log("grpUser", grpUser);
        if(grp && !grpUser){
            const userDetails = await service.getUser({"_id": req.body.userId});
            const obj = {
                groupId: grp._id,
                userId: req.body.userId,
                uuid: grp.uuid,
                groupName: grp.name,
                email: userDetails.email,
                userName: userDetails.name,
                createdBy: grp.createdBy,
            };
            const activityObj = {...obj};
            activityObj["activitytext"] = `${userDetails.name} has joined this group (${grp.name})`;
            await createActivity(activityObj);
            const group =  await service.assigUserToGroup(obj);
            resp.status(200).json({"data": group});
        }else{
            resp.status(400).json({"err": "no group name or user found"});
        }
    }catch(err){
        resp.status(500).json({err});
    }
}

groups = async (req, resp) => {
    try{
        const obj = {
            userId: req.params.userId,
        }
        const group =  await service.getAllGroupsOfUser(obj);
        resp.status(200).json({"data": group});
     }catch(err){
         resp.status(500).json({"err": err});
     }
}

getAllExpenses = async (req, resp) => {
    try{
        const data = await expense.getAllExpenses({userId: req.params.userId, groupId: req.params.groupId});
        resp.status(200).json({"data": data});
    }catch(err){
        resp.status(500).json({"err": err});
    }
}

createActivity = async (req) => {
    try{
        return await activityS.createActivity(req);
    }catch(err){
        resp.status(500).json({"err": err});
    }
}

getUsers = async (req, resp) => {
    const obj = { groupId : req.params.groupId }
    try{
        const data = await service.getUsers(obj);
        resp.status(200).json({"data": data});
    }catch(err){
        resp.status(500).json({"err": err});
    }
}

getActivity = async (req, resp) => {
    const obj = { groupId : req.params.groupId }
    try{
        const data = await activityS.getActivity(obj);
        resp.status(200).json({"data": data});
    }catch(err){
        resp.status(500).json({"err": err});
    }
}

sendEmail = async (req, resp) => {
    const response = await mailService.sendEmail(req);
    console.log("response", response);
    // response ? resp.status(200).json({"data": "sent"}) : resp.status(400).json({"data": "failed"});
}

getBill = async (req, resp) => {
    const obj = { groupId : req.params.groupId }
    try{
        const data = await service.getUsers(obj);
        resp.status(200).json({"data": data});
        console.log("users", data);
        const response = await expense.getBill({groupId:req.params.groupId});
        console.log("response", response);
    }catch(err){
        resp.status(500).json({"err": err});
    }
   
    // response ? resp.status(200).json({"data": "sent"}) : resp.status(400).json({"data": "failed"});
}

deletGroup = async (req, resp)=>{
    const obj = { groupId : req.params.groupId };
    const objOwn = { _id : req.params.groupId }
    try{
        await service.deleteGroup(obj, objOwn);
        await expense.deleteGroup(obj);
        await activityS.deleteGroup(obj);
        resp.status(200).json({"data": [{data: "deleted Successfully"}]});
    }catch(err){
        resp.status(500).json({"err": err});
    }
}

module.exports = {
    createUser, 
    loginUser, 
    createExpense, 
    updateExpense, 
    deleteExpense, 
    createGroup, 
    joinGroup, 
    groups,
    getAllExpenses,
    getUsers,
    getActivity,
    sendEmail,
    getBill,
    deletGroup
};