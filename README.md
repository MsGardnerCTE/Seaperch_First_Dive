# SeaPerch First Dive: Build, Balance & Pilot

A browser-based introduction to SeaPerch for middle school students. Includes a component guide, buoyancy adjustment demonstration, virtual controller, 20 practice questions, and five badges.

Suggested GitHub repository name: `seaperch-first-dive`.

## Publish with GitHub Pages

1. Unzip the download on your computer.
2. Create a GitHub repository named `seaperch-first-dive`. A public repository is the simplest option for GitHub Pages on a free GitHub account.
3. Open the repository and choose **Add file → Upload files**.
4. Open the extracted `seaperch-first-dive` folder. Upload its contents so `index.html`, `styles.css`, `app.js`, and `README.md` are directly in the repository root. Do not upload only the ZIP or nest the entire folder inside the repository.
5. Commit the uploaded files.
6. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then choose your default branch (usually `main`) and **/(root)**. Save.
7. Wait for GitHub to finish deployment. Open the published URL shown in Pages settings and share it with students. No student GitHub accounts are required.

GitHub labels and account options may change. Your repository Pages settings show the available publishing choices.

## Test before publishing

Double-click `index.html` to open it in a modern browser. It uses only local HTML, CSS, JavaScript, and original inline SVG illustrations. No installation, build step, dependencies, API keys, or internet connection is needed to play. The manual link requires internet access.

## Classroom flow

1. Explore ten components.
2. Complete Level 1: Parts Expert.
3. The learning lab opens automatically before Level 2. Explore buoyancy, then controller operation and steering. Select Return to challenge.
4. Complete Level 2: Float & Pilot, followed by Frame Planner, Problem Solver, and Build Ready.
5. Use the exit discussion and identify actual kit components.

Allow about 25 to 35 minutes. No timer. Incorrect answers provide a hint and allow retries. Guides remain accessible. Students earn all five badges by completing all 20 questions correctly, with practice as needed.

## Teaching notes

- Target slightly positive buoyancy: a slow rise when released underwater with motors off.
- Distinguish buoyancy from trim. A level ROV can still have excess buoyancy.
- Demonstrations are conceptual, not quantitative physics simulations.
- Steering assumes rear-facing horizontal thrusters with equal performance. Actual switch directions must be verified on the assembled ROV.
- Rise and Dive controls are conceptual labels, not a diagram of physical button positions.
- Actual movement depends on construction, thruster placement, water conditions, and tether drag.
- Use teacher instruction and the actual manual for tools, wiring, waterproofing, and physical testing.

Reference: [RoboNation SeaPerch Build Manual (2021)](https://robonation.org/app/uploads/sites/5/2021/08/SeaPerch-Build-Manual-2021.pdf), printed pages 69–72.

## Editing

- `index.html`: student guides and page structure.
- `styles.css`: appearance and responsive layout.
- `app.js`: illustrations, questions, explanations, lab controls, and challenge behavior.
- `.nojekyll`: tells GitHub Pages to serve the static files without Jekyll processing.

Each `add(...)` call in `app.js` defines a question: level (zero-based), illustration key, question, three choices, correct choice (zero-based), explanation, and retry hint. Keep tasks grouped by level. If changing the number of tasks, also update the progress maximum and instructional counts in `index.html`.

## Privacy and accessibility

The app collects no student names or results, makes no analytics requests, and stores no browser progress. Refreshing resets the session. Hosting providers may maintain ordinary access logs. Controls support keyboards; feedback is announced through live regions; the layout adapts to phones; animations respect reduced-motion preferences.

This is an independent classroom activity, not an official RoboNation product. No official logos, photographs, or manual images are included.

The published student interface does not include a Teacher guide tab or teacher-only section. Teaching notes remain in this README for the person managing the repository.
