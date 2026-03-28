/* ============================================================
   Python + IA en Geoinformación — App Principal
   ============================================================ */

const ACCESS_PASSWORD = 'geoinformacion2026';

const App = {

  state: {
    username: '',
    completedSessions: [],   // ['mod0-sess0', 'mod1-sess0', ...]
    completedQuizzes:  [],   // [0, 1, 2] índice de módulo
    currentView: 'dashboard',
    currentModuleIndex:  null,
    currentSessionIndex: null,
  },

  STORAGE_KEY: 'python-geo-v1',

  /* ── Inicio ─────────────────────────────────────────────── */
  init() {
    this.loadState();
    if (this.state.username) {
      this.showApp();
    } else {
      this.showWelcome();
    }
    this.bindEvents();
  },

  /* ── Persistencia ───────────────────────────────────────── */
  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) Object.assign(this.state, JSON.parse(saved));
    } catch (e) {}
  },

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {}
  },

  /* ── Modal de bienvenida ────────────────────────────────── */
  showWelcome() {
    document.getElementById('modal-welcome').style.display = 'flex';
  },

  /* ── Mostrar la app ─────────────────────────────────────── */
  showApp() {
    document.getElementById('modal-welcome').style.display = 'none';
    const app = document.getElementById('app');
    app.classList.remove('app-hidden');
    app.style.display = 'block';

    document.getElementById('header-username').textContent   = this.state.username;
    document.getElementById('dashboard-username').textContent = this.state.username;

    this.buildSidebar();
    this.buildDashboard();
    this.updateProgress();
    this.showView('dashboard');
  },

  /* ── Barra lateral (encuentros, sin acordeón) ───────────── */
  buildSidebar() {
    const nav = document.getElementById('course-nav');
    nav.innerHTML = '';

    COURSE_DATA.modules.forEach((mod, mIdx) => {
      const done       = this.state.completedSessions.includes(`mod${mIdx}-sess0`);
      const quizPassed = this.state.completedQuizzes.includes(mIdx);

      const item = document.createElement('div');
      item.className = 'nav-encounter';
      item.id = `nav-encounter-${mIdx}`;

      // Botón del encuentro
      const encBtn = document.createElement('button');
      encBtn.className = `nav-enc-btn${done ? ' completed' : ''}`;
      encBtn.id = `nav-enc-${mIdx}`;
      encBtn.innerHTML = `
        <span class="nav-enc-num">${String(mod.id).padStart(2, '0')}</span>
        <span class="nav-enc-title">${mod.title}</span>
        <span class="nav-check${done ? ' done' : ''}">${done ? '✓' : ''}</span>`;
      encBtn.addEventListener('click', () => this.showSession(mIdx, 0));

      // Botón de evaluación
      const quizBtn = document.createElement('button');
      quizBtn.className = `nav-quiz-btn${quizPassed ? ' quiz-passed' : ''}`;
      quizBtn.id = `nav-quiz-${mIdx}`;
      quizBtn.innerHTML = `${quizPassed ? '✓' : '📝'} Evaluación ${mod.id}`;
      quizBtn.addEventListener('click', () => this.showQuiz(mIdx));

      item.appendChild(encBtn);
      item.appendChild(quizBtn);
      nav.appendChild(item);
    });
  },

  /* ── Panel principal ────────────────────────────────────── */
  buildDashboard() {
    const grid = document.getElementById('dashboard-modules');
    grid.innerHTML = '';

    COURSE_DATA.modules.forEach((mod, mIdx) => {
      const done       = this.state.completedSessions.includes(`mod${mIdx}-sess0`);
      const quizPassed = this.state.completedQuizzes.includes(mIdx);

      const card = document.createElement('div');
      card.className = `encounter-card${done ? ' completed' : ''}`;
      card.innerHTML = `
        <div class="encounter-num">${String(mod.id).padStart(2, '0')}</div>
        <div class="encounter-info">
          <div class="encounter-meta">
            <h3>${mod.title}</h3>
            <span class="enc-duration">⏱ ${mod.duration}</span>
          </div>
          <div class="encounter-topics">
            ${mod.topics.map(t => `<span class="topic-pill">${t.name}</span>`).join('')}
          </div>
          <div class="encounter-deliverable">📦 ${mod.deliverable}</div>
          <div class="encounter-actions">
            <button class="btn-enc-view${done ? ' done' : ''}">
              ${done ? '✓ Ver contenido' : '→ Ver encuentro'}
            </button>
            <button class="btn-enc-quiz${quizPassed ? ' passed' : ''}">
              ${quizPassed ? '✓ Evaluación aprobada' : '📝 Ir a evaluación'}
            </button>
          </div>
        </div>`;

      card.querySelector('.btn-enc-view').addEventListener('click', () => this.showSession(mIdx, 0));
      card.querySelector('.btn-enc-quiz').addEventListener('click', () => this.showQuiz(mIdx));
      grid.appendChild(card);
    });
  },

  /* ── Mostrar una vista ──────────────────────────────────── */
  showView(viewId) {
    ['dashboard', 'session', 'quiz', 'certificate'].forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.classList.toggle('hidden', v !== viewId);
    });
    this.state.currentView = viewId;
    document.getElementById('main-content').scrollTo(0, 0);
    window.scrollTo(0, 0);
  },

  /* ── Mostrar encuentro ──────────────────────────────────── */
  showSession(mIdx, sIdx) {
    this.state.currentModuleIndex  = mIdx;
    this.state.currentSessionIndex = sIdx;

    const mod  = COURSE_DATA.modules[mIdx];
    const sess = mod.sessions[sIdx];
    const key  = `mod${mIdx}-sess${sIdx}`;
    const done = this.state.completedSessions.includes(key);

    // Cabecera
    document.getElementById('session-module-label').textContent = 'Python + IA';
    document.getElementById('session-number-label').textContent = `Encuentro ${mod.id}`;
    document.getElementById('badge-duration').textContent       = `⏱ ${mod.duration}`;
    document.getElementById('session-title').textContent        = mod.title;

    // Banner de completado
    document.getElementById('session-completed-banner').classList.toggle('hidden', !done);

    // Video
    const videoSection = document.getElementById('session-video');
    if (sess.videoId) {
      videoSection.innerHTML = `
        <p class="video-label">Grabación del encuentro</p>
        <div class="video-wrapper">
          <iframe src="https://www.youtube.com/embed/${sess.videoId}"
            title="${mod.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>`;
    } else {
      videoSection.innerHTML = `
        <p class="video-label">Grabación del encuentro</p>
        <div class="video-placeholder">
          <div class="video-placeholder-icon">🎥</div>
          <p>La grabación estará disponible próximamente</p>
          <small>Encuentro ${mod.id} — ${mod.title}</small>
        </div>`;
    }

    // Notebooks / scripts
    const scriptsSection = document.getElementById('session-scripts');
    const scriptsList    = document.getElementById('scripts-list');
    if (sess.scripts && sess.scripts.length) {
      scriptsList.innerHTML = sess.scripts.map(s =>
        `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a></li>`
      ).join('');
      scriptsSection.classList.remove('hidden');
    } else {
      scriptsSection.classList.add('hidden');
    }

    // Contenido: temas, objetivos, entregable (construido desde datos del módulo)
    let html = `<div class="topics-grid">`;
    mod.topics.forEach((t, i) => {
      html += `
        <div class="topic-card">
          <div class="topic-num">${String.fromCharCode(65 + i)}</div>
          <div>
            <strong>${t.name}</strong>
            <p>${t.desc}</p>
          </div>
        </div>`;
    });
    html += `</div>
      <div class="objectives-section">
        <h3>Objetivos del encuentro</h3>
        <ul class="objectives-list">
          ${mod.objectives.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
      <div class="deliverable-card">
        <span class="deliverable-icon">📦</span>
        <div>
          <strong>Entregable</strong>
          <p>${mod.deliverable}</p>
        </div>
      </div>`;
    document.getElementById('session-content').innerHTML = html;

    // Recursos (nivel módulo)
    const resSection = document.getElementById('session-resources');
    const resList    = document.getElementById('resources-list');
    if (mod.resources && mod.resources.length) {
      resList.innerHTML = mod.resources.map(r =>
        `<li><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.title}</a></li>`
      ).join('');
      resSection.classList.remove('hidden');
    } else {
      resSection.classList.add('hidden');
    }

    // Botón completar
    const completeBtn = document.getElementById('btn-complete-session');
    if (done) {
      completeBtn.innerHTML = '✓ Encuentro completado';
      completeBtn.classList.add('completed-state');
      completeBtn.disabled = true;
    } else {
      completeBtn.innerHTML = '✓ Marcar encuentro como completado';
      completeBtn.classList.remove('completed-state');
      completeBtn.disabled = false;
    }

    this.updateSessionNavButtons();
    this.markActiveSidebarSession(mIdx);
    this.showView('session');
  },

  updateSessionNavButtons() {
    const mIdx = this.state.currentModuleIndex;
    document.getElementById('btn-prev-session').classList.toggle('hidden', mIdx === 0);
    document.getElementById('btn-next-session').classList.toggle('hidden', mIdx === COURSE_DATA.modules.length - 1);
  },

  markActiveSidebarSession(mIdx) {
    document.querySelectorAll('.nav-enc-btn').forEach(btn => btn.classList.remove('active'));
    const active = document.getElementById(`nav-enc-${mIdx}`);
    if (active) active.classList.add('active');
  },

  /* ── Completar encuentro ────────────────────────────────── */
  completeSession(mIdx, sIdx) {
    const key = `mod${mIdx}-sess${sIdx}`;
    if (!this.state.completedSessions.includes(key)) {
      this.state.completedSessions.push(key);
      this.saveState();
      this.buildSidebar();
      this.buildDashboard();
      this.updateProgress();
      this.showToast('¡Encuentro completado! Continúa con el siguiente.');

      if (typeof Confetti !== 'undefined') {
        Confetti.launch({ count: 50, duration: 2000 });
      }

      const btn = document.getElementById('btn-complete-session');
      if (btn) {
        btn.innerHTML = '✓ Encuentro completado';
        btn.classList.add('completed-state');
        btn.disabled = true;
      }
      document.getElementById('session-completed-banner').classList.remove('hidden');
      this.markActiveSidebarSession(mIdx);
    }
  },

  /* ── Mostrar evaluación ─────────────────────────────────── */
  showQuiz(mIdx) {
    this.state.currentModuleIndex = mIdx;
    const mod = COURSE_DATA.modules[mIdx];
    document.getElementById('quiz-module-label').textContent = `Encuentro ${mod.id}`;
    this.markActiveSidebarSession(mIdx);
    QuizEngine.render(mIdx);
    this.showView('quiz');
  },

  /* ── Evaluación aprobada ────────────────────────────────── */
  completeQuiz(mIdx, score) {
    if (!this.state.completedQuizzes.includes(mIdx)) {
      this.state.completedQuizzes.push(mIdx);
      this.saveState();
      this.buildSidebar();
      this.buildDashboard();
      this.updateProgress();
    }

    const allQuizzesPassed = this.state.completedQuizzes.length >= COURSE_DATA.modules.length;
    const allSessionsDone  = this.state.completedSessions.length >= COURSE_DATA.totalSessions;

    if (allQuizzesPassed && allSessionsDone) {
      if (typeof Confetti !== 'undefined') {
        Confetti.launch({ count: 200, duration: 4000 });
      }
      setTimeout(() => this.showCertificate(), 1800);
    }
  },

  /* ── Actualizar progreso ────────────────────────────────── */
  updateProgress() {
    const total     = COURSE_DATA.totalSessions;
    const completed = this.state.completedSessions.length;
    const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById('header-progress-text').textContent = `${completed} / ${total} encuentros`;
    document.getElementById('header-progress-fill').style.width = `${pct}%`;
    document.getElementById('sidebar-progress-fill').style.width = `${pct}%`;
    document.getElementById('sidebar-progress-pct').textContent  = `${pct}%`;
  },

  /* ── Certificado ────────────────────────────────────────── */
  showCertificate() {
    this.showView('certificate');
    this.generateCertificate();
  },

  generateCertificate() {
    const canvas = document.getElementById('certificate-canvas');
    const ctx    = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Fondo oscuro
    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, W, H);

    // Borde teal
    ctx.strokeStyle = '#00D4AA';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, W - 20, H - 20);
    ctx.strokeStyle = 'rgba(0,212,170,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, W - 40, H - 40);

    // Header
    ctx.fillStyle = '#00D4AA';
    ctx.fillRect(20, 20, W - 40, 70);
    ctx.fillStyle = '#0B0F19';
    ctx.font = 'bold 14px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TRABAJO CIENTÍFICO · FORMACIÓN PROFESIONAL', W / 2, 52);
    ctx.font = '12px Segoe UI, sans-serif';
    ctx.fillStyle = 'rgba(11,15,25,0.7)';
    ctx.fillText('Oscar Iván Vargas Pineda · MSc | PhD(c) · Data Scientist', W / 2, 72);

    // Icono
    ctx.font = '42px serif';
    ctx.fillText('🗺️', W / 2, 148);

    // Certifica que
    ctx.fillStyle = '#94A3B8';
    ctx.font = '13px Segoe UI, sans-serif';
    ctx.fillText('CERTIFICA QUE', W / 2, 192);

    // Nombre
    ctx.fillStyle = '#00D4AA';
    ctx.font = 'bold 34px Georgia, serif';
    ctx.fillText(this.state.username, W / 2, 244);

    // Línea bajo nombre
    ctx.strokeStyle = '#00D4AA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 220, 256); ctx.lineTo(W / 2 + 220, 256);
    ctx.stroke();

    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px Segoe UI, sans-serif';
    ctx.fillText('ha completado exitosamente el curso', W / 2, 285);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 18px Segoe UI, sans-serif';
    ctx.fillText('Espacialización de la Información con Python + IA', W / 2, 318);

    ctx.fillStyle = '#64748B';
    ctx.font = '13px Segoe UI, sans-serif';
    ctx.fillText('Aprende a crear mapas profesionales, analizar datos geoespaciales y automatizar flujos con IA', W / 2, 342);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '13px Segoe UI, sans-serif';
    ctx.fillText('9 horas · 3 encuentros · Curso Intensivo', W / 2, 380);

    const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(`Fecha de finalización: ${today}`, W / 2, 402);

    // Pie
    ctx.fillStyle = '#141C2F';
    ctx.fillRect(20, H - 70, W - 40, 50);
    ctx.fillStyle = '#00D4AA';
    ctx.font = 'bold 13px Segoe UI, sans-serif';
    ctx.fillText('INSTRUCTOR: Oscar Iván Vargas Pineda', W / 2, H - 44);
    ctx.font = '11px Segoe UI, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('MSc | PhD(c) en Ciencias Agrarias · Data Scientist · Earth Innovation Institute · Fundador Trabajo Científico', W / 2, H - 27);
  },

  /* ── Toast ──────────────────────────────────────────────── */
  showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast${type === 'error' ? ' error' : ''}`;
    toast.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.add('hidden'), 3200);
  },

  /* ── Eventos ────────────────────────────────────────────── */
  bindEvents() {
    const btnStart      = document.getElementById('btn-start');
    const inputName     = document.getElementById('input-name');
    const inputPassword = document.getElementById('input-password');
    const passwordError = document.getElementById('password-error');

    const doStart = () => {
      const name = inputName.value.trim();
      const pass = inputPassword.value.trim();
      let valid  = true;

      if (!name) {
        inputName.style.borderColor = 'var(--error)';
        inputName.focus();
        valid = false;
      } else {
        inputName.style.borderColor = '';
      }

      if (pass !== ACCESS_PASSWORD) {
        inputPassword.style.borderColor = 'var(--error)';
        passwordError.classList.remove('hidden');
        if (name) inputPassword.focus();
        valid = false;
      } else {
        inputPassword.style.borderColor = '';
        passwordError.classList.add('hidden');
      }

      if (!valid) return;
      this.state.username = name;
      this.saveState();
      this.showApp();
    };

    btnStart.addEventListener('click', doStart);
    inputName.addEventListener('keydown', e => { if (e.key === 'Enter') inputPassword.focus(); });
    inputPassword.addEventListener('keydown', e => { if (e.key === 'Enter') doStart(); });

    // Dashboard
    document.getElementById('btn-go-dashboard').addEventListener('click', () => {
      this.buildDashboard();
      this.showView('dashboard');
    });

    // Sidebar toggle
    const sidebar = document.getElementById('sidebar');
    const main    = document.getElementById('main-content');
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        sidebar.classList.toggle('open');
      } else {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('expanded');
      }
    });

    // Completar encuentro
    document.getElementById('btn-complete-session').addEventListener('click', () => {
      const mIdx = this.state.currentModuleIndex;
      const sIdx = this.state.currentSessionIndex;
      if (mIdx !== null && sIdx !== null) this.completeSession(mIdx, sIdx);
    });

    // Navegación encuentros
    document.getElementById('btn-prev-session').addEventListener('click', () => this.navigateSession(-1));
    document.getElementById('btn-next-session').addEventListener('click', () => this.navigateSession(1));

    // Quiz: navegación paso a paso
    document.getElementById('btn-quiz-prev').addEventListener('click', () => QuizEngine.prevQuestion());
    document.getElementById('btn-quiz-next').addEventListener('click', () => QuizEngine.nextQuestion());
    document.getElementById('btn-submit-quiz').addEventListener('click', () => QuizEngine.submit());

    // Quiz: siguiente encuentro
    document.getElementById('btn-next-module').addEventListener('click', () => {
      const nextMod = this.state.currentModuleIndex + 1;
      if (nextMod < COURSE_DATA.modules.length) {
        this.showSession(nextMod, 0);
      } else {
        this.showCertificate();
      }
    });

    // Quiz: reintentar
    document.getElementById('btn-retry-quiz').addEventListener('click', () => QuizEngine.retry());

    // Revisión toggle
    document.getElementById('btn-toggle-review').addEventListener('click', () => {
      const review = document.getElementById('quiz-review');
      const btn    = document.getElementById('btn-toggle-review');
      review.classList.toggle('hidden');
      btn.textContent = review.classList.contains('hidden')
        ? 'Ver revisión de respuestas ▾'
        : 'Ocultar revisión ▴';
    });

    // Descargar certificado
    document.getElementById('btn-download-cert').addEventListener('click', () => {
      const canvas  = document.getElementById('certificate-canvas');
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
        hotfixes: ['px_scaling']
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificado_PythonIA_Geo_${this.state.username.replace(/\s+/g, '_')}.pdf`);
    });
  },

  /* ── Navegar entre encuentros ───────────────────────────── */
  navigateSession(direction) {
    const mIdx = this.state.currentModuleIndex;
    const next = mIdx + direction;
    if (next >= 0 && next < COURSE_DATA.modules.length) {
      this.showSession(next, 0);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
