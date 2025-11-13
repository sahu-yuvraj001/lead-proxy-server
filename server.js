import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ POST route to handle lead submission
app.post("/api/submit-lead", async (req, res) => {
  try {
    // Use client’s /lead/ endpoint
    const phonexaUrl = "https://leads-inst523-client.phonexa.com/lead/";

    console.log("📨 Forwarding Lead Payload to Phonexa API...");
    console.log("Payload:", req.body);

    // Send JSON directly
    const response = await fetch(phonexaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });

    // Parse response
    const data = await response.json();
    console.log("✅ Phonexa response:", data);

    // Send Phonexa response back to frontend
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Error submitting lead to Phonexa API:", error);
    res.status(500).json({ error: "Lead submission failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Proxy server running on port ${PORT}`)
);
