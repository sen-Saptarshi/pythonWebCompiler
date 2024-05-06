const express = require("express");
const path = require("path");
const { spawn } = require("child_process");
const app = express();

// Security: Consider using a temporary directory for user code
const tempDir = path.join(__dirname, "temp");

// Sanitize user input (further research recommended)
function sanitizeInput(userInput) {
  // Implement logic to remove potentially harmful characters
  // Explore libraries like 'sanitize-html' for advanced sanitization
  return userInput.replace(/<script.*?>.*?<\/script>/g, "");
}

app.use(express.json()); // Parse incoming JSON data

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/runPython", (req, res) => {
  const userInput = sanitizeInput(req.body.user); // Sanitize user code

  // Create a temporary file for the Python code
  const filename = `${Date.now()}.py`;
  const filePath = path.join(tempDir, filename);

  const fs = require("fs"); // Import file system module

  fs.writeFile(filePath, userInput, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating temporary file");
    }

    const python = spawn("python", [filePath]); // Execute Python script

    let output = "";
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error(data.toString()); // Log errors to server console
      res.status(500).send("Error running Python script"); // Send generic error to user
    });

    python.on("close", (code) => {
      // Clean up temporary file (optional)
      fs.unlink(filePath, (err) => {
        if (err) console.error(err); // Log cleanup error
      });

      if (code === 0) {
        res.send(output);
      } else {
        res.status(500).send("Error running Python script"); // More specific error handling recommended
      }
    });
  });
});

app.listen(4000, () => console.log("Server listening on port 4000"));
