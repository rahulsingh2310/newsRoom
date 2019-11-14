const nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "newsroom247xd@gmail.com",
    pass: "projectnode@5"
  }
});

transporter
  .sendMail({
    from: "newsroom247xd@gmail.com",
    to: "sasikanth.rayaprolu1234@gmail.com",
    subject: "Checking",
    text: "Checking done!!"
  })
  .then(() => {
    console.log("success");
  })
  .catch(error => {
    console.log(error);
  });
