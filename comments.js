// Create web server
// Import express
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Create a route
app.get('/comments', (req, res) => {
  // Read the comments from the comments.json file
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred. Please try again later.');
    } else {
      const comments = JSON.parse(data);
      res.send(comments);
    }
  });
});

// Create a post route
app.post('/comments', (req, res) => {
  // Read the comments from the comments.json file
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred. Please try again later.');
    } else {
      const comments = JSON.parse(data);
      // Add the new comment to the comments array
      comments.push(req.body);
      // Write the updated comments to the comments.json file
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred. Please try again later.');
        } else {
          res.send('Comment added successfully!');
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});