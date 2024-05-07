// const editor = document.getElementById("editor");
// const output = document.getElementById("output");
const runButton = document.getElementById("run-btn");

runButton.addEventListener("click", async () => {
  const editor = document.getElementById("editor");
  const code = editor.innerText;
  const output = document.getElementById("output");

  try {
    const response = await fetch("/runPython", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: code }),
    });

    const data = await response.json();
    console.log(data);
    output.innerText = data.output;
  } catch (error) {
    console.error(error);
    output.textContent = "Error running Python code";
  }
});
