const dotenv=require('dotenv');
const path = require("path");
const nodemailer = require('nodemailer');
dotenv.config({path:path.join(__dirname,"../config.env")})


sendEmail = (_req)=>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM, 
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const email=[ 'sathish1048@gmail.com']
    let mailOptions = {
        from: process.env.EMAIL_FROM, 
        to:email,
        subject: 'Invoice From MyRoom401 - Test',
        text: 'its working!!',
        attachments: [
            { filename: 'Invoice.pdf', path:  path.join(__dirname, "../docs/invoice.pdf") }
        ]
    };
    
    
    return transporter.sendMail(mailOptions, (err, data) => {
        let promise = new Promise(function(resolve, reject) {
            if (err) {

            return    reject(new Error('Something is not right!'));
                // return false;
            }else{
               return resolve("success")    
            }            
        });
        
    });
};
module.exports = {
    sendEmail,
}