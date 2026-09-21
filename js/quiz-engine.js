/**
 * Motor del Simulador de Examen CENEVAL (3 Opciones: Correcta, Distractor e Incorrecta).
 * Presenta preguntas aleatorias con explicaciones detalladas.
 */

class QuizEngine {
  constructor(topicsData) {
    this.topicsData = topicsData;
    this.currentQuizIndex = 0;
    this.score = 0;
    this.totalAnswered = 0;
    this.quizzesList = [];
    this.initQuizzes();
  }

  initQuizzes() {
    this.quizzesList = [];
    this.topicsData.forEach(topic => {
      if (topic.quizzes) {
        topic.quizzes.forEach(q => {
          this.quizzesList.push({
            ...q,
            topicName: topic.name,
            topicColor: topic.color
          });
        });
      }
    });

    // Mezclar las preguntas aleatoriamente
    this.shuffleArray(this.quizzesList);
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  getCurrentQuestion() {
    if (this.quizzesList.length === 0) return null;
    const q = this.quizzesList[this.currentQuizIndex % this.quizzesList.length];
    
    // Crear el arreglo con las 3 opciones formateadas y mezcladas
    const options = [
      { text: q.correct, isCorrect: true, type: 'correct' },
      { text: q.distractor, isCorrect: false, type: 'distractor' },
      { text: q.incorrect, isCorrect: false, type: 'incorrect' }
    ];
    this.shuffleArray(options);

    return {
      ...q,
      options
    };
  }

  submitAnswer(selectedOption) {
    this.totalAnswered++;
    if (selectedOption.isCorrect) {
      this.score++;
      return { success: true, explanation: selectedOption.type === 'distractor' ? '¡Ojo! El distractor te atrajo.' : '¡Excelente! Respuesta correcta.' };
    }
    return { success: false, explanation: 'Respuesta incorrecta.' };
  }

  nextQuestion() {
    this.currentQuizIndex++;
  }

  getScoreStats() {
    return {
      score: this.score,
      totalAnswered: this.totalAnswered,
      percentage: this.totalAnswered > 0 ? Math.round((this.score / this.totalAnswered) * 100) : 0
    };
  }
}
