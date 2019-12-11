const interestedUsers = require("../models/interestedUsers");
const newSubscribers = require("../models/newSubscriber");
const axios = require("axios");


 exports.getSignup = (req, res, next) => {
    res.render('signup');
 };


exports.postSignup =(req, res, next) => {
    name = req.body.name;
    email = req.body.email;
    password = req.body.password;
    newSubscribers.findOne({email:email})
    .then(userDoc => {
        if(userDoc){
            res.json({
                message:"Subscriber already exists!"
            });
        }else{
            console.log("new user");
            const subscriber = new newSubscribers({name:name, email:email, password:password});
            subscriber.save();
            interestedUsers.findOne({email:email})
            .then(user => {
                if(user){
                    interestedUsers.deleteOne({email:email})
                    .then(() => {console.log("successfully deleted");})
                    .catch(error => {
                        console.log(error);
                    });
                    axios.post("http://localhost:8080/feed/postSubscribers", {name:name, email:email})
                    .then(resp => {
                        console.log(resp.data.message);
                        
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            })
            res.status(200).json({
                message:"Subscriber added succesfully",
                subscriber:subscriber
            });
        }
    })
    .catch(error => {
        console.log(error);
    });

}

