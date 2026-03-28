/* ============================================================
   Quiz Engine — Paso a paso, una pregunta a la vez
   ============================================================ */

const QuizEngine = {
  currentModuleIndex: null,
  currentQuestionIndex: 0,
  totalQuestions: 0,
  answers: {},
  submitted: false,

  render(moduleIndex) {
    this.currentModuleIndex   = moduleIndex;
    this.currentQuestionIndex = 0;
    this.answers   = {};
    this.submitted = false;

    const quiz = COURSE_DATA.modules[moduleIndex].quiz;
    this.totalQuestions = quiz.questions.length;

    document.getElementById('quiz-title').textContent = quiz.title;
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('quiz-actions').classList.remove('hidden');

    // Generar puntos de progreso
    const dotsEl = document.getElementById('step-dots');
    dotsEl.innerHTML = quiz.questions.map((_, i) =>
      `<span class="step-dot${i === 0 ? ' active' : ''}"></span>`
    ).join('');

    this._renderQuestion(0);
    this._updateStepBar();
  },

  _renderQuestion(index) {
    const quiz = COURSE_DATA.modules[this.currentModuleIndex].quiz;
    const q    = quiz.questions[index];
    const body = document.getElementById('quiz-body');

    body.innerHTML = `
      <div class="quiz-question anim-slide-in">
        <div class="question-text">${q.question}</div>
        <div class="question-options" id="options-q">
          ${q.options.map((opt, j) => `
            <button class="option-btn${this.answers[index] === j ? ' selected' : ''}"
                    data-option="${j}">
              <span class="option-letter">${String.fromCharCode(65 + j)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>`;

    body.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.submitted) return;
        this._selectOption(index, parseInt(btn.dataset.option));
      });
    });

    this._updateNavButtons();
  },

  _selectOption(qIndex, oIndex) {
    this.answers[qIndex] = oIndex;

    document.querySelectorAll('#options-q .option-btn').forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.option) === oIndex);
    });

    this._updateNavButtons();
    this._updateStepBar();
  },

  _updateStepBar() {
    const idx   = this.currentQuestionIndex;
    const total = this.totalQuestions;

    document.getElementById('quiz-step-counter').textContent =
      `Pregunta ${idx + 1} de ${total}`;

    const pct = ((idx + 1) / total) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${pct}%`;

    document.querySelectorAll('.step-dot').forEach((dot, i) => {
      dot.className = 'step-dot';
      if (i === idx)                       dot.classList.add('active');
      else if (this.answers[i] !== undefined) dot.classList.add('answered');
    });
  },

  _updateNavButtons() {
    const idx    = this.currentQuestionIndex;
    const isLast = idx === this.totalQuestions - 1;
    const hasAnswer = this.answers[idx] !== undefined;
    const allAnswered = Object.keys(this.answers).length === this.totalQuestions;

    document.getElementById('btn-quiz-prev').classList.toggle('hidden', idx === 0);

    const nextBtn   = document.getElementById('btn-quiz-next');
    const submitBtn = document.getElementById('btn-submit-quiz');

    if (isLast) {
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
      submitBtn.disabled = !allAnswered;
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
      nextBtn.disabled = !hasAnswer;
    }
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this._renderQuestion(this.currentQuestionIndex);
      this._updateStepBar();
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this._renderQuestion(this.currentQuestionIndex);
      this._updateStepBar();
    }
  },

  submit() {
    const quiz = COURSE_DATA.modules[this.currentModuleIndex].quiz;
    this.submitted = true;

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (this.answers[i] === q.correct) correct++;
    });

    const score  = Math.round((correct / this.totalQuestions) * 100);
    const passed = score >= quiz.passingScore;

    document.getElementById('quiz-actions').classList.add('hidden');
    const results = document.getElementById('quiz-results');
    results.classList.remove('hidden');

    // Resultado principal
    document.getElementById('result-title').textContent = passed ? '¡Aprobado!' : 'Intenta de nuevo';
    document.getElementById('result-message').textContent =
      `${correct} de ${this.totalQuestions} respuestas correctas`;

    const nextBtn  = document.getElementById('btn-next-module');
    const retryBtn = document.getElementById('btn-retry-quiz');
    nextBtn.classList.toggle('hidden', !passed);
    retryBtn.classList.toggle('hidden', passed);

    if (passed && typeof App !== 'undefined') {
      App.completeQuiz(this.currentModuleIndex, score);
    }

    // Animar anillo de puntuación
    this._animateRing(score, passed);

    // Construir revisión
    const reviewEl = document.getElementById('quiz-review');
    reviewEl.innerHTML = quiz.questions.map((q, i) => {
      const isCorrect = this.answers[i] === q.correct;
      return `
        <div class="review-question ${isCorrect ? 'ok' : 'ko'}">
          <div class="review-header">
            <span class="review-icon">${isCorrect ? '✓' : '✗'}</span>
            <span>${i + 1}. ${q.question}</span>
          </div>
          <div class="review-answers">
            ${!isCorrect ? `<span class="ans-wrong">Tu respuesta: ${q.options[this.answers[i]]}</span>` : ''}
            <span class="ans-correct">✓ Correcta: ${q.options[q.correct]}</span>
          </div>
          <div class="review-explanation">${q.explanation}</div>
        </div>`;
    }).join('');

    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  _animateRing(targetScore, passed) {
    const ring  = document.getElementById('score-ring-fill');
    const scoreText = document.getElementById('score-text');
    const r = 40;
    const circ = 2 * Math.PI * r;

    ring.style.strokeDasharray  = circ;
    ring.style.strokeDashoffset = circ;
    ring.style.stroke = passed ? 'var(--success)' : 'var(--error)';

    const duration = 900;
    const start = performance.now();

    const update = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const current = Math.round(targetScore * e);

      scoreText.textContent = `${current}%`;
      ring.style.strokeDashoffset = circ - (current / 100) * circ;

      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },

  retry() {
    this.render(this.currentModuleIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
