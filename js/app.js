/**
 * Controlador Principal de la Aplicación CENEVAL Master PWA
 * Incluye Grafo Neuronal 2D Canvas Estilo Obsidian ("Vista Gráfica"),
 * Repetición Espaciada Anki, Quiz Simulator y Calculadora COCOMO.
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
            connectors: ['Apunte Guardado - Concepto Personal'],
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
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeText = document.getElementById('theme-text');
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
    if (theme === 'dark') {
      themeText.textContent = 'Modo Oscuro';
    } else {
      themeText.textContent = 'Modo Claro';
    }
  }

  // 4. Navegación por Pestañas
  let obsidianGraph = null;

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
        }
      }
      if (targetTab === 'tab-quiz') renderQuizQuestion();
    });
  });

  // 5. Renderizado de Filtros de Tema
  TOPICS_DATA.forEach(topic => {
    const chip = document.createElement('button');
    chip.className = 'topic-chip';
    chip.setAttribute('data-topic', topic.id);
    chip.textContent = topic.name;
    chip.addEventListener('click', () => {
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeTopicId = topic.id;
      currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
      currentCardIndex = 0;
      renderCurrentCard();
    });
    topicFilterBar.appendChild(chip);
  });

  document.querySelector('.topic-chip[data-topic="all"]').addEventListener('click', (e) => {
    document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    activeTopicId = 'all';
    currentCardList = ankiEngine.getCardsForTopic('all');
    currentCardIndex = 0;
    renderCurrentCard();
  });

  // 6. Lógica de Volteo de Fichas Anki
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
    document.getElementById('anki-mastered-count').textContent = `${stats.mastered} Dominadas`;

    if (currentCardList.length === 0) {
      cardNumEl.textContent = '0';
      totalNumEl.textContent = '0';
      document.getElementById('card-question-text').textContent = 'No hay fichas para este tema.';
      document.getElementById('card-answer-text').textContent = '';
      return;
    }

    cardNumEl.textContent = currentCardIndex + 1;
    totalNumEl.textContent = currentCardList.length;

    const card = currentCardList[currentCardIndex];
    document.getElementById('card-topic-badge').textContent = `${card.topicName} - ${card.badge || ''}`;
    document.getElementById('card-back-badge').textContent = `${card.topicName} - Respuesta`;
    document.getElementById('card-question-text').textContent = card.question;
    document.getElementById('card-answer-text').textContent = card.answer;

    const cardImageView = document.getElementById('card-image-view');
    if (card.image) {
      cardImageView.src = card.image;
      cardImageView.style.display = 'block';
    } else {
      cardImageView.style.display = 'none';
      cardImageView.src = '';
    }

    const codeContainer = document.getElementById('card-code-container');
    const codeText = document.getElementById('card-code-text');
    if (card.codeSnippet) {
      codeText.textContent = card.codeSnippet;
      codeContainer.style.display = 'block';
    } else {
      codeContainer.style.display = 'none';
    }

    const connectorsList = document.getElementById('card-connectors-list');
    connectorsList.innerHTML = '';
    if (card.connectors && card.connectors.length > 0) {
      card.connectors.forEach(conn => {
        const pill = document.createElement('span');
        pill.className = 'connector-pill';
        pill.textContent = conn;
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          alert(`Conector Mental: "${conn}".`);
        });
        connectorsList.appendChild(pill);
      });
    } else {
      connectorsList.innerHTML = '<span style="font-size:0.75rem; color:var(--text-muted);">Sin conectores específicos.</span>';
    }
  }

  // Calificación SM-2
  document.getElementById('btn-rate-hard').addEventListener('click', (e) => handleRating('hard', e));
  document.getElementById('btn-rate-good').addEventListener('click', (e) => handleRating('good', e));
  document.getElementById('btn-rate-easy').addEventListener('click', (e) => handleRating('easy', e));

  function handleRating(grade, e) {
    e.stopPropagation();
    if (currentCardList.length === 0) return;
    const currentCard = currentCardList[currentCardIndex];
    ankiEngine.rateCard(currentCard.id, grade);

    currentCardIndex = (currentCardIndex + 1) % currentCardList.length;
    renderCurrentCard();
  }

  renderCurrentCard();

  // 7. Lógica del Quiz Simulator
  const quizTopicBadge = document.getElementById('quiz-topic-badge');
  const quizScoreBadge = document.getElementById('quiz-score-badge');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsContainer = document.getElementById('quiz-options-container');
  const quizExplanationBox = document.getElementById('quiz-explanation-box');
  const quizExplanationText = document.getElementById('quiz-explanation-text');
  const quizNextBtn = document.getElementById('quiz-next-btn');

  let currentQuestionData = null;

  function renderQuizQuestion() {
    currentQuestionData = quizEngine.getCurrentQuestion();
    quizExplanationBox.classList.remove('visible');
    quizNextBtn.style.display = 'none';
    quizOptionsContainer.innerHTML = '';

    if (!currentQuestionData) {
      quizQuestionText.textContent = 'No hay preguntas disponibles.';
      return;
    }

    const stats = quizEngine.getScoreStats();
    quizScoreBadge.textContent = `Puntaje: ${stats.score} / ${stats.totalAnswered} (${stats.percentage}%)`;
    quizTopicBadge.textContent = currentQuestionData.topicName;
    quizQuestionText.textContent = currentQuestionData.question;

    const letters = ['A', 'B', 'C'];
    currentQuestionData.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <div class="quiz-option-prefix">${letters[idx]}</div>
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

  // 8. Subida de Fotos
  const photoTopicSelect = document.getElementById('photo-topic-select');
  TOPICS_DATA.forEach(topic => {
    const opt = document.createElement('option');
    opt.value = topic.name;
    opt.textContent = topic.name;
    photoTopicSelect.appendChild(opt);
  });

  window.photoUploader = new PhotoUploader((newPhotoCard) => {
    loadUserCardsIntoAnki();
    currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
    renderCurrentCard();
  });

  // 9. Calculadora COCOMO
  const cocomoCalcBtn = document.getElementById('cocomo-calc-btn');
  const cocomoKlocInput = document.getElementById('cocomo-kloc');
  const cocomoModeSelect = document.getElementById('cocomo-mode');

  cocomoCalcBtn.addEventListener('click', runCocomoCalc);

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
 * VISUALIZADOR DE GRAFO NEURONAL 2D CANVAS (ESTILO OBSIDIAN GRAPH VIEW)
 */
class ObsidianGraphRenderer {
  constructor(topicsData, allCards) {
    this.topicsData = topicsData;
    this.allCards = allCards;
    this.canvas = document.getElementById('obsidian-graph-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container = document.getElementById('canvas-graph-container');
    this.popover = document.getElementById('node-detail-popover');
    
    this.activeTopicFilter = 'all';
    this.nodes = [];
    this.edges = [];
    this.hoveredNode = null;
    this.animId = null;

    this.initGraphData();
    this.initControls();
    this.resizeCanvas();
    this.bindEvents();
    this.animate();
  }

  initGraphData() {
    this.nodes = [];
    this.edges = [];

    // Nodos padre (Temas principales)
    this.topicsData.forEach((t, i) => {
      const angle = (i / this.topicsData.length) * Math.PI * 2;
      const topicNode = {
        id: 'topic_' + t.id,
        type: 'topic',
        topicId: t.id,
        label: t.name,
        color: t.color || '#06b6d4',
        radius: 16,
        x: 0,
        y: 0,
        baseAngle: angle,
        vx: 0,
        vy: 0,
        cards: t.cards
      };
      this.nodes.push(topicNode);

      // Nodos hijo (Fichas / Neuronas del tema)
      t.cards.forEach((c, j) => {
        const subAngle = angle + ((j - t.cards.length / 2) * 0.25);
        const cardNode = {
          id: c.id,
          type: 'card',
          topicId: t.id,
          label: c.question,
          answer: c.answer,
          connectors: c.connectors,
          color: '#6366f1',
          radius: 9,
          x: 0,
          y: 0,
          baseAngle: subAngle,
          vx: 0,
          vy: 0
        };
        this.nodes.push(cardNode);

        // Conexión sináptica (Edge) entre tema y tarjeta
        this.edges.push({
          source: topicNode,
          target: cardNode,
          color: 'rgba(99, 102, 241, 0.25)'
        });
      });
    });
  }

  initControls() {
    const controlsContainer = document.getElementById('graph-topic-buttons');
    if (!controlsContainer) return;

    controlsContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'graph-btn active';
    allBtn.textContent = 'Ver Toda la Red Neuronal';
    allBtn.addEventListener('click', () => {
      document.querySelectorAll('.graph-btn').forEach(b => b.classList.remove('active'));
      allBtn.classList.add('active');
      this.filterGraph('all');
    });
    controlsContainer.appendChild(allBtn);

    this.topicsData.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'graph-btn';
      btn.textContent = t.name;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.graph-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterGraph(t.id);
      });
      controlsContainer.appendChild(btn);
    });

    document.getElementById('popover-close-btn').addEventListener('click', () => {
      this.popover.classList.remove('visible');
    });
  }

  filterGraph(topicId) {
    this.activeTopicFilter = topicId;
    this.popover.classList.remove('visible');
    this.resizeCanvas();
  }

  resizeCanvas() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const mainRadius = Math.min(width, height) * 0.32;

    this.nodes.forEach(n => {
      if (n.type === 'topic') {
        n.x = centerX + Math.cos(n.baseAngle) * mainRadius;
        n.y = centerY + Math.sin(n.baseAngle) * mainRadius;
      } else {
        const dist = mainRadius + 75;
        n.x = centerX + Math.cos(n.baseAngle) * dist;
        n.y = centerY + Math.sin(n.baseAngle) * dist;
      }
    });
  }

  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      this.getVisibleNodes().forEach(n => {
        const dist = Math.hypot(n.x - mouseX, n.y - mouseY);
        if (dist <= n.radius + 6) {
          found = n;
        }
      });

      this.hoveredNode = found;
      this.canvas.style.cursor = found ? 'pointer' : 'crosshair';
    });

    this.canvas.addEventListener('click', (e) => {
      if (this.hoveredNode) {
        this.showNodePopover(this.hoveredNode);
      }
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  showNodePopover(node) {
    document.getElementById('popover-badge').textContent = node.type === 'topic' ? 'Tema Central' : 'Neurona / Ficha';
    document.getElementById('popover-title').textContent = node.label;
    document.getElementById('popover-desc').textContent = node.answer || `Presiona este tema central para enfocar sus neuronas de estudio asociadas.`;

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

  getVisibleNodes() {
    if (this.activeTopicFilter === 'all') return this.nodes;
    return this.nodes.filter(n => n.topicId === this.activeTopicFilter);
  }

  getVisibleEdges() {
    const visibleNodes = this.getVisibleNodes();
    return this.edges.filter(e => visibleNodes.includes(e.source) && visibleNodes.includes(e.target));
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const visibleNodes = this.getVisibleNodes();
    const visibleEdges = this.getVisibleEdges();

    // Dibujar conexiones / sinapsis
    visibleEdges.forEach(e => {
      this.ctx.beginPath();
      this.ctx.moveTo(e.source.x, e.source.y);
      this.ctx.lineTo(e.target.x, e.target.y);
      this.ctx.strokeStyle = (this.hoveredNode === e.source || this.hoveredNode === e.target) ? '#06b6d4' : e.color;
      this.ctx.lineWidth = (this.hoveredNode === e.source || this.hoveredNode === e.target) ? 2 : 1;
      this.ctx.stroke();
    });

    // Movimiento sutil flotante
    const time = Date.now() * 0.0015;
    visibleNodes.forEach((n, idx) => {
      const offsetX = Math.sin(time + idx) * 0.4;
      const offsetY = Math.cos(time + idx) * 0.4;

      const drawX = n.x + offsetX;
      const drawY = n.y + offsetY;

      // Dibujar resplandor si hover
      if (this.hoveredNode === n) {
        this.ctx.beginPath();
        this.ctx.arc(drawX, drawY, n.radius + 8, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
        this.ctx.fill();
      }

      // Dibujar nodo
      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, n.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = n.color;
      this.ctx.fill();
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Dibujar etiquetas de texto
      this.ctx.fillStyle = (this.hoveredNode === n) ? '#06b6d4' : '#f8fafc';
      this.ctx.font = n.type === 'topic' ? 'bold 12px Inter' : '10px Inter';
      this.ctx.textAlign = 'center';

      let shortLabel = n.label;
      if (shortLabel.length > 25) shortLabel = shortLabel.substring(0, 22) + '...';
      this.ctx.fillText(shortLabel, drawX, drawY + n.radius + 14);
    });

    this.animId = requestAnimationFrame(() => this.animate());
  }
}
