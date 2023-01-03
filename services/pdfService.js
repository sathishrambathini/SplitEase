var pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require("path");

var html = fs.readFileSync(path.join(__dirname, '../views/invoice.html'), "utf8");

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">invoice</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', 
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
            last: 'Last Page'
        }
    }
};

var users = [
    {
      name: "prashanth",
      age: "25",
    },
    {
      name: "sathisj",
      age: "26",
    },
    {
      name: "mp",
      age: "26",
    },
  ];
  console.log("Users :",users);
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: path.join(__dirname, '../docs/invoice.pdf'),
    type: "",
  };

  pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });