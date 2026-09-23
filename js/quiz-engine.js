/**
 * Motor del Simulador de Examen CENEVAL (Exámenes de Máximo 30 Preguntas & Diagnóstico de Temas a Reforzar)
 * Presenta reactivos seleccionados de 30 preguntas con opciones de Correcta, Distractor e Incorrecta.
 * Mantiene métricas por materia para generar diagnóstico de desempeño.
 */

class QuizEngine {
  constructor(topicsData) {
    this.topicsData = topicsData;
    this.maxQuestions = 30;
    this.allQuizzes = [];
    this.examQuestions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.totalAnswered = 0;
    this.isExamFinished = false;
    this.topicStats = {};

    this.initAllQuizzes();
    this.startNewExam(30);
  }

  initAllQuizzes() {
    this.allQuizzes = [];
    this.topicsData.forEach(topic => {
      if (topic.quizzes) {
        topic.quizzes.forEach(q => {
          this.allQuizzes.push({
            ...q,
            topicId: topic.id,
            topicName: topic.name,
            topicColor: topic.color
          });
        });
      }
    });
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  startNewExam(maxQuestions = 30) {
    this.maxQuestions = maxQuestions;
    this.currentIndex = 0;
    this.score = 0;
    this.totalAnswered = 0;
    this.isExamFinished = false;
    this.topicStats = {};

    // Clonar y mezclar todas las preguntas disponibles
    const shuffled = [...this.allQuizzes];
    this.shuffleArray(shuffled);

    // Tomar máximo 30 preguntas para el examen
    this.examQuestions = shuffled.slice(0, Math.min(this.maxQuestions, shuffled.length));
  }

  getCurrentQuestion() {
    if (this.examQuestions.length === 0 || this.currentIndex >= this.examQuestions.length) {
      return null;
    }

    const q = this.examQuestions[this.currentIndex];

    // Formatear y mezclar las 3 opciones de respuesta
    const options = [
      { text: q.correct, isCorrect: true, type: 'correct' },
      { text: q.distractor, isCorrect: false, type: 'distractor' },
      { text: q.incorrect, isCorrect: false, type: 'incorrect' }
    ];
    this.shuffleArray(options);

    return {
      ...q,
      options,
      questionNum: this.currentIndex + 1,
      totalExamQuestions: this.examQuestions.length
    };
  }

  submitAnswer(selectedOption) {
    const q = this.examQuestions[this.currentIndex];
    if (!q) return { success: false, explanation: '' };

    const topicKey = q.topicId || q.topicName;
    if (!this.topicStats[topicKey]) {
      this.topicStats[topicKey] = {
        topicId: q.topicId,
        topicName: q.topicName || q.topic,
        correct: 0,
        total: 0
      };
    }

    this.topicStats[topicKey].total++;
    this.totalAnswered++;

    let isCorrect = false;
    let explanationMsg = '';

    if (selectedOption.isCorrect) {
      this.score++;
      this.topicStats[topicKey].correct++;
      isCorrect = true;
      explanationMsg = selectedOption.type === 'distractor' ? '¡Ojo! Evitaste el distractor. ¡Respuesta correcta!' : '¡Excelente! Respuesta correcta.';
    } else {
      explanationMsg = selectedOption.type === 'distractor' ? '⚠️ Caíste en la opción distractor del CENEVAL.' : '❌ Respuesta incorrecta.';
    }

    if (this.currentIndex >= this.examQuestions.length - 1) {
      this.isExamFinished = true;
    }

    return {
      success: isCorrect,
      explanation: explanationMsg,
      isFinished: this.isExamFinished
    };
  }

  nextQuestion() {
    if (this.currentIndex < this.examQuestions.length - 1) {
      this.currentIndex++;
    } else {
      this.isExamFinished = true;
    }
  }

  getScoreStats() {
    const total = this.examQuestions.length;
    const answered = this.totalAnswered;
    const currentNum = Math.min(this.currentIndex + 1, total);
    const percentage = answered > 0 ? Math.round((this.score / answered) * 100) : 0;

    return {
      score: this.score,
      answered,
      total,
      currentNum,
      percentage
    };
  }

  getDiagnosisReport() {
    const total = this.examQuestions.length;
    const percentage = total > 0 ? Math.round((this.score / total) * 100) : 0;

    let rankBadge = '⚠️ Por Mejorar';
    let rankColor = 'var(--danger)';
    let rankDesc = 'Se recomienda reforzar las materias señaladas a continuación antes de presentar el examen formal.';

    if (percentage >= 80) {
      rankBadge = '🥇 Nivel Sobresaliente';
      rankColor = 'var(--accent-emerald)';
      rankDesc = '¡Felicidades! Tienes un dominio sólido de las materias de Ingeniería de Software para el CENEVAL.';
    } else if (percentage >= 60) {
      rankBadge = '🥈 Nivel Satisfactorio';
      rankColor = 'var(--accent-cyan)';
      rankDesc = 'Has alcanzado el nivel satisfactorio. Revisa los temas marcados para aspirar a nivel sobresaliente.';
    }

    const topicBreakdown = [];
    const weakTopics = [];

    Object.values(this.topicStats).forEach(t => {
      const topicPct = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
      const isWeak = topicPct < 75;

      const item = {
        topicId: t.topicId,
        topicName: t.topicName,
        correct: t.correct,
        total: t.total,
        percentage: topicPct,
        isWeak
      };

      topicBreakdown.push(item);
      if (isWeak) {
        weakTopics.push(item);
      }
    });

    // Ordenar de menor porcentaje a mayor porcentaje
    topicBreakdown.sort((a, b) => a.percentage - b.percentage);
    weakTopics.sort((a, b) => a.percentage - b.percentage);

    return {
      score: this.score,
      total,
      percentage,
      rankBadge,
      rankColor,
      rankDesc,
      topicBreakdown,
      weakTopics
    };
  }
}

window.QuizEngine = QuizEngine;
