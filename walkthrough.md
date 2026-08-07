# Walkthrough - Portfolio Updates

We have successfully replaced all the placeholder details in the portfolio with the information from your CV, uploaded your marksheets, and implemented a dedicated **Internships** section along with a premium **Day/Night Theme Toggle** and **enhanced layout aesthetics**.

## Changes Made

### 1. High-Fidelity Layout Enhancements [NEW DESIGN]
- **Backdrop Grid:** Added an engineering grid pattern background (`.bg-grid-pattern`) to the body of the page to give a professional developer workstation environment.
- **Ambient Header Glows:** Integrated radial soft-glow backdrops (`.gradient-glow`) behind the primary headers to draw visual focus.
- **Text Gradients:** Styled the hero introduction header (`Md Tafsheen`) using an elegant linear color gradient.
- **Micro-interactions:** Configured CSS-based link underlines (`.nav-link-underline`) that slide open dynamically on menu hover, along with custom scrollbar tracking.

### 2. Day/Night Mode Theme Toggle [NEW FEATURE]
- **Implemented a floating Neo-Brutalist Theme Toggle button** (`#theme-toggle`) in [index.html](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/index.html) that transitions from Sun (yellow) to Moon (deep purple/indigo).
- **Added CSS theme overrides** to switch all card backgrounds, text, thick borders, brutalist hard shadows, and the PDF modal colors dynamically when `.dark` is applied to the root element.
- **Added JavaScript events** in [script.js](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/script.js) with state persistence (`localStorage`) to load the saved preference automatically on page refresh.

### 3. Internships Section Implementation [NEW FEATURE]
- **Created a new schema and model** `Internship` in both [server.js](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/server.js) and [seed.js](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/seed.js).
- **Added a new `<section id="internships">`** block inside [index.html](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/index.html) (below the Education section) and added a link to it in the main header navigation menu.
- **Implemented `renderInternships()`** in [script.js](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/script.js) to render your internships dynamically in the same beautiful cards styling as the education milestones.
- **Created PDF Certificates Integration:** Added certificates for both internships. The "VIEW CERTIFICATE" button triggers the portfolio's modal window to view the PDF files smoothly.

### 3. Profile Photo & Academic/Certificate Files Uploaded
- **Uploaded** your profile picture:
  - Set as [profile_avatar.png](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/profile_avatar.png) to display on the home screen.
- **Copied** PDF files from your Downloads folder to the project asset documents folder:
  - `kkaif khan.pdf` -> [cv_tafsheen.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/cv_tafsheen.pdf)
  - `dlt internship certificate.pdf` -> [certificate_deloitte.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/certificate_deloitte.pdf)
  - `JP MORGAN.pdf` -> [certificate_jpmorgan.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/certificate_jpmorgan.pdf)
  - `high school marksheet.pdf` -> [marksheet_10th.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/marksheet_10th.pdf)
  - `12th marksheet.pdf` -> [marksheet_12th.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/marksheet_12th.pdf)
  - `marksheet_graduation.pdf.pdf` -> [marksheet_graduation.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/marksheet_graduation.pdf)
  - `hack hathon certificate.pdf` -> [certificate_techblitz.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/certificate_techblitz.pdf)
  - `ibm data science certi.pdf` -> [certificate_datascience.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/certificate_datascience.pdf)
  - `ibm prompt.pdf` -> [certificate_promptengineering.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/certificate_promptengineering.pdf)
  - `IBM machine learning ML0104EN Certificate _ Cognitive Class.pdf` -> [certificate_machinelearning.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/certificate_machinelearning.pdf)
  - `certificate of talk.pdf` -> [certificate_founderstalk.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/certificate_founderstalk.pdf)
  - `AI-kaif alok 2nd patent(KAIF FULLY FINAL).pdf` -> [patent_soilhealth.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/patent_soilhealth.pdf)
  - `AI-kaif, ravi,alok, rhber, soumendu(KAIF  FULLY COMPLETE  ).pdf` -> [patent_selfhealingwing.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/patent_selfhealingwing.pdf)
  - `AI-velocity(FULLY DONE ) (1).pdf` -> [patent_velocitybioplant.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/patent_velocitybioplant.pdf)
  - `Fake-News-Text-Classification-Using-Machine-Learning.pdf` -> [research_fakenews.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/research_fakenews.pdf)
  - `Capstone report.pdf` -> [research_socialmediahealth.pdf](file:///c:/Users/ACER/Downloads/Tafsheen_portfolio-main/Tafsheen_portfolio-main/public/assets/documents/research_socialmediahealth.pdf)

### 3. Database Seeding & Fallback Data
- **Updated** seed files to drop, seed, and backup the newly added `Internship` collection.
- **Moved** virtual internships out of "Experience" and into the dedicated "Internship" section.
- **Added** your 10th Grade education milestones (with score of **81.16%**).
- **Added** the JP Morgan and Deloitte certificates to the **Certificates** list for duplicate visibility in both sections.
- **Added** 3 Patent records to the Patents list (AI Soil Immune Health, Self-Healing Aircraft Wing, Velocity-Responsive Illumination).
- **Added** 2 Research papers to the Research list (Fake News Text Classification, Social Media Impact on Mental Health).
- **Linked** the *Archify AI* project card directly to your official GitHub repository (`https://github.com/iamkaifmd/Archify.ai`).
- **Added** the *DebugGPT* project card (linked to `https://github.com/Deepesh055/DEBUG-GPT`) with custom illustrations.
- **Added** the *AI Resume Analyzer* project card (linked to `https://github.com/iamkaifmd/AI-resume-`) with custom illustrations.
- **Swapped** your general GitHub profile link across the site from `https://github.com/kaif9628` to `https://github.com/iamkaifmd`.
- **Integrated** a **LeetCode** icon and link (`https://leetcode.com/u/Mr_khan96/`) inside your social handles footer grid next to LinkedIn.
- **Added** 4 new tools to your toolkit block: **IBM SPSS Modeler**, **IBM Cognos Analytics**, **Java IDE**, and **IoT IDE (Arduino)**.
- **Updated** the **About Me** bio statement and stats blocks to accurately show 5+ Projects, 7+ Certificates, 3 Patents, and 2 Research Papers.

---

## Validation Results

- **Database Seed Execution:**
  - Ran `node seed.js`. 
  - Result: Successfully saved static fallback file `public/assets/data.json` containing the updated CV, education, internship, patents, and research data.
- **Server Startup:**
  - Started the server locally with `node server.js`.
  - Result: Express server is running on `http://localhost:8000`.

> [!NOTE]
> The automated browser test was unable to execute due to a Playwright library download error (404 from Playwright's CDN). However, the local server is actively running!
