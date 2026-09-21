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

  // 5. Renderizado de Filtros por Área y Tema Individual
  const allChip = document.querySelector('.topic-chip[data-topic="all"]');
  if (allChip) {
    allChip.textContent = 'Todos los Temas (100 Fichas)';
    allChip.addEventListener('click', (e) => {
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      allChip.classList.add('active');
      activeTopicId = 'all';
      currentCardList = ankiEngine.getCardsForTopic('all');
      currentCardIndex = 0;
      renderCurrentCard();
    });
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
    areaChip.addEventListener('click', () => {
      document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
      areaChip.classList.add('active');
      activeTopicId = area.id;
      currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
      currentCardIndex = 0;
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

  // 6. Renderizado Limpio de Fichas Anki (Conectores ARRIBA, Referencia ABAJO)
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

    // CONECTORES ARRIBA (Palabras Clave)
    const frontConnContainer = document.getElementById('card-front-connectors');
    const backConnContainer = document.getElementById('card-back-connectors');
    frontConnContainer.innerHTML = '';
    backConnContainer.innerHTML = '';

    if (card.connectors && card.connectors.length > 0) {
      card.connectors.forEach(conn => {
        const shortKeyword = conn.split('-')[0].trim();
        
        const pillFront = document.createElement('span');
        pillFront.className = 'connector-pill';
        pillFront.textContent = shortKeyword;
        frontConnContainer.appendChild(pillFront);

        const pillBack = document.createElement('span');
        pillBack.className = 'connector-pill';
        pillBack.textContent = conn;
        backConnContainer.appendChild(pillBack);
      });
    }

    document.getElementById('card-topic-badge').textContent = card.topicName;
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

    // REFERENCIA BIBLIOGRÁFICA ABAJO EN LETRAS PEQUEÑAS
    const citationBox = document.getElementById('card-citation-box');
    if (card.citation) {
      citationBox.textContent = `Ref. CENEVAL: ${card.citation}`;
      citationBox.style.display = 'block';
    } else {
      citationBox.style.display = 'none';
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
 * VISUALIZADOR DE GRAFO NEURONAL 2D CANVAS CON COLORES PASTEL Y NODO ARRASTRABLE (DRAGGABLE)
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
    this.nodes = [];
    this.edges = [];
    this.hoveredNode = null;
    this.draggedNode = null;
    this.isDragging = false;

    this.initControls();
    this.bindEvents();
    this.animate();
  }

  initControls() {
    const gridContainer = document.getElementById('pastel-topic-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    this.topicsData.forEach((t, idx) => {
      const btn = document.createElement('button');
      btn.className = 'pastel-topic-btn';
      btn.textContent = t.name;
      btn.style.borderColor = this.pastelColors[idx % this.pastelColors.length];
      
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pastel-topic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.loadTopicGraph(t.id, this.pastelColors[idx % this.pastelColors.length]);
      });
      gridContainer.appendChild(btn);
    });

    document.getElementById('popover-close-btn').addEventListener('click', () => {
      this.popover.classList.remove('visible');
    });
  }

  loadTopicGraph(topicId, themeColor) {
    this.selectedTopicId = topicId;
    
    // MUESTRA EL CONTENEDOR CANVAS SOLO TRAS HACER CLIC EN UN BOTÓN DE TEMA
    if (this.container) {
      this.container.classList.add('active');
    }
    
    this.popover.classList.remove('visible');
    this.resizeCanvas();

    const topicData = this.topicsData.find(t => t.id === topicId);
    if (!topicData) return;

    this.nodes = [];
    this.edges = [];

    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const centerNode = {
      id: 'center_' + topicData.id,
      label: topicData.name,
      shortLabel: topicData.name.substring(0, 18),
      color: themeColor,
      radius: 18,
      x: centerX,
      y: centerY,
      isCenter: true
    };
    this.nodes.push(centerNode);

    const cards = topicData.cards || [];
    cards.forEach((c, idx) => {
      const angle = (idx / cards.length) * Math.PI * 2;
      const radiusDist = 120 + (idx % 2 === 0 ? 30 : -20);
      
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
        radius: 11,
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
    this.canvas.width = this.container.clientWidth || 340;
    this.canvas.height = this.container.clientHeight || 480;
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
        if (Math.hypot(n.x - pos.x, n.y - pos.y) <= n.radius + 8) {
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
        if (Math.hypot(n.x - pos.x, n.y - pos.y) <= n.radius + 8) {
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
      this.edges.forEach(e => {
        this.ctx.beginPath();
        this.ctx.moveTo(e.source.x, e.source.y);
        this.ctx.lineTo(e.target.x, e.target.y);
        this.ctx.strokeStyle = (this.hoveredNode === e.source || this.hoveredNode === e.target) ? '#c084fc' : 'rgba(192, 132, 252, 0.2)';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      });

      const time = Date.now() * 0.0015;
      this.nodes.forEach((n, idx) => {
        if (!this.isDragging || this.draggedNode !== n) {
          n.x += Math.sin(time + idx) * 0.25;
          n.y += Math.cos(time + idx) * 0.25;
        }

        if (this.hoveredNode === n) {
          this.ctx.beginPath();
          this.ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
          this.ctx.fillStyle = 'rgba(192, 132, 252, 0.25)';
          this.ctx.fill();
        }

        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = n.color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#090d16';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.fillStyle = (this.hoveredNode === n) ? '#c084fc' : '#f8fafc';
        this.ctx.font = n.isCenter ? 'bold 11px Inter' : '9px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(n.shortLabel, n.x, n.y + n.radius + 12);
      });
    }

    requestAnimationFrame(() => this.animate());
  }
}
