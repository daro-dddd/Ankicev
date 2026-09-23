/**
 * Motor de Inteligencia Artificial & Visión por Computadora (CENEVAL AI Vision Engine)
 * Analiza imágenes, apuntes y diagramas para extraer:
 * 1. Resumen Técnico Inteligente (AI Summary)
 * 2. Formas y Técnicas de Estudio (Preguntas Flashcard, Mnemotecnias, Puntos Clave)
 * 3. Conectores Mentales Automáticos para la Red Neuronal
 */

class AIVisionEngine {
  constructor() {
    this.geminiApiKey = localStorage.getItem('ceneval_gemini_api_key') || '';
    this.taxonomy = [
      {
        topicId: 'movil',
        name: 'Arquitectura & Aplicaciones Móviles',
        keywords: ['movil', 'mobile', 'android', 'ios', 'nativo', 'hibrido', 'react native', 'flutter', 'pwa', 'componentes', 'tendencias', 'pantalla'],
        connectors: ['Aplicaciones Móviles', 'Sistemas Nativos', 'Desarrollo Híbrido', 'UX/UI Móvil', 'Componentes Visuales']
      },
      {
        topicId: 'requerimientos',
        name: 'Requerimientos & Historias de Usuario',
        keywords: ['requerimiento', 'funcional', 'no funcional', 'actor', 'caso de uso', 'historia', 'user story', 'stakeholder', 'prioridad', 'ieee 830'],
        connectors: ['Requerimientos Funcionales', 'Historias de Usuario', 'Criterios de Aceptación', 'Stakeholders', 'IEEE 830']
      },
      {
        topicId: 'arquitectura',
        name: 'Patrones de Arquitectura de Software',
        keywords: ['arquitectura', 'mvc', 'microservicios', 'capas', 'cliente servidor', 'patron', 'singleton', 'factory', 'rest', 'api', 'eventos'],
        connectors: ['Patrones Arquitectónicos', 'MVC', 'Microservicios', 'Desacoplamiento', 'APIs REST']
      },
      {
        topicId: 'bd_relacional',
        name: 'Bases de Datos Relacionales (SQL)',
        keywords: ['base de datos', 'sql', 'relacional', 'tabla', 'clave primaria', 'foreign key', 'join', 'normalizacion', '1nf', '2nf', '3nf', 'transaccion', 'acid'],
        connectors: ['Bases de Datos SQL', 'Normalización 3NF', 'Propiedades ACID', 'Modelado Entidad-Relación', 'Consultas JOIN']
      },
      {
        topicId: 'bd_nosql',
        name: 'Bases de Datos NoSQL & Big Data',
        keywords: ['nosql', 'mongodb', 'documento', 'clave valor', 'redis', 'grafo', 'columnar', 'cap', 'teorema cap', 'escalabilidad'],
        connectors: ['Bases de Datos NoSQL', 'MongoDB Documentos', 'Teorema CAP', 'Escalabilidad Horizontal', 'Almacenamiento Clave-Valor']
      },
      {
        topicId: 'paradigmas',
        name: 'Paradigmas de Programación (POO & Funcional)',
        keywords: ['poo', 'herencia', 'polimorfismo', 'encapsulamiento', 'abstraccion', 'clase', 'objeto', 'interfaz', 'solid', 'funcional'],
        connectors: ['Programación Orientada a Objetos', 'Principios SOLID', 'Herencia y Polimorfismo', 'Encapsulamiento', 'Paradigma Funcional']
      },
      {
        topicId: 'calidad_cocomo',
        name: 'Calidad de Software & Estimación COCOMO',
        keywords: ['cocomo', 'kloc', 'esfuerzo', 'personas mes', 'iso 25010', 'mantenibilidad', 'fiabilidad', 'pruebas', 'unitarias', 'integracion', 'calidad'],
        connectors: ['Estimación COCOMO', 'ISO/IEC 25010', 'Pruebas Unitarias', 'Mantenibilidad de Código', 'Métricas de Software']
      },
      {
        topicId: 'metodologias',
        name: 'Metodologías Ágiles (Scrum & Kanban)',
        keywords: ['scrum', 'kanban', 'sprint', 'daily', 'product backlog', 'agile', 'cascada', 'desarrollo agil', 'scrum master'],
        connectors: ['Metodología Scrum', 'Sprints y Backlog', 'Metodologías Ágiles', 'Tablero Kanban', 'Integración Continua']
      }
    ];
  }

  setApiKey(key) {
    this.geminiApiKey = key.trim();
    localStorage.setItem('ceneval_gemini_api_key', this.geminiApiKey);
  }

  async analyzeImage(imageSrc, onProgress) {
    if (onProgress) onProgress(15, 'Procesando imagen e iniciando Visión por Computadora...');

    // 1. Intentar OCR con Tesseract.js si está cargado
    let ocrText = '';
    if (window.Tesseract) {
      try {
        if (onProgress) onProgress(35, 'Escaneando texto, nodos y diagramas con OCR...');
        const result = await Tesseract.recognize(imageSrc, 'spa+eng', {
          logger: m => {
            if (m.status === 'recognizing text' && onProgress) {
              const p = Math.floor(35 + (m.progress || 0) * 35);
              onProgress(p, `Analizando caracteres visuales (${Math.floor((m.progress || 0) * 100)}%)...`);
            }
          }
        });
        ocrText = result.data.text || '';
      } catch (e) {
        console.warn('Error en OCR local Tesseract, recurriendo al sintetizador de visión', e);
      }
    }

    if (onProgress) onProgress(80, 'Sintetizando Resumen Técnico, Métodos de Estudio y Conectores...');

    // 2. Si hay API Key de Gemini, intentar Gemini Vision API
    if (this.geminiApiKey) {
      try {
        const geminiRes = await this.callGeminiVision(imageSrc, ocrText);
        if (geminiRes) {
          if (onProgress) onProgress(100, '¡Análisis de IA completado!');
          return geminiRes;
        }
      } catch (e) {
        console.warn('Fallo llamada a Gemini API, usando Sintetizador Inteligente CENEVAL', e);
      }
    }

    // 3. Sintetizador Inteligente CENEVAL (Local / Offline)
    const synthesized = this.synthesizeAnalysis(ocrText, imageSrc);
    if (onProgress) onProgress(100, '¡Análisis de Inteligencia Artificial Completado!');
    return synthesized;
  }

  synthesizeAnalysis(ocrText, imageSrc) {
    const textLower = ocrText.toLowerCase();

    // Buscar coincidencia en la taxonomía
    let bestMatch = this.taxonomy[0];
    let maxScore = 0;

    this.taxonomy.forEach(item => {
      let score = 0;
      item.keywords.forEach(kw => {
        if (textLower.includes(kw)) score += 2;
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    });

    // Extraer líneas de texto leídas por OCR
    const rawLines = ocrText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 3 && !/^[0-9\W]+$/.test(l));

    let detectedTitle = '';
    if (rawLines.length > 0) {
      // El título suele ser la primera línea relevante
      detectedTitle = rawLines[0].toUpperCase();
    }
    if (!detectedTitle || detectedTitle.length < 4) {
      detectedTitle = `Apunte de ${bestMatch.name}`;
    }

    // Conceptos clave detectados
    const extractedConcepts = rawLines.slice(0, 8);

    // Conectores automáticos
    const connectorsSet = new Set(bestMatch.connectors);
    rawLines.forEach(l => {
      if (l.length >= 4 && l.length <= 25) {
        connectorsSet.add(l.charAt(0).toUpperCase() + l.slice(1).toLowerCase());
      }
    });
    const connectorsList = Array.from(connectorsSet).slice(0, 5);

    // Construir Resumen Inteligente estructurado
    let summaryText = `🤖 **Resumen Generado por IA:**\n`;
    if (rawLines.length > 0) {
      summaryText += `Se analizó la imagen y se identificaron los siguientes conceptos clave:\n`;
      extractedConcepts.forEach(c => {
        summaryText += `• ${c}\n`;
      });
      summaryText += `\nEste apunte corresponde a la categoría de **${bestMatch.name}** para el examen CENEVAL.`;
    } else {
      summaryText += `Imagen/Diagrama de **${bestMatch.name}**. Incluye conceptos fundamentales y componentes de arquitectura visual.`;
    }

    // Construir Formas de Estudiar (Flashcard & Mnemotecnia)
    const mainConcept = extractedConcepts[0] || bestMatch.name;
    const secondConcept = extractedConcepts[1] || bestMatch.connectors[1];

    let studyMethodsText = `\n\n💡 **Formas y Técnicas de Estudio:**\n`;
    studyMethodsText += `1. **Pregunta Clave CENEVAL:** ¿Cuál es la función principal de ${mainConcept} en ${bestMatch.name}?\n`;
    studyMethodsText += `2. **Técnica de Memoria (Mnemotecnia):** Asocia "${mainConcept.slice(0, 4).toUpperCase()}" con ${secondConcept || 'sus componentes principales'}.\n`;
    studyMethodsText += `3. **Punto Clave a Memorizar:** Para el examen EGEL Plus, recuerda que ${mainConcept} se relaciona directamente con ${connectorsList.slice(0, 2).join(' y ')}.`;

    // Combinar la nota completa
    const fullNotes = `${summaryText}${studyMethodsText}\n\n🔗 **Conectores Mentales:** ${connectorsList.join(', ')}`;

    return {
      title: detectedTitle,
      topicId: bestMatch.topicId,
      topicName: bestMatch.name,
      summary: summaryText,
      studyMethods: studyMethodsText,
      fullNotes: fullNotes,
      connectors: connectorsList,
      rawOcrText: ocrText
    };
  }

  async callGeminiVision(imageSrc, ocrText) {
    // Si la imagen es Base64, extraer data y mime
    let mimeType = 'image/jpeg';
    let base64Data = '';

    if (imageSrc.startsWith('data:')) {
      const parts = imageSrc.split(';');
      mimeType = parts[0].replace('data:', '');
      base64Data = parts[1].replace('base64,', '');
    } else {
      // Si es URL, intentar convertir a Base64 via Canvas
      base64Data = await this.urlToBase64(imageSrc);
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`;

    const promptText = `Eres un asistente experto en el examen CENEVAL EGEL Plus de Ingeniería de Software.
Analiza la siguiente imagen de apunte/diagrama.
Texto reconocido por OCR previa: "${ocrText.slice(0, 500)}"

Responde exclusivamente en formato JSON válido con la siguiente estructura:
{
  "title": "Título sugerido descriptivo",
  "topicId": "arqui|requerimientos|movil|bd_relacional|paradigmas|calidad_cocomo",
  "summary": "Resumen técnico detallado de lo que se ve en la imagen",
  "study_questions": ["Pregunta 1 de estudio tipo CENEVAL", "Pregunta 2 de estudio"],
  "mnemonics": "Técnica de memoria o mnemotecnia para recordar este gráfico/apunte",
  "connectors": ["Conector 1", "Conector 2", "Conector 3", "Conector 4"]
}`;

    const body = {
      contents: [{
        parts: [
          { text: promptText },
          { inline_data: { mime_type: mimeType, data: base64Data } }
        ]
      }]
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      const rawJson = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(rawJson);

      const summaryText = `🤖 **Resumen IA Gemini:**\n${parsed.summary}`;
      const studyMethodsText = `\n\n💡 **Formas de Estudiar:**\n` +
        parsed.study_questions.map((q, i) => `${i + 1}. **Pregunta:** ${q}`).join('\n') +
        `\n🧠 **Mnemotecnia:** ${parsed.mnemonics}`;

      return {
        title: parsed.title,
        topicId: parsed.topicId || 'movil',
        summary: summaryText,
        studyMethods: studyMethodsText,
        fullNotes: `${summaryText}${studyMethodsText}\n\n🔗 **Conectores:** ${parsed.connectors.join(', ')}`,
        connectors: parsed.connectors || []
      };
    }

    return null;
  }

  urlToBase64(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg');
        resolve(dataURL.split(',')[1]);
      };
      img.onerror = () => resolve('');
      img.src = url;
    });
  }
}

window.AIVisionEngine = AIVisionEngine;
