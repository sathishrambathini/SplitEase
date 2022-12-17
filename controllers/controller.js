const service = require("../services/service");
const expense = require("../services/expense");
// const { json } = require("express/lib/response");

createUser = async (req, resp) => {
    try{
        console.log("existsd");
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
        if(!req.body.userId){
            resp.status(400).json({err: "Invalid userId"});
        }else{
            const valid = await service.checkUserIdExists(req.body);
            console.log("valid", valid);
            if(!valid){
                resp.status(400).json({err: "Invalid userId"});
            }else{
                let createExp = await expense.createExpenses(req.body)
                resp.status(200).json({data: createExp});
            }
        }
    }catch(err){
        resp.status(500).json({err: "somethin failed"});
    }
}

updateExpense = async (req, resp) => {
    try{
       const upExp = await expense.updateExpenses(req.query.id, req.body);
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
    const uuid = Math.random().toString(36).substring(2,7);
    try{
        req.body["uuid"] = uuid;
        const group = await service.createGroup(req.body);
        const obj = {
            uuid,
            userId: req.body.createdBy,
            groupName: req.body.name,
            groupId: group._id,
        }
        await service.assigUserToGroup(obj);
        resp.status(200).json({"data": group});
     }catch(err){
         resp.status(500).json({"err": err});
     }
}

joinGroup = async (req, resp) => {
    const grp = await service.getGroupDetails({uuid: req.body.uuid});
    const grpUser = await service.getGroupDetails({uuid: req.body.uuid, userId: req.body.userId});
    if(grp && !grpUser){
        const obj = {
            groupId: req.body.groupId,
            userId: req.body.userId,
            uuid: grp.uuid,
            groupName: grp.name
        }
        try{
            const group =  await service.assigUserToGroup(obj);
            resp.status(200).json({"data": group});
         }catch(err){
             resp.status(500).json({"err": err});
         }
    }else{
        resp.status(400).json({"err": "no group name or user found"});
    }
}

groups = async (req, resp) => {
    try{
        const obj = {
            // groupId: req.params.groupId,
            userId: req.params.userId,
        }
        const group =  await service.getAllGroupsOfUser(obj);
        resp.status(200).json({"data": group});
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
    groups
};