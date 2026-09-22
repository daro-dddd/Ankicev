/**
 * Controlador Principal de la Aplicación CENEVAL Master PWA
 * Pestaña Red Neuronal con Arrastre (Drag) y Colores Pastel.
 * Oculta el contenedor canvas hasta presionar un botón de tema.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicialización de Motores
  const ankiEngine = new AnkiEngine(TOPICS_DATA);
  const quizEngine = new QuizEngine(TOPICS_DATA);
  const cocomoCalc = new CocomoCalculator();

  let activeTopicId = 'all';
  let currentCardList = ankiEngine.getCardsForTopic('all');
  let currentCardIndex = 0;
  let isCardFlipped = false;

  // 2. Cargar tarjetas personalizadas del usuario en Anki
  function loadUserCardsIntoAnki() {
    try {
      const userCards = JSON.parse(localStorage.getItem('ceneval_user_photo_cards')) || [];
      userCards.forEach(uc => {
        if (!ankiEngine.allCards.find(c => c.id === uc.id)) {
          const customAnkiCard = {
            id: uc.id,
            topicId: 'custom',
            topicName: uc.topic || 'Apunte Personal',
            badge: 'Apunte Personal',
            question: uc.title,
            answer: uc.notes,
            image: uc.image,
            citation: 'Apunte Guardado por el Usuario',
            connectors: ['Apunte Personal', 'Apunte Guardado'],
            progress: {
              interval: 1,
              repetition: 0,
              ef: 2.5,
              dueDate: new Date().toISOString()
            }
          };
          ankiEngine.allCards.unshift(customAnkiCard);
        }
      });
    } catch (e) {
      console.error('Error al integrar apuntes en Anki:', e);
    }
  }

  loadUserCardsIntoAnki();

  // 3. Manejo de Tema Claro / Oscuro
  let obsidianGraph = null;

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const topicFilterBar = document.getElementById('topic-filter-bar');

  const savedTheme = localStorage.getItem('ceneval_theme') || 'dark';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ceneval_theme', theme);
    if (themeToggleBtn) {
      if (theme === 'dark') {
        themeToggleBtn.setAttribute('title', 'Cambiar a Modo Claro');
        themeToggleBtn.setAttribute('aria-label', 'Cambiar a Modo Claro');
        themeToggleBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      } else {
        themeToggleBtn.setAttribute('title', 'Cambiar a Modo Oscuro');
        themeToggleBtn.setAttribute('aria-label', 'Cambiar a Modo Oscuro');
        themeToggleBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    }
    if (typeof obsidianGraph !== 'undefined' && obsidianGraph) {
      obsidianGraph.updateThemeBackground();
    }
  }

  // Toast Notification para Calificaciones
  function showToast(msg) {
    const toast = document.getElementById('anki-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (window.toastTimer) clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Modal Explicación Algoritmo SM-2
  const sm2InfoBtn = document.getElementById('sm2-info-btn');
  const sm2Modal = document.getElementById('sm2-modal');
  const sm2ModalClose = document.getElementById('sm2-modal-close');

  if (sm2InfoBtn && sm2Modal) {
    sm2InfoBtn.addEventListener('click', () => sm2Modal.classList.add('active'));
  }
  if (sm2ModalClose && sm2Modal) {
    sm2ModalClose.addEventListener('click', () => sm2Modal.classList.remove('active'));
    sm2Modal.addEventListener('click', (e) => {
      if (e.target === sm2Modal) sm2Modal.classList.remove('active');
    });
  }

  // Persistencia de la Posición Exacta de Estudio (Ficha y Tema)
  const savedTopicId = localStorage.getItem('ceneval_last_topic_id') || 'all';
  const savedCardIndex = parseInt(localStorage.getItem('ceneval_last_card_index') || '0', 10);

  activeTopicId = savedTopicId;
  currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
  if (savedCardIndex >= 0 && savedCardIndex < currentCardList.length) {
    currentCardIndex = savedCardIndex;
  } else {
    currentCardIndex = 0;
  }

  function saveCurrentStudyState() {
    try {
      localStorage.setItem('ceneval_last_topic_id', activeTopicId);
      localStorage.setItem('ceneval_last_card_index', currentCardIndex.toString());
    } catch (e) {
      console.error('Error al guardar estado de estudio:', e);
    }
  }

  // 4. Navegación por Pestañas
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      
      navItems.forEach(n => n.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(targetTab).classList.add('active');

      if (targetTab === 'tab-connectors') {
        if (!obsidianGraph) {
          obsidianGraph = new ObsidianGraphRenderer(TOPICS_DATA, ankiEngine.allCards);
        } else {
          obsidianGraph.resizeCanvas();
          obsidianGraph.updateThemeBackground();
        }
      }
      if (targetTab === 'tab-quiz') renderQuizQuestion();
    });
  });

  // 5. Renderizado de Filtros por Área, Tema e Historial de Difíciles
  const allChip = document.querySelector('.topic-chip[data-topic="all"]');
  if (allChip) {
    allChip.textContent = 'Todos los Temas (100 Fichas)';
    if (activeTopicId === 'all') allChip.classList.add('active');
    else allChip.classList.remove('active');

    allChip.addEventListener('click', (e) => {
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      allChip.classList.add('active');
      activeTopicId = 'all';
      currentCardList = ankiEngine.getCardsForTopic('all');
      currentCardIndex = 0;
      saveCurrentStudyState();
      renderCurrentCard();
    });
  }

  // Chip Filtro Fichas Difíciles / Por Repasar
  const initialStats = ankiEngine.getStats();
  const diffChip = document.createElement('button');
  diffChip.className = 'topic-chip diff-chip';
  diffChip.setAttribute('data-topic', 'difficult');
  diffChip.textContent = `Por Repasar / Difíciles (${initialStats.difficult})`;
  if (activeTopicId === 'difficult') diffChip.classList.add('active');

  diffChip.addEventListener('click', () => {
    document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
    diffChip.classList.add('active');
    activeTopicId = 'difficult';
    currentCardList = ankiEngine.getCardsForTopic('difficult');
    currentCardIndex = 0;
    saveCurrentStudyState();
    renderCurrentCard();
  });
  topicFilterBar.appendChild(diffChip);

  // Auto-Ocultar Barra Flotante de Navegación al Hacer Scroll Hacia Abajo
  let lastScrollY = window.scrollY;
  const bottomNav = document.querySelector('.bottom-nav');

  if (bottomNav) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 40) {
        bottomNav.classList.remove('nav-hidden');
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY + 8) {
        // Scroll hacia abajo -> ocultar barra flotante
        bottomNav.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY - 8) {
        // Scroll hacia arriba -> mostrar barra flotante
        bottomNav.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // Chips para las 4 Áreas Principales de CENEVAL EGEL Plus ISOFT
  const cenevalAreas = [
    { id: 'area_1', name: 'Área 1: Requerimientos & Documentación' },
    { id: 'area_2', name: 'Área 2: Arquitectura, UX & Bases de Datos' },
    { id: 'area_3', name: 'Área 3: Programación, Paradigmas & Calidad' },
    { id: 'area_4', name: 'Área 4: Transversal Comprensión Lectora' }
  ];

  cenevalAreas.forEach(area => {
    const areaChip = document.createElement('button');
    areaChip.className = 'topic-chip area-chip';
    areaChip.setAttribute('data-topic', area.id);
    areaChip.textContent = area.name;
    if (activeTopicId === area.id) areaChip.classList.add('active');

    areaChip.addEventListener('click', () => {
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      areaChip.classList.add('active');
      activeTopicId = area.id;
      currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
      currentCardIndex = 0;
      saveCurrentStudyState();
      renderCurrentCard();
    });
    topicFilterBar.appendChild(areaChip);
  });

  // Chips para cada uno de los 18 temas individuales
  TOPICS_DATA.forEach(topic => {
    const chip = document.createElement('button');
    chip.className = 'topic-chip';
    chip.setAttribute('data-topic', topic.id);
    chip.textContent = `${topic.name} (${topic.cards ? topic.cards.length : 0})`;
    if (activeTopicId === topic.id) chip.classList.add('active');

    chip.addEventListener('click', () => {
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeTopicId = topic.id;
      currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
      currentCardIndex = 0;
      saveCurrentStudyState();
      renderCurrentCard();
    });
    topicFilterBar.appendChild(chip);
  });

  // 6. Renderizado Limpio de Fichas Anki
  const flashcardWrapper = document.getElementById('flashcard-wrapper');
  const flashcard = document.getElementById('flashcard');
  const ankiControls = document.getElementById('anki-controls');

  flashcardWrapper.addEventListener('click', () => {
    isCardFlipped = !isCardFlipped;
    if (isCardFlipped) {
      flashcard.classList.add('flipped');
      ankiControls.style.visibility = 'visible';
    } else {
      flashcard.classList.remove('flipped');
      ankiControls.style.visibility = 'hidden';
    }
  });

  function renderCurrentCard() {
    isCardFlipped = false;
    flashcard.classList.remove('flipped');
    ankiControls.style.visibility = 'hidden';

    const cardNumEl = document.getElementById('current-card-num');
    const totalNumEl = document.getElementById('total-cards-num');
    const stats = ankiEngine.getStats();

    // Actualiza contador de difíciles en chip
    if (diffChip) {
      diffChip.textContent = `Por Repasar / Difíciles (${stats.difficult})`;
    }

    if (currentCardList.length === 0) {
      cardNumEl.textContent = '0';
      totalNumEl.textContent = '0';
      document.getElementById('card-question-text').textContent = 'No hay tarjetas disponibles para este filtro.';
      document.getElementById('card-answer-text').textContent = '';
      document.getElementById('card-topic-badge').textContent = 'Vacío';
      document.getElementById('card-front-connectors').innerHTML = '';
      document.getElementById('card-back-connectors').innerHTML = '';
      document.getElementById('card-citation-box').textContent = '';
      return;
    }

    if (currentCardIndex >= currentCardList.length) {
      currentCardIndex = 0;
    }

    saveCurrentStudyState();

    const card = currentCardList[currentCardIndex];
    cardNumEl.textContent = (currentCardIndex + 1).toString();
    totalNumEl.textContent = currentCardList.length.toString();
    document.getElementById('anki-mastered-count').textContent = `${stats.mastered} Dominadas`;

    // Frente
    document.getElementById('card-topic-badge').textContent = card.badge || card.topicName || 'General';
    document.getElementById('card-question-text').textContent = card.question;

    const frontConnEl = document.getElementById('card-front-connectors');
    frontConnEl.innerHTML = '';
    if (card.connectors && card.connectors.length > 0) {
      card.connectors.forEach(conn => {
        const tag = document.createElement('span');
        tag.className = 'connector-tag';
        tag.textContent = conn;
        frontConnEl.appendChild(tag);
      });
    }

    // Reverso
    document.getElementById('card-back-badge').textContent = card.badge || 'Respuesta';
    document.getElementById('card-answer-text').textContent = card.answer;

    const backConnEl = document.getElementById('card-back-connectors');
    backConnEl.innerHTML = '';
    if (card.connectors && card.connectors.length > 0) {
      card.connectors.forEach(conn => {
        const tag = document.createElement('span');
        tag.className = 'connector-tag';
        tag.textContent = conn;
        backConnEl.appendChild(tag);
      });
    }

    // Código
    const codeContainer = document.getElementById('card-code-container');
    const codeText = document.getElementById('card-code-text');
    if (card.codeSnippet) {
      codeText.textContent = card.codeSnippet;
      codeContainer.style.display = 'block';
    } else {
      codeContainer.style.display = 'none';
    }

    // Imagen
    const imgView = document.getElementById('card-image-view');
    if (card.image) {
      imgView.src = card.image;
      imgView.style.display = 'block';
    } else {
      imgView.style.display = 'none';
    }

    // Cita Bibliográfica CENEVAL ABAJO
    document.getElementById('card-citation-box').textContent = card.citation ? `Ref. CENEVAL: ${card.citation}` : '';
  }

  // 7. Botones de Calificación Anki
  document.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentCardList.length === 0) return;

      const grade = btn.getAttribute('data-grade');
      const card = currentCardList[currentCardIndex];
      const res = ankiEngine.rateCard(card.id, grade);

      if (res && res.message) {
        showToast(res.message);
      }

      currentCardIndex = (currentCardIndex + 1) % currentCardList.length;
      saveCurrentStudyState();
      renderCurrentCard();
    });
  });

  renderCurrentCard();

  // 8. Quiz Engine Simulator (3 Opciones con Explicación Completa)
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizTopicBadge = document.getElementById('quiz-topic-badge');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizExplanationBox = document.getElementById('quiz-explanation-box');
  const quizExplanationText = document.getElementById('quiz-explanation-text');
  const quizNextBtn = document.getElementById('quiz-next-btn');
  const quizScoreBadge = document.getElementById('quiz-score-badge');

  function renderQuizQuestion() {
    quizExplanationBox.classList.remove('visible');
    quizNextBtn.style.display = 'none';
    quizOptionsContainer.innerHTML = '';

    const currentQuestionData = quizEngine.getCurrentQuestion();
    if (!currentQuestionData) {
      quizQuestionText.textContent = 'No hay preguntas disponibles.';
      return;
    }

    quizTopicBadge.textContent = currentQuestionData.topicName || currentQuestionData.topic;
    quizQuestionText.textContent = currentQuestionData.question;

    const stats = quizEngine.getScoreStats();
    quizScoreBadge.textContent = `Puntaje: ${stats.score} / ${stats.totalAnswered} (${stats.percentage}%)`;

    const letters = ['A', 'B', 'C'];
    currentQuestionData.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="quiz-option-letter">${letters[idx]}</span>
        <span>${opt.text}</span>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.quiz-option-btn').forEach(b => b.style.pointerEvents = 'none');

        const result = quizEngine.submitAnswer(opt);
        if (opt.isCorrect) {
          btn.classList.add('selected-correct');
        } else {
          btn.classList.add('selected-wrong');
          document.querySelectorAll('.quiz-option-btn').forEach((b, i) => {
            if (currentQuestionData.options[i].isCorrect) {
              b.classList.add('selected-correct');
            }
          });
        }

        quizExplanationText.innerHTML = `<strong>${result.explanation}</strong><br><br>${currentQuestionData.explanation}`;
        quizExplanationBox.classList.add('visible');
        quizNextBtn.style.display = 'block';

        const updatedStats = quizEngine.getScoreStats();
        quizScoreBadge.textContent = `Puntaje: ${updatedStats.score} / ${updatedStats.totalAnswered} (${updatedStats.percentage}%)`;
      });

      quizOptionsContainer.appendChild(btn);
    });
  }

  quizNextBtn.addEventListener('click', () => {
    quizEngine.nextQuestion();
    renderQuizQuestion();
  });

  // 9. Subida de Fotos
  const photoTopicSelect = document.getElementById('photo-topic-select');
  if (photoTopicSelect) {
    TOPICS_DATA.forEach(topic => {
      const opt = document.createElement('option');
      opt.value = topic.name;
      opt.textContent = topic.name;
      photoTopicSelect.appendChild(opt);
    });
  }

  window.photoUploader = new PhotoUploader((newPhotoCard) => {
    loadUserCardsIntoAnki();
    currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
    renderCurrentCard();
  });

  // 10. Calculadora COCOMO
  const cocomoCalcBtn = document.getElementById('cocomo-calc-btn');
  const cocomoKlocInput = document.getElementById('cocomo-kloc');
  const cocomoModeSelect = document.getElementById('cocomo-mode');

  if (cocomoCalcBtn) {
    cocomoCalcBtn.addEventListener('click', runCocomoCalc);
  }

  function runCocomoCalc() {
    const kloc = parseFloat(cocomoKlocInput.value) || 10;
    const mode = cocomoModeSelect.value;
    const result = cocomoCalc.calculate(kloc, mode);

    document.getElementById('res-pm').textContent = `${result.pm} Personas-Mes`;
    document.getElementById('res-tdev').textContent = `${result.tdev} Meses`;
    document.getElementById('res-staff').textContent = `${result.staff} Desarrolladores`;

    const stepsList = document.getElementById('cocomo-steps-list');
    stepsList.innerHTML = result.steps.map(s => `<p style="margin-bottom:8px;">• ${s}</p>`).join('');
  }

  runCocomoCalc();
});

/**
 * VISUALIZADOR DE GRAFO NEURONAL 2D CANVAS CON COLORES PASTEL, NODO ARRASTRABLE, FONDO DINÁMICO DE TEMA Y TEXTO HIPER NÍTIDO (NO BORROSO)
 */
class ObsidianGraphRenderer {
  constructor(topicsData, allCards) {
    this.topicsData = topicsData;
    this.allCards = allCards;
    this.canvas = document.getElementById('obsidian-graph-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container = document.getElementById('canvas-graph-container');
    this.popover = document.getElementById('node-detail-popover');

    this.pastelColors = ['#c084fc', '#6ee7b7', '#7dd3fc', '#fda4af', '#fcd34d'];
    this.selectedTopicId = null;
    this.activeThemeColor = '#6366f1';
    this.nodes = [];
    this.edges = [];
    this.hoveredNode = null;
    this.draggedNode = null;
    this.isDragging = false;
    this.dpr = window.devicePixelRatio || 1;

    this.initControls();
    this.bindEvents();
    this.animate();
  }

  hexToRgba(hex, alpha = 1) {
    if (!hex) return `rgba(99, 102, 241, ${alpha})`;
    if (hex.startsWith('#')) hex = hex.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    if (isNaN(num)) return `rgba(99, 102, 241, ${alpha})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  updateThemeBackground() {
    if (!this.container) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const topicColor = this.activeThemeColor || '#6366f1';
    const bgStart = this.hexToRgba(topicColor, isLight ? 0.22 : 0.35);
    const bgMid = isLight ? '#f1f5f9' : '#0f172a';
    const bgEnd = isLight ? '#e2e8f0' : '#060911';
    
    this.container.style.background = `radial-gradient(circle at 50% 45%, ${bgStart} 0%, ${bgMid} 70%, ${bgEnd} 100%)`;
    this.container.style.borderColor = this.hexToRgba(topicColor, 0.4);
  }

  initControls() {
    const gridContainer = document.getElementById('pastel-topic-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    this.topicsData.forEach((t, idx) => {
      const btn = document.createElement('button');
      btn.className = 'pastel-topic-btn';
      btn.textContent = t.name;
      const tColor = t.color || this.pastelColors[idx % this.pastelColors.length];
      btn.style.borderColor = tColor;
      
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pastel-topic-btn').forEach(b => {
          b.classList.remove('active');
          b.style.backgroundColor = '';
          b.style.color = '';
        });
        btn.classList.add('active');
        btn.style.backgroundColor = tColor;
        btn.style.color = '#ffffff';
        this.loadTopicGraph(t.id, tColor);
      });
      gridContainer.appendChild(btn);
    });

    document.getElementById('popover-close-btn').addEventListener('click', () => {
      this.popover.classList.remove('visible');
    });
  }

  loadTopicGraph(topicId, themeColor) {
    this.selectedTopicId = topicId;
    this.activeThemeColor = themeColor || '#6366f1';
    
    if (this.container) {
      this.container.classList.add('active');
      this.updateThemeBackground();
    }
    
    this.popover.classList.remove('visible');
    this.resizeCanvas();

    const topicData = this.topicsData.find(t => t.id === topicId);
    if (!topicData) return;

    this.nodes = [];
    this.edges = [];

    const width = this.cssWidth || 340;
    const height = this.cssHeight || 480;
    const centerX = width / 2;
    const centerY = height / 2;

    const centerNode = {
      id: 'center_' + topicData.id,
      label: topicData.name,
      shortLabel: topicData.name,
      color: themeColor,
      radius: 20,
      x: centerX,
      y: centerY,
      isCenter: true
    };
    this.nodes.push(centerNode);

    const cards = topicData.cards || [];
    cards.forEach((c, idx) => {
      const angle = (idx / cards.length) * Math.PI * 2;
      const radiusDist = 130 + (idx % 2 === 0 ? 35 : -25);
      
      const words = c.question.split(' ');
      const shortLabel = words.slice(0, 3).join(' ');

      const childNode = {
        id: c.id,
        label: c.question,
        shortLabel: shortLabel,
        answer: c.answer,
        citation: c.citation,
        connectors: c.connectors,
        color: this.pastelColors[(idx + 1) % this.pastelColors.length],
        radius: 12,
        x: centerX + Math.cos(angle) * radiusDist,
        y: centerY + Math.sin(angle) * radiusDist,
        isCenter: false
      };
      this.nodes.push(childNode);

      this.edges.push({
        source: centerNode,
        target: childNode,
        color: themeColor
      });
    });
  }

  resizeCanvas() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.dpr = dpr;
    this.cssWidth = rect.width || 340;
    this.cssHeight = rect.height || 480;

    this.canvas.width = Math.round(this.cssWidth * dpr);
    this.canvas.height = Math.round(this.cssHeight * dpr);
    this.canvas.style.width = this.cssWidth + 'px';
    this.canvas.style.height = this.cssHeight + 'px';
  }

  bindEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onStart = (e) => {
      const pos = getPos(e);
      let found = null;
      this.nodes.forEach(n => {
        if (Math.hypot(n.x - pos.x, n.y - pos.y) <= n.radius + 10) {
          found = n;
        }
      });

      if (found) {
        this.draggedNode = found;
        this.isDragging = true;
      }
    };

    const onMove = (e) => {
      const pos = getPos(e);

      if (this.isDragging && this.draggedNode) {
        this.draggedNode.x = pos.x;
        this.draggedNode.y = pos.y;
        return;
      }

      let found = null;
      this.nodes.forEach(n => {
        if (Math.hypot(n.x - pos.x, n.y - pos.y) <= n.radius + 10) {
          found = n;
        }
      });

      this.hoveredNode = found;
      this.canvas.style.cursor = found ? 'pointer' : 'grab';
    };

    const onEnd = () => {
      if (this.isDragging && this.draggedNode && !this.hoveredNode) {
        this.showNodePopover(this.draggedNode);
      } else if (this.hoveredNode) {
        this.showNodePopover(this.hoveredNode);
      }
      this.isDragging = false;
      this.draggedNode = null;
    };

    this.canvas.addEventListener('mousedown', onStart);
    this.canvas.addEventListener('mousemove', onMove);
    this.canvas.addEventListener('mouseup', onEnd);

    this.canvas.addEventListener('touchstart', onStart, { passive: true });
    this.canvas.addEventListener('touchmove', onMove, { passive: true });
    this.canvas.addEventListener('touchend', onEnd);

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  showNodePopover(node) {
    document.getElementById('popover-badge').textContent = node.isCenter ? 'Tema Principal' : 'Neurona / Concepto';
    document.getElementById('popover-title').textContent = node.label;
    
    let desc = node.answer || 'Mueve o presiona este nodo central para explorar sus ramificaciones.';
    if (node.citation) {
      desc += `<br><br><span style="font-size:0.75rem; color:var(--text-muted);">Ref. CENEVAL: ${node.citation}</span>`;
    }
    document.getElementById('popover-desc').innerHTML = desc;

    const connContainer = document.getElementById('popover-connectors');
    connContainer.innerHTML = '';
    if (node.connectors) {
      node.connectors.forEach(c => {
        const pill = document.createElement('span');
        pill.className = 'connector-pill';
        pill.textContent = c;
        connContainer.appendChild(pill);
      });
    }

    this.popover.classList.add('visible');
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.nodes.length > 0) {
      this.ctx.save();
      // ESCALADO DISPOSITIVO ALTA DEFINICIÓN (RETINA / HIDPI) - ELIMINA LO BORROSO
      this.ctx.scale(this.dpr, this.dpr);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Dibujar aristas / conectores
      this.edges.forEach(e => {
        this.ctx.beginPath();
        this.ctx.moveTo(e.source.x, e.source.y);
        this.ctx.lineTo(e.target.x, e.target.y);
        const isHovered = (this.hoveredNode === e.source || this.hoveredNode === e.target);
        this.ctx.strokeStyle = isHovered 
          ? (e.color || '#c084fc') 
          : this.hexToRgba(e.color || '#c084fc', isLight ? 0.35 : 0.25);
        this.ctx.lineWidth = isHovered ? 2.5 : 1.5;
        this.ctx.stroke();
      });

      const time = Date.now() * 0.0015;
      this.nodes.forEach((n, idx) => {
        if (!this.isDragging || this.draggedNode !== n) {
          n.x += Math.sin(time + idx) * 0.22;
          n.y += Math.cos(time + idx) * 0.22;
        }

        // Halo de selección al pasar el cursor o dedo
        if (this.hoveredNode === n) {
          this.ctx.beginPath();
          this.ctx.arc(n.x, n.y, n.radius + 7, 0, Math.PI * 2);
          this.ctx.fillStyle = this.hexToRgba(n.color, 0.35);
          this.ctx.fill();
        }

        // Dibujo del nodo neuronal
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = n.color;
        this.ctx.fill();
        this.ctx.strokeStyle = isLight ? '#ffffff' : '#090d16';
        this.ctx.lineWidth = 2.5;
        this.ctx.stroke();

        // RENDERIZADO ULTRA NÍTIDO DE TEXTO (Pill de fondo + contraste vector)
        const fontStr = n.isCenter ? 'bold 12px Inter, system-ui, sans-serif' : '600 10.5px Inter, system-ui, sans-serif';
        this.ctx.font = fontStr;
        const textWidth = this.ctx.measureText(n.shortLabel).width;
        const textY = n.y + n.radius + 14;

        // Fondo semi-transparente para legibilidad perfecta
        this.ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.88)' : 'rgba(9, 13, 22, 0.82)';
        this.ctx.beginPath();
        const pX = n.x - textWidth / 2 - 6;
        const pY = textY - 9;
        const pW = textWidth + 12;
        const pH = 16;
        
        if (this.ctx.roundRect) {
          this.ctx.roundRect(pX, pY, pW, pH, 4);
        } else {
          this.ctx.rect(pX, pY, pW, pH);
        }
        this.ctx.fill();
        this.ctx.strokeStyle = this.hexToRgba(n.color, isLight ? 0.3 : 0.4);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Texto hiper nítido vectorizado
        this.ctx.fillStyle = (this.hoveredNode === n) ? (isLight ? '#4f46e5' : '#c084fc') : (isLight ? '#0f172a' : '#ffffff');
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(n.shortLabel, n.x, textY - 1);
      });

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}
