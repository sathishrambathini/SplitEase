const service = require("../services/service");
const expense = require("../services/expense");

createUser = async (req, resp) => {
    try{
        console.log("existsd");
        const exist = await service.checkUserExist(req.body);
        console.log("exist", exist);
        if(!req.body.groupId){
            let r = (Math.random() + 1).toString(36).substring(7);
            req.body["groupId"] = r;
            req.body["role"] = "admin";
        }
        if(!exist){
            if(req.body["role"] !== "admin" && req.body["groupId"]){
                const isGrpId = await service.checkGroupId(req.body);
                if(isGrpId === null || isGrpId.length === 0){
                    resp.status(400).json({error: "Invalid Group Id"});
                }else{
                    const data = await service.createUser(req.body);
                    resp.status(200).json({"data" : data});
                }
            }else{
                const data = await service.createUser(req.body);
                resp.status(200).json({data: data});
            }
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


module.exports = {createUser, loginUser, createExpense, updateExpense, deleteExpense};