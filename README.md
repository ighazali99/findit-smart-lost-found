# FindIt — Smart Lost & Found Matcher

FindIt is a student project that helps people report lost and found items and identify possible matches. It uses an automated workflow built with **n8n** and an AI matching assistant to compare submitted reports and suggest potential matches for human verification.

## 🎯 Project Overview

Finding a lost item can be difficult when lost and found reports are scattered across different places. FindIt provides a simple web interface where users can submit details about an item they lost or found.

The submitted report is sent to an n8n workflow, which processes the report, compares it with existing records, and returns possible matches.

**Important:** AI-generated matches are suggestions, not confirmed matches. Every suggested match must be verified by a person.

## ✨ Features

- **Lost and Found Reports:** Submit a report for an item that was lost or found.
- **Item Details:** Provide the item's name, description, date, and location.
- **Optional Contact Email:** Include an email address if you wish to provide contact information.
- **AI-Assisted Matching:** Compare reports to identify plausible lost-and-found matches.
- **Automated Workflow:** Use n8n to connect the frontend, report storage, and AI processing.
- **Matching Results:** Display the result returned by the n8n workflow.
- **Responsive Interface:** A modern dark-themed interface designed for different screen sizes.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Website structure and report form |
| CSS | Styling and responsive layout |
| JavaScript | Form handling and communication with the webhook |
| n8n | Workflow automation and integration |
| Google Sheets | Report storage in the project workflow |
| AI model | Comparison of report details and match suggestions |
| GitHub Pages | Free static website hosting |

## ⚙️ How It Works

1. A user selects whether they lost an item or found one.
2. The user enters the item's details and submits the report.
3. JavaScript creates a report ID and sends the report as JSON to the n8n production webhook.
4. The n8n workflow processes the incoming report and connects to the report dataset.
5. The AI matching step compares relevant existing reports and suggests plausible matches.
6. The workflow returns a result to the frontend.
7. FindIt displays the result so the user can review it and verify any suggested match.

## 📁 Project Structure

```text
findit-smart-lost-found/
├── index.html    # Website structure and report form
├── style.css     # Website design and responsive styling
├── script.js     # Form handling and n8n integration
└── README.md     # Project documentation
```

## 🚀 Setup and Usage

### 1. Run the frontend

Download or clone this repository. Open `index.html` in a browser to view the interface.

For testing the webhook connection, use a local development server or host the frontend on GitHub Pages. Browser security and CORS settings can affect requests made directly from a local file.

### 2. Configure the n8n connection

The frontend sends submissions to the webhook URL defined by `WEBHOOK_URL` in `script.js`.

To connect your own workflow:

1. Create or open an n8n workflow with a Webhook node configured to receive `POST` requests.
2. Connect the workflow to your report storage and AI matching steps.
3. Configure the workflow to return a JSON response containing a `matchResult` field.
4. Set the correct production webhook URL in `script.js`.
5. Activate the workflow and check that browser requests are permitted by its CORS configuration.

Do not put AI API keys, passwords, or other private credentials in frontend files. Keep those credentials inside n8n.

### 3. Deploy with GitHub Pages

1. Push the project files to a GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under the build and deployment settings, select **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder.
5. Save the settings and wait for deployment to complete.

GitHub Pages will provide a public URL for the website.

## 🔒 Privacy and Limitations

- This is a student prototype, not a production-grade lost-and-found service.
- Submitted reports may be stored in the connected dataset.
- The optional contact email is included in the report sent to the workflow.
- Do not submit passwords, sensitive personal information, or real private contact details in public demonstrations.
- The frontend does not upload images or file attachments.
- A public frontend exposes its JavaScript and webhook URL. Protect the workflow against unwanted submissions and avoid exposing private credentials.
- Matching results depend on the submitted information, available records, and AI output.
- Users must independently verify potential matches before taking action.

## 🎓 Project Purpose

FindIt demonstrates how a simple frontend can work with workflow automation, a data source, and AI-assisted decision support to solve a practical everyday problem.

**Project type:** Student prototype  
**Project name:** FindIt — Smart Lost & Found Matcher

---

*Built as an educational project exploring web development, workflow automation, and AI-assisted matching.*
