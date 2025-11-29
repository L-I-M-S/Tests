/* ==============
   Reset & Base
   ============== */
*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --bg: #f3f4fb;
    --bg-elevated: #ffffff;
    --text-main: #111827;
    --text-muted: #6b7280;
    --accent: #0f766e;
    --accent-soft: #e0f2f1;
    --accent-strong: #115e59;
    --danger: #e11d48;
    --border-subtle: #e5e7eb;
    --shadow-soft: 0 18px 40px rgba(15, 23, 42, 0.12);
    --radius-lg: 24px;
    --radius-md: 18px;
    --radius-pill: 999px;
    --transition-fast: 0.18s ease-out;
    --transition-med: 0.28s ease;
    --surface-tint: rgba(255, 255, 255, 0.85);
}

html, body {
    height: 100%;
}

body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background: radial-gradient(circle at top, #e0f2fe 0, #f3f4fb 45%, #fdf2f8 100%);
    color: var(--text-main);
    line-height: 1.6;
    display: flex;
    flex-direction: column;
}

/* Links */
a {
    color: #2563eb;
    text-decoration: none;
}

a:hover,
a:focus-visible {
    text-decoration: underline;
    outline: none;
}

/* ==============
   Modal
   ============== */
.modal {
    display: none;
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(6px);
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
}

.modal-content {
    background-color: #fff;
    padding: 1.8rem 2rem;
    border-radius: 20px;
    max-width: 480px;
    width: 100%;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.6);
}

.modal-content h2 {
    font-size: 1.5rem;
    margin-bottom: 0.6rem;
}

.modal-content p {
    font-size: 0.95rem;
    color: var(--text-muted);
}

.modal-content button {
    margin-top: 1.1rem;
}

/* ==============
   Hero / Header
   ============== */
.hero {
    background: radial-gradient(circle at top left, #eff6ff, #ecfdf5 45%, #fdf2f8 100%);
    padding: 1.5rem 1rem 2.2rem;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.16);
}

.hero-shell {
    max-width: 1120px;
    margin: 0 auto;
}

.hero-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.75rem;
    gap: 1rem;
}

/* Brand */
.brand {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.brand-logo {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    background: conic-gradient(from 140deg, #0f766e, #22c55e, #0ea5e9, #0f766e);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f9fafb;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.4);
}

.brand-text {
    display: flex;
    flex-direction: column;
}

.brand-text span:first-child {
    font-weight: 600;
    letter-spacing: 0.03em;
    font-size: 0.95rem;
    color: #020617;
}

.brand-text span:last-child {
    font-size: 0.8rem;
    color: var(--text-muted);
}

/* Crisis link */
.crisis-link {
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background-color: #b91c1c;
    padding: 0.55rem 1rem;
    border-radius: var(--radius-pill);
    transition: background-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
    box-shadow: 0 14px 32px rgba(185, 28, 28, 0.4);
}

.crisis-link:hover,
.crisis-link:focus-visible {
    background-color: #991b1b;
    transform: translateY(-1px);
    outline: none;
}

/* Hero main layout */
.hero-main {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: center;
}

.hero-copy h1 {
    font-size: clamp(2.1rem, 3vw, 2.7rem);
    font-weight: 700;
    margin-bottom: 0.6rem;
    letter-spacing: -0.03em;
    color: #020617;
}

.hero-copy p {
    font-size: 0.98rem;
    max-width: 32rem;
    color: var(--text-muted);
}

/* Hero bullet points */
.hero-points {
    list-style: none;
    margin-top: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.88rem;
}

.hero-points li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: #111827;
}

.hero-points i {
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background-color: rgba(15, 118, 110, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-strong);
    font-size: 0.75rem;
}

/* Hero actions */
.hero-actions {
    margin-top: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.hero-note {
    margin-top: 1.1rem;
    font-size: 0.8rem;
    color: var(--text-muted);
}

/* Hero visual / images */
.hero-visual {
    position: relative;
}

.hero-image-wrapper {
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 22px 50px rgba(15, 23, 42, 0.4);
    border: 1px solid rgba(148, 163, 184, 0.35);
}

.hero-image {
    width: 100%;
    display: block;
    height: auto;
    transform: scale(1.02);
    object-fit: cover;
    transition: transform 0.6s ease-out, filter 0.3s ease-out;
}

.hero-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, rgba(15, 23, 42, 0.15), rgba(15, 118, 110, 0.25));
    mix-blend-mode: multiply;
}

.hero-image-wrapper:hover .hero-image {
    transform: scale(1.05);
}

/* Overlay card */
.hero-overlay-card {
    position: absolute;
    bottom: 6%;
    left: 6%;
    right: 6%;
    background-color: rgba(255, 255, 255, 0.97);
    border-radius: 16px;
    padding: 0.9rem 1rem;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.5);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.hero-overlay-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
}

.hero-pill {
    padding: 0.1rem 0.6rem;
    border-radius: 999px;
    background-color: rgba(15, 118, 110, 0.08);
    color: var(--accent-strong);
    font-weight: 600;
}

.hero-overlay-sub {
    color: var(--text-muted);
}

.hero-overlay-main {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

.mini-progress-text p:first-child {
    font-size: 0.9rem;
    font-weight: 600;
    color: #020617;
}

.mini-progress-text p:last-child {
    font-size: 0.78rem;
    color: var(--text-muted);
}

.daily-quote {
    font-size: 0.82rem;
    color: #047857;
    margin-top: 0.2rem;
}

/* Progress rings in hero & dashboard */
.progress-ring {
    transform: rotate(-90deg);
}

.small-ring .progress-ring-bg {
    stroke-width: 8;
}

.progress-ring-bg {
    fill: none;
    stroke: #e2e8f0;
    stroke-width: 8;
}

.progress-ring-fill {
    fill: none;
    stroke: #22c55e;
    stroke-width: 8;
    stroke-dasharray: 201.06;
    stroke-dashoffset: 201.06;
    transition: stroke-dashoffset 0.5s ease-out;
}

.progress-ring-bg-main {
    fill: none;
    stroke: #e2e8f0;
    stroke-width: 10;
}

.progress-ring-fill-main {
    fill: none;
    stroke: #22c55e;
    stroke-width: 10;
    stroke-dasharray: 377;
    stroke-dashoffset: 377;
    transition: stroke-dashoffset 0.5s ease-in-out;
}

/* ==============
   Buttons
   ============== */
button {
    background-color: var(--accent);
    color: #f9fafb;
    border: none;
    padding: 0.65rem 1.1rem;
    border-radius: var(--radius-pill);
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
    font-family: inherit;
}

button:hover,
button:focus-visible {
    background-color: var(--accent-strong);
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.25);
    transform: translateY(-1px);
    outline: none;
}

button:disabled {
    background-color: #cbd5e1;
    cursor: default;
    box-shadow: none;
    transform: none;
}

/* Primary / secondary hero buttons */
.btn-primary {
    background: radial-gradient(circle at top left, #22c55e, #0f766e);
    color: #f9fafb;
    box-shadow: 0 18px 40px rgba(15, 118, 110, 0.5);
}

.btn-primary:hover,
.btn-primary:focus-visible {
    transform: translateY(-1px);
    filter: brightness(1.03);
    box-shadow: 0 22px 50px rgba(15, 23, 42, 0.5);
}

.btn-secondary {
    background-color: var(--surface-tint);
    color: var(--accent-strong);
    border-radius: var(--radius-pill);
    border: 1px solid rgba(148, 163, 184, 0.7);
    backdrop-filter: blur(3px);
    transition:
        background-color var(--transition-fast),
        transform var(--transition-fast),
        border-color var(--transition-fast);
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
    background-color: #e0f2f1;
    border-color: var(--accent);
    transform: translateY(-1px);
}

/* Secondary section-level button */
.secondary-section-btn {
    margin-top: 0.4rem;
}

/* ==============
   Tabs
   ============== */
.tabs-wrapper {
    max-width: 1120px;
    margin: 1.5rem auto 0;
    padding: 0 1rem;
}

.tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto 1rem;
    background-color: rgba(255, 255, 255, 0.98);
    border-radius: 999px;
    padding: 0.4rem;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
    border: 1px solid rgba(226, 232, 240, 0.9);
    gap: 0.25rem;
}

.tab-btn {
    background: none;
    border: none;
    padding: 0.55rem 0.9rem;
    font-size: 0.88rem;
    font-weight: 500;
    color: #4b5563;
    cursor: pointer;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition:
        background-color var(--transition-fast),
        color var(--transition-fast),
        transform var(--transition-fast);
}

.tab-btn i {
    font-size: 0.9rem;
}

.tab-btn:hover,
.tab-btn:focus-visible {
    color: var(--accent-strong);
    background-color: #ecfdf5;
    outline: none;
    transform: translateY(-1px);
}

.tab-btn.active {
    background: linear-gradient(135deg, #22c55e, #0f766e);
    color: #f9fafb;
    box-shadow: 0 14px 30px rgba(15, 118, 110, 0.6);
}

/* ==============
   Main Layout & Sections
   ============== */
main {
    max-width: 1120px;
    margin: 0 auto 2.5rem;
    padding: 0 1rem;
    flex: 1;
    width: 100%;
}

.tab-content {
    display: none;
    background-color: var(--bg-elevated);
    padding: 1.8rem 1.7rem 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
    border: 1px solid rgba(226, 232, 240, 0.9);
    animation: fadeIn 0.4s ease;
    margin-bottom: 1.8rem;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Titles & text */
h2 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: #020617;
}

h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
    color: #020617;
}

p {
    font-size: 0.95rem;
    color: var(--text-muted);
}

/* Section header with image */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.3rem;
}

.section-illustration {
    width: 220px;
    max-width: 40%;
    border-radius: 18px;
    object-fit: cover;
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.22);
    border: 1px solid rgba(148, 163, 184, 0.35);
}

/* Fade helper (used by JS) */
.fade {
    opacity: 0.3;
    transition: opacity 0.4s ease;
}

/* ==============
   Dashboard
   ============== */
.dashboard-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: 1.4rem;
}

.dashboard-main {
    display: flex;
    flex-direction: column;
}

.dashboard-progress {
    text-align: center;
    margin: 1.2rem 0 1.6rem;
}

#progress-text-main {
    margin-top: 0.5rem;
    font-weight: 500;
    color: #020617;
}

/* Quick actions */
.quick-actions {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
}

.quick-actions button {
    flex: 1;
}

/* Dashboard side cards */
.dashboard-side {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.dash-card {
    background-color: #f9fafb;
    padding: 1rem 1.05rem;
    border-radius: 18px;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.95);
}

.dash-card p {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
}

/* Dashboard image card */
.dash-card-image {
    padding: 0;
    overflow: hidden;
}

.dash-image-wrapper {
    border-radius: 18px 18px 0 0;
    overflow: hidden;
    position: relative;
    max-height: 190px;
}

.dash-card-image img {
    width: 100%;
    display: block;
    object-fit: cover;
}

.dash-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.35));
}

.dash-image-text {
    padding: 0.8rem 1rem 1rem;
}

/* Small streak label */
.small-streak {
    font-size: 0.88rem;
}

/* ==============
   Breathing
   ============== */
.breathing-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 1.4rem;
    align-items: center;
    margin-top: 0.8rem;
}

.breathing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;
}

#breathing-circle {
    width: 180px;
    height: 180px;
    background: radial-gradient(circle at 30% 20%, #e0f2fe, #0ea5e9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 4s ease-in-out;
    box-shadow: 0 26px 60px rgba(37, 99, 235, 0.45);
}

.circle-inner {
    width: 140px;
    height: 140px;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.7);
}

.breathing-text {
    font-size: 1.05rem;
    font-weight: 500;
    color: #1d4ed8;
    margin-top: 1rem;
    text-align: center;
}

/* Breathing controls */
.breathing-controls {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
}

.progress-bar {
    width: 100%;
    height: 6px;
    background-color: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
}

#breathing-progress,
#mindfulness-progress {
    height: 100%;
    width: 0;
    background: linear-gradient(to right, #0ea5e9, #22c55e);
    transition: width 0.3s ease-in-out;
}

.streak-counter {
    font-size: 0.95rem;
    font-weight: 500;
    color: #111827;
}

/* ==============
   Grounding
   ============== */
.grounding-display {
    font-size: 1rem;
    font-weight: 500;
    color: #111827;
    margin-bottom: 0.7rem;
    min-height: 2.2em;
}

.grounding-inputs {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
}

/* Textareas */
textarea {
    width: 100%;
    padding: 0.9rem 1rem;
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    font-size: 0.9rem;
    resize: vertical;
    min-height: 110px;
    background-color: #f9fafb;
    transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        background-color var(--transition-fast);
}

textarea:focus-visible {
    border-color: var(--accent);
    outline: none;
    box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.25);
    background-color: #ffffff;
}

/* Errors */
.error-message {
    color: var(--danger);
    font-size: 0.82rem;
    margin-top: 0.35rem;
    min-height: 1.2em;
}

/* History */
.history-container {
    max-height: 320px;
    overflow-y: auto;
    margin-top: 1.4rem;
    padding-right: 0.1rem;
}

.history-container h3 {
    margin-bottom: 0.4rem;
}

.history-entry {
    background-color: #f9fafb;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    margin-bottom: 0.7rem;
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.95);
    font-size: 0.88rem;
}

.history-entry ul {
    list-style-type: disc;
    padding-left: 1.5rem;
}

/* ==============
   Mood Tracker
   ============== */
.mood-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
    gap: 1.4rem;
    margin-top: 0.8rem;
}

.mood-log {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.mood-emojis {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-bottom: 0.2rem;
}

.mood-emojis label {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    background-color: #f9fafb;
    padding: 0.45rem 0.7rem;
    border-radius: 999px;
    border: 1px solid rgba(209, 213, 219, 0.9);
    cursor: pointer;
    font-size: 0.85rem;
    color: #111827;
    transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast);
}

.mood-emojis span {
    font-size: 1.4rem;
}

.mood-emojis input {
    display: none;
}

.mood-emojis input:checked + span,
.mood-emojis label:hover span {
    transform: scale(1.12);
}

.mood-emojis label:hover,
.mood-emojis label:focus-within {
    background-color: #eff6ff;
    border-color: #3b82f6;
    transform: translateY(-1px);
}

.mood-chart-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

#mood-chart {
    background-color: #ffffff;
    border-radius: 14px;
    padding: 0.6rem;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.95);
}

/* ==============
   CBT
   ============== */
.cbt-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.1fr);
    gap: 1.4rem;
    margin-top: 0.8rem;
}

.cbt-form {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.cbt-form label {
    font-size: 0.88rem;
    font-weight: 500;
    color: #0f172a;
}

/* ==============
   Gratitude
   ============== */
.gratitude-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.1fr);
    gap: 1.4rem;
    margin-top: 0.8rem;
}

.gratitude-form {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

/* ==============
   Mindfulness
   ============== */
.mindfulness-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.1fr);
    gap: 1.4rem;
    margin-top: 0.8rem;
    align-items: center;
}

.mindfulness-container {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.mindfulness-text {
    font-size: 1rem;
    font-weight: 500;
    color: #1d4ed8;
}

/* ==============
   Resources
   ============== */
.resource-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 0.9rem;
}

.resource-item {
    background-color: #f9fafb;
    padding: 1rem 1.1rem 1.1rem;
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(226, 232, 240, 0.95);
    font-size: 0.92rem;
}

.resource-item h3 {
    margin-bottom: 0.35rem;
    font-size: 1rem;
}

.resource-item a {
    font-size: 0.86rem;
    font-weight: 600;
}

/* ==============
   Crisis
   ============== */
.crisis-resources {
    margin-top: 1rem;
    background-image:
        linear-gradient(to bottom, rgba(248, 250, 252, 0.96), rgba(254, 242, 242, 0.98));
    background-color: #fef2f2;
    padding: 1.4rem 1.4rem;
    border-radius: 18px;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.2);
    border: 1px solid rgba(254, 226, 226, 0.9);
}

.crisis-resources p {
    margin-bottom: 0.45rem;
    color: #7f1d1d;
}

.crisis-resources strong {
    color: #7f1d1d;
}

.crisis-resources a {
    color: #b91c1c;
    font-weight: 600;
}

/* ==============
   Footer
   ============== */
footer {
    text-align: center;
    padding: 1.6rem 1rem 2rem;
    font-size: 0.82rem;
    color: var(--text-muted);
    background-color: rgba(255, 255, 255, 0.95);
    border-top: 1px solid rgba(226, 232, 240, 0.9);
    margin-top: auto;
}

footer a {
    color: #2563eb;
}

footer a:hover,
footer a:focus-visible {
    text-decoration: underline;
    outline: none;
}

/* ==============
   Responsive
   ============== */
@media (max-width: 960px) {
    .hero-main {
        grid-template-columns: minmax(0, 1fr);
    }

    .hero-overlay-card {
        position: static;
        margin-top: 0.75rem;
    }

    .dashboard-grid {
        grid-template-columns: minmax(0, 1fr);
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .section-illustration {
        max-width: 100%;
        width: 100%;
        order: -1;
    }

    .breathing-layout,
    .mood-layout,
    .cbt-grid,
    .gratitude-grid,
    .mindfulness-layout {
        grid-template-columns: minmax(0, 1fr);
    }

    .resource-list {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 720px) {
    .hero-top {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.7rem;
    }

    .tabs {
        border-radius: 18px;
    }

    .tab-btn {
        font-size: 0.82rem;
    }

    .tab-content {
        padding: 1.4rem 1.3rem 1.6rem;
    }

    .history-container {
        max-height: none;
    }

    main {
        margin-bottom: 1.7rem;
    }

    .hero {
        padding-bottom: 1.6rem;
    }
}

@media (max-width: 560px) {
    .quick-actions {
        flex-direction: column;
    }

    .resource-list {
        grid-template-columns: minmax(0, 1fr);
    }

    .hero-main {
        gap: 1.4rem;
    }
}
 
