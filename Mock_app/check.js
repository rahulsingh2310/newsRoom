const axios = require("axios");

axios.get("http://localhost:8080/feed/posts/grammarcheck")
.then(result => {
    console.log(result.data.posts);
    var posts = result.data.posts;
    for (var post of posts.values()){
        post.content = "Both are Legends!!"
    };
    return posts;
})
.then(posts => {
    axios.post("http://localhost:8080/feed/correctPosts", {
        posts: posts
    }).then(response => {
        console.log("Sent corrected Posts");
        console.log(response.data.message);
    })
    
})
.catch(error => {
    console.log(error)
}
);