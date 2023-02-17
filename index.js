const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://thelonewolf:theghostoftheuchiha@cluster0.9owa4un.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true },function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully connected to database");
    }
  }
)


// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Define post schema
const postSchema = new mongoose.Schema({
  userId: String,
  data: String,
  likes: Number,
  famous: Boolean
});

// Define user model
const UserModel = mongoose.model('User', userSchema);

// Define post model
const PostModel = mongoose.model('Post', postSchema);

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define API routes

// Create a new user
app.get("/", async (req, res) => {
    res.sendFile(__dirname+ "/index.html")
})

app.post('/user', async (req, res) => {
  const user = new UserModel(req.body);
  await user.save();
  res.send(user);
});

// Get user info
app.get('/user/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.send(user);
});

// Retrieve all posts with number of likes
app.get('/post', async (req, res) => {
  const posts = await PostModel.find();
  const result = posts.map(post => ({
    _id: post._id,
    userId: post.userId,
    data: post.data,
    likes: post.likes
  }));
  res.send(result);
});

// Create a new post
app.post('/post', async (req, res) => {
  const post = new PostModel({
    userId: req.body.userId,
    data: req.body.data,
    likes: 0,
    famous: false
  });
  await post.save();
  res.send(post);
});

// Like a post
app.post('/like', async (req, res) => {
  const post = await PostModel.findById(req.body.postId);
  post.likes++;
  await post.save();

  // Check if post is famous
  const userPosts = await PostModel.find({ userId: post.userId });
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
  const averageLikes = totalLikes / userPosts.length;
  if (post.likes >= averageLikes) {
    post.famous = true;
    await post.save();

    // Send email to post creator

    // const user = await UserModel.findById(post.userId);
    // const mailOptions = {
    // from: 'your@gmail.com',
    // to: user.email,
    // subject: 'Your post is famous!',
    // html: `
    //     <p>Congratulations! Your post "${post.data}" has become famous with ${post.likes} likes.</p>
    //     <p>Keep up the good work!</p>
    // `
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    // if (error) {
    //     console.log(error);
    // } else {
    //     console.log(`Email sent to ${user.email}: ${info.response}`);
    // }
    // });
}

res.send(post);
});

// Get top 10 most liked posts
app.get('/famous', async (req, res) => {
  const posts = await PostModel.find({ famous: true }).sort({ likes: -1 }).limit(10);
  res.send(posts);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});