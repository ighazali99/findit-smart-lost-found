/*
  FindIt frontend -> n8n webhook
  IMPORTANT: Paste your n8n PRODUCTION webhook URL below.
  It should contain /webhook/findit-report, not /webhook-test/.
*/
const WEBHOOK_URL = "https://ighazali.app.n8n.cloud/webhook/findit-report";

const form = document.getElementById("reportForm");
const submitButton = document.getElementById("submitButton");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");
const resultBadge = document.getElementById("resultBadge");
const errorMessage = document.getElementById("errorMessage");
const newReportButton = document.getElementById("newReportButton");
const reportTypeOptions = document.querySelectorAll('input[name="reportType"]');

function setReportTypeStyle() {
  document.querySelectorAll(".type-option").forEach((option) => {
    option.classList.toggle("selected", option.querySelector("input").checked);
  });
}
reportTypeOptions.forEach((radio) => radio.addEventListener("change", setReportTypeStyle));

function makeReportId() {
  // A simple prototype ID. For a larger public system, generate IDs on the backend.
  return "R" + Date.now().toString().slice(-8);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;
  resultCard.hidden = true;

  if (!WEBHOOK_URL.startsWith("https://") ||
      WEBHOOK_URL.includes("PASTE_YOUR_N8N")) {
    showError("Setup needed: open script.js and paste your n8n Production Webhook URL into WEBHOOK_URL.");
    return;
  }

  const formData = new FormData(form);
  const report = {
    reportId: makeReportId(),
    reportType: String(formData.get("reportType")),
    itemName: String(formData.get("itemName")).trim(),
    description: String(formData.get("description")).trim(),
    location: String(formData.get("location")).trim(),
    date: String(formData.get("date")),
    contactEmail: String(formData.get("contactEmail") || "").trim()
  };

  submitButton.disabled = true;
  submitButton.querySelector("span:first-child").textContent = "Submitting report…";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report)
    });

    const responseText = await response.text();
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error("n8n responded, but the response was not valid JSON. Check the Respond to Webhook node.");
    }

    if (!response.ok) {
      throw new Error(data.message || `Request failed (${response.status}). Check your n8n workflow.`);
    }

    const matchResult = data.matchResult || data.message || "Report submitted. No matching result was returned.";
    resultText.textContent = typeof matchResult === "string" ? matchResult : JSON.stringify(matchResult);
    resultBadge.textContent = "REPORT PROCESSED";
    resultCard.hidden = false;
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    form.reset();
    setReportTypeStyle();
  } catch (error) {
    console.error("FindIt submission error:", error);
    const isNetworkError = error instanceof TypeError;
    showError(
      isNetworkError
        ? "Could not connect to n8n. Check that your Production Webhook URL is correct, the workflow is active, and the webhook allows browser requests (CORS)."
        : error.message
    );
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span:first-child").textContent = "Submit report & find matches";
  }
});

newReportButton.addEventListener("click", () => {
  resultCard.hidden = true;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
});
