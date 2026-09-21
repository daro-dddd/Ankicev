/**
 * Controlador Principal de la Aplicación CENEVAL Master PWA
 * Maneja navegación por pestañas, cambio de tema formal, renderizado de tarjetas,
 * integración de apuntes subidos (archivo/link) y conectores conceptuales.
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

  // 2. Cargar tarjetas personalizadas del usuario e integrarlas en el mazo Anki
  function loadUserCardsIntoAnki() {
    try {
      const userCards = JSON.parse(localStorage.getItem('ceneval_user_photo_cards')) || [];
      userCards.forEach(uc => {
        // Verificar si ya existe en el mazo
        if (!ankiEngine.allCards.find(c => c.id === uc.id)) {
          const customAnkiCard = {
            id: uc.id,
            topicId: 'custom',
            topicName: uc.topic || 'Apunte Personal',
            badge: 'Apunte Personal',
            question: uc.title,
            answer: uc.notes,
            image: uc.image,
            connectors: ['Apunte Guardado', uc.topic],
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

  // 3. Elementos DOM de Navegación y Tema
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeText = document.getElementById('theme-text');
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const topicFilterBar = document.getElementById('topic-filter-bar');

  // 4. Manejo de Tema Claro / Oscuro
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

  // 5. Navegación por Pestañas
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      
      navItems.forEach(n => n.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(targetTab).classList.add('active');

      if (targetTab === 'tab-connectors') renderBrainMap();
      if (targetTab === 'tab-quiz') renderQuizQuestion();
    });
  });

  // 6. Renderizado de Filtros de Tema (Sin Emojis)
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

  // 7. Lógica de Volteo de Fichas Anki
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

    // Imagen si la tarjeta la incluye (para apuntes subidos por Link o Archivo)
    const cardImageView = document.getElementById('card-image-view');
    if (card.image) {
      cardImageView.src = card.image;
      cardImageView.style.display = 'block';
    } else {
      cardImageView.style.display = 'none';
      cardImageView.src = '';
    }

    // Snippet de Código
    const codeContainer = document.getElementById('card-code-container');
    const codeText = document.getElementById('card-code-text');
    if (card.codeSnippet) {
      codeText.textContent = card.codeSnippet;
      codeContainer.style.display = 'block';
    } else {
      codeContainer.style.display = 'none';
    }

    // Conectores Mentales
    const connectorsList = document.getElementById('card-connectors-list');
    connectorsList.innerHTML = '';
    if (card.connectors && card.connectors.length > 0) {
      card.connectors.forEach(conn => {
        const pill = document.createElement('span');
        pill.className = 'connector-pill';
        pill.textContent = conn;
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          alert(`Conector Mental: Concepto asociado -> "${conn}".`);
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

  // 8. Renderizado de Conectores Mentales
  function renderBrainMap() {
    const grid = document.getElementById('connector-map-grid');
    grid.innerHTML = '';

    TOPICS_DATA.forEach(t => {
      const cardEl = document.createElement('div');
      cardEl.className = 'map-card';
      
      let linksHTML = '';
      t.cards.forEach(c => {
        if (c.connectors) {
          c.connectors.forEach(conn => {
            linksHTML += `<div class="map-link-item"><span>${c.question.substring(0, 40)}...</span> <span>Conecta con: ${conn}</span></div>`;
          });
        }
      });

      cardEl.innerHTML = `
        <div class="map-card-title">${t.name}</div>
        <div class="map-card-desc">${t.description}</div>
        <div class="map-links">
          ${linksHTML || '<div class="map-link-item"><span>Fundamentos del tema</span></div>'}
        </div>
      `;
      grid.appendChild(cardEl);
    });
  }

  // 9. Lógica del Quiz Simulator (3 Opciones Separadas)
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

  // 10. Subida de Fotos y Creación de Ficha Anki
  const photoTopicSelect = document.getElementById('photo-topic-select');
  TOPICS_DATA.forEach(topic => {
    const opt = document.createElement('option');
    opt.value = topic.name;
    opt.textContent = topic.name;
    photoTopicSelect.appendChild(opt);
  });

  window.photoUploader = new PhotoUploader((newPhotoCard) => {
    // Cuando el usuario crea un apunte con foto o link, se integra inmediatamente en Anki
    loadUserCardsIntoAnki();
    currentCardList = ankiEngine.getCardsForTopic(activeTopicId);
    renderCurrentCard();
  });

  // 11. Calculadora COCOMO
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
