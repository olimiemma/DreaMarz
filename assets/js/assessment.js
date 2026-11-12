/**
 * DreaMarz, LLC - Cybersecurity & Data Maturity Diagnostic Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.quiz-step');
  const progressBar = document.querySelector('.quiz-progress-fill');
  const prevBtn = document.getElementById('quiz-prev');
  const nextBtn = document.getElementById('quiz-next');
  let currentStep = 0;

  // Selected scores by category
  // Values: 1 (Ad-hoc), 2 (Developing), 3 (Managed), 4 (Optimized)
  const answers = {
    q1: 2, // Threat Monitoring
    q2: 2, // Audit & GRC
    q3: 2, // Incident Forensics
    q4: 2, // Data Pipelines
    q5: 2  // Analytics & Dashboards
  };

  // Add click handlers to quiz cards
  document.querySelectorAll('.quiz-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const parent = card.closest('.quiz-options');
      const qKey = parent.dataset.question;
      const score = parseInt(card.dataset.score, 10);

      parent.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      answers[qKey] = score;
    });
  });

  function updateStepUI() {
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    const totalSteps = steps.length - 1; // last step is results
    if (currentStep < totalSteps) {
      const pct = ((currentStep + 1) / totalSteps) * 100;
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (prevBtn) prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
      if (nextBtn) nextBtn.textContent = currentStep === totalSteps - 1 ? 'Calculate Diagnostic Result' : 'Next Step →';
      if (nextBtn) nextBtn.style.display = 'inline-flex';
    } else {
      // Results view
      if (progressBar) progressBar.style.width = '100%';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      calculateResults();
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateStepUI();
        window.scrollTo({ top: document.querySelector('.assessment-container').offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateStepUI();
      }
    });
  }

  function calculateResults() {
    // Total max points = 5 questions * 4 = 20
    const rawTotal = Object.values(answers).reduce((a, b) => a + b, 0);
    const scorePct = Math.round((rawTotal / 20) * 100);

    const scoreDisplay = document.getElementById('calc-score-val');
    const maturityTier = document.getElementById('calc-tier-val');
    const summaryText = document.getElementById('calc-summary-text');

    if (scoreDisplay) scoreDisplay.textContent = `${scorePct}%`;

    let tier = '';
    let summary = '';
    if (scorePct >= 85) {
      tier = 'Optimized & Resilient';
      summary = 'Your security telemetry and data pipelines operate at advanced maturity. Next priority: automated incident orchestration and predictive anomaly detection.';
    } else if (scorePct >= 65) {
      tier = 'Managed / Growth Ready';
      summary = 'Solid foundational controls. Critical gap: unifying siloed cloud logs with executive BI dashboards to eliminate blind spots.';
    } else if (scorePct >= 45) {
      tier = 'Developing / Vulnerable Silos';
      summary = 'Reactive posture. Security monitoring and data pipelines operate separately, causing compliance friction and delayed threat visibility.';
    } else {
      tier = 'High Risk / Ad-Hoc';
      summary = 'Urgent attention required. Lack of centralized logging and audit governance leaves your systems exposed to compliance failure and undetected breaches.';
    }

    if (maturityTier) maturityTier.textContent = tier;
    if (summaryText) summaryText.textContent = summary;

    // Fill domain bars
    const domains = [
      { id: 'bar-threat', val: (answers.q1 / 4) * 100 },
      { id: 'bar-grc', val: (answers.q2 / 4) * 100 },
      { id: 'bar-forensics', val: (answers.q3 / 4) * 100 },
      { id: 'bar-data', val: (answers.q4 / 4) * 100 },
      { id: 'bar-dashboards', val: (answers.q5 / 4) * 100 }
    ];

    domains.forEach(d => {
      const el = document.getElementById(d.id);
      if (el) el.style.width = `${d.val}%`;
    });
  }

  // Initial UI state
  updateStepUI();
});

