const correctPost = require("./models/correctPost");

console.log("abc");
correctPost.find()
.then(posts => {
    console.log(posts);
    console.log("Success");
})
.catch(error => {
    console.log(error);
});