/**
 * Base de Datos Oficial de Estudio CENEVAL de Ingeniería de Software (66 Fichas Completas: Básico a Avanzado)
 * Conectores explicitados formato "Concepto A - Concepto B - Categoría"
 */

const TOPICS_DATA = [
  {
    id: "logica",
    name: "Lógica de Programación",
    icon: "LOGIC",
    color: "#4f46e5",
    description: "Algoritmos, estructuras de control, pseudocódigo, tablas de verdad y operaciones lógicas.",
    cards: [
      {
        id: "log_1",
        topic: "Lógica de Programación",
        badge: "Propiedades Algorítmicas",
        question: "¿Qué es un algoritmo y cuáles son sus tres propiedades fundamentales obligatorias?",
        answer: "Un algoritmo es una secuencia finita, ordenada y no ambigua de pasos. Sus 3 propiedades son: 1) Precisión, 2) Definición y 3) Finitud.",
        codeSnippet: "// Pseudocódigo CENEVAL:\nALGORITMO EsPar\n  ENTRADA: entero n\n  SI (n MOD 2 == 0) ENTONCES\n    IMPRIMIR 'Par'\n  SINO\n    IMPRIMIR 'Impar'\n  FIN_SI\nFIN_ALGORITMO",
        connectors: ["Algoritmo - Entrada/Salida definida - Diagrama de Actividades", "Precisión y Finitud - Pensamiento Algorítmico - Estructuras de Control"]
      },
      {
        id: "log_2",
        topic: "Lógica de Programación",
        badge: "Estructuras Repetitivas",
        question: "¿Cuál es la diferencia crítica entre un ciclo Mientras (While) y un ciclo Hacer-Mientras (Do-While)?",
        answer: "El ciclo Mientras evalúa la condición al INICIO (puede ejecutarse 0 veces). El ciclo Hacer-Mientras evalúa al FINAL, garantizando al menos 1 ejecución obligatoria.",
        codeSnippet: "do {\n    solicitarDato();\n} while (datoValido == false);",
        connectors: ["Ciclo While - Evaluación al inicio - 0 ejecuciones posibles", "Ciclo Do-While - Evaluación al final - Al menos 1 ejecución"]
      },
      {
        id: "log_3",
        topic: "Lógica de Programación",
        badge: "Tablas de Verdad",
        question: "¿Cómo se evalúa la jerarquía de operadores lógicos y relacionales?",
        answer: "Precedencia: 1) Paréntesis, 2) Aritméticos, 3) Relacionales, 4) NOT, 5) AND, 6) OR. En AND ambos deben ser verdaderos; en OR basta uno.",
        codeSnippet: "(8 > 5) AND NOT(3 == 4) OR (10 < 2) --> VERDADERO",
        connectors: ["Operadores Lógicos - Precedencia AND/OR/NOT - Tablas de Verdad", "Evaluación de Expresiones - Condicionales - Filtros SQL WHERE"]
      },
      {
        id: "log_4",
        topic: "Lógica de Programación",
        badge: "Estructuras de Datos Estáticas",
        question: "¿Qué es un Arreglo (Array) y cómo se realiza el acceso a sus elementos?",
        answer: "Colección contigua de elementos del mismo tipo. El acceso es directo en tiempo constante O(1) por su índice numérico basado en cero.",
        codeSnippet: "int numeros[5] = {10, 20, 30, 40, 50};\nint val = numeros[0];",
        connectors: ["Arreglo Unidimensional - Acceso por índice O(1) - Estructura de Datos Estática", "Memoria Contigua - Indexación Cero - Vectores"]
      },
      {
        id: "log_5",
        topic: "Lógica de Programación",
        badge: "Modularidad y Parámetros",
        question: "¿Cuál es la diferencia entre el paso de parámetros por Valor y por Referencia?",
        answer: "Por Valor pasa una COPIA (no altera el dato original). Por Referencia pasa la DIRECCIÓN DE MEMORIA (modifica directamente el dato original).",
        codeSnippet: "void modificar(int *x) { *x = 99; }",
        connectors: ["Funciones - Paso por Valor vs Referencia - Pila de Llamadas Call Stack", "Modificación de Memoria - Punteros - Parámetros de Salida"]
      },
      {
        id: "log_6",
        topic: "Lógica de Programación",
        badge: "Tipos de Datos Primitivos",
        question: "¿Cuáles son los 4 tipos de datos primitivos universales en programación?",
        answer: "1) Entero (sin decimales), 2) Real/Flotante (con decimales), 3) Caracter (un solo símbolo ASCII/Unicode), 4) Booleano (valores de verdad: verdadero o falso).",
        codeSnippet: "entero x = 10;\nreal pi = 3.1416;\nbooleano activo = verdadero;",
        connectors: ["Tipos Primitivos - Entero Flotante Caracter Booleano - Memoria de Datos", "Declaración de Variables - Asignación - Tipado Estático y Dinámico"]
      },
      {
        id: "log_7",
        topic: "Lógica de Programación",
        badge: "Matrices Bidimensionales",
        question: "¿Qué es una Matriz Bidimensional y cómo se recorre mediante bucles anidados?",
        answer: "Es una estructura de tabla con filas (i) y columnas (j). Se recorre con un ciclo externo para las filas y un ciclo interno anidado para las columnas.",
        codeSnippet: "for (int i=0; i<filas; i++) {\n  for (int j=0; j<cols; j++) {\n    matriz[i][j] = 0;\n  }\n}",
        connectors: ["Matriz Bidimensional - Filas y Columnas - Arreglos Anidados", "Ciclos Anidados - Recorrido de Matrices - Algoritmos de Tablas"]
      }
    ],
    quizzes: [
      {
        id: "q_log_1",
        question: "¿Qué valor tomará la variable resultado tras evaluar: (15 / 3 == 5) AND (4 * 2 > 10 OR NOT(7 <= 2))?",
        correct: "Verdadero (True)",
        distractor: "Falso (False) porque 4 * 2 > 10 es falso",
        incorrect: "Error de sintaxis por combinación de operadores",
        explanation: "(15/3 == 5) es Verdadero. En (8 > 10 OR NOT(7<=2)), 8>10 es Falso, pero NOT(Falso) es Verdadero. Verdadero AND Verdadero resulta Verdadero."
      }
    ]
  },
  {
    id: "python",
    name: "Python",
    icon: "PYTHON",
    color: "#0284c7",
    description: "Sintaxis oficial, estructuras de datos, mutabilidad, POO y manejo de archivos (Libro Eric Matthes).",
    cards: [
      {
        id: "py_1",
        topic: "Python",
        badge: "Mutabilidad de Estructuras",
        question: "¿Cuál es la diferencia técnica entre Listas, Tuplas y Diccionarios en Python?",
        answer: "Listas `[ ]`: mutables ordenadas. Tuplas `( )`: inmutables ordenadas (ahorran memoria). Diccionarios `{ }`: mutables clave-valor.",
        codeSnippet: "lista = [10, 20]\ntupla = (10, 20)\ndiccionario = {'clave': 'valor'}",
        connectors: ["Python Listas - Mutabilidad - Operaciones Append/Pop", "Python Tuplas - Inmutabilidad - Optimización de Memoria"]
      },
      {
        id: "py_2",
        topic: "Python",
        badge: "POO - Libro Eric Matthes",
        question: "¿Cómo funciona la inicialización de clases con __init__ y para qué sirve self?",
        answer: "`__init__(self, ...)` es el constructor. `self` es la referencia a la instancia actual del objeto para acceder a sus atributos.",
        codeSnippet: "class Auto:\n    def __init__(self, marca):\n        self.marca = marca",
        connectors: ["Python __init__ - Método Constructor - Atributos de Instancia", "Self - Instancia Actual del Objeto - POO en Python"]
      },
      {
        id: "py_3",
        topic: "Python",
        badge: "Manejo de Archivos",
        question: "¿Por qué se recomienda utilizar 'with open()' al manipular archivos en Python?",
        answer: "El bloque `with` es un Context Manager que garantiza el cierre automático del archivo al finalizar el bloque, previniendo fuga de recursos.",
        codeSnippet: "with open('datos.txt', 'r') as f:\n    contenido = f.read()",
        connectors: ["Context Manager - Administrador de Recursos - Cierre automático de archivos", "Manejo de Archivos - Lectura/Escritura Segura - Excepciones en Python"]
      },
      {
        id: "py_4",
        topic: "Python",
        badge: "Comprensión de Listas",
        question: "¿Qué es una Comprensión de Listas (List Comprehension) en Python?",
        answer: "Sintaxis concisa para crear y filtrar listas a partir de iterables en una sola línea de código.",
        codeSnippet: "cuadrados = [x**2 for x in range(10) if x % 2 == 0]",
        connectors: ["List Comprehension - Sintaxis Concisa - Filtrado y Mapeo en Python", "Iterables - Programación Funcional - Listas Dinámicas"]
      },
      {
        id: "py_5",
        topic: "Python",
        badge: "Manejo de Excepciones",
        question: "¿Cómo funciona el bloque try / except / else / finally en Python?",
        answer: "`try` prueba código, `except` captura errores, `else` corre si no hubo error, `finally` se ejecuta SIEMPRE obligatoriamente.",
        codeSnippet: "try:\n    r = 10 / 0\nexcept ZeroDivisionError:\n    print('Error')\nfinally:\n    print('Fin')",
        connectors: ["Manejo de Excepciones - Captura de Errores - Bloque Finally Garantizado", "ZeroDivisionError - Control de Fluxo de Errores - Robustece de Software"]
      },
      {
        id: "py_6",
        topic: "Python",
        badge: "Slicing Avanzado",
        question: "¿Cómo funciona el rebanado de secuencias lista[inicio:fin:paso] en Python?",
        answer: "Permite extraer sub-secuencias. `paso` negativo como `[::-1]` invierte completamente la cadena o lista.",
        codeSnippet: "texto = 'CENEVAL'\nprint(texto[::-1]) # Imprime 'LAVENEC'",
        connectors: ["Slicing Python - Rebanado de Cadenas - Inversión de Secuencia", "Parámetro Paso - Rebanado Avanzado - Indexación Negativa"]
      }
    ],
    quizzes: [
      {
        id: "q_py_1",
        question: "¿Qué resultado devolverá la ejecución de: valores = [10, 20, 30, 40, 50]; print(valores[1:4])?",
        correct: "[20, 30, 40]",
        distractor: "[10, 20, 30, 40]",
        incorrect: "[20, 30, 40, 50]",
        explanation: "El slicing `[1:4]` toma desde el índice 1 (valor 20) hasta el índice 4 excluyéndolo (índice 3 = 40), obteniendo `[20, 30, 40]`."
      }
    ]
  },
  {
    id: "c",
    name: "Lenguaje C",
    icon: "C_LANG",
    color: "#6366f1",
    description: "Programación estructurada, punteros, operadores de memoria, paso por referencia y administración del Heap.",
    cards: [
      {
        id: "c_1",
        topic: "Lenguaje C",
        badge: "Punteros y Memoria",
        question: "¿Cuál es la función del operador & y del operador * en C?",
        answer: "`&` (referencia) obtiene la dirección de memoria. `*` (desreferencia) accede o modifica el valor en la dirección apuntada.",
        codeSnippet: "int num = 50;\nint *ptr = &num;\n*ptr = 100;",
        connectors: ["Operador & - Dirección de Memoria RAM - Referencia en C", "Operador * - Desreferencia - Acceso al Valor Puntero"]
      },
      {
        id: "c_2",
        topic: "Lenguaje C",
        badge: "Gestión Dinámica de Memoria",
        question: "¿Qué realizan las funciones malloc(), calloc() y free() en C?",
        answer: "`malloc` asigna memoria en el Heap sin limpiar. `calloc` asigna e inicializa en cero. `free` libera memoria para evitar Memory Leaks.",
        codeSnippet: "int *arr = (int*) malloc(5 * sizeof(int));\nfree(arr);",
        connectors: ["Heap - malloc y calloc - Reserva Dinámica en C", "Memory Leak - Función free() - Liberación de Memoria"]
      },
      {
        id: "c_3",
        topic: "Lenguaje C",
        badge: "Estructuras compuestas",
        question: "¿Qué es una struct en C y cómo se accede a sus miembros con un puntero?",
        answer: "Agrupa variables de diferentes tipos bajo un nombre. Con punteros a `struct` se usa el operador flecha `->` para acceder a campos.",
        codeSnippet: "struct Persona { char nombre[30]; int edad; };\nstruct Persona *p = &p1;\np->edad = 25;",
        connectors: ["Struct en C - Agrupación de Variables - Operador Flecha ->", "Punteros a Estructuras - Registros de Datos - Memoria en C"]
      },
      {
        id: "c_4",
        topic: "Lenguaje C",
        badge: "Cadenas de Caracteres",
        question: "¿Cómo se representan las cadenas de texto en C y qué es el caracter nulo \\0?",
        answer: "Son arreglos `char[]` terminados obligatoriamente por el caracter nulo `\\0` (ASCII 0) que indica el final a las funciones.",
        codeSnippet: "char saludo[] = \"Hola\";",
        connectors: ["Cadenas en C - Arreglo de Caracteres - Caracter Nulo \\0", "strlen y strcpy - Terminación Nula - Buffers de Memoria"]
      },
      {
        id: "c_5",
        topic: "Lenguaje C",
        badge: "Manejo de Archivos en C",
        question: "¿Qué funciones se emplean para abrir y cerrar archivos en C?",
        answer: "`fopen(\"archivo.txt\", \"r\")` abre un archivo devolviendo un puntero `FILE*`. `fclose(fp)` cierra el archivo liberando el buffer del SO.",
        codeSnippet: "FILE *fp = fopen(\"apuntes.txt\", \"r\");\nif (fp != NULL) fclose(fp);",
        connectors: ["Archivos en C - FILE Puntero - fopen y fclose", "Modos de Apertura - Lectura y Escritura - Buffers en C"]
      }
    ],
    quizzes: [
      {
        id: "q_c_1",
        question: "Dada la declaración: int x = 5; int *ptr = &x; *ptr += 10; ¿cuál es el valor final de x?",
        correct: "15",
        distractor: "5",
        incorrect: "La dirección de memoria del puntero",
        explanation: "`*ptr += 10` desreferencia la dirección de `x` y le suma 10 a su valor original de 5."
      }
    ]
  },
  {
    id: "cpp",
    name: "Lenguaje C++",
    icon: "CPP",
    color: "#ec4899",
    description: "POO en C++, constructores, destructores, referencias, herencia múltiple y librería STL.",
    cards: [
      {
        id: "cpp_1",
        topic: "Lenguaje C++",
        badge: "Destructores y RAII",
        question: "¿Qué es un Destructor en C++ y cuándo se ejecuta?",
        answer: "Método especial precedido por `~`. Se invoca automáticamente al salir de ámbito o usar `delete`, liberando recursos bajo RAII.",
        codeSnippet: "class Archivo {\npublic:\n    ~Archivo() { cerrar(); }\n};",
        connectors: ["Destructor ~Clase - Liberación Automática - Gestión RAII en C++", "Gestión de Recursos - Salida de Ámbito - Sobrecarga de Clases"]
      },
      {
        id: "cpp_2",
        topic: "Lenguaje C++",
        badge: "Sobrecarga de Métodos",
        question: "¿Qué es la Sobrecarga de Funciones y Operadores en C++?",
        answer: "Permite definir múltiples funciones con el mismo nombre en la clase mientras difieran en el número o tipo de parámetros (firma).",
        codeSnippet: "int sumar(int a, int b);\ndouble sumar(double a, double b);",
        connectors: ["Sobrecarga - Polimorfismo Estático - Firmas de Métodos Distintas", "Firma de Funciones - Compilación C++ - Reutilización de Nombres"]
      },
      {
        id: "cpp_3",
        topic: "Lenguaje C++",
        badge: "Referencias vs Punteros",
        question: "¿Cuál es la diferencia entre una Referencia (type &ref) y un Puntero (type *ptr) en C++?",
        answer: "Referencia: alias inmutable para una variable (no puede ser nula). Puntero: almacena dirección de memoria, reasignable y puede ser nulo.",
        codeSnippet: "int x = 10;\nint &ref = x;\nint *ptr = &x;",
        connectors: ["Referencias C++ - Alias de Memoria - Sin desreferencia explícita", "Punteros vs Referencias - Seguridad de Memoria - Parámetros C++"]
      },
      {
        id: "cpp_4",
        topic: "Lenguaje C++",
        badge: "Librería Estándar STL",
        question: "¿Qué es std::vector en la librería STL de C++?",
        answer: "Plantilla de contenedor dinámico que administra un arreglo de tamaño variable en memoria contigua.",
        codeSnippet: "std::vector<int> nums = {1, 2, 3};\nnums.push_back(4);",
        connectors: ["STL C++ - std::vector - Plantillas Genéricas de Datos", "Contenedores Dinámicos - Push Back - Memoria Contigua STL"]
      }
    ],
    quizzes: [
      {
        id: "q_cpp_1",
        question: "¿Qué mecanismo en C++ permite que múltiples funciones compartan el mismo nombre diferenciándose por sus parámetros?",
        correct: "Sobrecarga de Funciones (Overloading)",
        distractor: "Sobrescritura de Métodos (Overriding)",
        incorrect: "Polimorfismo Dinámico",
        explanation: "La sobrecarga permite funciones con el mismo nombre pero distintas firmas de argumentos."
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    icon: "JAVA",
    color: "#f97316",
    description: "JVM, Bytecode, Clases, Herencia, Interfaces, Excepciones y Colecciones.",
    cards: [
      {
        id: "java_1",
        topic: "Java",
        badge: "Arquitectura JVM",
        question: "¿Qué es la JVM y cómo funciona la portabilidad del Bytecode?",
        answer: "`javac` compila a Bytecode `.class`. La JVM ejecuta este Bytecode en cualquier sistema operativo host (portabilidad).",
        codeSnippet: "Código.java -> [javac] -> Código.class -> [JVM] -> Ejecución Nativa",
        connectors: ["JVM - Bytecode .class - Compilación JIT e Independencia de Plataforma", "Portabilidad Java - Runtime Environment - Ejecución en cualquier SO"]
      },
      {
        id: "java_2",
        topic: "Java",
        badge: "Interfaces vs Clases Abstractas",
        question: "¿Diferencia fundamental entre Interface y Abstract Class en Java?",
        answer: "Interface: contrato puro (`implements`), herencia múltiple. Abstract Class: admite código y métodos abstractos (`extends`), herencia simple.",
        codeSnippet: "interface Volador { void volar(); }\nclass Ave implements Volador { public void volar() {} }",
        connectors: ["Interface Java - Contrato Puro de Métodos - Herencia Múltiple de Interfaces", "Clase Abstracta - Reutilización de Código - Herencia Simple"]
      },
      {
        id: "java_3",
        topic: "Java",
        badge: "Modificadores Clave",
        question: "¿Para qué sirve la palabra clave 'final' en Java?",
        answer: "En variables: constantes. En métodos: prohíbe sobrescritura por subclases. En clases: prohíbe herencia completamente.",
        codeSnippet: "public final class Constantes { public static final double PI = 3.14159; }",
        connectors: ["Palabra final - Clases Invariables - Constantes y Métodos Inmodificables", "Modificadores Java - Restricción de Herencia - Seguridad de Código"]
      },
      {
        id: "java_4",
        topic: "Java",
        badge: "Framework de Colecciones",
        question: "¿Cuáles son las diferencias entre List, Set y Map en Java?",
        answer: "`List`: ordenada con duplicados. `Set`: elementos únicos sin duplicados. `Map`: almacena pares clave-valor.",
        codeSnippet: "List<String> l = new ArrayList<>();\nSet<Integer> s = new HashSet<>();",
        connectors: ["Java Collections - List vs Set vs Map - Estructuras de Datos en Java", "ArrayList y HashMap - Colecciones Estándar - Manejo de Datos Java"]
      }
    ],
    quizzes: [
      {
        id: "q_java_1",
        question: "¿Qué palabra clave en Java impide que una clase sea extendida por subclases?",
        correct: "final",
        distractor: "static",
        incorrect: "abstract",
        explanation: "La palabra clave `final` en una clase prohíbe la herencia."
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "JAVASCRIPT",
    color: "#eab308",
    description: "Motor V8, Event Loop, Promesas, Async/Await, Coerción de tipos y Closures.",
    cards: [
      {
        id: "js_1",
        topic: "JavaScript",
        badge: "Event Loop y Promesas",
        question: "¿Qué es el Event Loop y cuáles son los 3 estados de una Promesa en JS?",
        answer: "Event Loop coordina la pila monofilar con la cola de tareas. Promesa: 1) `Pending`, 2) `Fulfilled` (resuelta), 3) `Rejected` (error).",
        codeSnippet: "fetch(url).then(res => res.json()).catch(err => console.error(err));",
        connectors: ["Event Loop - Modelo Monofilar - Pila de Ejecución y Cola de Tareas", "Promesas - Estados Pending/Fulfilled/Rejected - Operaciones Asíncronas"]
      },
      {
        id: "js_2",
        topic: "JavaScript",
        badge: "Sintaxis Async/Await",
        question: "¿Cómo simplifica async/await el manejo de promesas en JavaScript?",
        answer: "Escribe código asíncrono con sintaxis clara pausando con `await` dentro de `async` hasta que la promesa resuelva.",
        codeSnippet: "async function cargar() { const res = await fetch(url); }",
        connectors: ["Async/Await - Sintaxis Asíncrona Limpia - Manejo con Try/Catch", "Asincronía JS - Bloqueo No Concurrente - Promesas Simplificadas"]
      },
      {
        id: "js_3",
        topic: "JavaScript",
        badge: "Comparación y Tipos",
        question: "¿Diferencia entre == y === en JavaScript?",
        answer: "`==` realiza coerción implícita de tipos. `===` compara valor y tipo exacto sin realizar coerción.",
        codeSnippet: "'5' == 5;  // true\n'5' === 5; // false",
        connectors: ["Igualdad Estricta === - Comparación sin Coerción - Tipos Primitivos JS", "Coerción Implícita - Igualdad Débil == - Seguridad de Tipos"]
      },
      {
        id: "js_4",
        topic: "JavaScript",
        badge: "Ámbito y Closures",
        question: "¿Qué es un Closure (Clausura) en JavaScript?",
        answer: "Función que recuerda su ámbito léxico externo donde fue creada, permitiendo acceder a sus variables.",
        codeSnippet: "function contador() { let count = 0; return () => ++count; }",
        connectors: ["Closure - Retención de Ámbito Léxico - Variables Privadas en JS", "Scope Léxico - Funciones Anidadas - Encapsulamiento en JS"]
      }
    ],
    quizzes: [
      {
        id: "q_js_1",
        question: "¿Cuál es el resultado de evaluar la expresión '10' === 10 en JavaScript?",
        correct: "false (compara valor y tipo de dato sin coerción)",
        distractor: "true (convierte la cadena a número)",
        incorrect: "TypeError por coerción",
        explanation: "`===` evalúa tipo y valor; String y Number son tipos diferentes."
      }
    ]
  },
  {
    id: "bd_relacional",
    name: "Bases de Datos Relacionales",
    icon: "DB_REL",
    color: "#10b981",
    description: "Modelo Relacional, SQL, Normalización (1FN a 3FN), Claves y Transacciones ACID.",
    cards: [
      {
        id: "bd_rel_1",
        topic: "Bases de Datos Relacionales",
        badge: "Normalización CENEVAL",
        question: "¿En qué consisten la 1FN, 2FN y 3FN en bases de datos relacionales?",
        answer: "1FN: datos atómicos. 2FN: en 1FN sin dependencias parciales. 3FN: en 2FN sin dependencias transitivas (atributos no clave dependen solo de PK).",
        codeSnippet: "CREATE TABLE Cliente (id_cliente INT PRIMARY KEY, id_ciudad INT);\nCREATE TABLE Ciudad (id_ciudad INT PRIMARY KEY, nombre VARCHAR(50));",
        connectors: ["Tablas con relación entre sí - Base de datos estructurada", "3FN - Eliminación de Dependencias Transitivas - Integridad de Datos"]
      },
      {
        id: "bd_rel_2",
        topic: "Bases de Datos Relacionales",
        badge: "Propiedades ACID",
        question: "¿Qué garantizan las propiedades ACID en transacciones relacionales?",
        answer: "Atomisidad (todo o nada), Consistencia (estado válido), Aislamiento (no interferencia), Durabilidad (persistencia tras commit).",
        codeSnippet: "BEGIN TRANSACTION;\n  UPDATE Cuenta SET saldo = saldo - 100 WHERE id = 1;\nCOMMIT;",
        connectors: ["Transacciones ACID - Commit y Rollback - Garantía de Integridad Relacional", "Control de Concurrencia - Bloqueos de Filas - Consistencia RDBMS"]
      },
      {
        id: "bd_rel_3",
        topic: "Bases de Datos Relacionales",
        badge: "Integridad Referencial",
        question: "¿Qué es Clave Primaria (PK) y Clave Foránea (FK)?",
        answer: "PK: identificador único de fila. FK: referencia a PK de otra tabla para mantener la integridad referencial.",
        codeSnippet: "ALTER TABLE Pedido ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente);",
        connectors: ["Clave Primaria PK - Identificador Único de Fila - Clave Foránea FK Integrity", "Integridad Referencial - Relaciones 1:N - Restricciones de BD"]
      },
      {
        id: "bd_rel_4",
        topic: "Bases de Datos Relacionales",
        badge: "Consultas SQL y Joins",
        question: "¿Cuál es la diferencia entre INNER JOIN y LEFT JOIN en SQL?",
        answer: "`INNER JOIN`: coincide en ambas tablas. `LEFT JOIN`: todas las de la izquierda y nulos en derecha si no hay coincidencia.",
        codeSnippet: "SELECT c.nombre, p.total FROM Cliente c LEFT JOIN Pedido p ON c.id_cliente = p.id_cliente;",
        connectors: ["SQL DML - SELECT INSERT UPDATE DELETE - Consultas Relacionales", "INNER JOIN vs LEFT JOIN - Combinación de Tablas - Cruce de Claves"]
      }
    ],
    quizzes: [
      {
        id: "q_bd_1",
        question: "¿Qué cláusula SQL se utiliza estrictamente para filtrar resultados agrupados mediante GROUP BY?",
        correct: "HAVING",
        distractor: "WHERE",
        incorrect: "ORDER BY",
        explanation: "`HAVING` filtra grupos agregados tras `GROUP BY`."
      }
    ]
  },
  {
    id: "bd_nosql",
    name: "Bases de Datos NoSQL",
    icon: "DB_NOSQL",
    color: "#84cc16",
    description: "Modelos NoSQL, Teorema CAP, MongoDB, Redis y Escalamiento Horizontal.",
    cards: [
      {
        id: "bd_nosql_1",
        topic: "Bases de Datos NoSQL",
        badge: "Teorema CAP",
        question: "¿Qué postula el Teorema CAP para bases de datos distribuidas?",
        answer: "Postula que un sistema distribuido sólo puede garantizar simultáneamente 2 de las 3 propiedades: Consistencia (C), Disponibilidad (A) y Tolerancia a Particiones (P).",
        codeSnippet: "Sistemas CP: MongoDB | Sistemas AP: Cassandra",
        connectors: ["Teorema CAP - Consistencia vs Disponibilidad - Sistemas Distribuidos", "Tolerancia a Particiones - Teorema de Brewer - NoSQL vs ACID"]
      },
      {
        id: "bd_nosql_2",
        topic: "Bases de Datos NoSQL",
        badge: "Modelo Orientado a Documentos",
        question: "¿Cómo almacena los datos MongoDB y qué ventajas ofrece?",
        answer: "Almacena datos en documentos BSON (JSON binario) flexibles sin esquema fijo previo, permitiendo escalabilidad horizontal.",
        codeSnippet: "db.usuarios.insertOne({ nombre: 'Daniela', rol: 'Dev' });",
        connectors: ["NoSQL - Documentos JSON/BSON - Esquema Flexible Dinámico", "MongoDB - Colecciones y Documentos - Escalamiento Horizontal"]
      },
      {
        id: "bd_nosql_3",
        topic: "Bases de Datos NoSQL",
        badge: "Modelo Clave-Valor",
        question: "¿Qué es una base de datos Clave-Valor como Redis?",
        answer: "Guarda pares clave-valor directamente en memoria RAM con lecturas/escrituras en O(1) para caché y sesiones de alta velocidad.",
        codeSnippet: "SET usuario:1001 \"{\\\"nombre\\\":\\\"Daniela\\\"}\"",
        connectors: ["NoSQL Clave-Valor - Almacenamiento en RAM - Lectura de Alta Velocidad O(1)", "Redis - Caché de Sesiones - Estructuras Clave Valor"]
      },
      {
        id: "bd_nosql_4",
        topic: "Bases de Datos NoSQL",
        badge: "Escalamiento de Datos",
        question: "¿Qué es el Sharding (Particionamiento Horizontal) en NoSQL?",
        answer: "Técnica de distribuir un conjunto masivo de datos entre múltiples nodos o servidores independientes (shards).",
        codeSnippet: "Servidor 1: Claves A-M | Servidor 2: Claves N-Z",
        connectors: ["Sharding - Escalamiento Horizontal - Particionamiento de Datos NoSQL", "Distribución de Datos - Nodos Distribuidos - Alta Disponibilidad"]
      }
    ],
    quizzes: [
      {
        id: "q_nosql_1",
        question: "¿A qué categoría de base de datos NoSQL pertenece MongoDB?",
        correct: "Documentos JSON / BSON",
        distractor: "Clave-Valor en memoria RAM",
        incorrect: "Orientada a Grafos",
        explanation: "MongoDB es una base de datos NoSQL orientada a documentos BSON."
      }
    ]
  },
  {
    id: "requerimientos",
    name: "Requerimientos de Software",
    icon: "REQUIREMENTS",
    color: "#f43f5e",
    description: "Ingeniería de Requerimientos, Funcionales, No Funcionales, Historias de Usuario y Casos de Uso.",
    cards: [
      {
        id: "req_1",
        topic: "Requerimientos de Software",
        badge: "Clasificación",
        question: "¿Diferencia entre Requerimientos Funcionales y No Funcionales?",
        answer: "Funcionales: las funciones que el sistema DEBE realizar (qué hace). No Funcionales: atributos de calidad y restricciones (cómo opera).",
        codeSnippet: "Funcional: 'Permitir pagos.'\nNo Funcional: 'Procesar el pago en < 2 seg.'",
        connectors: ["Requerimiento Funcional - Servicios del Sistema - Comportamiento Esperado", "Requerimiento No Funcional - Atributos de Calidad - Rendimiento y Seguridad"]
      },
      {
        id: "req_2",
        topic: "Requerimientos de Software",
        badge: "Elicitación de Requisitos",
        question: "¿Qué es Elicitación de Requerimientos y qué técnicas se emplean?",
        answer: "Fase de descubrimiento de necesidades del cliente mediante entrevistas, cuestionarios, talleres (JAD) y prototipado.",
        codeSnippet: "Entrevistas -> Talleres JAD -> Prototipos -> SRS",
        connectors: ["Elicitación - Entrevistas y Prototipado - Captura de Requisitos", "Matriz de Trazabilidad - Validación de Requerimientos - Cobertura de Pruebas"]
      },
      {
        id: "req_3",
        topic: "Requerimientos de Software",
        badge: "Historias de Usuario",
        question: "¿Estructura de Historia de Usuario y criterios INVEST?",
        answer: "'Como [Rol], Quiero [Acción], Para [Beneficio]'. Criterios INVEST: Independiente, Negociable, Valiosa, Estimable, Pequeña, Comprobable.",
        codeSnippet: "Como Estudiante, Quiero ver mis fichas Anki, Para repasar CENEVAL.",
        connectors: ["Historia de Usuario - Criterios de Aceptación - Formato Como/Quiero/Para", "Metodologías Ágiles - Product Backlog - Criterios INVEST"]
      },
      {
        id: "req_4",
        topic: "Requerimientos de Software",
        badge: "Casos de Uso",
        question: "¿Componentes de un Caso de Uso en UML?",
        answer: "Actores principales/secundarios, Precondiciones, Poscondiciones, Flujo Principal (Camino feliz) y Flujos Alternativos de excepción.",
        codeSnippet: "Caso de Uso: Iniciar Sesión | Actor: Usuario",
        connectors: ["Casos de Uso - Diagrama UML de Interacción - Actores y Sistema", "Especificación de Casos de Uso - Flujo Principal y Alternativo - IEEE 830"]
      }
    ],
    quizzes: [
      {
        id: "q_req_1",
        question: "El enunciado 'El sistema debe encriptar las contraseñas con AES-256' es un:",
        correct: "Requerimiento No Funcional (Seguridad)",
        distractor: "Requerimiento Funcional de Negocio",
        incorrect: "Requerimiento de Caso de Uso",
        explanation: "Indica una restricción técnica de seguridad (calidad)."
      }
    ]
  },
  {
    id: "documentacion",
    name: "Tipos de Documentación",
    icon: "DOCS",
    color: "#64748b",
    description: "Estándar IEEE 830 (SRS), Documentación de Arquitectura, Manuales de Usuario y Código.",
    cards: [
      {
        id: "doc_1",
        topic: "Tipos de Documentación",
        badge: "Estándar IEEE 830",
        question: "¿Qué es el documento SRS bajo el estándar IEEE 830?",
        answer: "Especificación de Requerimientos de Software formal que actúa como contrato técnico. Debe ser no ambigua, completa y verificable.",
        codeSnippet: "Estructura IEEE 830:\n1. Introducción\n2. Descripción General\n3. Requerimientos Específicos",
        connectors: ["Estándar IEEE 830 - SRS Especificación Formal - Contrato de Desarrollo", "Especificación de Software - Calidad de Documentación - Verificabilidad"]
      },
      {
        id: "doc_2",
        topic: "Tipos de Documentación",
        badge: "Documentación de Arquitectura",
        question: "¿Qué es el documento SAD y la Vista 4+1?",
        answer: "El SAD describe la estructura del sistema. La Vista 4+1 organiza la arquitectura en 5 vistas: Lógica, Procesos, Desarrollo, Física y Escenarios.",
        codeSnippet: "Vista Lógica (Clases) + Vista Procesos (Hilos) + Vista Física (Servidores)",
        connectors: ["Arquitectura SAD - Vista 4+1 - Diagramas de Estructura y Módulos", "Documentación Técnica - Vistas de Kruchten - Despliegue Físico"]
      },
      {
        id: "doc_3",
        topic: "Tipos de Documentación",
        badge: "Manuales del Sistema",
        question: "¿Diferencia entre Manual de Usuario y Despliegue?",
        answer: "Usuario: guía funcional no técnica. Despliegue: instrucciones de instalación y configuración de servidores para administradores.",
        codeSnippet: "Manual Usuario: Paso a paso UI | Manual Despliegue: CLI servidor",
        connectors: ["Manual de Usuario - Guía Operativa Final - Documentación No Técnica", "Manual de Despliegue - Guía de Instalación - Administradores de Sistemas"]
      }
    ],
    quizzes: [
      {
        id: "q_doc_1",
        question: "¿Qué documento guía al usuario final no técnico en la operación del programa?",
        correct: "Manual de Usuario",
        distractor: "Documento de Arquitectura SAD",
        incorrect: "Manual de Despliegue Servidor",
        explanation: "El Manual de Usuario está redactado para guiar la operación funcional sin tecnicismos."
      }
    ]
  },
  {
    id: "movil",
    name: "Programación Móvil",
    icon: "MOBILE",
    color: "#06b6d4",
    description: "Ciclo de vida en aplicaciones móviles (Android/iOS), almacenamiento local y arquitectura MVVM.",
    cards: [
      {
        id: "mov_1",
        topic: "Programación Móvil",
        badge: "Ciclo de Vida Android",
        question: "¿Cuáles son los métodos del ciclo de vida de una Activity en Android?",
        answer: "`onCreate()` -> `onStart()` -> `onResume()` (foco activo) -> `onPause()` -> `onStop()` -> `onDestroy()`.",
        codeSnippet: "@Override protected void onCreate(Bundle saved) { super.onCreate(saved); }",
        connectors: ["Ciclo de Vida Android - Activity States - onCreate y onResume", "Android Lifecycle - Gestor de Estados - Memoria Móvil"]
      },
      {
        id: "mov_2",
        topic: "Programación Móvil",
        badge: "Persistencia Móvil",
        question: "¿Opciones de almacenamiento local en Android (SharedPreferences vs Room DB)?",
        answer: "`SharedPreferences`: clave-valor simple. `Room DB`: abstracción relacional sobre SQLite para datos complejos en el dispositivo.",
        codeSnippet: "SharedPreferences pref = getSharedPreferences(\"user_config\", MODE_PRIVATE);",
        connectors: ["Almacenamiento Móvil - Room DB y SQLite - Persistencia de Datos Local", "SharedPreferences - Clave Valor Móvil - Preferencias de Usuario"]
      },
      {
        id: "mov_3",
        topic: "Programación Móvil",
        badge: "Arquitectura Móvil",
        question: "¿Qué es el patrón MVVM (Model-View-ViewModel) en desarrollo móvil?",
        answer: "Separa View (UI) de Model (Datos) usando ViewModel intermediario que expone datos observables LiveData.",
        codeSnippet: "View (Activity) <--> ViewModel <--> Repository (Data)",
        connectors: ["Patrón MVVM - Separación de Vista y Lógica - UI Reactiva en Móvil", "LiveData y ViewModel - Arquitectura Android - Desacoplamiento de Vista"]
      }
    ],
    quizzes: [
      {
        id: "q_mov_1",
        question: "En Android, ¿qué método se ejecuta cuando la pantalla pierde el foco parcialmente?",
        correct: "onPause()",
        distractor: "onStop()",
        incorrect: "onDestroy()",
        explanation: "`onPause()` se invoca cuando la actividad pierde el foco de atención parcial."
      }
    ]
  },
  {
    id: "paradigmas",
    name: "Paradigmas de Programación",
    icon: "PARADIGMS",
    color: "#a855f7",
    description: "Secuencial, Orientada a Objetos (POO) y Programación Concurrente.",
    cards: [
      {
        id: "par_1",
        topic: "Paradigmas de Programación",
        badge: "Los 4 Pilares POO",
        question: "¿Cuáles son los 4 pilares de la Programación Orientada a Objetos?",
        answer: "1) Abstracción, 2) Encapsulamiento (private/getters/setters), 3) Herencia (reutilización jerárquica), 4) Polimorfismo (responder distinto al mismo método).",
        codeSnippet: "class Animal { void hablar(); }\nclass Perro extends Animal { void hablar() { print('Guau'); } }",
        connectors: ["POO - Encapsulamiento y Herencia en Java/C++", "Polimorfismo - Sobrescritura de Métodos - Abstracción de Clases"]
      },
      {
        id: "par_2",
        topic: "Paradigmas de Programación",
        badge: "Programación Concurrente",
        question: "¿Qué es la Programación Concurrente y qué es un Hilo (Thread)?",
        answer: "Ejecución superpuesta de tareas. Hilo: unidad mínima de ejecución dentro de un proceso administrado por el SO.",
        codeSnippet: "Thread t = new Thread(() -> System.out.println(\"Hilo\"));\nt.start();",
        connectors: ["Programación Concurrente - Multihilo - Exclusión Mutua y Semáforos", "Hilos Threads - Paratelismo de Procesos - Memoria Compartida"]
      },
      {
        id: "par_3",
        topic: "Paradigmas de Programación",
        badge: "Problemas de Concurrencia",
        question: "¿Qué es Race Condition y Deadlock?",
        answer: "Race Condition: modificación simultánea sin sincronización. Deadlock: bloqueo circular infinito de recursos entre hilos.",
        codeSnippet: "Sincronización: mutex.lock(); modificar(); mutex.unlock();",
        connectors: ["Race Condition - Acceso Concurrente No Sincronizado - Sección Crítica", "Deadlock - Interbloqueo de Hilos - Espera Circular de Recursos"]
      },
      {
        id: "par_4",
        topic: "Paradigmas de Programación",
        badge: "Imperativo vs Funcional",
        question: "¿Diferencia entre Paradigma Imperativo y Funcional?",
        answer: "Imperativo: secuencia de instrucciones que cambian el estado (cómo). Funcional: evaluación de funciones puras inmutables (qué).",
        codeSnippet: "Imperativo: for(i=0;i<n;i++) sum+=arr[i];\nFuncional: arr.reduce((acc, x) => acc + x, 0);",
        connectors: ["Paradigma Imperativo - Estado Mutacional - Instrucciones Secuenciales", "Paradigma Funcional - Funciones Puras - Inmutabilidad de Datos"]
      }
    ],
    quizzes: [
      {
        id: "q_par_1",
        question: "¿Qué problema ocurre en concurrencia cuando dos hilos quedan bloqueados esperando mutuamente sus recursos?",
        correct: "Deadlock (Interbloqueo)",
        distractor: "Race Condition",
        incorrect: "Memory Leak",
        explanation: "Deadlock es el bloqueo circular de recursos entre hilos."
      }
    ]
  },
  {
    id: "metodologias",
    name: "Metodologías de Desarrollo",
    icon: "METHODOLOGY",
    color: "#10b981",
    description: "Modelos Tradicionales (Cascada) vs Ágiles (Scrum, Kanban). Roles y tableros.",
    cards: [
      {
        id: "met_1",
        topic: "Metodologías de Desarrollo",
        badge: "Cascada vs Ágil",
        question: "¿Diferencia clave entre el Modelo en Cascada y Metodologías Ágiles?",
        answer: "Cascada: secuencial rígido alto costo de cambio. Ágil: iterativo incremental adaptativo enfocado en entregas continuas.",
        codeSnippet: "Cascada: Req -> Diseño -> Código -> Pruebas -> Despliegue\nÁgil: Sprints iterativos con entregas continuas",
        connectors: ["Modelo en Cascada - Fases Rígidas Secuenciales - Alto Costo de Cambios", "Manifiesto Ágil - Adaptabilidad al Cambio - Software Funcional"]
      },
      {
        id: "met_2",
        topic: "Metodologías de Desarrollo",
        badge: "Framework Scrum",
        question: "¿Roles, Artefactos y Eventos en Scrum?",
        answer: "3 Roles (PO, SM, Devs), 3 Artefactos (Product/Sprint Backlog, Incremento), 5 Eventos (Sprint, Planning, Daily, Review, Retro).",
        codeSnippet: "Sprint Planning -> Daily Scrum (15m) -> Sprint Review -> Retrospective",
        connectors: ["Scrum - Sprints y Historias de Usuario", "Product Backlog - Priorización del Product Owner - Incremento Reusable"]
      },
      {
        id: "met_3",
        topic: "Metodologías de Desarrollo",
        badge: "Kanban",
        question: "¿Regla fundamental de Kanban y para qué sirve limitar WIP?",
        answer: "Visualización del flujo en un tablero y limitar el Trabajo en Proceso (WIP) para detectar cuellos de botella y evitar sobrecarga.",
        codeSnippet: "[ Por Hacer ] -> [ En Proceso (WIP Máx: 3) ] -> [ Comprobado ]",
        connectors: ["Kanban - Tablero Visual de Tareas - Limitar WIP y Evitar Cuellos de Botella", "Flujo de Trabajo - Reducción de Lead Time - Gestión Visual Kanban"]
      },
      {
        id: "met_4",
        topic: "Metodologías de Desarrollo",
        badge: "Estimación Ágil",
        question: "¿Qué son Puntos de Historia y Planning Poker?",
        answer: "Puntos de Historia: medida relativa de complejidad. Planning Poker: estimación por consenso con secuencia Fibonacci.",
        codeSnippet: "Secuencia Fibonacci: 1, 2, 3, 5, 8, 13, 21 puntos de historia",
        connectors: ["Puntos de Historia - Estimación Relativa de Complejidad - Planning Poker", "Fibonacci Ágil - Consenso de Equipo - Estimación de Historias"]
      }
    ],
    quizzes: [
      {
        id: "q_met_1",
        question: "¿Cuál es el objetivo principal de limitar el Trabajo en Proceso (WIP) en Kanban?",
        correct: "Evitar la saturación del equipo y detectar cuellos de botella",
        distractor: "Garantizar reuniones de 15 minutos",
        incorrect: "Eliminar las pruebas antes de producción",
        explanation: "Limitar el WIP evita la acumulación de tareas y expone cuellos de botella."
      }
    ]
  },
  {
    id: "cocomo",
    name: "Métricas COCOMO 1 y 2",
    icon: "METRICS",
    color: "#f59e0b",
    description: "Constructive Cost Model. Fórmulas de Esfuerzo, Tiempo y Personal.",
    cards: [
      {
        id: "coc_1",
        topic: "Métricas COCOMO 1 y 2",
        badge: "COCOMO I Básico",
        question: "¿Cuáles son los 3 modos de proyecto en COCOMO I y sus coeficientes?",
        answer: "1) Orgánico (a=2.4, b=1.05 - pequeño), 2) Semiacoplado (a=3.0, b=1.12 - mediano), 3) Empotrado (a=3.6, b=1.20 - complejo).",
        codeSnippet: "PM = a * (KLOC)^b [Personas-Mes]",
        connectors: ["COCOMO - Personas-Mes y Líneas de Código KLOC", "Modo Orgánico - Proyectos Pequeños - a=2.4 y b=1.05"]
      },
      {
        id: "coc_2",
        topic: "Métricas COCOMO 1 y 2",
        badge: "Fórmulas de Estimación",
        question: "¿Cómo se calcula Esfuerzo (PM), Tiempo (TDEV) y Personal (Staff)?",
        answer: "Esfuerzo: `PM = a * (KLOC)^b`. Tiempo: `TDEV = c * (PM)^d`. Personal: `Staff = PM / TDEV`.",
        codeSnippet: "KLOC = Miles de Líneas de Código (10,000 líneas = 10 KLOC)",
        connectors: ["Fórmula Esfuerzo PM = a * (KLOC)^b - Medida en Personas-Mes", "Tiempo TDEV = c * (PM)^d - Personal Staff = PM / TDEV"]
      },
      {
        id: "coc_3",
        topic: "Métricas COCOMO 1 y 2",
        badge: "COCOMO II",
        question: "¿Qué avance introduce COCOMO II frente a COCOMO I?",
        answer: "Estima proyectos modernos orientados a objetos con Puntos de Objeto y Puntos de Función en lugar de solo líneas KLOC.",
        codeSnippet: "Submodelos: Application Composition, Early Design, Post-Architecture",
        connectors: ["COCOMO II - Puntos de Objeto - Estimación Temprana de Arquitectura", "Puntos de Función - Reutilización de Código - Modelos Modernos COCOMO"]
      },
      {
        id: "coc_4",
        topic: "Métricas COCOMO 1 y 2",
        badge: "Multiplicadores de Esfuerzo",
        question: "¿Qué son los Multiplicadores de Esfuerzo (EM) en COCOMO Intermedio?",
        answer: "15 atributos de costo evaluados de Muy Bajo a Muy Alto para calibrar y ajustar la estimación de esfuerzo en el proyecto.",
        codeSnippet: "PM_Ajustado = PM_Básico * (EM1 * EM2 * ... * EM15)",
        connectors: ["Multiplicadores de Esfuerzo EM - Atributos del Proyecto - Ajuste de Complejidad", "COCOMO Intermedio - Cost Drivers - Calibración de Esfuerzo"]
      }
    ],
    quizzes: [
      {
        id: "q_coc_1",
        question: "Para un proyecto de 20,000 líneas de código, ¿cuál es el valor de la variable KLOC?",
        correct: "20",
        distractor: "20,000",
        incorrect: "0.2",
        explanation: "KLOC = Kilo Lines of Code. 20,000 líneas corresponden a KLOC = 20."
      }
    ]
  }
];
