import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { URLSearchParams } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ POST route to handle lead submission
app.post("/api/submit-lead", async (req, res) => {
  try {
    const phonexaUrl = "https://leads-inst523-client.phonexa.com/fullpost/";

    console.log("📨 Forwarding Lead Payload to Client API...");
    console.log("Payload:", req.body);

    // ✅ Convert JSON body to x-www-form-urlencoded format
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(req.body)) {
      params.append(key, value ?? "");
    }

    const response = await fetch(phonexaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await response.text(); // Phonexa often returns plain text or XML
    console.log("✅ Lead sent successfully to Phonexa API");

    res.status(response.status).send(text);
  } catch (error) {
    console.error("❌ Error submitting lead to client API:", error);
    res.status(500).json({ error: "Lead submission failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Proxy server running on port ${PORT}`)
);
