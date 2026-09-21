/**
 * Base de Datos Oficial EGEL Plus ISOFT (CENEVAL Nivel SOBRESALIENTE)
 * Basada estrictamente en la Estructura de 203 Reactivos y la Bibliografía Oficial:
 * - ISO/IEC/IEEE 29148:2018 (Requerimientos)
 * - ISO/IEC 25002:2024 / SQuaRE (Calidad de Software)
 * - Guía del PMBOK 7a ed. (PMI)
 * - 10 Heurísticas de Usabilidad de Jakob Nielsen (Nielsen Norman Group)
 * - Vista 4+1 de Arquitectura de Kruchten
 * - Guía Oficial de Scrum 2020 (Schwaber & Sutherland)
 * - Libros de Referencia: Pressman 9a ed., Sommerville 10a ed., Joyanes 2a ed., McConnell Code Complete
 * Y Sección Transversal de Comprensión Lectora EGEL Plus.
 */

const TOPICS_DATA = [
  {
    id: "area1_requerimientos",
    name: "Área 1: Análisis de Sistemas (Requerimientos)",
    icon: "ANALYSIS",
    color: "#f43f5e",
    description: "Análisis, elicitación, priorización, validación y documentación SRS según ISO/IEC/IEEE 29148:2018.",
    cards: [
      {
        id: "a1_1",
        topic: "Área 1: Análisis de Sistemas",
        badge: "Tipos de Requerimientos",
        question: "¿Cómo clasifica la norma ISO/IEC/IEEE 29148:2018 los Requerimientos Funcionales y No Funcionales?",
        answer: "Los Requerimientos Funcionales especifican las capacidades o servicios que el sistema DEBE realizar (comportamiento observable). Los Requerimientos No Funcionales (Requerimientos de Calidad) definen las condiciones, restricciones operativas y niveles de servicio (rendimiento, seguridad, disponibilidad, usabilidad).",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nISO/IEC/IEEE 29148:2018 - Systems and software engineering: Requirements engineering.\nWiegers & Hokanson (2023) - Core Practices for Successful Business Analysis.",
        citation: "ISO/IEC/IEEE 29148:2018 & Wiegers (2023)",
        connectors: ["Requerimientos Funcionales - Servicios del Sistema - Comportamiento Observable", "ISO/IEC/IEEE 29148:2018 - Atributos de Calidad - Requerimientos No Funcionales"]
      },
      {
        id: "a1_2",
        topic: "Área 1: Análisis de Sistemas",
        badge: "User Story Mapping (Patton)",
        question: "¿En qué consiste la técnica de User Story Mapping creada por Jeff Patton para la elicitación de requerimientos?",
        answer: "Es un enfoque visual bidimensional para organizar el Product Backlog. El eje horizontal representa la 'Espina Dorsal' (Backbone) con las actividades del usuario en orden cronológico, mientras que el eje vertical organiza las Historias de Usuario por prioridad descendente para definir las entregas de los lanzamientos (Releases / MVP).",
        codeSnippet: "// Referencia CENEVAL:\nPatton, J. (2014). User Story Mapping: Discover the whole story, build the right product. O'Reilly.",
        citation: "Patton, J. (2014) User Story Mapping",
        connectors: ["User Story Mapping - Espina Dorsal Backbone - Priorización de Lanzamientos MVP", "Jeff Patton 2014 - Elicitación Ágil - Historias de Usuario"]
      },
      {
        id: "a1_3",
        topic: "Área 1: Análisis de Sistemas",
        badge: "Documentación SRS (IEEE 830)",
        question: "¿Cuáles son las 7 características obligatorias de una Especificación de Requerimientos de Software (SRS) de calidad?",
        answer: "1) Correcta, 2) No ambigua, 3) Completa, 4) Consistente, 5) Clasificada por importancia/prioridad, 6) Verificable (Testeable mediante pruebas) y 7) Trazable (permite seguir el origen y destino del requerimiento).",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nSommerville, I. (2016). Software Engineering (10a ed.). Pearson.\nPressman, R. S. & Maxim, B. (2020). Software Engineering (9a ed.). McGraw-Hill.",
        citation: "Sommerville (2016) & Pressman 9a ed.",
        connectors: ["Especificación SRS - Estándar IEEE 830 - Criterios de Verificabilidad y Trazabilidad", "Sommerville 10a ed - Calidad de Requerimientos - Contrato de Software"]
      }
    ],
    quizzes: [
      {
        id: "q_a1_1",
        question: "De acuerdo con ISO/IEC/IEEE 29148:2018, la sentencia 'El sistema debe procesar las transacciones de pago en menos de 1.8 segundos' corresponde a:",
        correct: "Un Requerimiento No Funcional (Rendimiento / Nivel de Servicio)",
        distractor: "Un Requerimiento Funcional de Proceso",
        incorrect: "Un Requerimiento de Arquitectura Física",
        explanation: "Establece una restricción cuantitativa de tiempo y calidad en el servicio (rendimiento), lo cual define un Requerimiento No Funcional."
      }
    ]
  },
  {
    id: "area2_diseno",
    name: "Área 2: Diseño de Sistemas (Arquitectura & UX)",
    icon: "DESIGN",
    color: "#0284c7",
    description: "Vista 4+1 de Kruchten, Acoplamiento/Cohesión, 10 Heurísticas de Usabilidad de Nielsen NNG y UML 2.0.",
    cards: [
      {
        id: "a2_1",
        topic: "Área 2: Diseño de Sistemas",
        badge: "Arquitectura Vista 4+1 (Kruchten)",
        question: "¿Cuáles son las 5 vistas del modelo arquitectónico Vista 4+1 propuesto por Philippe Kruchten?",
        answer: "1) **Vista Lógica** (funcionalidad/clases para usuarios), 2) **Vista de Procesos** (concurrencia y rendimiento en tiempo de ejecución), 3) **Vista de Desarrollo/Construcción** (organización de módulos y código), 4) **Vista Física/Despliegue** (mapeo del software en hardware/servidores) y **+1 Escenarios/Casos de Uso** (conecta y valida todas las vistas).",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nKruchten, P. (1995). Architectural Blueprints: The '4+1' View Model of Software Architecture. IEEE Software.\nBass, L. et al. (2021). Software Architecture in Practice (4a ed.).",
        citation: "Kruchten, P. (1995) & Bass (2021)",
        connectors: ["Vista 4+1 Kruchten - Modelo Arquitectónico - Vistas Lógica Desarrollo Física Procesos", "Arquitectura SAD - Casos de Uso Escenarios - Despliegue en Hardware"]
      },
      {
        id: "a2_2",
        topic: "Área 2: Diseño de Sistemas",
        badge: "Acoplamiento y Cohesión",
        question: "¿Por qué el diseño orientado a objetos busca Alta Cohesión y Bajo Acoplamiento?",
        answer: "La **Alta Cohesión** garantiza que un módulo o clase tenga una responsabilidad única y enfocada (Principio de Responsabilidad Única). El **Bajo Acoplamiento** reduce las dependencias entre módulos independientes, facilitando el mantenimiento, la reutilización de código y la tolerancia a fallos.",
        codeSnippet: "// Referencia CENEVAL:\nPascual, J. R. (2019). Acoplamiento y cohesión. Blog Disrupción Tecnológica.\nJoyanes, L. & Zahonero, I. (2014). Programación en C, C++, Java y UML (2a ed.).",
        citation: "Pascual, J. R. (2019) & Joyanes (2014)",
        connectors: ["Alta Cohesión - Responsabilidad Única - Módulos Enfocados", "Bajo Acoplamiento - Independencia de Módulos - Mantenimiento y Reutilización"]
      },
      {
        id: "a2_3",
        topic: "Área 2: Diseño de Sistemas",
        badge: "10 Heurísticas de Nielsen (NNG)",
        question: "¿Cuáles son las Heurísticas de Usabilidad de Jakob Nielsen más evaluadas en el CENEVAL para diseño de interfaces (HCI / UX)?",
        answer: "1) **Visibilidad del estado del sistema** (retroalimentación constante), 2) **Coincidencia entre el sistema y el mundo real** (lenguaje del usuario), 3) **Control y libertad del usuario** (deshacer/rehacer), 4) **Consistencia y estándares**, 5) **Prevención de errores**, 6) **Reconocer antes que recordar**, 7) **Flexibilidad y eficiencia de uso**, 8) **Diseño estético y minimalista**, 9) **Ayudar a reconocer y recuperar errores**, 10) **Ayuda y documentación**.",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nNielsen, J. (2024). 10 Usability Heuristics for User Interface Design. Nielsen Norman Group (NNG).",
        citation: "Nielsen, J. (2024) Nielsen Norman Group",
        connectors: ["10 Heurísticas de Nielsen - Usabilidad UX HCI - Visibilidad del Estado del Sistema", "Nielsen Norman Group - Prevención de Errores - Control y Libertad del Usuario"]
      }
    ],
    quizzes: [
      {
        id: "q_a2_1",
        question: "Un diseñador agrega un botón de 'Deshacer Acción' (Undo) en un sistema para que el usuario revierta un borrado accidental. ¿Qué heurística de usabilidad de Jakob Nielsen se está aplicando?",
        correct: "Control y Libertad del Usuario (User Control and Freedom)",
        distractor: "Prevención de Errores (Error Prevention)",
        incorrect: "Flexibilidad y Eficiencia de Uso",
        explanation: "Permitir deshacer o cancelar una acción realizada por equivocación brinda control y libertad de salida inmediata al usuario."
      }
    ]
  },
  {
    id: "area3_desarrollo",
    name: "Área 3: Desarrollo de Sistemas (Lenguajes & Datos)",
    icon: "DEVELOPMENT",
    color: "#6366f1",
    description: "Lenguajes (C, C++, Java, Python, JS), Paradigmas, SQL Beaulieu, NoSQL y Code Complete McConnell.",
    cards: [
      {
        id: "a3_1",
        topic: "Área 3: Desarrollo de Sistemas",
        badge: "Principios de Lenguajes",
        question: "¿Cómo clasifica el CENEVAL los lenguajes de programación por su paradigma de ejecución y sistema de tipado?",
        answer: "Por tipado: **Estático** (verificación en compilación: C, C++, Java) vs **Dinámico** (verificación en ejecución: Python, JS). Por ejecución: **Compilados a código máquina** (C, C++), **Interpretados mediante JVM/Bytecode** (Java) e **Interpretados por motor scripting** (Python, JS).",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nGabbrielli, M. & Martini, S. (2010). Programming Languages: Principles and Paradigms. Springer.\nFrancis, P. (2022). Python vs Other Programming Languages.",
        citation: "Gabbrielli & Martini (2010)",
        connectors: ["Tipado Estático vs Dinámico - Verificación en Compilación vs Ejecución - Lenguajes de Programación", "Gabbrielli 2010 - Paradigmas de Lenguajes - C Java Python JavaScript"]
      },
      {
        id: "a3_2",
        topic: "Área 3: Desarrollo de Sistemas",
        badge: "SQL Avanzado (Beaulieu)",
        question: "¿Cuál es la diferencia entre las funciones de agregación (COUNT, SUM, AVG) y las Funciones Ventana (Window Functions) en SQL?",
        answer: "Las funciones de agregación tradicionales agrupan múltiples filas en una sola fila resultado mediante `GROUP BY`. Las **Funciones Ventana** (`OVER(PARTITION BY ... ORDER BY ...)`) realizan cálculos sobre un conjunto de filas relacionadas pero CONSERVAN la identidad individual de cada fila en el resultado.",
        codeSnippet: "-- Referencia CENEVAL:\nBeaulieu, A. (2020). Learning SQL: Generate, Manipulate, and Retrieve Data (3a ed.). O'Reilly.\nSELECT empleado, departamento, salario, \n       AVG(salario) OVER(PARTITION BY departamento) AS promedio_depto\nFROM Empleados;",
        citation: "Beaulieu, A. (2020) Learning SQL 3a ed.",
        connectors: ["SQL Beaulieu 3a ed - Funciones Ventana OVER - Agregación sin Perder Filas", "Partition By - Consultas Relacionales Avanzadas - Analytics SQL"]
      }
    ],
    quizzes: [
      {
        id: "q_a3_1",
        question: "En SQL relacional (Beaulieu 2020), ¿qué cláusula permite realizar particionamientos analíticos conservando el detalle de cada fila individual?",
        correct: "OVER (PARTITION BY ...)",
        distractor: "GROUP BY ... HAVING",
        incorrect: "INNER JOIN ... ON",
        explanation: "La cláusula `OVER(PARTITION BY)` define una Función Ventana que calcula agregados conservando la fila individual."
      }
    ]
  },
  {
    id: "area4_gestion",
    name: "Área 4: Gestión de Proyectos (PMBOK & Calidad)",
    icon: "PROJECTS",
    color: "#10b981",
    description: "PMBOK 7a ed., Guía Scrum 2020, Modelo ISO/IEC 25002:2024 SQuaRE y COCOMO Garita.",
    cards: [
      {
        id: "a4_1",
        topic: "Área 4: Gestión de Proyectos",
        badge: "Guía del PMBOK 7a ed. (PMI)",
        question: "¿Cuáles son los 8 Dominios de Desempeño del Proyecto definidos en la Guía del PMBOK 7a edición del PMI?",
        answer: "1) Interesados (Stakeholders), 2) Equipo, 3) Enfoque de Desarrollo y Ciclo de Vida, 4) Planificación, 5) Trabajo del Proyecto, 6) Entrega, 7) Métrica, 8) Incertidumbre (Riesgos).",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nProject Management Institute (2021). Guía de los Fundamentos para la Dirección de Proyectos (Guía del PMBOK®) (7a ed.). PA: PMI.",
        citation: "PMI Guía del PMBOK 7a ed. (2021)",
        connectors: ["Guía del PMBOK 7a ed - PMI 8 Dominios de Desempeño - Gestión de Proyectos", "Riesgos e Incertidumbre - Enfoque de Desarrollo - Entregas de Valor"]
      },
      {
        id: "a4_2",
        topic: "Área 4: Gestión de Proyectos",
        badge: "Calidad ISO/IEC 25002:2024 (SQuaRE)",
        question: "¿Cuáles son las 8 características de calidad del producto de software según la norma ISO/IEC 25010 / 25002:2024 (SQuaRE)?",
        answer: "1) Adecuación Funcional, 2) Eficiencia de Rendimiento, 3) Compatibilidad, 4) Usabilidad, 5) Fiabilidad (Reliability), 6) Seguridad, 7) Mantenibilidad y 8) Portabilidad.",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nISO (2024). ISO/IEC 25002:2024. Systems and software engineering - SQuaRE. Quality model overview.\nArciniega, F. (2017). Normas y estándares de calidad.",
        citation: "ISO/IEC 25002:2024 SQuaRE & Arciniega",
        connectors: ["ISO/IEC 25002:2024 SQuaRE - Modelo de Calidad de Software - 8 Características del Producto", "Fiabilidad Seguridad Mantenibilidad - Estándares ISO - Evaluación de Calidad"]
      },
      {
        id: "a4_3",
        topic: "Área 4: Gestión de Proyectos",
        badge: "Guía Oficial Scrum 2020",
        question: "¿Qué cambios y definiciones establece la Guía Oficial de Scrum 2020 de Schwaber & Sutherland?",
        answer: "Define Scrum como un framework liviano. Elimina el término 'Development Team' por 'Developers' dentro del único **Scrum Team**. Introduce el **Objetivo del Producto (Product Goal)** asignado al Product Backlog y mantiene las 3 metas: Product Goal, Sprint Goal e Increment Definition.",
        codeSnippet: "// Cita Bibliográfica CENEVAL:\nSchwaber, K. & Sutherland, J. (2020). La guía de Scrum: La guía definitiva de Scrum, las reglas del juego. Scrum Guides.",
        citation: "Schwaber & Sutherland (2020) Guía de Scrum",
        connectors: ["Guía Oficial de Scrum 2020 - Schwaber y Sutherland - Product Goal y Sprint Goal", "Scrum Team - Developers Product Owner Scrum Master - Artefactos Ágiles"]
      }
    ],
    quizzes: [
      {
        id: "q_a4_1",
        question: "De acuerdo con el modelo de calidad ISO/IEC 25002:2024 (SQuaRE), la capacidad de un sistema para modificar el código fácilmente sin introducir errores corresponde a la característica de:",
        correct: "Mantenibilidad (Maintainability)",
        distractor: "Fiabilidad (Reliability)",
        incorrect: "Adecuación Funcional",
        explanation: "La Mantenibilidad mide la facilidad con la que el software puede ser modificado, corregido o mejorado."
      }
    ]
  },
  {
    id: "transversal_lectura",
    name: "Sección Transversal: Comprensión Lectora (60 Reactivos)",
    icon: "READING",
    color: "#eab308",
    description: "Estrategias de análisis de textos técnicos, idea principal, inferencias y evaluación de lectura EGEL Plus.",
    cards: [
      {
        id: "tr_1",
        topic: "Sección Transversal: Comprensión Lectora",
        badge: "Idea Principal vs Secundaria",
        question: "¿Cómo identificar la Idea Principal de un texto científico o técnico en el examen CENEVAL?",
        answer: "La **Idea Principal** sintetiza el pensamiento central del autor; si se elimina, el texto pierde su sentido global. Las **Ideas Secundarias** ejemplifican, detallan, justifican o argumentan la idea principal. Se identifica preguntando: '¿De qué o de quién habla el texto en esencia y qué afirma sobre ello?'.",
        codeSnippet: "// Estrategia EGEL Plus:\n1. Identificar el Tema Central (sustantivo recurrente).\n2. Localizar la oración tesis (frecuentemente al inicio o final del párrafo de introducción).\n3. Descartar opciones que sólo aborden detalles o ejemplos secundarios.",
        citation: "Guía Oficial EGEL Plus CENEVAL 2024",
        connectors: ["Comprensión Lectora EGEL Plus - Idea Principal - Sintaxis y Tesis del Texto", "Evaluación Transversal - Lectura Técnica - Análisis de Párrafos"]
      },
      {
        id: "tr_2",
        topic: "Sección Transversal: Comprensión Lectora",
        badge: "Inferencia Lógica Textual",
        question: "¿En qué consiste una Inferencia válida en la prueba de Comprensión Lectora?",
        answer: "Una **Inferencia** es una conclusión lógica deducida directamente de las premisas explícitas del texto. Debe ser 100% respaldada por la evidencia del pasaje sin caer en suposiciones externas no fundamentadas ni extrapolar más allá de lo dicho por el autor.",
        codeSnippet: "// Regla de Oro CENEVAL:\nUna inferencia correcta NUNCA contradice al texto y NUNCA inventa información fuera de las premisas escritas.",
        citation: "Guía Oficial EGEL Plus CENEVAL 2024",
        connectors: ["Inferencia Lógica - Deducción Basada en Evidencia - Prueba Transversal CENEVAL", "Comprensión Lectora - Premisas e Implicaciones - Análisis Crítico de Textos"]
      }
    ],
    quizzes: [
      {
        id: "q_tr_1",
        question: "Texto: 'A pesar de los avances en inteligencia artificial, el diseño de arquitecturas de software sigue requiriendo la intuición humana para sopesar compromisos no cuantificables entre seguridad y costo'. ¿Cuál es la idea principal?",
        correct: "La intuición humana es indispensable en la arquitectura de software para evaluar decisiones complejas no cuantificables",
        distractor: "La inteligencia artificial ha reemplazado por completo a los arquitectos de software en la seguridad",
        incorrect: "El costo del software es el único factor relevante en la inteligencia artificial",
        explanation: "El texto afirma que la intuición humana sigue siendo necesaria para evaluar compromisos no cuantificables (seguridad y costo)."
      }
    ]
  }
];
