/**
 * Motor de Audio-Apuntes & Podcasting Didáctico CENEVAL (AudioNotesEngine)
 * Utiliza Web Speech Synthesis API y Canvas Waveform Visualizer.
 * Genera resúmenes narrados para las 4 Áreas de CENEVAL e integra apuntes personalizados.
 */

class AudioNotesEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.utterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.playbackRate = 1.0;
    this.currentTrack = null;
    this.voices = [];
    this.selectedVoice = null;
    this.canvas = null;
    this.ctx = null;
    this.animId = null;

    // Biblioteca de Audio-Apuntes Maestros CENEVAL
    this.audioLibrary = [
      {
        id: 'audio_area1_req',
        title: 'Área 1: Requerimientos, Historias de Usuario & IEEE 830',
        area: 'Área 1: Requerimientos',
        duration: '03:45',
        summary: 'Explicación didáctica de Requerimientos Funcionales, No Funcionales, Historias de Usuario e IEEE 830.',
        script: `Hola, bienvenido. Hoy te voy a explicar los aspectos esenciales del Área 1: Requerimientos y Documentación de Software para tu examen CENEVAL.
Imagina que estás diseñando un sistema desde cero. Lo primero que debes distinguir es entre requerimientos funcionales y no funcionales.
Los requerimientos funcionales son todas aquellas acciones concretas que el usuario o el sistema deben realizar. Por ejemplo, permitir que un alumno inicie sesión o descargue su boleta.
Por otro lado, los requerimientos no funcionales son las restricciones o cualidades de calidad que exige el sistema, reguladas por la norma ISO 25010. Por ejemplo, que el login responda en menos de 2 segundos o que la contraseña se guarde encriptada.
Para documentar todo esto de forma tradicional se utiliza el estándar IEEE 830, el cual exige que la especificación sea unívoca, completa, consistente y verificable.
En cambio, en metodologías ágiles como Scrum, usamos Historias de Usuario. Recuerda la estructura clave: Como determinado rol, quiero realizar una acción, para obtener un beneficio. No olvides comprobar que cumplan los criterios INVEST.`,
        connectors: ['Requerimientos Funcionales', 'IEEE 830', 'Historias de Usuario', 'Criterios de Aceptación', 'ISO 25010']
      },
      {
        id: 'audio_area2_arqui',
        title: 'Área 2: Patrones Arquitectónicos, REST & Microservicios',
        area: 'Área 2: Arquitectura',
        duration: '04:15',
        summary: 'Explicación didáctica de MVC, Microservicios, APIs RESTful y Capas Arquitectónicas.',
        script: `Hola. En este audio te voy a explicar la Arquitectura de Software de forma super clara para el examen CENEVAL.
La arquitectura define la estructura de alto nivel y cómo interactúan los módulos de tu aplicación.
Hablemos primero del patrón MVC, o Modelo-Vista-Controlador. La regla de oro aquí es la separación de responsabilidades. El Modelo se encarga de los datos y las reglas de negocio. La Vista es todo lo que el usuario ve en pantalla. Y el Controlador es el intermediario que recibe las acciones del usuario y actualiza el Modelo y la Vista.
Ahora bien, cuando trabajamos con Microservicios, en lugar de un monolito gigante, dividimos la aplicación en servicios pequeños e independientes. Cada uno se despliega por separado y se comunican a través de APIs RESTful usando JSON.
Recuerda los métodos HTTP estándar para REST: GET para consultar, POST para crear, PUT para actualizar y DELETE para eliminar. Desacoplar los componentes con estos patrones mejora la escalabilidad y la mantenibilidad del software.`,
        connectors: ['Patrones Arquitectónicos', 'MVC', 'Microservicios', 'APIs REST', 'Desacoplamiento']
      },
      {
        id: 'audio_area2_bd',
        title: 'Área 2: Bases de Datos SQL, Normalización 3NF & NoSQL',
        area: 'Área 2: Bases de Datos',
        duration: '04:30',
        summary: 'Guía explicativa sobre Normalización (1NF, 2NF, 3NF), Transacciones ACID y Bases de Datos NoSQL.',
        script: `Bienvenido. Vamos a revisar Bases de Datos Relacionales y NoSQL, uno de los temas más preguntados en el CENEVAL.
En bases de datos SQL, la Normalización sirve para evitar la redundancia y corregir anomalías.
Te explico las 3 formas normales principales:
La Primera Forma Normal exige que todos los campos tengan valores atómicos e indivisibles.
La Segunda Forma Normal pide que ya esté en primera forma y que todos los atributos no clave dependan al cien por ciento de la clave primaria.
La Tercera Forma Normal requiere estar en segunda forma y eliminar cualquier dependencia transitiva entre atributos no clave.
Además, una base de datos relacional debe cumplir las propiedades ACID: Atomicidad, Consistencia, Aislamiento y Durabilidad.
Por el contrario, en bases de datos NoSQL como MongoDB, priman la escalabilidad horizontal y los documentos flexibles JSON. Recuerda el Teorema CAP: en un sistema distribuido solo puedes garantizar dos de estas tres propiedades: Consistencia, Disponibilidad o Tolerancia a Particiones.`,
        connectors: ['Normalización 3NF', 'Propiedades ACID', 'Bases de Datos SQL', 'NoSQL MongoDB', 'Teorema CAP']
      },
      {
        id: 'audio_area3_poo',
        title: 'Área 3: Programación Orientada a Objetos & Principios SOLID',
        area: 'Área 3: Programación',
        duration: '04:00',
        summary: 'Explicación conversacional de los 4 pilares POO y los 5 Principios SOLID.',
        script: `Hola. Te voy a explicar los pilares de la Programación Orientada a Objetos y los Principios SOLID de manera lógica y fácil de recordar.
La POO se sostiene sobre 4 pilares fundamentales:
Primero, la Abstracción, que consiste en extraer solo los elementos esenciales del mundo real.
Segundo, el Encapsulamiento, que oculta los detalles internos de implementación y protege los datos.
Tercero, la Herencia, que permite reutilizar código haciendo que una clase hija herede atributos y métodos de una clase padre.
Y cuarto, el Polimorfismo, que permite enviar un mismo mensaje a objetos diferentes y que cada uno reaccione según su propia clase.
Para escribir código limpio y mantenible aplicamos los principios SOLID: Responsabilidad Única, Abierto a extensión pero cerrado a modificación, Sustitución de Liskov, Segregación de Interfaces e Inversión de Dependencias. Teniendo esto claro resolverás cualquier reactivo de código.`,
        connectors: ['POO Abstracción', 'Encapsulamiento', 'Herencia y Polimorfismo', 'Principios SOLID', 'Diseño de Software']
      },
      {
        id: 'audio_area3_calidad',
        title: 'Área 3: Calidad ISO 25010, Pruebas & Métricas COCOMO',
        area: 'Área 3: Calidad & Pruebas',
        duration: '03:50',
        summary: 'Explicación didáctica sobre ISO/IEC 25010, Pruebas de Software y Estimación COCOMO.',
        script: `Hola. En esta sesión explicativa vamos a repasar Calidad, Pruebas y Estimación de Software para tu examen.
El modelo ISO 25010 define la calidad del software según 8 características: adecuación funcional, eficiencia, compatibilidad, usabilidad, fiabilidad, seguridad, mantenibilidad y portabilidad.
En el área de pruebas, recuerda la diferencia estratégica: las pruebas de caja negra evalúan qué hace el sistema desde fuera sin ver el código. Las pruebas de caja blanca inspeccionan la estructura interna y los caminos lógicos.
Siguiendo los niveles de prueba: primero hacemos pruebas unitarias a funciones aisladas, luego pruebas de integración para ver cómo se comunican las partes, y finalmente pruebas de sistema sobre la aplicación completa.
Por último, para calcular cuánto tiempo y esfuerzo tomará un proyecto, usamos modelos como COCOMO, estimando en personas-mes a partir de miles de líneas de código o puntos de función.`,
        connectors: ['ISO/IEC 25010', 'Pruebas Unitarias', 'Pruebas Caja Negra', 'Calidad de Software', 'Estimación COCOMO']
      },
      {
        id: 'audio_area4_lectura',
        title: 'Área 4: Transversal Comprensión Lectora & Análisis Técnico',
        area: 'Área 4: Comprensión Lectora',
        duration: '03:20',
        summary: 'Estrategias explicadas para razonamiento analítico y comprensión de artículos técnicos.',
        script: `Hola. Te voy a explicar las tres mejores estrategias para resolver con éxito el Área Transversal de Comprensión Lectora del CENEVAL.
Esta sección mide tu habilidad para analizar textos científicos, diagramas de arquitectura y especificaciones técnicas.
La primera estrategia es identificar la Idea Central: pregúntate qué quiere transmitir el autor en esencia y separa el argumento principal de los ejemplos secundarios.
La segunda estrategia es la Inferencia Lógica: debes deducir conclusiones válidas que no están escritas literalmente en el texto pero que se derivan de la evidencia lógica.
Y la tercera estrategia es analizar el Vocabulario en Contexto: asigna el significado exacto a los términos técnicos según el dominio de la ingeniería de software. Aplicando estas tres reglas responderás con precisión.`,
        connectors: ['Comprensión Lectora', 'Análisis Técnico', 'Idea Central', 'Inferencia Lógica', 'Comprensión CENEVAL']
      }
    ];

    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      const all = this.synth.getVoices();
      if (!all || all.length === 0) return;

      // Algoritmo de puntuación para seleccionar y priorizar las voces MÁS HUMANIZADAS (Natural / Neural / Google)
      const scoreVoice = (v) => {
        let score = 0;
        const lang = (v.lang || '').replace('_', '-').toLowerCase();
        const name = (v.name || '').toLowerCase();

        // Idioma Español
        if (lang.startsWith('es')) score += 100;
        else return -1000;

        // Preferencia regional: México / Latinoamérica
        if (lang.includes('es-mx') || name.includes('mexico') || name.includes('méxico')) score += 600;
        else if (lang.includes('es-us') || lang.includes('es-419') || lang.includes('es-ar') || lang.includes('es-co')) score += 400;

        // PREMIO MÁXIMO: Voces Naturales, Neurales y de Alta Fidelidad (Voz Humana)
        if (name.includes('natural')) score += 3000;
        if (name.includes('neural')) score += 3000;
        if (name.includes('google')) score += 2000;
        if (name.includes('online')) score += 1500;
        if (name.includes('premium') || name.includes('enhanced') || name.includes('multilingual')) score += 1200;

        // CASTIGO: Voces robóticas antiguas SAPI5 / Desktop
        if (name.includes('desktop')) score -= 800;

        return score;
      };

      const spanishVoices = all.filter(v => (v.lang || '').toLowerCase().startsWith('es'));
      spanishVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a));

      this.voices = spanishVoices.length > 0 ? spanishVoices : all;

      if (this.voices.length > 0) {
        this.selectedVoice = this.voices[0];
      }
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  setVoice(voiceIndex) {
    if (this.voices[voiceIndex]) {
      this.selectedVoice = this.voices[voiceIndex];
    }
  }

  setPlaybackRate(rate) {
    this.playbackRate = parseFloat(rate);
    if (this.utterance && this.isPlaying) {
      // Re-iniciar con la nueva velocidad desde el estado actual
    }
  }

  playTrack(track, onBoundaryCallback, onEndCallback, startCharIndex = 0) {
    if (!this.synth) {
      alert('Tu navegador no soporta la API de Audio/Voz Web Speech Synthesis.');
      return;
    }

    // Cancelar cualquier síntesis en curso para evitar superposición
    this.synth.cancel();

    this.currentTrack = track;
    this.charPosition = startCharIndex;
    this.onBoundaryCb = onBoundaryCallback;
    this.onEndCb = onEndCallback;

    const fullScript = track.script;
    const textToSpeak = (startCharIndex > 0 && startCharIndex < fullScript.length)
      ? fullScript.substring(startCharIndex)
      : fullScript;

    this.utterance = new SpeechSynthesisUtterance(textToSpeak);
    this.utterance.rate = this.playbackRate || 0.95;
    this.utterance.pitch = 1.05; // Modulación de tono más cálida y humana (evita monotonía robótica)

    if (this.selectedVoice) {
      this.utterance.voice = this.selectedVoice;
    } else if (this.voices.length > 0) {
      this.utterance.voice = this.voices[0];
    }

    this.utterance.onboundary = (e) => {
      const offset = (startCharIndex > 0 && startCharIndex < fullScript.length) ? startCharIndex : 0;
      if (e.charIndex !== undefined) {
        this.charPosition = offset + e.charIndex;
      }
      if (onBoundaryCallback) onBoundaryCallback(this.charPosition, fullScript.length);
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.charPosition = 0;
      this.stopWaveform();
      if (onEndCallback) onEndCallback();
    };

    this.utterance.onerror = (e) => {
      console.error('Error en reproducción de voz:', e);
      this.isPlaying = false;
      this.isPaused = false;
      this.charPosition = 0;
      this.stopWaveform();
    };

    this.synth.speak(this.utterance);
    this.isPlaying = true;
    this.isPaused = false;
    this.startWaveform();
  }

  pause() {
    if (this.synth) {
      // cancel() detiene la voz inmediatamente en todos los navegadores y SO (evita el bug de pause() en Chrome/Windows)
      this.synth.cancel();
      this.isPlaying = false;
      this.isPaused = true;
      this.stopWaveform();
    }
  }

  resume() {
    if (this.currentTrack) {
      // Reanudar la lectura exactamente desde la posición de caracteres alcanzada
      this.playTrack(
        this.currentTrack,
        this.onBoundaryCb,
        this.onEndCb,
        this.charPosition || 0
      );
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.charPosition = 0;
    this.stopWaveform();
  }

  // Visualizador de Onda de Audio en Canvas
  initCanvas(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => {
        this.resizeCanvas();
        if (!this.isPlaying) this.drawWaveformIdle();
      });
      this.drawWaveformIdle();
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (parent) {
      const parentWidth = parent.clientWidth - 16;
      if (parentWidth > 0) {
        this.canvas.width = Math.floor(parentWidth);
      }
    }
  }

  startWaveform() {
    if (!this.canvas || !this.ctx) return;
    if (this.animId) cancelAnimationFrame(this.animId);

    let step = 0;
    const draw = () => {
      step += 0.08;
      const width = this.canvas.width;
      const height = this.canvas.height;
      this.ctx.clearRect(0, 0, width, height);

      const numBars = 32;
      const barWidth = (width / numBars) - 3;

      for (let i = 0; i < numBars; i++) {
        const value = Math.sin(step + i * 0.3) * 0.5 + 0.5;
        const barHeight = Math.max(6, value * (height - 10));

        const x = i * (barWidth + 3);
        const y = (height - barHeight) / 2;

        const gradient = this.ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(1, '#c084fc');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, barWidth, barHeight);
      }

      if (this.isPlaying) {
        this.animId = requestAnimationFrame(draw);
      } else {
        this.drawWaveformIdle();
      }
    };
    draw();
  }

  stopWaveform() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.drawWaveformIdle();
  }

  drawWaveformIdle() {
    if (!this.canvas || !this.ctx) return;
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    const numBars = 32;
    const barWidth = (width / numBars) - 3;
    this.ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';

    for (let i = 0; i < numBars; i++) {
      const x = i * (barWidth + 3);
      const barHeight = 8;
      const y = (height - barHeight) / 2;
      this.ctx.fillRect(x, y, barWidth, barHeight);
    }
  }

  generateTopicAudioScript(topicId, style = 'masterclass', customText = '', customTitle = '') {
    if (topicId === 'free_text') {
      const cleanCustom = customText.replace(/[*#•]/g, '').trim();
      return {
        id: 'audio_custom_' + Date.now(),
        title: customTitle || 'Explicación de Apunte Personalizado',
        area: 'Apunte Personalizado',
        duration: 'Personal',
        summary: 'Explicación didáctica tutorizada del apunte ingresado.',
        script: `Hola. Te voy a explicar paso a paso el apunte que ingresaste titulado: ${customTitle || 'Apunte Personalizado'}. ${cleanCustom}. Espero que esta explicación clara te ayude a comprenderlo perfectamente.`,
        connectors: ['Apunte Libre', 'Explicación IA']
      };
    }

    if (topicId.startsWith('custom_')) {
      const userCards = JSON.parse(localStorage.getItem('ceneval_user_photo_cards')) || [];
      const match = userCards.find(c => c.id === topicId);
      if (match) {
        const cleanNotes = match.notes.replace(/[*#•]/g, '').trim();
        return {
          id: 'audio_' + match.id + '_' + Date.now(),
          title: `Explicación didáctica: ${match.title}`,
          area: match.topic || 'Apunte Guardado',
          duration: '02:30',
          summary: `Explicación didáctica sobre el apunte guardado "${match.title}".`,
          script: `Hola. Te explico detalladamente tu apunte sobre ${match.title}. ${cleanNotes}. Recuerda conectar estos conceptos para tu examen CENEVAL.`,
          connectors: match.connectors || ['Apunte Guardado', 'IA Vision']
        };
      }
    }

    const topic = window.TOPICS_DATA ? window.TOPICS_DATA.find(t => t.id === topicId) : null;
    if (!topic) {
      return this.audioLibrary[0];
    }

    const cards = topic.cards || [];
    let scriptText = '';
    let titleText = '';
    let connectorsList = [];

    if (style === 'flash') {
      titleText = `Flash Repaso Explicado (1 min): ${topic.name}`;
      scriptText = `¡Hola! Vamos a hacer un repaso relámpago super directo sobre ${topic.name} para tu examen CENEVAL. Te explico los puntos clave que debes dominar: `;
      cards.forEach((c, idx) => {
        const cleanAns = c.answer.replace(/[*#•]/g, '').trim();
        scriptText += `Punto clave ${idx + 1}, acerca de ${c.question.replace(/\?/g, '')}: ${cleanAns} `;
        if (c.connectors) connectorsList.push(...c.connectors);
      });
      scriptText += `Recuerda tener presentes estos conceptos clave para responder con seguridad en tu evaluación. ¡Mucho éxito!`;
    } else if (style === 'quiz') {
      titleText = `Tutoría de Examen (Preguntas & Explicación): ${topic.name}`;
      scriptText = `Hola, te doy la bienvenida a esta sesión interactiva de tutoría sobre ${topic.name}. Imagina que estás respondiendo el examen CENEVAL. `;
      cards.forEach((c, idx) => {
        const cleanAns = c.answer.replace(/[*#•]/g, '').trim();
        scriptText += `Pregunta número ${idx + 1}: ${c.question} ... Te explico por qué la respuesta correcta es: ${cleanAns} ... `;
        if (c.connectors) connectorsList.push(...c.connectors);
      });
      scriptText += `Comprender la justificación técnica de cada reactivo te garantizará un desempeño sobresaliente.`;
    } else if (style === 'mnemonics') {
      titleText = `Técnicas de Memoria Explicadas: ${topic.name}`;
      scriptText = `Hola. En este audio te voy a compartir las mejores reglas de memoria para recordar fácilmente ${topic.name} en el CENEVAL. `;
      cards.forEach((c, idx) => {
        const cleanAns = c.answer.slice(0, 120).replace(/[*#•]/g, '').trim();
        scriptText += `Para recordar ${c.badge || c.topic}: conecta la idea de ${c.badge || c.topic} con ${cleanAns}. `;
        if (c.connectors) connectorsList.push(...c.connectors);
      });
      scriptText += `Estas asociaciones didácticas te ayudarán a recordar las respuestas en segundos durante la prueba.`;
    } else {
      titleText = `Clase Explicativa Didáctica: ${topic.name}`;
      scriptText = `Hola, bienvenido. En este audio-apunte te voy a explicar paso a paso los conceptos fundamentales de ${topic.name} para el examen CENEVAL EGEL Plus de Ingeniería de Software. `;
      if (topic.description) {
        scriptText += `Para ponerte en contexto: ${topic.description} `;
      }
      cards.forEach((c, idx) => {
        const cleanAns = c.answer.replace(/[*#•]/g, '').trim();
        scriptText += `Revisemos la sección ${idx + 1}, enfocada en ${c.question.replace(/\?/g, '')}. Te explico: ${cleanAns} `;
        if (c.codeSnippet) {
          scriptText += `En la práctica de código, esto se implementa directamente en el archivo. `;
        }
        if (c.connectors) connectorsList.push(...c.connectors);
      });
      scriptText += `Espero que esta explicación didáctica te sea de gran utilidad para dominar ${topic.name}. ¡Sigue repasando!`;
    }

    const uniqueConnectors = Array.from(new Set(connectorsList)).slice(0, 5);

    return {
      id: `audio_${topicId}_${style}_` + Date.now(),
      title: titleText,
      area: topic.name,
      duration: `${Math.ceil(cards.length * 1.1)} min`,
      summary: `Explicación didáctica conversacional para ${topic.name}.`,
      script: scriptText,
      connectors: uniqueConnectors.length > 0 ? uniqueConnectors : [topic.name, 'CENEVAL']
    };
  }
}

window.AudioNotesEngine = AudioNotesEngine;
