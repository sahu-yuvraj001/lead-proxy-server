import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ Lead Proxy Server is running successfully!");
});

// ✅ POST route to handle lead submission
app.post("/api/submit-lead", async (req, res) => {
  console.log("📨 Request received at /api/submit-lead");
  console.log("Payload:", req.body);

  const phonexaUrl = "https://leads-inst523-client.phonexa.com/lead/";

  try {
    const response = await fetch(phonexaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    console.log("✅ Phonexa response:", data);
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Error submitting lead:", error.message);
    res.status(500).json({ error: "Lead submission failed" });
  }
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("✅ Lead Proxy Server is running successfully!");
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Proxy server running on port ${PORT}`)
);
