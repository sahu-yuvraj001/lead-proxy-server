import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Lead Proxy Server is running successfully!");
});

// ✅ POST route to handle lead submission
app.post("/api/submit-lead", async (req, res) => {
  console.log("📨 Request received at /api/submit-lead");
  console.log("Payload received from frontend:", req.body);

  // ✅ Build the payload for Phonexa API
  const leadPayload = {
    apiId: "F3F4A0A3E8AE439CA241AC6FCFB1C841", // your API key
    apiPassword: "5d3c3291", // your API password
    productId: 265, // from client doc
    price: "0.50",

    // Core user info
    firstName: req.body.firstName?.trim() || "John",
    lastName: req.body.lastName?.trim() || "Doe",
    dob: req.body.dob || "1985-01-01",
    email: req.body.email?.trim() || "john.doe@example.com",
    phone: req.body.phone?.trim() || "5551234567",
    homePhone: req.body.homePhone?.trim() || "5551234567",
    workPhone: req.body.workPhone?.trim() || "5551234567",
    ssn: req.body.ssn?.trim() || "123456789",

    // Address
    address: req.body.address?.trim() || "123 Main St",
    city: req.body.city?.trim() || "Los Angeles",
    state: req.body.state?.trim() || "CA",
    zip: req.body.zip?.trim().slice(0, 5) || "90001",

    // System info
    userIp: req.body.userIp || "127.0.0.1",
    webSiteUrl: "disabilityclaimassist.com",
    leadid_token: req.body.leadid_token || "",
    trustedform_cert_url: req.body.trustedform_cert_url || "",

    // Employment / income
    activeMilitary: req.body.activeMilitary || "NO",
    workCompanyName: req.body.workCompanyName || "Example Company",
    jobTitle: req.body.jobTitle || "Worker",
    currentlyemployed: req.body.currentlyemployed || "yes",
    incomeType: req.body.incomeType || "EMPLOYMENT",
    incomePaymentFrequency: req.body.incomePaymentFrequency || "MONTHLY",
    incomeNetMonthly: req.body.incomeNetMonthly || "3000",
    incomeNextDate1: req.body.incomeNextDate1 || "2025-12-01",
    incomeNextDate2: req.body.incomeNextDate2 || "2025-12-30",

    // Banking
    bankDirectDeposit: req.body.bankDirectDeposit || "YES",
    bankAba: req.body.bankAba || "123456789",
    bankName: req.body.bankName || "Example Bank",
    bankAccountNumber: req.body.bankAccountNumber || "987654321",
    bankAccountType: req.body.bankAccountType || "CHECKING",
    bankAccountLengthMonths: req.body.bankAccountLengthMonths || 24,

    // Additional info
    unsecuredDebt: req.body.unsecuredDebt || "500",
    autoTitle: req.body.autoTitle || "NO",
    loanPurpose: req.body.loanPurpose || "Personal",
    clickid: req.body.clickid || "TXN1234567890",
    source: req.body.source || "Website",
    affId: req.body.affId || "AFF123",

    // Tracking params
    tPar: {
      affiliateId: req.body.affiliateId || "AFF123",
      transactionId: req.body.transactionId || "TXN1234567890",
      offerId: req.body.offerId || "OFFER123",
    },
  };

  const phonexaUrl = "https://leads-inst523-client.phonexa.com/lead/";

  try {
    const response = await fetch(phonexaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(leadPayload),
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

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Proxy server running on port ${PORT}`));
