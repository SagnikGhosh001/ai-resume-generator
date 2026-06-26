export const callModel = async (messages, tools) => {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: "qwen3.5:latest",
      messages,
      stream: false,
      tools,
      think: false,
    }),
  });

  const data = await res.json();
  return data.message;
};
