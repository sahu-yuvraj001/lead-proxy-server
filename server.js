import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ POST route to handle lead submission
app.post("/api/submit-lead", async (req, res) => {
  try {
    // ✅ Updated client endpoint (production)
    const phonexaUrl = "https://leads-inst523-client.phonexa.com/fullpost/";

    console.log("📨 Forwarding Lead Payload to Client API...");
    console.log("Payload:", req.body);

    const response = await fetch(phonexaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text(); // client API might return plain text or XML

    console.log("✅ Lead sent successfully to Phonexa API");
    res.status(response.status).send(text);
  } catch (error) {
    console.error("❌ Error submitting lead to client API:", error);
    res.status(500).json({ error: "Lead submission failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Proxy server running on port ${PORT}`));
