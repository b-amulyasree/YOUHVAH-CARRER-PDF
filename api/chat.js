async function sendMessage(messages) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    const data = await res.json();

    return data.choices?.[0]?.message?.content || "Error";

  } catch (err) {
    return "Connection error. Check backend.";
  }
}
