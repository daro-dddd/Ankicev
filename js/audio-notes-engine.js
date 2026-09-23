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
        summary: 'Resumen narrado de Requerimientos Funcionales, No Funcionales, Historias de Usuario y Estándar IEEE 830.',
        script: `Bienvenido al Audio-Apunte del Área 1: Requerimientos y Documentación de Software para el CENEVAL EGEL Plus. 
En Ingeniería de Software, los requerimientos se dividen en dos categorías fundamentales: Requerimientos Funcionales y Requerimientos No Funcionales.
Los Requerimientos Funcionales definen los servicios, funciones y comportamientos que el sistema debe realizar. Por ejemplo: El sistema debe permitir el inicio de sesión con correo y contraseña.
Los Requerimientos No Funcionales imponen restricciones a los servicios, tales como rendimiento, seguridad, disponibilidad y mantenibilidad según el estándar ISO 25010. Por ejemplo: La respuesta a consultas debe tardar menos de 2 segundos.
El estándar IEEE 830 especifica la estructura de la Especificación de Requerimientos de Software (ERS), la cual debe ser unívoca, completa, consistente, verificable y modificable.
En metodologías ágiles como Scrum, los requerimientos se redactan en formato de Historias de Usuario con la estructura: Como rol, quiero acción, para beneficio. Cada Historia de Usuario debe cumplir los criterios INVEST e incluir Criterios de Aceptación claros.`,
        connectors: ['Requerimientos Funcionales', 'IEEE 830', 'Historias de Usuario', 'Criterios de Aceptación', 'ISO 25010']
      },
      {
        id: 'audio_area2_arqui',
        title: 'Área 2: Patrones Arquitectónicos, REST & Microservicios',
        area: 'Área 2: Arquitectura',
        duration: '04:15',
        summary: 'Explicación narrada de MVC, Microservicios, APIs RESTful y Capas Arquitectónicas.',
        script: `Bienvenido al Audio-Apunte del Área 2: Arquitectura de Software y Sistemas Distribuidos.
La Arquitectura de Software define la estructura de alto nivel del sistema y la interacción entre sus componentes.
El Patrón Modelo-Vista-Controlador (MVC) separa el sistema en tres capas: El Modelo maneja los datos y reglas de negocio; la Vista gestiona la interfaz gráfica; y el Controlador procesa la lógica de entrada y coordina la actualización del Modelo y la Vista.
En la arquitectura de Microservicios, la aplicación se divide en servicios pequeños, independientes y desplegables de manera autónoma que se comunican mediante APIs HTTP RESTful o mensajería asíncrona.
Las APIs RESTful utilizan métodos HTTP estándar como GET para consultar, POST para crear, PUT para actualizar y DELETE para eliminar recursos representados en JSON.
Para el examen CENEVAL, recuerda que desacoplar los componentes mediante patrones arquitectónicos mejora la mantenibilidad y la escalabilidad del software.`,
        connectors: ['Patrones Arquitectónicos', 'MVC', 'Microservicios', 'APIs REST', 'Desacoplamiento']
      },
      {
        id: 'audio_area2_bd',
        title: 'Área 2: Bases de Datos SQL, Normalización 3NF & NoSQL',
        area: 'Área 2: Bases de Datos',
        duration: '04:30',
        summary: 'Guía de audio sobre Normalización (1NF, 2NF, 3NF), Transacciones ACID y Bases de Datos NoSQL.',
        script: `Bienvenido al Audio-Apunte del Área 2: Bases de Datos Relacionales y NoSQL.
En Bases de Datos Relacionales (SQL), la Normalización elimina la redundancia y previene anomalías de inserción, actualización y borrado.
Primera Forma Normal (1NF): Requiere valores atómicos sin grupos repetidos.
Segunda Forma Normal (2NF): Está en 1NF y todos los atributos no clave dependen totalmente de la clave primaria.
Tercera Forma Normal (3NF): Está en 2NF y no existen dependencias transitivas entre atributos no clave.
Las transacciones SQL garantizan las propiedades ACID: Atomicidad, Consistencia, Aislamiento (Isolation) y Durabilidad.
Por otro lado, las Bases de Datos NoSQL como MongoDB ofrecen escalabilidad horizontal y esquemas flexibles orientados a documentos JSON. Según el Teorema CAP, un sistema distribuido solo puede garantizar al mismo tiempo dos de las siguientes tres propiedades: Consistencia, Disponibilidad y Tolerancia a Particiones.`,
        connectors: ['Normalización 3NF', 'Propiedades ACID', 'Bases de Datos SQL', 'NoSQL MongoDB', 'Teorema CAP']
      },
      {
        id: 'audio_area3_poo',
        title: 'Área 3: Programación Orientada a Objetos & Principios SOLID',
        area: 'Área 3: Programación',
        duration: '04:00',
        summary: 'Resumen de los 4 pilares POO y los 5 Principios SOLID de diseño de código.',
        script: `Bienvenido al Audio-Apunte del Área 3: Programación Orientada a Objetos y Principios SOLID.
La Programación Orientada a Objetos (POO) se fundamenta en 4 pilares esenciales:
1. Abstracción: Representa solo las características esenciales del objeto.
2. Encapsulamiento: Oculta los detalles internos de implementación y protege los datos mediante modificadores de acceso.
3. Herencia: Permite que una clase derivada herede atributos y métodos de una clase base.
4. Polimorfismo: Permite enviar un mismo mensaje a objetos de clases distintas y que cada uno responda según su propia implementación.
Además, los 5 Principios SOLID garantizan código mantenible:
S: Principio de Responsabilidad Única.
O: Principio de Abierto/Cerrado.
L: Principio de Sustitución de Liskov.
I: Principio de Segregación de Interfaces.
D: Principio de Inversión de Dependencias.`,
        connectors: ['POO Abstracción', 'Encapsulamiento', 'Herencia y Polimorfismo', 'Principios SOLID', 'Diseño de Software']
      },
      {
        id: 'audio_area3_calidad',
        title: 'Área 3: Calidad ISO 25010, Pruebas & Métricas COCOMO',
        area: 'Área 3: Calidad & Pruebas',
        duration: '03:50',
        summary: 'Audio-apunte sobre la Norma ISO/IEC 25010, Pruebas Unitarias y Estimación de Software.',
        script: `Bienvenido al Audio-Apunte del Área 3: Calidad, Pruebas de Software y Métricas de Estimación.
El estándar ISO/IEC 25010 evalúa la calidad del producto de software en 8 características principales: Adecuación funcional, Eficiencia de desempeño, Compatibilidad, Usabilidad, Fiabilidad, Seguridad, Mantenibilidad y Portabilidad.
En las Pruebas de Software:
Las Pruebas de Caja Negra evalúan la funcionalidad sin conocer la estructura interna del código.
Las Pruebas de Caja Blanca verifican los caminos lógicos y estructuras internas.
Las Pruebas Unitarias prueban componentes aislados; las Pruebas de Integración verifican la interacción entre módulos; y las Pruebas de Sistema evalúan la aplicación completa.
En estimación, COCOMO calcula el esfuerzo en Personas-Mes a partir de Miles de Líneas de Código (KLOC) o Puntos de Función.`,
        connectors: ['ISO/IEC 25010', 'Pruebas Unitarias', 'Pruebas Caja Negra', 'Calidad de Software', 'Estimación COCOMO']
      },
      {
        id: 'audio_area4_lectura',
        title: 'Área 4: Transversal Comprensión Lectora & Análisis Técnico',
        area: 'Área 4: Comprensión Lectora',
        duration: '03:20',
        summary: 'Audio sobre estrategias de comprensión de lectura técnica y lógica analítica.',
        script: `Bienvenido al Audio-Apunte del Área 4: Transversal de Comprensión Lectora para Ingeniería de Software.
En el examen CENEVAL, el área de comprensión lectora evalúa tu capacidad para interpretar artículos científicos, especificaciones técnicas de software y diagramas analíticos.
Las 3 estrategias clave son:
1. Identificar la Idea Central: Distinguir el argumento principal del autor de los ejemplos secundarios.
2. Reconocer la Inferencia Lógica: Deducir conclusiones válidas que no están escritas explícitamente pero se derivan del texto.
3. Evaluación de Vocabulario en Contexto: Determinar el significado preciso de términos técnicos según el dominio de la ingeniería.`,
        connectors: ['Comprensión Lectora', 'Análisis Técnico', 'Idea Central', 'Inferencia Lógica', 'Comprensión CENEVAL']
      }
    ];

    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      const all = this.synth.getVoices();
      
      // Filtrar preferentemente voces de México (es-MX)
      const mxVoices = all.filter(v => 
        v.lang.replace('_', '-').toLowerCase().includes('es-mx') ||
        v.name.toLowerCase().includes('mexico') ||
        v.name.toLowerCase().includes('méxico')
      );
      
      const esVoices = all.filter(v => v.lang.toLowerCase().includes('es'));

      // Ordenar: voces de México primero
      this.voices = mxVoices.concat(esVoices.filter(v => !mxVoices.includes(v)));

      if (this.voices.length > 0) {
        this.selectedVoice = mxVoices.length > 0 ? mxVoices[0] : this.voices[0];
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

  playTrack(track, onBoundaryCallback, onEndCallback) {
    if (!this.synth) {
      alert('Tu navegador no soporta la API de Audio/Voz Web Speech Synthesis.');
      return;
    }

    this.stop();

    this.currentTrack = track;
    this.utterance = new SpeechSynthesisUtterance(track.script);
    this.utterance.rate = this.playbackRate;

    if (this.selectedVoice) {
      this.utterance.voice = this.selectedVoice;
    } else if (this.voices.length > 0) {
      this.utterance.voice = this.voices[0];
    }

    this.utterance.onboundary = (e) => {
      if (onBoundaryCallback) onBoundaryCallback(e.charIndex, track.script.length);
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.stopWaveform();
      if (onEndCallback) onEndCallback();
    };

    this.utterance.onerror = (e) => {
      console.error('Error en reproducción de voz:', e);
      this.isPlaying = false;
      this.isPaused = false;
      this.stopWaveform();
    };

    this.synth.speak(this.utterance);
    this.isPlaying = true;
    this.isPaused = false;
    this.startWaveform();
  }

  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
      this.isPlaying = false;
      this.isPaused = true;
      this.stopWaveform();
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPlaying = true;
      this.isPaused = false;
      this.startWaveform();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.stopWaveform();
  }

  // Visualizador de Onda de Audio en Canvas
  initCanvas(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.drawWaveformIdle();
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
      this.ctx.fillRect(x, y, barWidth, barHeight);
    }
  }

  generateTopicAudioScript(topicId, style = 'masterclass', customText = '', customTitle = '') {
    if (topicId === 'free_text') {
      return {
        id: 'audio_custom_' + Date.now(),
        title: customTitle || 'Audio-Apunte Personalizado',
        area: 'Apunte Personalizado',
        duration: 'Personal',
        summary: 'Apunte convertido en voz por la IA.',
        script: customText,
        connectors: ['Apunte Libre', 'Audio IA']
      };
    }

    if (topicId.startsWith('custom_')) {
      const userCards = JSON.parse(localStorage.getItem('ceneval_user_photo_cards')) || [];
      const match = userCards.find(c => c.id === topicId);
      if (match) {
        return {
          id: 'audio_' + match.id + '_' + Date.now(),
          title: `Audio-Apunte: ${match.title}`,
          area: match.topic || 'Apunte Guardado',
          duration: '02:30',
          summary: `Audio sintetizado para el apunte guardado "${match.title}".`,
          script: `Audio Apunte Guardado. Título: ${match.title}. ${match.notes.replace(/[*#•]/g, '')}`,
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
      titleText = `Flash Repaso Examen (1 min): ${topic.name}`;
      scriptText = `Atención. Este es tu Flash Repaso de un minuto sobre ${topic.name} para el examen CENEVAL. `;
      cards.forEach((c, idx) => {
        scriptText += `Punto clave ${idx + 1}: ${c.question} Respuesta: ${c.answer.replace(/[*#•]/g, '')} `;
        if (c.connectors) connectorsList.push(...c.connectors);
      });
      scriptText += `Recuerda memorizar estos puntos clave para el día de tu evaluación.`;
    } else if (style === 'quiz') {
      titleText = `Simulador Hablado (Q&A): ${topic.name}`;
      scriptText = `Bienvenido al Simulador de Preguntas y Respuestas Hablado para el tema ${topic.name}. Escucha atentamente cada reactivo. `;
      cards.forEach((c, idx) => {
        scriptText += `Pregunta ${idx + 1}: ${c.question} ... La respuesta correcta es: ${c.answer.replace(/[*#•]/g, '')} ... `;
        if (c.connectors) connectorsList.push(...c.connectors);
      });
    } else if (style === 'mnemonics') {
      titleText = `Reglas de Memoria: ${topic.name}`;
      scriptText = `Audio-Apunte de Técnicas de Memoria sobre ${topic.name}. Para recordar los conceptos clave de este tema en el CENEVAL: `;
      cards.forEach((c, idx) => {
        scriptText += `Regla número ${idx + 1}: Asocia ${c.badge || c.topic} con: ${c.answer.slice(0, 110).replace(/[*#•]/g, '')}... `;
        if (c.connectors) connectorsList.push(...c.connectors);
      });
    } else {
      titleText = `Masterclass Completa: ${topic.name}`;
      scriptText = `Bienvenido a la Masterclass en Audio sobre ${topic.name} para el CENEVAL EGEL Plus de Ingeniería de Software. `;
      scriptText += `${topic.description || ''} `;
      cards.forEach((c, idx) => {
        scriptText += `Sección ${idx + 1}: ${c.question} Explicación técnica: ${c.answer.replace(/[*#•]/g, '')}. `;
        if (c.citation) scriptText += `Referencia bibliográfica: ${c.citation}. `;
        if (c.connectors) connectorsList.push(...c.connectors);
      });
      scriptText += `Con esto concluimos la Masterclass del tema ${topic.name}. Repasa constantemente este audio para fijar los conocimientos a largo plazo.`;
    }

    const uniqueConnectors = Array.from(new Set(connectorsList)).slice(0, 5);

    return {
      id: `audio_${topicId}_${style}_` + Date.now(),
      title: titleText,
      area: topic.name,
      duration: `${Math.ceil(cards.length * 1.1)} min`,
      summary: `Audio-apunte didáctico generado para ${topic.name} en formato ${style}.`,
      script: scriptText,
      connectors: uniqueConnectors.length > 0 ? uniqueConnectors : [topic.name, 'CENEVAL']
    };
  }
}

window.AudioNotesEngine = AudioNotesEngine;
