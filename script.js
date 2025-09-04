/* Tab Navigation */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

/* Breathing Exercise */
const breathingCircle = document.getElementById('breathing-circle');
const breathingInstruction = document.getElementById('breathing-instruction');
const startBreathingBtn = document.getElementById('start-breathing');
const breathingProgress = document.getElementById('breathing-progress');
let breathingAnimation;
let isBreathing = false;
const cycleDuration = 12000; // 4s inhale, 4s hold, 4s exhale

function startBreathing() {
    if (isBreathing) {
        cancelAnimationFrame(breathingAnimation);
        breathingCircle.style.transform = 'scale(1)';
        breathingInstruction.textContent = 'Ready to begin?';
        startBreathingBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        breathingProgress.style.width = '0%';
        isBreathing = false;
        return;
    }

    isBreathing = true;
    startBreathingBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';
    let startTime = performance.now();

    function animate(time) {
        const elapsed = (time - startTime) % cycleDuration;
        const progress = (elapsed / cycleDuration) * 100;
        breathingProgress.style.width = `${progress}%`;

        if (elapsed < 4000) {
            // Inhale
            breathingInstruction.textContent = 'Breathe In...';
            const scale = 1 + (0.5 * (elapsed / 4000));
            breathingCircle.style.transform = `scale(${scale})`;
        } else if (elapsed < 8000) {
            // Hold
            breathingInstruction.textContent = 'Hold...';
            breathingCircle.style.transform = 'scale(1.5)';
        } else {
            // Exhale
            breathingInstruction.textContent = 'Breathe Out...';
            const scale = 1.5 - (0.5 * ((elapsed - 8000) / 4000));
            breathingCircle.style.transform = `scale(${scale})`;
        }

        breathingAnimation = requestAnimationFrame(animate);
    }

    breathingAnimation = requestAnimationFrame(animate);
}

startBreathingBtn.addEventListener('click', startBreathing);

/* Grounding Exercise */
const groundingStep = document.getElementById('grounding-step');
const groundingResponse = document.getElementById('grounding-response');
const submitResponseBtn = document.getElementById('submit-response');
const startGroundingBtn = document.getElementById('start-grounding');
const groundingHistory = document.getElementById('grounding-history');
const groundingSteps = [
    { prompt: 'Name 5 things you can see.', count: 5 },
    { prompt: 'Name 4 things you can touch.', count: 4 },
    { prompt: 'Name 3 things you can hear.', count: 3 },
    { prompt: 'Name 2 things you can smell.', count: 2 },
    { prompt: 'Name 1 thing you can taste.', count: 1 }
];
let currentStep = -1;
let responses = [];

// Load saved grounding sessions from localStorage
let groundingSessions = JSON.parse(localStorage.getItem('groundingSessions')) || [];
groundingSessions.forEach(session => appendSessionToHistory(session));

function appendSessionToHistory(session) {
    const entry = document.createElement('div');
    entry.classList.add('history-entry');
    entry.innerHTML = `<p><strong>${session.timestamp}</strong></p><ul>${session.responses.map(r => `<li>${r.prompt}: ${r.response}</li>`).join('')}</ul>`;
    groundingHistory.appendChild(entry);
}

startGroundingBtn.addEventListener('click', () => {
    if (currentStep === -1) {
        // Start new session
        currentStep = 0;
        responses = [];
        groundingResponse.value = '';
        startGroundingBtn.innerHTML = '<i class="fas fa-forward"></i> Next';
        submitResponseBtn.disabled = false;
        displayStep();
    } else if (currentStep < groundingSteps.length) {
        // Already in progress, but button is for reset after finish
    } else {
        // Reset
        currentStep = -1;
        groundingStep.innerHTML = '';
        groundingResponse.value = '';
        startGroundingBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        submitResponseBtn.disabled = true;
    }
});

function displayStep() {
    if (currentStep < groundingSteps.length) {
        groundingStep.textContent = groundingSteps[currentStep].prompt;
        groundingResponse.placeholder = `List ${groundingSteps[currentStep].count} items separated by commas...`;
    } else {
        // Finish
        const timestamp = new Date().toLocaleString();
        const session = { timestamp, responses };
        groundingSessions.push(session);
        localStorage.setItem('groundingSessions', JSON.stringify(groundingSessions));
        appendSessionToHistory(session);
        groundingStep.textContent = 'Well done! Session complete.';
        startGroundingBtn.innerHTML = '<i class="fas fa-redo"></i> Restart';
        submitResponseBtn.disabled = true;
    }
}

submitResponseBtn.addEventListener('click', () => {
    const response = groundingResponse.value.trim();
    if (response) {
        responses.push({ prompt: groundingSteps[currentStep].prompt, response });
        currentStep++;
        groundingResponse.value = '';
        displayStep();
    }
});

groundingResponse.addEventListener('input', () => {
    submitResponseBtn.disabled = !groundingResponse.value.trim();
});

/* Mood Tracker */
const moodRadios = document.querySelectorAll('input[name="mood"]');
const moodNotes = document.getElementById('mood-notes');
const logMoodBtn = document.getElementById('log-mood');
const moodChartCanvas = document.getElementById('mood-chart');
const moodHistory = document.getElementById('mood-history');
const ctx = moodChartCanvas.getContext('2d');

// Load saved moods from localStorage
let moods = JSON.parse(localStorage.getItem('moods')) || [];
updateChart();
updateHistory();

function getMoodEmoji(value) {
    const emojis = {1: '😢', 2: '🙁', 3: '😐', 4: '🙂', 5: '😊'};
    return emojis[value];
}

function updateChart() {
    if (window.moodChart) window.moodChart.destroy();
    window.moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: moods.map(m => new Date(m.timestamp).toLocaleDateString()),
            datasets: [{
                label: 'Mood Trend',
                data: moods.map(m => m.value),
                borderColor: '#3182ce',
                backgroundColor: 'rgba(49, 130, 206, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: 0.5,
                    max: 5.5,
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function appendToHistory(mood) {
    const entry = document.createElement('div');
    entry.classList.add('history-entry');
    entry.innerHTML = `
        <p><strong>${new Date(mood.timestamp).toLocaleString()}</strong> - ${getMoodEmoji(mood.value)} (${mood.value}/5)</p>
        ${mood.notes ? `<p>${mood.notes}</p>` : ''}
    `;
    moodHistory.appendChild(entry);
}

function updateHistory() {
    moodHistory.innerHTML = '<h3>Past Entries</h3>';
    moods.forEach(appendToHistory);
}

logMoodBtn.addEventListener('click', () => {
    const selectedMood = document.querySelector('input[name="mood"]:checked');
    if (!selectedMood) return;

    const moodValue = parseInt(selectedMood.value);
    const notes = moodNotes.value.trim();
    const timestamp = new Date().toISOString();
    const newMood = { value: moodValue, notes, timestamp };
    moods.push(newMood);
    localStorage.setItem('moods', JSON.stringify(moods));

    updateChart();
    appendToHistory(newMood);
    moodNotes.value = '';

    // Reset radios
    moodRadios.forEach(r => r.checked = false);
    logMoodBtn.disabled = true;
});

moodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        logMoodBtn.disabled = false;
    });
});
