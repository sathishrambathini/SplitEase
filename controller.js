const service = require("../services/service");
const expense = require("../services/expense");
const activityS = require("../services/activity");
const https = require("https");

var cookie = "";
createUser = async (req, resp) => {
  try {
    const exist = await service.checkUserExist(req.body);
    if (!exist) {
      const data = await service.createUser(req.body);
      resp.status(200).json({ data: data });
    } else {
      resp.status(400).json({ error: "email is exist" });
    }
  } catch (err) {
    resp.status(500).json({ ersr: err });
  }
};

loginUser = async (req, resp) => {
  try {
    const valid = await service.validateLogin(req.body);
    if (!valid) {
      resp.status(400).json({ err: "invalid" });
    } else {
      resp.status(200).json({ data: valid });
    }
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

deleteUser = async (req, resp) => {
  try {
    const deleUser = await service.deleteUser(req.query.id);
    resp.status(200).json({ data: deleUser });
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

createExpense = async (req, resp) => {
  try {
    const userDetails = await service.checkUserIdExists(req.body);
    const group = await service.getGroupDetails({ _id: req.body.groupId });
    if (!userDetails || !group) {
      resp.status(400).json({ err: "Invalid userId" });
    } else {
      let createExp = await expense.createExpenses(req.body);
      const obj = {
        uuid: group.uuid,
        userId: req.body.userId,
        groupName: group.name,
        groupId: group._id,
        userName: userDetails.name,
        email: userDetails.email,
      };
      const activityObj = { ...obj };
      activityObj[
        "activitytext"
      ] = `${userDetails.name} has added an expense rs ${req.body.amount}/-`;
      await createActivity(activityObj);
      resp.status(200).json({ data: createExp });
    }
  } catch (err) {
    resp.status(500).json({ err: "somethin failed" });
  }
};

updateExpense = async (req, resp) => {
  try {
    const upExp = await expense.updateExpenses(req.query.id, req.body);
    resp.status(200).json({ data: upExp });
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

deleteExpense = async (req, resp) => {
  try {
    const deleExp = await expense.deleteExpenses(req.params.id);
    resp.status(200).json({ data: deleExp });
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

createGroup = async (req, resp) => {
  const checkName = {
    name: req.body.name,
    createdBy: req.body.userId,
  };
  const checkNameResp = await service.getGroupDetails(checkName);
  const userDetails = await service.getUser({ _id: req.body.userId });
  if (!checkNameResp) {
    const uuid = Math.random().toString(36).substring(2, 7);
    try {
      req.body["uuid"] = uuid;
      req.body["createdBy"] = req.body.userId;
      const group = await service.createGroup(req.body);
      if (group) {
        const obj = {
          uuid,
          userId: req.body.userId,
          groupName: req.body.name,
          groupId: group._id,
          userName: userDetails.name,
          email: userDetails.email,
        };
        const activityObj = { ...obj };
        activityObj[
          "activitytext"
        ] = `${userDetails.name} has created this group (${req.body.name})`;
        await createActivity(activityObj);
        await service.assigUserToGroup(obj);
        resp.status(200).json({ data: group });
      } else {
        resp.status(500).json({ err: "something went wrong" });
      }
    } catch (err) {
      resp.status(500).json({ err: err });
    }
  } else {
    resp.status(400).json({ err: "name already exists" });
  }
};

joinGroup = async (req, resp) => {
  try {
    const grp = await service.getGroupDetails({ uuid: req.body.uuid });
    const grpUser = await service.checkAssign({
      uuid: req.body.uuid,
      userId: req.body.userId,
    });
    // console.log("grpUser", grpUser);
    if (grp && !grpUser) {
      const userDetails = await service.getUser({ _id: req.body.userId });
      const obj = {
        groupId: grp._id,
        userId: req.body.userId,
        uuid: grp.uuid,
        groupName: grp.name,
        email: userDetails.email,
        userName: userDetails.name,
      };
      const activityObj = { ...obj };
      activityObj[
        "activitytext"
      ] = `${userDetails.name} has joined this group (${grp.name})`;
      await createActivity(activityObj);
      const group = await service.assigUserToGroup(obj);
      resp.status(200).json({ data: group });
    } else {
      resp.status(400).json({ err: "no group name or user found" });
    }
  } catch (err) {
    resp.status(500).json({ err });
  }
};

groups = async (req, resp) => {
  try {
    const obj = {
      userId: req.params.userId,
    };
    const group = await service.getAllGroupsOfUser(obj);
    resp.status(200).json({ data: group });
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

getAllExpenses = async (req, resp) => {
  try {
    const data = await expense.getAllExpenses({
      userId: req.params.userId,
      groupId: req.params.groupId,
    });
    resp.status(200).json({ data: data });
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

createActivity = async (req) => {
  try {
    return await activityS.createActivity(req);
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

getUsers = async (req, resp) => {
  const obj = { groupId: req.params.groupId };
  try {
    const data = await service.getUsers(obj);
    resp.status(200).json({ data: data });
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

getActivity = async (req, resp) => {
  const obj = { groupId: req.params.groupId };
  try {
    const data = await activityS.getActivity(obj);
    resp.status(200).json({ data: data });
  } catch (err) {
    resp.status(500).json({ err: err });
  }
};

getCode = async (req, resp) => {
  try {
    const code = resp.req.query.code;
    await getAccessToken(code);
    setTimeout(() => {
      resp.cookie("userData", cookie);
      resp.redirect(302, "http://localhost:8086");
    }, 1000);

    // resp.status(200).json({ data: resp.req.query });
  } catch (err) {
    console.log("error", err);
  }
};

getAccessToken = async (code) => {
  let postData = JSON.stringify({
    grant_type: "authorization_code",
    client_secret: "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",
    code: code,
    client_id:
      "1097972992204-g4b5328pbdcm7mdaf1df1k7ifukabji4.apps.googleusercontent.com",
    redirect_uri: "http://localhost:8086/api/getCode",
  });

  await postRequest(postData);
};

postRequest = (postData) => {
  let options = {
    hostname: "oauth2.googleapis.com",
    path: "/token",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response_obj = "";
  const req = https.request(options, (res) => {
    res.on("data", (chunk) => {
      response_obj += chunk;
    });
    res.on("end", async () => {
      await getUserProfile(JSON.parse(response_obj).access_token);
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
};

getUserProfile = (token) => {
  let options = {
    hostname: "www.googleapis.com",
    path: "/oauth2/v1/userinfo?alt=json",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const req = https.request(options, (res) => {
    let response_data = "";
    res.on("data", (chunk) => {
      response_data += chunk;
    });
    res.on("end", async () => {
      let user_profile = JSON.parse(response_data);
      const user_exists = await service.getUser({ email: user_profile.email });
      if (!user_exists) {
        let obj = {
          email: user_profile.email,
          name: user_profile.name,
          password: "",
        };
        const data = await service.createUser(obj);
        const encoded = Buffer.from(`id:${data._id}`, "utf8").toString(
          "base64"
        );
        cookie = encoded;
      } else {
        const encoded = Buffer.from(`id:${user_exists._id}`, "utf8").toString(
          "base64"
        );
        cookie = encoded;
      }
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.end();
};

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
  getCode,
  deleteUser,
};
