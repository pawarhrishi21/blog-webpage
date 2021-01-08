//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet enim eu diam tristique suscipit. Maecenas convallis erat in lorem vehicula, consequat viverra arcu mattis. Ut tristique arcu vel ante finibus, non euismod est consequat. Curabitur ac euismod erat, non malesuada leo. Pellentesque id quam vel leo scelerisque porta quis dapibus tellus. Curabitur nibh mauris, lobortis vitae augue faucibus, convallis elementum orci. Ut aliquet lorem ut felis dictum finibus. Nam luctus diam et nisi tempus mattis. Aliquam sollicitudin condimentum sem non dictum. Mauris dictum molestie augue at bibendum. Nunc fringilla dolor lorem, nec l";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  let options = {
    content: homeStartingContent,
    posts: posts,
    };
  res.render("home",options);
})

app.get("/about",function(req,res){
  let options = {content: aboutContent};
  res.render("about",options);
})

app.get("/contact",function(req,res){
  let options = {content: contactContent};
  res.render("contact",options);
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  const post = {
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
  }
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:postTitle",function(req,res){
  posts.forEach(element => {
    if(lodash.lowerCase(req.params.postTitle) === lodash.lowerCase(element.blogTitle))
      res.render("post",{    
        blogTitle: element.blogTitle,
        blogContent: element.blogContent,
      })
  });

})


app.listen(3000, function() {
  console.log("Server started on port 3000");
})
