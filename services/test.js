const { mapReduce } = require("../modals/expenseModal");

const users =[
    {
     
      userId: '63a695ddcaa3a38b9879bd7c',
      groupId: '63a69609caa3a38b9879bd85',
      uuid: 'q5q94',
      groupName: '401',
      email: 'prashanthmp009@gmail.com',
      userName: 'Prashanth'
    },
    {
      
      userId: '63a69690caa3a38b9879bd9b',
      groupId: '63a69609caa3a38b9879bd85',
      uuid: 'q5q94',
      groupName: '401',
      email: 'bala@gmail.com',
      userName: 'bala'
    },
    {
      
      userId: '63a74c30cddeac8b55cdb6e5',
      groupId: '63a69609caa3a38b9879bd85',
      uuid: 'q5q94',
      groupName: '401',
      email: 'nagesh@gmail.com',
      userName: 'nagesh'
    }
  ]
  const response =[
    {
      
      name: 'curry leaves ',
      description: 'dinner',
      amount: 30,
      userId: '63a695ddcaa3a38b9879bd7c',
      groupId: '63a69609caa3a38b9879bd85',
     
    },
    {
      
      name: 'eggs',
      description: 'eggs',
      amount: 25,
      userId: '63a69690caa3a38b9879bd9b',
      groupId: '63a69609caa3a38b9879bd85'
    },
    {
     
      name: 'mutton',
      description: 'rgh',
      amount: 500,
      userId: '63a695ddcaa3a38b9879bd7c',
      groupId: '63a69609caa3a38b9879bd85'
    },
    {
    
      name: 'done',
      description: "don't",
      amount: 200,
      userId: '63a74c30cddeac8b55cdb6e5',
      groupId: '63a69609caa3a38b9879bd85'

    },
    {
     
      name: 'egg',
      description: 'lunch',
      amount: 20,
      userId: '63a9e17000116cd9ca7df470',
      groupId: '63a69609caa3a38b9879bd85'
    },

    {
     
      name: 'some',
      description: 'some',
      amount: 25,
      userId: '63a74c30cddeac8b55cdb6e5',
      groupId: '63a69609caa3a38b9879bd85'
    },
    {
     
      name: 'check',
      description: 'pedh',
      amount: 649,  
      userId: '63a74c30cddeac8b55cdb6e5',
      groupId: '63a69609caa3a38b9879bd85'
    }
  ]

  const fianlArray=new Map();
  const userF = [];

users.forEach((value, index, array) => {
// JavaScript to illustrate findIndex() method

//console.log(value.userName);
fianlArray.set(value.userName,value.userName)

    var filtered = response.filter(function(response) {
        return response.userId == value.userId; 
    });
   // console.log(filtered);

   let total= filtered.reduce((a,b)=>{
        return a+b['amount'];
    },0)
///console.log(value.userName,total);
fianlArray.set(value.userName,[value.userName,total,filtered[0]])
// userF.push(value.userName)
// userF.push(total);
// userF.push(filtered)
})


//console.log("Final",fianlArray);

console.log(fianlArray.get("nagesh"));

const check=new Map();
check.set("1",userF[2])



















//   console.log(users.length)
//   console.log("Rresponse : "+response.length)
// let tAmount=0;
//   response.forEach((value, index, array) => {
// console.log(parseInt(value.amount));
// tAmount=tAmount+parseInt(value.amount);
//   });
//   console.log("Total Amount :"+tAmount);

// let avgAmout=tAmount/users.length;
// console.log("avg am :"+avgAmout);
//   const invoice = new Map(); 
//   invoice.set("totalExpensive",tAmount);
//   invoice.set("avgAmount",avgAmout);
//   invoice.set("users",users)
//   const hh=invoice.get("users")
//   console.log(hh);