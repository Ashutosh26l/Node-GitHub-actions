import express from 'express';

const app = express(); // create express app
const PORT = process.env.PORT || 8080; // set the port

// define a route for the root URL
app.get('/', (req, res) => {
  return res.json({msg: 'Hello from the server!'}); // send a JSON response
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});