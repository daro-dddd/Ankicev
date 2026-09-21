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

  // Filtra tarjetas por tema ('all' o ID del tema)
  getCardsForTopic(topicId = 'all') {
    if (topicId === 'all') return this.allCards;
    return this.allCards.filter(c => c.topicId === topicId);
  }

  // Algoritmo SM-2 al calificar una tarjeta
  // grade: 'hard' (0-2), 'good' (3-4), 'easy' (5)
  rateCard(cardId, grade) {
    const card = this.allCards.find(c => c.id === cardId);
    if (!card) return;

    let { interval, repetition, ef } = card.progress;
    let numericGrade = 3;

    if (grade === 'hard') numericGrade = 1;
    if (grade === 'good') numericGrade = 4;
    if (grade === 'easy') numericGrade = 5;

    // Fórmula SM-2 para Ease Factor
    ef = ef + (0.1 - (5 - numericGrade) * (0.08 + (5 - numericGrade) * 0.02));
    if (ef < 1.3) ef = 1.3;

    if (numericGrade < 3) {
      // Si la respuesta fue difícil o incorrecta, reiniciar repeticiones
      repetition = 0;
      interval = 1;
    } else {
      if (repetition === 0) {
        interval = 1;
      } else if (repetition === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * ef);
      }
      repetition += 1;
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
  }

  getStats() {
    const total = this.allCards.length;
    let reviewed = 0;
    let mastered = 0;

    Object.values(this.userProgress).forEach(p => {
      if (p.repetition > 0) reviewed++;
      if (p.interval >= 10) mastered++;
    });

    return { total, reviewed, mastered };
  }
}
