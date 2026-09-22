/**
 * Motor de Aprendizaje Anki (Algoritmo SM-2 Spaced Repetition)
 * Guarda intervalos, factor de facilidad (EF) y repeticiones en localStorage.
 */

class AnkiEngine {
  constructor(topicsData) {
    this.allCards = [];
    this.topicsData = topicsData;
    this.userProgress = this.loadProgress();
    this.initCards();
  }

  initCards() {
    this.allCards = [];
    this.topicsData.forEach(topic => {
      topic.cards.forEach(card => {
        const cardProgress = this.userProgress[card.id] || {
          interval: 1, // Días
          repetition: 0,
          ef: 2.5, // Ease Factor inicial de SM-2
          dueDate: new Date().toISOString()
        };
        this.allCards.push({
          ...card,
          topicId: topic.id,
          topicName: topic.name,
          progress: cardProgress
        });
      });
    });
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('ceneval_anki_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Error al cargar progreso de Anki', e);
      return {};
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('ceneval_anki_progress', JSON.stringify(this.userProgress));
    } catch (e) {
      console.error('Error al guardar progreso de Anki', e);
    }
  }

  // Filtra tarjetas por tema ('all', 'difficult', ID de Área o ID de Tema)
  getCardsForTopic(topicId = 'all') {
    if (topicId === 'all') return this.allCards;

    if (topicId === 'difficult') {
      return this.allCards.filter(c => c.progress.repetition === 0 || c.progress.interval === 1);
    }
    
    if (topicId === 'area_1') {
      const area1Topics = ['requerimientos', 'user_story', 'documentacion'];
      return this.allCards.filter(c => area1Topics.includes(c.topicId));
    }
    if (topicId === 'area_2') {
      const area2Topics = ['arquitectura', 'interfaces_ux', 'movil', 'bd_relacional', 'bd_nosql'];
      return this.allCards.filter(c => area2Topics.includes(c.topicId));
    }
    if (topicId === 'area_3') {
      const area3Topics = ['logica', 'python', 'c', 'cpp', 'java', 'javascript', 'paradigmas', 'metodologias', 'calidad_cocomo'];
      return this.allCards.filter(c => area3Topics.includes(c.topicId));
    }
    if (topicId === 'area_4') {
      return this.allCards.filter(c => c.topicId === 'comprension_lectora');
    }

    return this.allCards.filter(c => c.topicId === topicId);
  }

  // Algoritmo SM-2 al calificar una tarjeta
  // grade: 'hard' (0-2), 'good' (3-4), 'easy' (5)
  rateCard(cardId, grade) {
    const card = this.allCards.find(c => c.id === cardId);
    if (!card) return null;

    let { interval, repetition, ef } = card.progress;
    let numericGrade = 3;

    if (grade === 'hard') numericGrade = 1;
    if (grade === 'good') numericGrade = 4;
    if (grade === 'easy') numericGrade = 5;

    // Fórmula SM-2 para Ease Factor
    ef = ef + (0.1 - (5 - numericGrade) * (0.08 + (5 - numericGrade) * 0.02));
    if (ef < 1.3) ef = 1.3;

    let message = '';
    if (numericGrade < 3) {
      // Si la respuesta fue difícil o incorrecta, reiniciar repeticiones
      repetition = 0;
      interval = 1;
      message = '📌 Marcada como Difícil: Repaso inmediato / mañana (Intervalo: 1 día)';
    } else {
      if (repetition === 0) {
        interval = 1;
      } else if (repetition === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * ef);
      }
      repetition += 1;

      if (grade === 'easy' || interval >= 10) {
        message = `🌟 Tarjeta Dominada: Repaso programado en ${interval} días`;
      } else {
        message = `👍 Repaso programado en ${interval} días`;
      }
    }

    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + interval);

    this.userProgress[cardId] = {
      interval,
      repetition,
      ef,
      dueDate: nextDueDate.toISOString()
    };

    card.progress = this.userProgress[cardId];
    this.saveProgress();
    return { interval, repetition, message };
  }

  getStats() {
    const total = this.allCards.length;
    let reviewed = 0;
    let mastered = 0;
    let difficult = 0;

    this.allCards.forEach(c => {
      const p = c.progress;
      if (p.repetition > 0) reviewed++;
      if (p.interval >= 10) mastered++;
      if (p.repetition === 0 || p.interval === 1) difficult++;
    });

    return { total, reviewed, mastered, difficult };
  }
}
