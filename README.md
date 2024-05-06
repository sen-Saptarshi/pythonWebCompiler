## Python Web Compiler

This project provides a simple online compiler for executing Python code directly in your browser.

**Features:**

- Write and execute Python code in your web browser.
- View the output of your code in the browser console.

**Getting Started:**

**Prerequisites:**

- Node.js and npm installed on your system.

**Clone the repository:**

```bash
git clone https://your-github-repo/online-python-compiler.git
```

**Install dependencies:**

```bash
cd online-python-compiler
npm install
```

**Run the server:**

```bash
npm start
```

This will start the server on port 4000 by default.

**Usage:**

1. Open http://localhost:4000 in your web browser.
2. Write your Python code in the editor area.
3. Click the "Run" button to execute the code.
4. The output of the code will be displayed in the console below the editor.

**Security:**

**Important Note:** This is a simplified version for educational purposes. In a production environment, it's highly recommended to implement proper security measures on the server-side to prevent vulnerabilities like code injection. The current implementation does some basic sanitization but more robust methods are necessary.

**Technology Stack:**

- Node.js
- Express.js
- child_process module

**Contributing:**

Pull requests and suggestions are welcome!
