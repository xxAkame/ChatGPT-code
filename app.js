const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;
const dataFilePath = "./users.json";

// Middleware to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login API endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  
  // Load users data from the filesystem
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const users = JSON.parse(data);

    // Find the user by username and check the password
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      return res.json({ message: "Login successful!" });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
