import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // allow requests from your frontend (dev)
app.use(express.json());

app.post("/api/submit-lead", async (req, res) => {
  try {
    const phonexaUrl = "https://cp-inst523-client.phonexa.com/short?link=KVOyp";

    // Forward the client data to Phonexa
    const response = await fetch(phonexaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      redirect: "follow" // allow redirects server-side
    });

    const text = await response.text();
    // return Phonexa response back to frontend (optional)
    res.status(response.status).send(text);
  } catch (error) {
    console.error("Error submitting lead:", error);
    res.status(500).json({ error: "Lead submission failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
