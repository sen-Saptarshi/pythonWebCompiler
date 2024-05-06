const editor = document.getElementById("editor");
const runButton = document.getElementById("run-btn");
const output = document.getElementById("output");

runButton.addEventListener("click", async () => {
  const code = editor.value;const editor = document.getElementById("editor");
  const runButton = document.getElementById("run-btn");
  const output = document.getElementById("output");

  runButton.addEventListener("click", async () => {
    const code = editor.value;

    try {
      const response = await fetch("/runPython", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: code }),
      });

      const data = await response.json();
      output.textContent = data;
    } catch (error) {
      console.error(error);
      output.textContent = "Error running Python code";
    }
  });


  try {
    const response = await fetch("/runPython", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: code }),
    });

    const data = await response.json();
    output.textContent = data;
  } catch (error) {
    console.error(error);
    output.textContent = "Error running Python code";
  }
});
