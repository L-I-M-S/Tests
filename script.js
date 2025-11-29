document.addEventListener('DOMContentLoaded', () => {
    // =========
    // Basic state & dates
    // =========
    const today = new Date().toDateString();

    let breathingStreak = parseInt(localStorage.getItem('breathingStreak')) || 0;
    let moodStreak = parseInt(localStorage.getItem('moodStreak')) || 0;
    let gratitudeStreak = parseInt(localStorage.getItem('gratitudeStreak')) || 0;
    let mindfulnessStreak = parseInt(localStorage.getItem('mindfulnessStreak')) || 0;

    let lastBreathingDate = localStorage.getItem('lastBreathingDate');
    let lastMoodDate = localStorage.getItem('lastMoodDate');
    let lastGratitudeDate = localStorage.getItem('lastGratitudeDate');
    let lastMindfulnessDate = localStorage.getItem('lastMindfulnessDate');

    if (lastBreathingDate !== today) breathingStreak = 0;
    if (lastMoodDate !== today) moodStreak = 0;
    if (lastGratitudeDate !== today) gratitudeStreak = 0;
    if (lastMindfulnessDate !== today) mindfulnessStreak = 0;

    function setStreak(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    setStreak('breathing-streak', breathingStreak);
    setStreak('mood-streak', moodStreak);
    setStreak('gratitude-streak', gratitudeStreak);
    setStreak('mindfulness-streak', mindfulnessStreak);

    setStreak('dash-breathing-streak', breathingStreak);
    setStreak('dash-mood-streak', moodStreak);
    setStreak('dash-gratitude-streak', gratitudeStreak);
    setStreak('dash-mindfulness-streak', mindfulnessStreak);

    // =========
    // Onboarding modal
    // =========
    const onboardingModal = document.getElementById('onboarding-modal');
    const closeOnboardingBtn = document.getElementById('close-onboarding');
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

    if (!hasSeenOnboarding && onboardingModal) {
        onboardingModal.style.display = 'flex';
        localStorage.setItem('hasSeenOnboarding', 'true');
    }

    function closeOnboarding() {
        if (onboardingModal) onboardingModal.style.display = 'none';
    }

    if (closeOnboardingBtn) {
        closeOnboardingBtn.addEventListener('click', closeOnboarding);
        closeOnboardingBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeOnboarding();
            }
        });
    }

    // =========
    // Quotes
    // =========
    const quotes = [
        'Take a deep breath and embrace the moment.',
        'You are enough just as you are.',
        'You have survived 100% of your hardest days.',
        'Small steps are still steps.',
        'Speak to yourself as you would to a dear friend.',
        'Rest is productive for your nervous system.',
        'You’re allowed to take up space, even on hard days.'
    ];
    const dailyQuote = document.getElementById('daily-quote');
    const dashboardQuote = document.getElementById('dashboard-quote');

    function setRandomQuote() {
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        if (dailyQuote) dailyQuote.textContent = q;
        if (dashboardQuote) dashboardQuote.textContent = q;
    }

    setRandomQuote();

    setInterval(() => {
        if (dailyQuote) dailyQuote.classList.remove('fade');
        if (dashboardQuote) dashboardQuote.classList.remove('fade');

        setTimeout(() => {
            setRandomQuote();
            if (dailyQuote) dailyQuote.classList.add('fade');
            if (dashboardQuote) dashboardQuote.classList.add('fade');
        }, 350);
    }, 15000);

    // =========
    // Progress rings (hero + dashboard)
    // =========
    function updateProgressRings() {
        const totalActivities = 4;
        let completedToday = 0;

        if (localStorage.getItem('lastBreathingDate') === today) completedToday++;
        if (localStorage.getItem('lastMoodDate') === today) completedToday++;
        if (localStorage.getItem('lastGratitudeDate') === today) completedToday++;
        if (localStorage.getItem('lastMindfulnessDate') === today) completedToday++;

        const progress = (completedToday / totalActivities) * 100;

        // Hero ring: r = 32
        const heroRing = document.getElementById('progress-ring-fill-hero');
        const heroText = document.getElementById('progress-text-hero');
        if (heroRing) {
            const r = 32;
            const circumference = 2 * Math.PI * r;
            const offset = circumference - (progress / 100) * circumference;
            heroRing.style.strokeDasharray = circumference;
            heroRing.style.strokeDashoffset = offset;
        }
        if (heroText) heroText.textContent = `${Math.round(progress)}% today`;

        // Dashboard main ring: r = 60
        const mainRing = document.getElementById('progress-ring-fill-main');
        const mainText = document.getElementById('progress-text-main');
        if (mainRing) {
            const r = 60;
            const circumference = 2 * Math.PI * r;
            const offset = circumference - (progress / 100) * circumference;
            mainRing.style.strokeDasharray = circumference;
            mainRing.style.strokeDashoffset = offset;
        }
        if (mainText) mainText.textContent = `${Math.round(progress)}% Today’s activities`;
    }

    updateProgressRings();

    // =========
    // Tabs
    // =========
    window.switchTab = function (tabId) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(sec => sec.classList.remove('active'));

        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const activeSection = document.getElementById(tabId);

        if (activeBtn && activeSection) {
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-selected', 'true');
            activeSection.classList.add('active');
            activeBtn.focus();
        }
    };

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchTab(btn.dataset.tab);
            }
        });
    });

    // =========
    // Breathing exercise
    // =========
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingInstruction = document.getElementById('breathing-instruction');
    const startBreathingBtn = document.getElementById('start-breathing');
    const breathingProgress = document.getElementById('breathing-progress');

    let breathingAnimation;
    let isBreathing = false;
    const phaseDuration = 4000;
    const cycleDuration = phaseDuration * 4;

    function startBreathing() {
        if (!breathingCircle || !breathingInstruction || !breathingProgress || !startBreathingBtn) return;

        if (isBreathing) {
            cancelAnimationFrame(breathingAnimation);
            breathingCircle.style.transform = 'scale(1)';
            breathingInstruction.textContent = 'Ready to begin?';
            startBreathingBtn.innerHTML = '<i class="fas fa-play"></i> Start breathing cycle';
            breathingProgress.style.width = '0%';
            isBreathing = false;
            return;
        }

        isBreathing = true;
        startBreathingBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';

        breathingStreak++;
        localStorage.setItem('breathingStreak', breathingStreak);
        localStorage.setItem('lastBreathingDate', today);

        setStreak('breathing-streak', breathingStreak);
        setStreak('dash-breathing-streak', breathingStreak);
        updateProgressRings();

        let startTime = performance.now();

        function animate(time) {
            const elapsed = (time - startTime) % cycleDuration;
            const progress = (elapsed / cycleDuration) * 100;
            breathingProgress.style.width = `${progress}%`;

            const phase = Math.floor(elapsed / phaseDuration);
            const phaseProgress = (elapsed % phaseDuration) / phaseDuration;

            if (phase === 0) {
                breathingInstruction.textContent = 'Inhale for 4...';
                const scale = 1 + (0.5 * phaseProgress);
                breathingCircle.style.transform = `scale(${scale})`;
            } else if (phase === 1) {
                breathingInstruction.textContent = 'Hold for 4...';
                breathingCircle.style.transform = 'scale(1.5)';
            } else if (phase === 2) {
                breathingInstruction.textContent = 'Exhale for 4...';
                const scale = 1.5 - (0.5 * phaseProgress);
                breathingCircle.style.transform = `scale(${scale})`;
            } else {
                breathingInstruction.textContent = 'Hold for 4...';
                breathingCircle.style.transform = 'scale(1)';
            }

            breathingAnimation = requestAnimationFrame(animate);
        }

        breathingAnimation = requestAnimationFrame(animate);
    }

    if (startBreathingBtn) {
        startBreathingBtn.addEventListener('click', startBreathing);
        startBreathingBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startBreathing();
            }
        });
    }

    // =========
    // Grounding exercise
    // =========
    const groundingStep = document.getElementById('grounding-step');
    const groundingResponse = document.getElementById('grounding-response');
    const groundingError = document.getElementById('grounding-error');
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
    let currentGroundingStep = -1;
    let groundingResponses = [];

    let groundingSessions = JSON.parse(localStorage.getItem('groundingSessions')) || [];

    function appendGroundingSessionToHistory(session) {
        if (!groundingHistory) return;
        const entry = document.createElement('div');
        entry.classList.add('history-entry');
        entry.innerHTML = `
            <p><strong>${new Date(session.timestamp).toLocaleString()}</strong></p>
            <ul>${session.responses
                .map(r => `<li>${r.prompt}: ${r.response}</li>`)
                .join('')}</ul>
        `;
        groundingHistory.appendChild(entry);
    }

    groundingSessions.forEach(appendGroundingSessionToHistory);

    function displayGroundingStep() {
        if (!groundingStep || !groundingResponse || !submitResponseBtn) return;

        if (currentGroundingStep < groundingSteps.length && currentGroundingStep >= 0) {
            const step = groundingSteps[currentGroundingStep];
            groundingStep.textContent = step.prompt;
            groundingResponse.placeholder = `List ${step.count} items separated by commas...`;
        } else if (currentGroundingStep >= groundingSteps.length) {
            const timestamp = new Date().toISOString();
            const session = { timestamp, responses: groundingResponses };
            groundingSessions.push(session);
            localStorage.setItem('groundingSessions', JSON.stringify(groundingSessions));
            appendGroundingSessionToHistory(session);

            groundingStep.textContent = 'Well done — your grounding session is complete.';
            groundingResponse.value = '';
            groundingResponse.placeholder = 'You can restart grounding any time.';
            submitResponseBtn.disabled = true;
            startGroundingBtn.innerHTML = '<i class="fas fa-redo"></i> Restart grounding session';
        }
    }

    function startGrounding() {
        if (!groundingStep || !groundingResponse || !submitResponseBtn || !startGroundingBtn) return;

        groundingError.textContent = '';

        if (currentGroundingStep === -1 || currentGroundingStep >= groundingSteps.length) {
            // Start / restart
            currentGroundingStep = 0;
            groundingResponses = [];
            groundingResponse.value = '';
            submitResponseBtn.disabled = false;
            startGroundingBtn.innerHTML = '<i class="fas fa-forward"></i> Next step';
            displayGroundingStep();
        } else {
            // In progress; button just says "Next step" but we advance from submit
        }
    }

    if (startGroundingBtn) {
        startGroundingBtn.addEventListener('click', startGrounding);
        startGroundingBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startGrounding();
            }
        });
    }

    if (submitResponseBtn) {
        submitResponseBtn.addEventListener('click', () => {
            if (!groundingResponse || !groundingError) return;
            const response = groundingResponse.value.trim();
            if (!response) {
                groundingError.textContent = 'Please enter a response.';
                return;
            }
            const step = groundingSteps[currentGroundingStep];
            const items = response.split(',').map(item => item.trim()).filter(Boolean);
            if (items.length < step.count) {
                groundingError.textContent = `Please list at least ${step.count} items.`;
                return;
            }
            groundingResponses.push({ prompt: step.prompt, response });
            groundingResponse.value = '';
            groundingError.textContent = '';
            currentGroundingStep++;
            displayGroundingStep();
        });

        submitResponseBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                submitResponseBtn.click();
            }
        });
    }

    if (groundingResponse) {
        groundingResponse.addEventListener('input', () => {
            if (!submitResponseBtn) return;
            submitResponseBtn.disabled = !groundingResponse.value.trim();
            if (groundingError) groundingError.textContent = '';
        });
    }

    // =========
    // Mood tracker
    // =========
    const moodRadios = document.querySelectorAll('input[name="mood"]');
    const moodNotes = document.getElementById('mood-notes');
    const moodError = document.getElementById('mood-error');
    const logMoodBtn = document.getElementById('log-mood');
    const moodChartCanvas = document.getElementById('mood-chart');
    const moodHistory = document.getElementById('mood-history');

    let moods = JSON.parse(localStorage.getItem('moods')) || [];
    let moodChart;

    function getMoodEmoji(value) {
        const emojis = { 1: '😢', 2: '🙁', 3: '😐', 4: '🙂', 5: '😊' };
        return emojis[value] || '😐';
    }

    function updateMoodChart() {
    // Guard: make sure canvas element exists
    if (!moodChartCanvas) return;

    // Guard: make sure Chart.js is available (CDN loaded)
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not available – skipping mood chart.');
        return;
    }

    const ctx = moodChartCanvas.getContext('2d');
    if (!ctx) {
        console.warn('Could not get 2D context for mood chart canvas.');
        return;
    }

    if (moodChart) {
        try {
            moodChart.destroy();
        } catch (err) {
            console.warn('Error destroying existing mood chart instance:', err);
        }
    }

    const labels = moods.length
        ? moods.map(m => new Date(m.timestamp).toLocaleDateString())
        : ['No data'];

    const dataValues = moods.length
        ? moods.map(m => m.value)
        : [0];

    try {
        moodChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Mood trend',
                    data: dataValues,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3
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
    } catch (err) {
        console.error('Error creating mood chart:', err);
    }
}


    function appendMoodToHistory(mood) {
        if (!moodHistory) return;
        const entry = document.createElement('div');
        entry.classList.add('history-entry');
        entry.innerHTML = `
            <p><strong>${new Date(mood.timestamp).toLocaleString()}</strong> - ${getMoodEmoji(mood.value)} (${mood.value}/5)</p>
            ${mood.notes ? `<p>${mood.notes}</p>` : ''}
        `;
        moodHistory.appendChild(entry);
    }

    function rebuildMoodHistory() {
        if (!moodHistory) return;
        moodHistory.innerHTML = '<h3>Past mood entries</h3>';
        moods.forEach(appendMoodToHistory);
    }

    function updateDashRecentMood() {
        const dashRecent = document.getElementById('dash-recent-mood');
        if (!dashRecent) return;
        if (!moods.length) {
            dashRecent.textContent = 'No recent logs yet — try logging once today.';
            return;
        }
        const lastMood = moods[moods.length - 1];
        const emoji = getMoodEmoji(lastMood.value);
        dashRecent.innerHTML = `${emoji} ${lastMood.value}/5 on ${new Date(lastMood.timestamp).toLocaleDateString()}`;
    }

    try {
    updateMoodChart();
} catch (err) {
    console.error('updateMoodChart failed:', err);
}
try {
    rebuildMoodHistory();
} catch (err) {
    console.error('rebuildMoodHistory failed:', err);
}
try {
    updateDashRecentMood();
} catch (err) {
    console.error('updateDashRecentMood failed:', err);
}


    if (logMoodBtn) {
        logMoodBtn.addEventListener('click', () => {
            const selectedMood = document.querySelector('input[name="mood"]:checked');
            if (!selectedMood) {
                if (moodError) moodError.textContent = 'Please select a mood.';
                return;
            }
            const moodValue = parseInt(selectedMood.value, 10);
            const notes = moodNotes ? moodNotes.value.trim() : '';
            const timestamp = new Date().toISOString();

            const newMood = { value: moodValue, notes, timestamp };
            moods.push(newMood);
            localStorage.setItem('moods', JSON.stringify(moods));

            moodStreak++;
            localStorage.setItem('moodStreak', moodStreak);
            localStorage.setItem('lastMoodDate', today);
            setStreak('mood-streak', moodStreak);
            setStreak('dash-mood-streak', moodStreak);
            updateProgressRings();

            updateMoodChart();
            appendMoodToHistory(newMood);
            updateDashRecentMood();

            if (moodNotes) moodNotes.value = '';
            moodRadios.forEach(r => { r.checked = false; });
            logMoodBtn.disabled = true;
            if (moodError) moodError.textContent = '';
        });

        logMoodBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                logMoodBtn.click();
            }
        });
    }

    moodRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (logMoodBtn) logMoodBtn.disabled = false;
            if (moodError) moodError.textContent = '';
        });
    });

    // =========
    // CBT exercise
    // =========
    const cbtSituation = document.getElementById('cbt-situation');
    const cbtThought = document.getElementById('cbt-thought');
    const cbtEvidenceFor = document.getElementById('cbt-evidence-for');
    const cbtEvidenceAgainst = document.getElementById('cbt-evidence-against');
    const cbtBalanced = document.getElementById('cbt-balanced');
    const cbtError = document.getElementById('cbt-error');
    const logCbtBtn = document.getElementById('log-cbt');
    const cbtHistory = document.getElementById('cbt-history');

    let cbtRecords = JSON.parse(localStorage.getItem('cbtRecords')) || [];

    function appendCbtToHistory(record) {
        if (!cbtHistory) return;
        const entry = document.createElement('div');
        entry.classList.add('history-entry');
        entry.innerHTML = `
            <p><strong>${new Date(record.timestamp).toLocaleString()}</strong></p>
            <p><strong>Situation:</strong> ${record.situation}</p>
            <p><strong>Thought:</strong> ${record.thought}</p>
            <p><strong>Evidence for:</strong> ${record.evidenceFor}</p>
            <p><strong>Evidence against:</strong> ${record.evidenceAgainst}</p>
            <p><strong>Balanced thought:</strong> ${record.balanced}</p>
        `;
        cbtHistory.appendChild(entry);
    }

    cbtRecords.forEach(appendCbtToHistory);

    function checkCbtForm() {
        if (!cbtSituation || !cbtThought || !cbtEvidenceFor || !cbtEvidenceAgainst || !cbtBalanced || !logCbtBtn) return;
        const isValid =
            cbtSituation.value.trim() &&
            cbtThought.value.trim() &&
            cbtEvidenceFor.value.trim() &&
            cbtEvidenceAgainst.value.trim() &&
            cbtBalanced.value.trim();
        logCbtBtn.disabled = !isValid;
        if (cbtError) cbtError.textContent = isValid ? '' : 'Please fill out all fields.';
    }

    [cbtSituation, cbtThought, cbtEvidenceFor, cbtEvidenceAgainst, cbtBalanced]
        .filter(Boolean)
        .forEach(el => el.addEventListener('input', checkCbtForm));

    if (logCbtBtn) {
        logCbtBtn.addEventListener('click', () => {
            if (!cbtSituation || !cbtThought || !cbtEvidenceFor || !cbtEvidenceAgainst || !cbtBalanced) return;

            if (
                !cbtSituation.value.trim() ||
                !cbtThought.value.trim() ||
                !cbtEvidenceFor.value.trim() ||
                !cbtEvidenceAgainst.value.trim() ||
                !cbtBalanced.value.trim()
            ) {
                if (cbtError) cbtError.textContent = 'Please fill out all fields.';
                return;
            }

            const record = {
                situation: cbtSituation.value.trim(),
                thought: cbtThought.value.trim(),
                evidenceFor: cbtEvidenceFor.value.trim(),
                evidenceAgainst: cbtEvidenceAgainst.value.trim(),
                balanced: cbtBalanced.value.trim(),
                timestamp: new Date().toISOString()
            };
            cbtRecords.push(record);
            localStorage.setItem('cbtRecords', JSON.stringify(cbtRecords));
            appendCbtToHistory(record);

            cbtSituation.value = '';
            cbtThought.value = '';
            cbtEvidenceFor.value = '';
            cbtEvidenceAgainst.value = '';
            cbtBalanced.value = '';
            logCbtBtn.disabled = true;
            if (cbtError) cbtError.textContent = '';
        });

        logCbtBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                logCbtBtn.click();
            }
        });
    }

    // =========
    // Gratitude journal
    // =========
    const gratitudeEntry = document.getElementById('gratitude-entry');
    const gratitudeError = document.getElementById('gratitude-error');
    const logGratitudeBtn = document.getElementById('log-gratitude');
    const gratitudeHistory = document.getElementById('gratitude-history');

    let gratitudeEntries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];

    function appendGratitudeToHistory(entry) {
        if (!gratitudeHistory) return;
        const div = document.createElement('div');
        div.classList.add('history-entry');
        div.innerHTML = `<p><strong>${new Date(entry.timestamp).toLocaleString()}</strong></p><p>${entry.text}</p>`;
        gratitudeHistory.appendChild(div);
    }

    gratitudeEntries.forEach(appendGratitudeToHistory);

    if (gratitudeEntry) {
        gratitudeEntry.addEventListener('input', () => {
            if (!logGratitudeBtn) return;
            logGratitudeBtn.disabled = !gratitudeEntry.value.trim();
            if (gratitudeError) gratitudeError.textContent = '';
        });
    }

    if (logGratitudeBtn) {
        logGratitudeBtn.addEventListener('click', () => {
            if (!gratitudeEntry) return;
            const text = gratitudeEntry.value.trim();
            if (!text) {
                if (gratitudeError) gratitudeError.textContent = 'Please enter a gratitude entry.';
                return;
            }
            const items = text.split(',').map(item => item.trim()).filter(Boolean);
            if (items.length < 3) {
                if (gratitudeError) gratitudeError.textContent = 'Please list at least 3 things you’re grateful for (separated by commas).';
                return;
            }

            const entry = { text, timestamp: new Date().toISOString() };
            gratitudeEntries.push(entry);
            localStorage.setItem('gratitudeEntries', JSON.stringify(gratitudeEntries));
            appendGratitudeToHistory(entry);

            gratitudeStreak++;
            localStorage.setItem('gratitudeStreak', gratitudeStreak);
            localStorage.setItem('lastGratitudeDate', today);
            setStreak('gratitude-streak', gratitudeStreak);
            setStreak('dash-gratitude-streak', gratitudeStreak);
            updateProgressRings();

            gratitudeEntry.value = '';
            logGratitudeBtn.disabled = true;
            if (gratitudeError) gratitudeError.textContent = '';
        });

        logGratitudeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                logGratitudeBtn.click();
            }
        });
    }

    // =========
    // Mindfulness
    // =========
    const mindfulnessInstruction = document.getElementById('mindfulness-instruction');
    const startMindfulnessBtn = document.getElementById('start-mindfulness');
    const mindfulnessProgress = document.getElementById('mindfulness-progress');

    let mindfulnessAnimation;
    let isMeditating = false;
    const meditationDuration = 60000;
    const prompts = [
        'Notice the feeling of your breath moving in and out.',
        'Let thoughts come and go, like clouds passing in the sky.',
        'Scan your body gently, noticing any sensations without judging them.',
        'Return your attention to your breath. This moment is enough.'
    ];

    function startMindfulness() {
        if (!mindfulnessInstruction || !startMindfulnessBtn || !mindfulnessProgress) return;

        if (isMeditating) {
            cancelAnimationFrame(mindfulnessAnimation);
            mindfulnessInstruction.textContent = 'Ready to begin?';
            mindfulnessProgress.style.width = '0%';
            startMindfulnessBtn.innerHTML = '<i class="fas fa-play"></i> Start mindful minute';
            isMeditating = false;
            return;
        }

        isMeditating = true;
        startMindfulnessBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';

        mindfulnessStreak++;
        localStorage.setItem('mindfulnessStreak', mindfulnessStreak);
        localStorage.setItem('lastMindfulnessDate', today);
        setStreak('mindfulness-streak', mindfulnessStreak);
        setStreak('dash-mindfulness-streak', mindfulnessStreak);
        updateProgressRings();

        let startTime = performance.now();
        let promptIndex = -1;

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min((elapsed / meditationDuration) * 100, 100);
            mindfulnessProgress.style.width = `${progress}%`;

            const promptInterval = meditationDuration / prompts.length;
            const newPromptIndex = Math.floor(elapsed / promptInterval);

            if (newPromptIndex !== promptIndex && newPromptIndex < prompts.length) {
                promptIndex = newPromptIndex;
                mindfulnessInstruction.textContent = prompts[promptIndex];
            }

            if (elapsed < meditationDuration && isMeditating) {
                mindfulnessAnimation = requestAnimationFrame(animate);
            } else if (isMeditating) {
                mindfulnessInstruction.textContent = 'Well done — your mindful minute is complete.';
                startMindfulnessBtn.innerHTML = '<i class="fas fa-redo"></i> Restart mindful minute';
                isMeditating = false;
            }
        }

        mindfulnessAnimation = requestAnimationFrame(animate);
    }

    if (startMindfulnessBtn) {
        startMindfulnessBtn.addEventListener('click', startMindfulness);
        startMindfulnessBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startMindfulness();
            }
        });
    }

    // =========
    // Simple daily reminder (optional)
    // =========
    function scheduleReminder() {
        // Once per second, check if it's 8:00:00 PM local time
        setInterval(() => {
            const now = new Date();
            if (now.getHours() === 20 && now.getMinutes() === 0 && now.getSeconds() === 0) {
                // Basic alert; in a real app you might use Notifications API instead.
                alert('EaseMind reminder: Take a moment to log your mood or try a short exercise.');
            }
        }, 1000);
    }
    scheduleReminder();
});
