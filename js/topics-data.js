/**
 * Base de Datos Oficial EGEL Plus ISOFT (CENEVAL Nivel SOBRESALIENTE) - 100 Fichas Técnicas
 * Clasificada por los 18 temas e hitos individuales de la bibliografía CENEVAL.
 */

const TOPICS_DATA = [
  {
    "id": "logica",
    "name": "Lógica de Programación",
    "icon": "LOGIC",
    "color": "#4f46e5",
    "description": "Algoritmos, estructuras de control, pseudocódigo, tablas de verdad y operaciones lógicas.",
    "cards": [
      {
        "id": "log_1",
        "topic": "Lógica de Programación",
        "badge": "Propiedades Algorítmicas",
        "question": "¿Qué es un algoritmo y cuáles son sus tres propiedades fundamentales obligatorias?",
        "answer": "Un algoritmo es una secuencia finita, ordenada y no ambigua de pasos. Sus 3 propiedades son: 1) Precisión (pasos claros), 2) Definición (mismas entradas -> mismas salidas) y 3) Finitud (debe terminar).",
        "codeSnippet": "// Pseudocódigo CENEVAL:\nALGORITMO EsPar\n  ENTRADA: entero n\n  SI (n MOD 2 == 0) ENTONCES\n    IMPRIMIR 'Par'\n  SINO\n    IMPRIMIR 'Impar'\n  FIN_SI\nFIN_ALGORITMO",
        "citation": "Herrera et al. (2017) Introducción a la Lógica",
        "connectors": [
          "Algoritmo - Entrada/Salida definida - Pensamiento Algorítmico",
          "Precisión y Finitud - Control de Flujo - Diagramas de Actividades"
        ]
      },
      {
        "id": "log_2",
        "topic": "Lógica de Programación",
        "badge": "Estructuras Repetitivas",
        "question": "¿Cuál es la diferencia crítica entre un ciclo Mientras (While) y un ciclo Hacer-Mientras (Do-While)?",
        "answer": "El ciclo Mientras evalúa la condición al INICIO (puede ejecutarse 0 veces). El ciclo Hacer-Mientras evalúa al FINAL, garantizando al menos 1 ejecución obligatoria.",
        "codeSnippet": "do {\n    solicitarDato();\n} while (datoValido == false);",
        "citation": "Juganaru, M. (2014) Introducción a la Programación",
        "connectors": [
          "Ciclo While - Evaluación al inicio - 0 ejecuciones posibles",
          "Ciclo Do-While - Evaluación al final - Al menos 1 ejecución"
        ]
      },
      {
        "id": "log_3",
        "topic": "Lógica de Programación",
        "badge": "Tablas de Verdad",
        "question": "¿Cómo se evalúa la jerarquía de operadores lógicos y relacionales?",
        "answer": "Precedencia: 1) Paréntesis, 2) Aritméticos, 3) Relacionales (`>`, `<`, `==`), 4) NOT, 5) AND, 6) OR. En AND ambas deben ser verdaderas; en OR basta con una.",
        "codeSnippet": "(8 > 5) AND NOT(3 == 4) OR (10 < 2) --> VERDADERO",
        "citation": "Martí-Oliet et al. (2013) Estructuras de Datos",
        "connectors": [
          "Operadores Lógicos - Precedencia AND/OR/NOT - Tablas de Verdad",
          "Evaluación de Expresiones - Condicionales - Filtros SQL WHERE"
        ]
      },
      {
        "id": "log_4",
        "topic": "Lógica de Programación",
        "badge": "Estructuras Estáticas",
        "question": "¿Qué es un Arreglo (Array) y cuál es su tiempo de acceso en memoria?",
        "answer": "Colección contigua de elementos del mismo tipo. El acceso a cualquier elemento es instantáneo en tiempo constante O(1) mediante su índice basado en cero.",
        "codeSnippet": "int numeros[5] = {10, 20, 30, 40, 50};\nint val = numeros[0]; // Acceso O(1)",
        "citation": "Sánchez & Martínez (2013) Estructura de Datos",
        "connectors": [
          "Arreglo Unidimensional - Acceso por índice O(1) - Memoria Contigua",
          "Indexación Cero - Vectores Estáticos - Direccionamiento directo"
        ]
      },
      {
        "id": "log_5",
        "topic": "Lógica de Programación",
        "badge": "Paso de Parámetros",
        "question": "¿Diferencia entre el paso de parámetros por Valor y por Referencia?",
        "answer": "Paso por Valor pasa una COPIA (no altera la variable externa). Paso por Referencia pasa la DIRECCIÓN DE MEMORIA (modifica directamente la variable original).",
        "codeSnippet": "void modificar(int *x) { *x = 99; }",
        "citation": "Joyanes & Zahonero (2014) Programación en C",
        "connectors": [
          "Funciones - Paso por Valor vs Referencia - Pila de Llamadas",
          "Punteros - Modificación de Memoria - Parámetros de Salida"
        ]
      },
      {
        "id": "log_6",
        "topic": "Lógica de Programación",
        "badge": "Complejidad Algorítmica",
        "question": "¿Qué representa la Notación Big-O O(1), O(log n), O(n) y O(n^2)?",
        "answer": "O(1): Constante (acceso a arreglo). O(log n): Logarítmico (búsqueda binaria). O(n): Lineal (recorrido de lista). O(n^2): Cuadrático (bucles anidados / ordenamiento burbuja).",
        "codeSnippet": "// Búsqueda Binaria O(log n)\nint mid = (low + high) / 2;",
        "citation": "Cormen et al. (2009) Introduction to Algorithms 3rd ed.",
        "connectors": [
          "Complejidad Temporal - Notación Big-O - Rendimiento Algorítmico",
          "Cormen 2009 - O(1) O(n) O(log n) - Optimización de Código"
        ]
      },
      {
        "id": "log_7",
        "topic": "Lógica de Programación",
        "badge": "Recursión vs Iteración",
        "question": "¿Qué es la Recursión y cuál es el riesgo de no definir un caso base?",
        "answer": "Recursión es cuando una función se llama a sí misma. El **Caso Base** detiene las llamadas. Sin caso base, la pila de llamadas se desborda provocando **Stack Overflow**.",
        "codeSnippet": "int factorial(int n) {\n    if (n <= 1) return 1; // Caso Base\n    return n * factorial(n - 1);\n}",
        "citation": "Sedgewick & Wayne (2011) Algorithms 4th ed.",
        "connectors": [
          "Recursión - Caso Base - Pila de Llamadas Call Stack",
          "Stack Overflow - Iteración vs Recursión - Sedgewick 2011"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_log_1",
        "question": "¿Qué valor tomará la variable resultado tras evaluar: (15 / 3 == 5) AND (4 * 2 > 10 OR NOT(7 <= 2))?",
        "correct": "Verdadero (True)",
        "distractor": "Falso (False) porque 4 * 2 > 10 es falso",
        "incorrect": "Error de sintaxis por operadores",
        "explanation": "(15/3 == 5) es Verdadero. En (8 > 10 OR NOT(7<=2)), NOT(Falso) da Verdadero. Verdadero AND Verdadero resulta Verdadero."
      }
    ]
  },
  {
    "id": "python",
    "name": "Python (Libro Eric Matthes)",
    "icon": "PYTHON",
    "color": "#0284c7",
    "description": "Sintaxis oficial, estructuras nativas, mutabilidad, POO y manejo de archivos.",
    "cards": [
      {
        "id": "py_1",
        "topic": "Python",
        "badge": "Mutabilidad de Estructuras",
        "question": "¿Cuál es la diferencia técnica entre Listas, Tuplas y Diccionarios en Python?",
        "answer": "Listas `[ ]`: mutables ordenadas. Tuplas `( )`: inmutables ordenadas (ahorran memoria). Diccionarios `{ }`: mutables clave-valor.",
        "codeSnippet": "lista = [10, 20]\ntupla = (10, 20)\ndiccionario = {'clave': 'valor'}",
        "citation": "Francis, P. (2022) Python vs Other Languages",
        "connectors": [
          "Python Listas - Mutabilidad - Operaciones Append/Pop",
          "Python Tuplas - Inmutabilidad - Optimización de Memoria"
        ]
      },
      {
        "id": "py_2",
        "topic": "Python",
        "badge": "POO - Libro Matthes",
        "question": "¿Cómo funciona la inicialización de clases con __init__ y para qué sirve self?",
        "answer": "`__init__(self, ...)` es el constructor de clase. `self` representa la referencia a la instancia actual para acceder a sus atributos.",
        "codeSnippet": "class Auto:\n    def __init__(self, marca):\n        self.marca = marca",
        "citation": "Francis, P. (2022) & Matthes Python Crash Course",
        "connectors": [
          "Python __init__ - Método Constructor - Atributos de Instancia",
          "Self - Instancia Actual del Objeto - POO en Python"
        ]
      },
      {
        "id": "py_3",
        "topic": "Python",
        "badge": "Manejo de Archivos",
        "question": "¿Por qué se recomienda utilizar 'with open()' al manipular archivos en Python?",
        "answer": "El bloque `with` es un Context Manager que garantiza el cierre automático del archivo al salir del bloque, previniendo fuga de recursos.",
        "codeSnippet": "with open('datos.txt', 'r') as f:\n    contenido = f.read()",
        "citation": "Francis, P. (2022) Python Features",
        "connectors": [
          "Context Manager - Administrador de Recursos - Cierre automático de archivos",
          "Manejo de Archivos - Lectura/Escritura Segura - Excepciones en Python"
        ]
      },
      {
        "id": "py_4",
        "topic": "Python",
        "badge": "Comprensión de Listas",
        "question": "¿Qué es una Comprensión de Listas (List Comprehension) en Python?",
        "answer": "Sintaxis concisa para crear y filtrar listas a partir de iterables en una sola línea de código.",
        "codeSnippet": "cuadrados = [x**2 for x in range(10) if x % 2 == 0]",
        "citation": "Francis, P. (2022) Python Advanced",
        "connectors": [
          "List Comprehension - Sintaxis Concisa - Filtrado y Mapeo en Python",
          "Iterables - Programación Funcional - Listas Dinámicas"
        ]
      },
      {
        "id": "py_5",
        "topic": "Python",
        "badge": "Manejo de Excepciones",
        "question": "¿Cómo funciona el bloque try / except / else / finally en Python?",
        "answer": "`try` prueba código, `except` captura errores, `else` corre si no hubo error, `finally` se ejecuta SIEMPRE obligatoriamente.",
        "codeSnippet": "try:\n    r = 10 / 0\nexcept ZeroDivisionError:\n    print('Error')\nfinally:\n    print('Fin')",
        "citation": "Francis, P. (2022) Python Exception Handling",
        "connectors": [
          "Manejo de Excepciones - Captura de Errores - Bloque Finally Garantizado",
          "ZeroDivisionError - Control de Fluxo de Errores - Robustece de Software"
        ]
      },
      {
        "id": "py_6",
        "topic": "Python",
        "badge": "Decoradores y Propiedades",
        "question": "¿Para qué sirve el decorador @property en clases de Python según Matthes?",
        "answer": "Permite definir métodos que se comportan como atributos de solo lectura, proporcionando getters y setters encapsulados limpiamente.",
        "codeSnippet": "class Persona:\n    @property\n    def nombre_completo(self):\n        return f'{self.nombre} {self.apellido}'",
        "citation": "Matthes, E. (2023) Python Crash Course 3rd ed.",
        "connectors": [
          "Decorador @property - Encapsulamiento Python - Getters y Setters",
          "Eric Matthes 2023 - POO Avanzada Python - Atributos Calculados"
        ]
      },
      {
        "id": "py_7",
        "topic": "Python",
        "badge": "Generadores y Yield",
        "question": "¿Qué es un Generador en Python y cómo difiere de una función con return?",
        "answer": "Usa la palabra clave `yield` para devolver valores de forma perezosa (lazy evaluation) uno a uno, manteniendo su estado sin cargar todo en RAM.",
        "codeSnippet": "def contador(n):\n    for i in range(n):\n        yield i",
        "citation": "Francis, P. (2022) Python Advanced Performance",
        "connectors": [
          "Generadores Python - Palabra clave yield - Evaluación Lazy de Memoria",
          "Iteradores - Eficiencia de Memoria RAM - Streaming de Datos Python"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_py_1",
        "question": "¿Qué resultado devolverá la ejecución de: valores = [10, 20, 30, 40, 50]; print(valores[1:4])?",
        "correct": "[20, 30, 40]",
        "distractor": "[10, 20, 30, 40]",
        "incorrect": "[20, 30, 40, 50]",
        "explanation": "El slicing `[1:4]` toma desde el índice 1 (valor 20) hasta el índice 4 excluyéndolo (índice 3 = 40)."
      }
    ]
  },
  {
    "id": "c",
    "name": "Lenguaje C",
    "icon": "C_LANG",
    "color": "#6366f1",
    "description": "Programación estructurada, punteros, operadores de memoria, paso por referencia y Heap.",
    "cards": [
      {
        "id": "c_1",
        "topic": "Lenguaje C",
        "badge": "Punteros y Memoria",
        "question": "¿Cuál es la función del operador & y del operador * en C?",
        "answer": "`&` (referencia) obtiene la dirección de memoria. `*` (desreferencia) accede o modifica el valor en la dirección apuntada.",
        "codeSnippet": "int num = 50;\nint *ptr = &num;\n*ptr = 100;",
        "citation": "Banahan et al. (2010) The C Book",
        "connectors": [
          "Operador & - Dirección de Memoria RAM - Referencia en C",
          "Operador * - Desreferencia - Acceso al Valor Puntero"
        ]
      },
      {
        "id": "c_2",
        "topic": "Lenguaje C",
        "badge": "Gestión Dinámica",
        "question": "¿Qué realizan las funciones malloc(), calloc() y free() en C?",
        "answer": "`malloc` asigna memoria en el Heap sin limpiar. `calloc` asigna e inicializa en cero. `free` libera memoria para evitar Memory Leaks.",
        "codeSnippet": "int *arr = (int*) malloc(5 * sizeof(int));\nfree(arr);",
        "citation": "Banahan et al. (2010) Memory Management",
        "connectors": [
          "Heap - malloc y calloc - Reserva Dinámica en C",
          "Memory Leak - Función free() - Liberación de Memoria"
        ]
      },
      {
        "id": "c_3",
        "topic": "Lenguaje C",
        "badge": "Estructuras compuestas",
        "question": "¿Qué es una struct en C y cómo se accede a sus miembros con un puntero?",
        "answer": "Agrupa variables de diferentes tipos bajo un nombre. Con punteros a `struct` se usa el operador flecha `->` para acceder a sus campos.",
        "codeSnippet": "struct Persona { char nombre[30]; int edad; };\nstruct Persona *p = &p1;\np->edad = 25;",
        "citation": "Joyanes & Zahonero (2014) Programación en C",
        "connectors": [
          "Struct en C - Agrupación de Variables - Operador Flecha ->",
          "Punteros a Estructuras - Registros de Datos - Memoria en C"
        ]
      },
      {
        "id": "c_4",
        "topic": "Lenguaje C",
        "badge": "Cadenas de Caracteres",
        "question": "¿Cómo se representan las cadenas de texto en C y qué es el caracter nulo \\0?",
        "answer": "Son arreglos `char[]` terminados obligatoriamente por el caracter nulo `\\0` (ASCII 0) que indica el final de la cadena.",
        "codeSnippet": "char saludo[] = \"Hola\";",
        "citation": "Banahan et al. (2010) Strings in C",
        "connectors": [
          "Cadenas en C - Arreglo de Caracteres - Caracter Nulo \\0",
          "strlen y strcpy - Terminación Nula - Buffers de Memoria"
        ]
      },
      {
        "id": "c_5",
        "topic": "Lenguaje C",
        "badge": "Archivos en C",
        "question": "¿Qué funciones se emplean para abrir y cerrar archivos en C?",
        "answer": "`fopen(\"archivo.txt\", \"r\")` abre un archivo devolviendo un puntero `FILE*`. `fclose(fp)` cierra el archivo liberando el buffer.",
        "codeSnippet": "FILE *fp = fopen(\"apuntes.txt\", \"r\");\nif (fp != NULL) fclose(fp);",
        "citation": "Banahan et al. (2010) File Handling in C",
        "connectors": [
          "Archivos en C - FILE Puntero - fopen y fclose",
          "Modos de Apertura - Lectura y Escritura - Buffers en C"
        ]
      },
      {
        "id": "c_6",
        "topic": "Lenguaje C",
        "badge": "Punteros a Funciones",
        "question": "¿Qué es un Puntero a Función en C y para qué se utiliza?",
        "answer": "Variable que guarda la dirección de memoria ejecutable de una función. Se usa para implementar **callbacks** y tablas de salto.",
        "codeSnippet": "void (*operacion)(int, int) = &sumar;\noperacion(5, 3);",
        "citation": "Banahan et al. (2010) Function Pointers in C",
        "connectors": [
          "Puntero a Función - Dirección de Ejecución - Callbacks en Lenguaje C",
          "Direccionamiento de Memoria - Punteros Avanzados - Banahan 2010"
        ]
      },
      {
        "id": "c_7",
        "topic": "Lenguaje C",
        "badge": "Alineación de Memoria",
        "question": "¿Qué es el Padding y la Alineación de Memoria (Struct Alignment) en C?",
        "answer": "Relleno de bytes que el compilador inserta en una `struct` para alinear variables a límites de palabra del procesador (32/64 bits).",
        "codeSnippet": "struct Ejemplo {\n    char c;    // 1 byte + 3 bytes padding\n    int i;     // 4 bytes\n}; // sizeof = 8 bytes",
        "citation": "Joyanes & Zahonero (2014) Struct Memory Layout",
        "connectors": [
          "Struct Padding - Alineación de Memoria - Sizeof en C",
          "Optimización de Memoria - Arquitectura de Computadoras - Joyanes 2014"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_c_1",
        "question": "Dada la declaración: int x = 5; int *ptr = &x; *ptr += 10; ¿cuál es el valor final de x?",
        "correct": "15",
        "distractor": "5",
        "incorrect": "La dirección de memoria del puntero",
        "explanation": "`*ptr += 10` desreferencia la dirección de `x` y le suma 10 a su valor original."
      }
    ]
  },
  {
    "id": "cpp",
    "name": "Lenguaje C++",
    "icon": "CPP",
    "color": "#ec4899",
    "description": "POO en C++, constructores, destructores, referencias, herencia múltiple y librería STL.",
    "cards": [
      {
        "id": "cpp_1",
        "topic": "Lenguaje C++",
        "badge": "Destructores y RAII",
        "question": "¿Qué es un Destructor en C++ y cuándo se ejecuta?",
        "answer": "Método especial precedido por `~`. Se invoca automáticamente al salir de ámbito o usar `delete`, liberando recursos bajo RAII.",
        "codeSnippet": "class Archivo {\npublic:\n    ~Archivo() { cerrar(); }\n};",
        "citation": "Joyanes & Zahonero (2014) Programación en C++",
        "connectors": [
          "Destructor ~Clase - Liberación Automática - Gestión RAII en C++",
          "Gestión de Recursos - Salida de Ámbito - Sobrecarga de Clases"
        ]
      },
      {
        "id": "cpp_2",
        "topic": "Lenguaje C++",
        "badge": "Sobrecarga de Métodos",
        "question": "¿Qué es la Sobrecarga de Funciones y Operadores en C++?",
        "answer": "Permite definir múltiples funciones con el mismo nombre en la clase mientras difieran en el número o tipo de parámetros (firma).",
        "codeSnippet": "int sumar(int a, int b);\ndouble sumar(double a, double b);",
        "citation": "Joyanes & Zahonero (2014) C++ Overloading",
        "connectors": [
          "Sobrecarga - Polimorfismo Estático - Firmas de Métodos Distintas",
          "Firma de Funciones - Compilación C++ - Reutilización de Nombres"
        ]
      },
      {
        "id": "cpp_3",
        "topic": "Lenguaje C++",
        "badge": "Referencias vs Punteros",
        "question": "¿Cuál es la diferencia entre una Referencia (type &ref) y un Puntero (type *ptr) en C++?",
        "answer": "Referencia: alias inmutable para una variable (no puede ser nula). Puntero: almacena dirección de memoria, reasignable y puede ser nulo.",
        "codeSnippet": "int x = 10;\nint &ref = x;\nint *ptr = &x;",
        "citation": "Joyanes & Zahonero (2014) References & Pointers",
        "connectors": [
          "Referencias C++ - Alias de Memoria - Sin desreferencia explícita",
          "Punteros vs Referencias - Seguridad de Memoria - Parámetros C++"
        ]
      },
      {
        "id": "cpp_4",
        "topic": "Lenguaje C++",
        "badge": "Librería Estándar STL",
        "question": "¿Qué es std::vector en la librería STL de C++?",
        "answer": "Plantilla de contenedor dinámico que administra un arreglo de tamaño variable en memoria contigua.",
        "codeSnippet": "std::vector<int> nums = {1, 2, 3};\nnums.push_back(4);",
        "citation": "Joyanes & Zahonero (2014) STL Containers",
        "connectors": [
          "STL C++ - std::vector - Plantillas Genéricas de Datos",
          "Contenedores Dinámicos - Push Back - Memoria Contigua STL"
        ]
      },
      {
        "id": "cpp_5",
        "topic": "Lenguaje C++",
        "badge": "Polimorfismo y Vtable",
        "question": "¿Qué es una función virtual (virtual function) y qué es la Tabla de Métodos Virtuales (vtable)?",
        "answer": "Permite enlace dinámico (late binding). La `vtable` es una tabla creada por el compilador para resolver llamadas polimórficas en tiempo de ejecución.",
        "codeSnippet": "class Base {\npublic:\n    virtual void mostrar() { std::cout << \"Base\"; }\n};",
        "citation": "Joyanes & Zahonero (2014) C++ Polymorphism",
        "connectors": [
          "Función Virtual - Polimorfismo Dinámico - Enlace Tardío Late Binding",
          "vtable - Tabla de Métodos Virtuales - Joyanes & Zahonero 2014"
        ]
      },
      {
        "id": "cpp_6",
        "topic": "Lenguaje C++",
        "badge": "Punteros Inteligentes RAII",
        "question": "¿Diferencia entre std::unique_ptr y std::shared_ptr en C++ moderno?",
        "answer": "`std::unique_ptr`: propiedad exclusiva (no copiable). `std::shared_ptr`: propiedad compartida mediante conteo de referencias (reference counting).",
        "codeSnippet": "auto u = std::make_unique<Auto>();\nauto s = std::make_shared<Auto>();",
        "citation": "Stroustrup, B. (2018) A Tour of C++ 2nd ed.",
        "connectors": [
          "Smart Pointers C++ - std::unique_ptr vs shared_ptr - Conteo de Referencias",
          "Bjarne Stroustrup 2018 - Gestión de Memoria RAII - Punteros Seguros"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_cpp_1",
        "question": "¿Qué mecanismo en C++ permite que múltiples funciones compartan el mismo nombre diferenciándose por sus parámetros?",
        "correct": "Sobrecarga de Funciones (Overloading)",
        "distractor": "Sobrescritura de Métodos (Overriding)",
        "incorrect": "Polimorfismo Dinámico",
        "explanation": "La sobrecarga permite funciones con el mismo nombre pero distintas firmas de argumentos."
      }
    ]
  },
  {
    "id": "java",
    "name": "Java",
    "icon": "JAVA",
    "color": "#f97316",
    "description": "JVM, Bytecode, Clases, Herencia, Interfaces, Excepciones y Colecciones.",
    "cards": [
      {
        "id": "java_1",
        "topic": "Java",
        "badge": "Arquitectura JVM",
        "question": "¿Qué es la JVM y cómo funciona la portabilidad del Bytecode?",
        "answer": "`javac` compila a Bytecode `.class`. La JVM ejecuta este Bytecode en cualquier sistema operativo host (portabilidad).",
        "codeSnippet": "Código.java -> [javac] -> Código.class -> [JVM] -> Ejecución Nativa",
        "citation": "Dean & Dean (2009) & Loy et al. (2023) Learning Java 5a ed.",
        "connectors": [
          "JVM - Bytecode .class - Compilación JIT e Independencia de Plataforma",
          "Portabilidad Java - Runtime Environment - Ejecución en cualquier SO"
        ]
      },
      {
        "id": "java_2",
        "topic": "Java",
        "badge": "Interfaces vs Abstract",
        "question": "¿Diferencia fundamental entre Interface y Abstract Class en Java?",
        "answer": "Interface: contrato puro (`implements`), herencia múltiple. Abstract Class: admite código y métodos abstractos (`extends`), herencia simple.",
        "codeSnippet": "interface Volador { void volar(); }\nclass Ave implements Volador { public void volar() {} }",
        "citation": "Loy et al. (2023) Learning Java 5a ed.",
        "connectors": [
          "Interface Java - Contrato Puro de Métodos - Herencia Múltiple de Interfaces",
          "Clase Abstracta - Reutilización de Código - Herencia Simple"
        ]
      },
      {
        "id": "java_3",
        "topic": "Java",
        "badge": "Modificadores Clave",
        "question": "¿Para qué sirve la palabra clave 'final' en Java?",
        "answer": "En variables: constantes. En métodos: prohíbe sobrescritura por subclases. En clases: prohíbe herencia completamente.",
        "codeSnippet": "public final class Constantes { public static final double PI = 3.14159; }",
        "citation": "Loy et al. (2023) Learning Java",
        "connectors": [
          "Palabra final - Clases Invariables - Constantes y Métodos Inmodificables",
          "Modificadores Java - Restricción de Herencia - Seguridad de Código"
        ]
      },
      {
        "id": "java_4",
        "topic": "Java",
        "badge": "Colecciones",
        "question": "¿Cuáles son las diferencias entre List, Set y Map en Java?",
        "answer": "`List`: ordenada con duplicados. `Set`: elementos únicos sin duplicados. `Map`: almacena pares clave-valor.",
        "codeSnippet": "List<String> l = new ArrayList<>();\nSet<Integer> s = new HashSet<>();",
        "citation": "Loy et al. (2023) Java Collections",
        "connectors": [
          "Java Collections - List vs Set vs Map - Estructuras de Datos en Java",
          "ArrayList y HashMap - Colecciones Estándar - Manejo de Datos Java"
        ]
      },
      {
        "id": "java_5",
        "topic": "Java",
        "badge": "Checked vs Unchecked",
        "question": "¿Diferencia entre Excepciones Checked y Unchecked en Java?",
        "answer": "Checked (heredan de `Exception`): verificadas en compilación obligando a `try/catch` o `throws`. Unchecked (heredan de `RuntimeException`): ocurren en ejecución.",
        "codeSnippet": "throw new IOException(); // Checked\nthrow new NullPointerException(); // Unchecked",
        "citation": "Loy et al. (2023) Java Exception Handling",
        "connectors": [
          "Checked Exceptions - Verificación en Compilación - IOException Java",
          "Unchecked Exceptions - RuntimeException - Loy et al 2023"
        ]
      },
      {
        "id": "java_6",
        "topic": "Java",
        "badge": "Garbage Collector",
        "question": "¿Cómo gestiona la memoria el Garbage Collector de Java?",
        "answer": "Recupera automáticamente memoria de objetos inalcanzables en el Heap, organizándolos en Generación Joven (Eden/Survivor) y Generación Vieja.",
        "codeSnippet": "System.gc(); // Sugiere recolección de basura",
        "citation": "Dean & Dean (2009) Java Memory Management",
        "connectors": [
          "Garbage Collector - Recolección de Basura - Heap Java Eden Old Gen",
          "Administración Automática de Memoria - Dean 2009 - JVM Memory"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_java_1",
        "question": "¿Qué palabra clave en Java impide que una clase sea extendida por subclases?",
        "correct": "final",
        "distractor": "static",
        "incorrect": "abstract",
        "explanation": "La palabra clave `final` en una clase prohíbe la herencia."
      }
    ]
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "icon": "JAVASCRIPT",
    "color": "#eab308",
    "description": "Motor V8, Event Loop, Promesas, Async/Await, Coerción de tipos y Closures.",
    "cards": [
      {
        "id": "js_1",
        "topic": "JavaScript",
        "badge": "Event Loop y Promesas",
        "question": "¿Qué es el Event Loop y cuáles son los 3 estados de una Promesa en JS?",
        "answer": "Event Loop coordina la pila monofilar con la cola de tareas. Promesa: 1) `Pending`, 2) `Fulfilled` (resuelta), 3) `Rejected` (error).",
        "codeSnippet": "fetch(url).then(res => res.json()).catch(err => console.error(err));",
        "citation": "Burets, A. (2025) PHP vs JS & O'Hanlon (2019)",
        "connectors": [
          "Event Loop - Modelo Monofilar - Pila de Ejecución y Cola de Tareas",
          "Promesas - Estados Pending/Fulfilled/Rejected - Operaciones Asíncronas"
        ]
      },
      {
        "id": "js_2",
        "topic": "JavaScript",
        "badge": "Sintaxis Async/Await",
        "question": "¿Cómo simplifica async/await el manejo de promesas en JavaScript?",
        "answer": "Escribe código asíncrono con sintaxis clara pausando con `await` dentro de `async` hasta que la promesa resuelva.",
        "codeSnippet": "async function cargar() { const res = await fetch(url); }",
        "citation": "O'Hanlon, P. (2019) Advanced TypeScript & JS",
        "connectors": [
          "Async/Await - Sintaxis Asíncrona Limpia - Manejo con Try/Catch",
          "Asincronía JS - Bloqueo No Concurrente - Promesas Simplificadas"
        ]
      },
      {
        "id": "js_3",
        "topic": "JavaScript",
        "badge": "Comparación y Tipos",
        "question": "¿Diferencia entre == y === en JavaScript?",
        "answer": "`==` realiza coerción implícita de tipos. `===` compara valor y tipo exacto sin realizar coerción.",
        "codeSnippet": "'5' == 5;  // true\n'5' === 5; // false",
        "citation": "Burets, A. (2025) JS Principles",
        "connectors": [
          "Igualdad Estricta === - Comparación sin Coerción - Tipos Primitivos JS",
          "Coerción Implícita - Igualdad Débil == - Seguridad de Tipos"
        ]
      },
      {
        "id": "js_4",
        "topic": "JavaScript",
        "badge": "Ámbito y Closures",
        "question": "¿Qué es un Closure (Clausura) en JavaScript?",
        "answer": "Función que recuerda su ámbito léxico externo donde fue creada, permitiendo acceder a sus variables.",
        "codeSnippet": "function contador() { let count = 0; return () => ++count; }",
        "citation": "O'Hanlon, P. (2019) Closures in JS",
        "connectors": [
          "Closure - Retención de Ámbito Léxico - Variables Privadas en JS",
          "Scope Léxico - Funciones Anidadas - Encapsulamiento en JS"
        ]
      },
      {
        "id": "js_5",
        "topic": "JavaScript",
        "badge": "Tipos Primitivos Especiales",
        "question": "¿Diferencia entre null, undefined y NaN en JavaScript?",
        "answer": "`undefined`: variable declarada sin valor. `null`: ausencia intencional de valor asignado. `NaN`: resultado de una operación matemática inválida.",
        "codeSnippet": "typeof undefined; // 'undefined'\ntypeof null;      // 'object' (bug histórico)\ntypeof NaN;       // 'number'",
        "citation": "Burets, A. (2025) JS Fundamentals",
        "connectors": [
          "null vs undefined - Ausencia de Valor - Primitivos JavaScript",
          "NaN Not a Number - Coerción Numérica - Burets 2025"
        ]
      },
      {
        "id": "js_6",
        "topic": "JavaScript",
        "badge": "Event Delegation",
        "question": "¿Qué es el Event Delegation (Delegación de Eventos) y la Fase de Borboteo (Bubbling)?",
        "answer": "Técnica de añadir un único Listener al elemento padre aprovechando que los eventos ascienden (bubbling) desde los hijos.",
        "codeSnippet": "document.getElementById('lista').addEventListener('click', (e) => {\n    if (e.target.tagName === 'LI') console.log(e.target.innerText);\n});",
        "citation": "O'Hanlon, P. (2019) DOM Events & Performance",
        "connectors": [
          "Event Delegation - Borboteo Event Bubbling - Optimización de Listeners DOM",
          "DOM Events - Escuchadores de Eventos - O'Hanlon 2019"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_js_1",
        "question": "¿Cuál es el resultado de evaluar la expresión '10' === 10 en JavaScript?",
        "correct": "false (compara valor y tipo de dato sin coerción)",
        "distractor": "true (convierte la cadena a número)",
        "incorrect": "TypeError por coerción",
        "explanation": "`===` evalúa tipo y valor; String y Number son tipos diferentes."
      }
    ]
  },
  {
    "id": "bd_relacional",
    "name": "Bases de Datos Relacionales",
    "icon": "DB_REL",
    "color": "#10b981",
    "description": "Modelo Relacional, SQL Beaulieu 3a ed, Normalización (1FN a 3FN), Claves y ACID.",
    "cards": [
      {
        "id": "bd_rel_1",
        "topic": "Bases de Datos Relacionales",
        "badge": "Normalización CENEVAL",
        "question": "¿En qué consisten la 1FN, 2FN y 3FN en bases de datos relacionales?",
        "answer": "1FN: datos atómicos. 2FN: en 1FN sin dependencias parciales. 3FN: en 2FN sin dependencias transitivas (atributos no clave dependen solo de PK).",
        "codeSnippet": "CREATE TABLE Cliente (id_cliente INT PRIMARY KEY, id_ciudad INT);\nCREATE TABLE Ciudad (id_ciudad INT PRIMARY KEY, nombre VARCHAR(50));",
        "citation": "Date, C. J. (2001) & Harrington, J. L. (2016)",
        "connectors": [
          "Tablas con relación entre sí - Base de datos estructurada",
          "3FN - Eliminación de Dependencias Transitivas - Integridad de Datos"
        ]
      },
      {
        "id": "bd_rel_2",
        "topic": "Bases de Datos Relacionales",
        "badge": "Propiedades ACID",
        "question": "¿Qué garantizan las propiedades ACID en transacciones relacionales?",
        "answer": "Atomisidad (todo o nada), Consistencia (estado válido), Aislamiento (no interferencia), Durabilidad (persistencia tras commit).",
        "codeSnippet": "BEGIN TRANSACTION;\n  UPDATE Cuenta SET saldo = saldo - 100 WHERE id = 1;\nCOMMIT;",
        "citation": "Beaulieu, A. (2020) Learning SQL (3a ed.)",
        "connectors": [
          "Transacciones ACID - Commit y Rollback - Garantía de Integridad Relacional",
          "Control de Concurrencia - Bloqueos de Filas - Consistencia RDBMS"
        ]
      },
      {
        "id": "bd_rel_3",
        "topic": "Bases de Datos Relacionales",
        "badge": "Integridad Referencial",
        "question": "¿Qué es Clave Primaria (PK) y Clave Foránea (FK)?",
        "answer": "PK: identificador único de fila. FK: referencia a PK de otra tabla para mantener la integridad referencial.",
        "codeSnippet": "ALTER TABLE Pedido ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente);",
        "citation": "Harrington, J. L. (2016) Relational Database Design",
        "connectors": [
          "Clave Primaria PK - Identificador Único de Fila - Clave Foránea FK Integrity",
          "Integridad Referencial - Relaciones 1:N - Restricciones de BD"
        ]
      },
      {
        "id": "bd_rel_4",
        "topic": "Bases de Datos Relacionales",
        "badge": "Consultas SQL y Joins",
        "question": "¿Cuál es la diferencia entre INNER JOIN y LEFT JOIN en SQL?",
        "answer": "`INNER JOIN`: coincide en ambas tablas. `LEFT JOIN`: todas las de la izquierda y nulos en derecha si no hay coincidencia.",
        "codeSnippet": "SELECT c.nombre, p.total FROM Cliente c LEFT JOIN Pedido p ON c.id_cliente = p.id_cliente;",
        "citation": "Beaulieu, A. (2020) Learning SQL (3a ed.)",
        "connectors": [
          "SQL DML - SELECT INSERT UPDATE DELETE - Consultas Relacionales",
          "INNER JOIN vs LEFT JOIN - Combinación de Tablas - Cruce de Claves"
        ]
      },
      {
        "id": "bd_rel_5",
        "topic": "Bases de Datos Relacionales",
        "badge": "Índices B-Tree",
        "question": "¿Cómo funciona un Índice B-Tree en SQL y qué ventaja otorga?",
        "answer": "Estructura de árbol balanceado que permite buscar registros en tiempo $O(\\log N)$ evitando escaneos completos de tabla (Full Table Scans).",
        "codeSnippet": "CREATE INDEX idx_cliente_email ON Cliente(email);",
        "citation": "Beaulieu, A. (2020) Learning SQL 3rd ed.",
        "connectors": [
          "Índice B-Tree - Búsqueda O(log N) - Optimización de Consultas SQL",
          "Full Table Scan - Indexación de Columnas - Alan Beaulieu 2020"
        ]
      },
      {
        "id": "bd_rel_6",
        "topic": "Bases de Datos Relacionales",
        "badge": "Vistas y Triggers",
        "question": "¿Diferencia entre una Vista (View) y un Disparador (Trigger)?",
        "answer": "Vista: consulta guardada virtual que simplifica el acceso. Trigger: procedimiento almacenado que se ejecuta automáticamente ante INSERT/UPDATE/DELETE.",
        "codeSnippet": "CREATE TRIGGER audit_cliente AFTER UPDATE ON Cliente FOR EACH ROW ...",
        "citation": "Date, C. J. (2001) An Introduction to Database Systems",
        "connectors": [
          "Vistas SQL - Consultas Virtuales - Seguridad y Abstracción de Datos",
          "Triggers - Disparadores Automáticos - Auditoría de Transacciones"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_bd_1",
        "question": "¿Qué cláusula SQL se utiliza estrictamente para filtrar resultados agrupados mediante GROUP BY?",
        "correct": "HAVING",
        "distractor": "WHERE",
        "incorrect": "ORDER BY",
        "explanation": "`HAVING` filtra grupos agregados tras `GROUP BY`."
      }
    ]
  },
  {
    "id": "bd_nosql",
    "name": "Bases de Datos NoSQL",
    "icon": "DB_NOSQL",
    "color": "#84cc16",
    "description": "Modelos NoSQL, Teorema CAP, MongoDB, Redis y Escalamiento Horizontal.",
    "cards": [
      {
        "id": "bd_nosql_1",
        "topic": "Bases de Datos NoSQL",
        "badge": "Teorema CAP",
        "question": "¿Qué postula el Teorema CAP para bases de datos distribuidas?",
        "answer": "Postula que un sistema distribuido sólo puede garantizar simultáneamente 2 de las 3 propiedades: Consistencia (C), Disponibilidad (A) y Tolerancia a Particiones (P).",
        "codeSnippet": "Sistemas CP: MongoDB | Sistemas AP: Cassandra",
        "citation": "Meier, A. & Kaufmann, M. (2019) SQL & NoSQL Databases",
        "connectors": [
          "Teorema CAP - Consistencia vs Disponibilidad - Sistemas Distribuidos",
          "Tolerancia a Particiones - Teorema de Brewer - NoSQL vs ACID"
        ]
      },
      {
        "id": "bd_nosql_2",
        "topic": "Bases de Datos NoSQL",
        "badge": "Orientado a Documentos",
        "question": "¿Cómo almacena los datos MongoDB y qué ventajas ofrece?",
        "answer": "Almacena datos en documentos BSON (JSON binario) flexibles sin esquema fijo previo, permitiendo escalabilidad horizontal.",
        "codeSnippet": "db.usuarios.insertOne({ nombre: 'Daniela', rol: 'Dev' });",
        "citation": "Meier, A. & Kaufmann, M. (2019) Document Stores",
        "connectors": [
          "NoSQL - Documentos JSON/BSON - Esquema Flexible Dinámico",
          "MongoDB - Colecciones y Documentos - Escalamiento Horizontal"
        ]
      },
      {
        "id": "bd_nosql_3",
        "topic": "Bases de Datos NoSQL",
        "badge": "Modelo Clave-Valor",
        "question": "¿Qué es una base de datos Clave-Valor como Redis?",
        "answer": "Guarda pares clave-valor directamente en memoria RAM con lecturas/escrituras en O(1) para caché y sesiones de alta velocidad.",
        "codeSnippet": "SET usuario:1001 \"{\\\"nombre\\\":\\\"Daniela\\\"}\"",
        "citation": "Meier, A. & Kaufmann, M. (2019) Key-Value Databases",
        "connectors": [
          "NoSQL Clave-Valor - Almacenamiento en RAM - Lectura de Alta Velocidad O(1)",
          "Redis - Caché de Sesiones - Estructuras Clave Valor"
        ]
      },
      {
        "id": "bd_nosql_4",
        "topic": "Bases de Datos NoSQL",
        "badge": "Escalamiento de Datos",
        "question": "¿Qué es el Sharding (Particionamiento Horizontal) en NoSQL?",
        "answer": "Técnica de distribuir un conjunto masivo de datos entre múltiples nodos o servidores independientes (shards).",
        "codeSnippet": "Servidor 1: Claves A-M | Servidor 2: Claves N-Z",
        "citation": "Meier, A. & Kaufmann, M. (2019) Sharding Architecture",
        "connectors": [
          "Sharding - Escalamiento Horizontal - Particionamiento de Datos NoSQL",
          "Distribución de Datos - Nodos Distribuidos - Alta Disponibilidad"
        ]
      },
      {
        "id": "bd_nosql_5",
        "topic": "Bases de Datos NoSQL",
        "badge": "Orientadas a Grafos",
        "question": "¿Qué caracteriza a las Bases de Datos Orientadas a Grafos (ej. Neo4j)?",
        "answer": "Almacenan información en Nodos, Aristas (relaciones) y Propiedades, optimizadas para consultas complejas de redes y relaciones sin JOINs costosos.",
        "codeSnippet": "MATCH (u:Usuario)-[:AMIGO]->(f:Usuario) RETURN f;",
        "citation": "Meier, A. & Kaufmann, M. (2019) Graph Databases",
        "connectors": [
          "Base de Datos de Grafos - Neo4j - Nodos y Aristas Relacionales",
          "Consultas de Redes - Sin JOINs Costosos - Meier & Kaufmann 2019"
        ]
      },
      {
        "id": "bd_nosql_6",
        "topic": "Bases de Datos NoSQL",
        "badge": "Consistencia Eventual",
        "question": "¿Qué es la Consistencia Eventual en sistemas de almacenamiento NoSQL (BASE)?",
        "answer": "Acepta inconsistencias temporales en lecturas inmediatas a cambio de alta disponibilidad, garantizando que eventualmente todos los nodos se actualizarán.",
        "codeSnippet": "Modelo BASE: Basically Available, Soft-state, Eventual consistency",
        "citation": "Meier, A. & Kaufmann, M. (2019) Eventual Consistency",
        "connectors": [
          "Consistencia Eventual - Modelo BASE - Alta Disponibilidad AP",
          "Sistemas Distribuidos - Replicación Asíncrona - NoSQL BASE"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_nosql_1",
        "question": "¿A qué categoría de base de datos NoSQL pertenece MongoDB?",
        "correct": "Documentos JSON / BSON",
        "distractor": "Clave-Valor en memoria RAM",
        "incorrect": "Orientada a Grafos",
        "explanation": "MongoDB es una base de datos NoSQL orientada a documentos BSON."
      }
    ]
  },
  {
    "id": "requerimientos",
    "name": "Requerimientos de Software (ISO/IEC/IEEE 29148)",
    "icon": "REQUIREMENTS",
    "color": "#f43f5e",
    "description": "Ingeniería de Requerimientos, Funcionales, No Funcionales según ISO/IEC/IEEE 29148:2018.",
    "cards": [
      {
        "id": "req_1",
        "topic": "Requerimientos de Software",
        "badge": "Clasificación ISO 29148",
        "question": "¿Diferencia entre Requerimientos Funcionales y No Funcionales?",
        "answer": "Funcionales: las funciones que el sistema DEBE realizar (qué hace). No Funcionales: atributos de calidad y restricciones (cómo opera).",
        "codeSnippet": "Funcional: 'Permitir pagos.'\nNo Funcional: 'Procesar el pago en < 2 seg.'",
        "citation": "ISO/IEC/IEEE 29148:2018 & Wiegers (2023)",
        "connectors": [
          "Requerimiento Funcional - Servicios del Sistema - Comportamiento Esperado",
          "Requerimiento No Funcional - Atributos de Calidad - Rendimiento y Seguridad"
        ]
      },
      {
        "id": "req_2",
        "topic": "Requerimientos de Software",
        "badge": "Elicitación de Requisitos",
        "question": "¿Qué es Elicitación de Requerimientos y qué técnicas se emplean?",
        "answer": "Fase de descubrimiento de necesidades del cliente mediante entrevistas, cuestionarios, talleres (JAD) y prototipado.",
        "codeSnippet": "Entrevistas -> Talleres JAD -> Prototipos -> SRS",
        "citation": "Wiegers & Hokanson (2023) Core Practices",
        "connectors": [
          "Elicitación - Entrevistas y Prototipado - Captura de Requisitos",
          "Matriz de Trazabilidad - Validación de Requerimientos - Cobertura de Pruebas"
        ]
      },
      {
        "id": "req_3",
        "topic": "Requerimientos de Software",
        "badge": "Historias de Usuario",
        "question": "¿Estructura de Historia de Usuario y criterios INVEST?",
        "answer": "'Como [Rol], Quiero [Acción], Para [Beneficio]'. Criterios INVEST: Independiente, Negociable, Valiosa, Estimable, Pequeña, Comprobable.",
        "codeSnippet": "Como Estudiante, Quiero ver mis fichas Anki, Para repasar CENEVAL.",
        "citation": "Patton, J. (2014) User Story Mapping",
        "connectors": [
          "Historia de Usuario - Criterios de Aceptación - Formato Como/Quiero/Para",
          "Metodologías Ágiles - Product Backlog - Criterios INVEST"
        ]
      },
      {
        "id": "req_4",
        "topic": "Requerimientos de Software",
        "badge": "Matriz de Trazabilidad",
        "question": "¿Qué es la Matriz de Trazabilidad de Requerimientos (RTM)?",
        "answer": "Documento que vincula cada requerimiento desde su origen (necesidad de negocio) hasta los componentes de diseño, código y casos de prueba.",
        "codeSnippet": "REQ-101 -> Módulo Autenticación -> TestCase-205",
        "citation": "Wiegers & Hokanson (2023) Requirements Traceability",
        "connectors": [
          "Matriz RTM - Trazabilidad de Requerimientos - Cobertura de Pruebas",
          "Wiegers 2023 - Control de Cambios - Auditoría de Calidad"
        ]
      },
      {
        "id": "req_5",
        "topic": "Requerimientos de Software",
        "badge": "Validación ISO 29148",
        "question": "¿Cuáles son las características de un requerimiento bien redactado según ISO 29148?",
        "answer": "Debe ser: 1) Necesario, 2) No ambiguo, 3) Consistente, 4) Verificable (probatorio), 5) Factible y 6) Rastreable.",
        "codeSnippet": "Verificable: 'El sistema debe responder en menos de 500 ms ante 100 usuarios simultáneos.'",
        "citation": "ISO/IEC/IEEE 29148:2018 Quality Characteristics",
        "connectors": [
          "ISO 29148 - Requerimiento Verificable - Calidad de Especificaciones",
          "Criterios de Calidad - Sin Ambigüedad - Normativa Internacional"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_req_1",
        "question": "El enunciado 'El sistema debe encriptar las contraseñas con AES-256' es un:",
        "correct": "Requerimiento No Funcional (Seguridad)",
        "distractor": "Requerimiento Funcional de Negocio",
        "incorrect": "Requerimiento de Caso de Uso",
        "explanation": "Indica una restricción técnica de seguridad (calidad)."
      }
    ]
  },
  {
    "id": "user_story",
    "name": "User Story Mapping & Priorización",
    "icon": "AGILE_REQ",
    "color": "#db2777",
    "description": "Patton 2014 User Story Mapping, técnicas de priorización MoSCoW y Hatton.",
    "cards": [
      {
        "id": "us_1",
        "topic": "User Story Mapping",
        "badge": "Jeff Patton 2014",
        "question": "¿Qué es la Espina Dorsal (Backbone) en el User Story Mapping de Jeff Patton?",
        "answer": "Es la fila superior que agrupa las actividades de alto nivel del usuario en secuencia lógica cronológica.",
        "codeSnippet": "Actividades Usuario -> Tareas de Usuario -> Historias Desglosadas",
        "citation": "Patton, J. (2014) User Story Mapping",
        "connectors": [
          "User Story Mapping - Espina Dorsal Backbone - Priorización de Lanzamientos MVP",
          "Jeff Patton 2014 - Elicitación Ágil - Historias de Usuario"
        ]
      },
      {
        "id": "us_2",
        "topic": "User Story Mapping",
        "badge": "Priorización MoSCoW",
        "question": "¿En qué consisten las categorías Must, Should, Could, Won't del método MoSCoW?",
        "answer": "Must: obligatorios para el MVP. Should: importantes no vitales. Could: deseables si hay tiempo. Won't: descartados para este release.",
        "codeSnippet": "Must Have (Vital) | Should Have (Importante) | Could Have (Deseable)",
        "citation": "Hatton, S. (2008) Choosing the right Prioritisation method",
        "connectors": [
          "Priorización MoSCoW - Must Should Could Wont - Alcance de Proyecto",
          "Hatton 2008 - Selección de Métodos - Gestión de Requerimientos"
        ]
      },
      {
        "id": "us_3",
        "topic": "User Story Mapping",
        "badge": "Planning Poker",
        "question": "¿Cómo se utiliza Planning Poker para estimar Historias de Usuario con la Serie Fibonacci?",
        "answer": "Técnica basada en consenso que usa cartas con la serie de Fibonacci modificada (1, 2, 3, 5, 8, 13, 21) para estimar esfuerzo relativo en Puntos de Historia.",
        "codeSnippet": "Historia X -> Votación a ciegas -> Discusión de extremos -> Consenso",
        "citation": "Patton, J. (2014) & Cohn, M. (2005) Agile Estimating",
        "connectors": [
          "Planning Poker - Serie Fibonacci - Puntos de Historia Story Points",
          "Estimación Ágil - Consenso de Equipo - Jeff Patton 2014"
        ]
      },
      {
        "id": "us_4",
        "topic": "User Story Mapping",
        "badge": "Formato Gherkin BDD",
        "question": "¿Cuál es la estructura Given-When-Then (Dado-Cuando-Entonces) en Criterios de Aceptación?",
        "answer": "**Given** (Contexto inicial), **When** (Acción o evento ejecutado), **Then** (Resultado esperado verificable). Base de BDD (Behavior-Driven Development).",
        "codeSnippet": "GIVEN que el usuario inició sesión\nWHEN presiona el botón Exportar\nTHEN el sistema descarga un reporte PDF",
        "citation": "Patton, J. (2014) Acceptance Criteria & BDD",
        "connectors": [
          "Given When Then - Formato Gherkin BDD - Criterios de Aceptación",
          "Behavior Driven Development - Verificación de Historias - Patton 2014"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_us_1",
        "question": "En la técnica de priorización MoSCoW, ¿qué categoría define las funcionalidades indispensables sin las cuales el sistema no puede operar?",
        "correct": "Must (Must Have)",
        "distractor": "Should (Should Have)",
        "incorrect": "Could (Could Have)",
        "explanation": "La categoría Must define las características críticas e indispensables para el lanzamiento."
      }
    ]
  },
  {
    "id": "documentacion",
    "name": "Tipos de Documentación & SRS (IEEE 830)",
    "icon": "DOCS",
    "color": "#64748b",
    "description": "Estándar IEEE 830 (SRS), Documentación de Arquitectura, Manuales de Usuario y Código.",
    "cards": [
      {
        "id": "doc_1",
        "topic": "Tipos de Documentación",
        "badge": "Estándar IEEE 830",
        "question": "¿Qué es el documento SRS bajo el estándar IEEE 830?",
        "answer": "Especificación de Requerimientos de Software formal que actúa como contrato técnico. Debe ser no ambigua, completa y verificable.",
        "codeSnippet": "Estructura IEEE 830:\n1. Introducción\n2. Descripción General\n3. Requerimientos Específicos",
        "citation": "Pressman 9a ed. & Sommerville 10a ed.",
        "connectors": [
          "Estándar IEEE 830 - SRS Especificación Formal - Contrato de Desarrollo",
          "Especificación de Software - Calidad de Documentación - Verificabilidad"
        ]
      },
      {
        "id": "doc_2",
        "topic": "Tipos de Documentación",
        "badge": "Manuales del Sistema",
        "question": "¿Diferencia entre Manual de Usuario y Despliegue?",
        "answer": "Usuario: guía funcional no técnica. Despliegue: instrucciones de instalación y configuración de servidores para administradores.",
        "codeSnippet": "Manual Usuario: Paso a paso UI | Manual Despliegue: CLI servidor",
        "citation": "Pavlenko, M. (2024) Technical Documentation",
        "connectors": [
          "Manual de Usuario - Guía Operativa Final - Documentación No Técnica",
          "Manual de Despliegue - Guía de Instalación - Administradores de Sistemas"
        ]
      },
      {
        "id": "doc_3",
        "topic": "Tipos de Documentación",
        "badge": "Documento SAD Arquitectura",
        "question": "¿Qué es el Documento de Descripción de Arquitectura de Software (SAD)?",
        "answer": "Documento técnico maestro que sintetiza las decisiones de arquitectura, vistas estructurales, decisiones de diseño y patrones implementados.",
        "codeSnippet": "Secciones SAD: Vistas 4+1, Atributos de Calidad, Diagramas de Despliegue",
        "citation": "Pressman, R. S. (2020) Software Engineering 9th ed.",
        "connectors": [
          "SAD Documento de Arquitectura - Decisión de Diseño - Vistas Arquitectónicas",
          "Pressman 2020 - Especificación Técnica - Gobierno de Software"
        ]
      },
      {
        "id": "doc_4",
        "topic": "Tipos de Documentación",
        "badge": "Documentación de Código",
        "question": "¿Cómo funcionan herramientas automáticas como Javadoc y Doxygen?",
        "answer": "Extraen comentarios estructurados en el código fuente (`/** ... */`) para generar sitios HTML navegables con la API y clases.",
        "codeSnippet": "/**\n * @param id Identificador único del usuario\n * @return Objeto Usuario hallado\n */",
        "citation": "Pavlenko, M. (2024) API Documentation & Code Standards",
        "connectors": [
          "Javadoc y Doxygen - Documentación Automática de Código - API HTML",
          "Pavlenko 2024 - Comentarios Estructurados - Mantenimiento de Software"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_doc_1",
        "question": "¿Qué documento guía al usuario final no técnico en la operación del programa?",
        "correct": "Manual de Usuario",
        "distractor": "Documento de Arquitectura SAD",
        "incorrect": "Manual de Despliegue Servidor",
        "explanation": "El Manual de Usuario está redactado para guiar la operación funcional sin tecnicismos."
      }
    ]
  },
  {
    "id": "arquitectura",
    "name": "Diseño Arquitectónico (Vista 4+1 Kruchten)",
    "icon": "ARCH",
    "color": "#0284c7",
    "description": "Kruchten 1995 Vista 4+1, ATAM, Estilos Arquitectónicos y Acoplamiento/Cohesión (Pascual).",
    "cards": [
      {
        "id": "arq_1",
        "topic": "Diseño Arquitectónico",
        "badge": "Vista 4+1 Kruchten",
        "question": "¿Cuáles son las 5 vistas de la arquitectura Vista 4+1 de Kruchten?",
        "answer": "Vista Lógica, Vista de Procesos, Vista de Desarrollo, Vista Física y +1 Escenarios (Casos de Uso).",
        "codeSnippet": "Vista Lógica + Vista Procesos + Vista Desarrollo + Vista Física + Escenarios",
        "citation": "Kruchten, P. (1995) Architectural Blueprints",
        "connectors": [
          "Vista 4+1 Kruchten - Modelo Arquitectónico - Vistas Lógica Desarrollo Física Procesos",
          "Arquitectura SAD - Casos de Uso Escenarios - Despliegue en Hardware"
        ]
      },
      {
        "id": "arq_2",
        "topic": "Diseño Arquitectónico",
        "badge": "Acoplamiento y Cohesión",
        "question": "¿Por qué se busca Alta Cohesión y Bajo Acoplamiento según Pascual 2019?",
        "answer": "Alta Cohesión: responsabilidad única por módulo. Bajo Acoplamiento: menor dependencia entre módulos para facilitar el mantenimiento.",
        "codeSnippet": "Cohesión: Responsabilidad Única | Acoplamiento: Dependencias",
        "citation": "Pascual, J. R. (2019) Disrupción Tecnológica",
        "connectors": [
          "Alta Cohesión - Responsabilidad Única - Módulos Enfocados",
          "Bajo Acoplamiento - Independencia de Módulos - Mantenimiento y Reutilización"
        ]
      },
      {
        "id": "arq_3",
        "topic": "Diseño Arquitectónico",
        "badge": "Estilos Arquitectónicos",
        "question": "¿Diferencia entre Arquitectura Monolítica, Cliente-Servidor y Microservicios?",
        "answer": "Monolito: despliegue único de todo el sistema. Cliente-Servidor: división UI e interfaz de datos. Microservicios: servicios independientes desplegables por separado vía API REST.",
        "codeSnippet": "Microservicios: Auth Service | Payment Service | Order Service",
        "citation": "Kruchten, P. (1995) & Pressman (2020)",
        "connectors": [
          "Microservicios vs Monolito - Estilos Arquitectónicos - Despliegue Independiente",
          "Cliente Servidor - Arquitectura Distribuidas - Kruchten 1995"
        ]
      },
      {
        "id": "arq_4",
        "topic": "Diseño Arquitectónico",
        "badge": "Event-Driven & Broker",
        "question": "¿Cómo funciona el Patrón Broker y la Arquitectura Orientada a Eventos (EDA)?",
        "answer": "Desacopla emisores y receptores mediante un intermediario (Broker/Message Queue como Kafka/RabbitMQ) que distribuye eventos asíncronamente.",
        "codeSnippet": "Productor -> [Message Broker] -> Consumidores",
        "citation": "Pascual, J. R. (2019) Architectural Patterns",
        "connectors": [
          "Patrón Broker - Arquitectura Orientada a Eventos EDA - Message Queues",
          "Desacoplamiento Asíncrono - Kafka RabbitMQ - Pascual 2019"
        ]
      },
      {
        "id": "arq_5",
        "topic": "Diseño Arquitectónico",
        "badge": "Evaluación ATAM",
        "question": "¿Qué es el Método de Análisis de Arquitectura ATAM (Architecture Tradeoff Analysis Method)?",
        "answer": "Evaluación estructurada para analizar los compromisos (tradeoffs), puntos de sensibilidad y riesgos entre atributos de calidad (rendimiento vs seguridad).",
        "codeSnippet": "Entradas -> Escenarios de Calidad -> Análisis ATAM -> Lista de Riesgos",
        "citation": "Pressman, R. S. (2020) Architecture Evaluation",
        "connectors": [
          "Método ATAM - Evaluación de Arquitectura - Tradeoffs y Puntos de Sensibilidad",
          "Atributos de Calidad - Análisis de Riesgos Arquitectónicos - Pressman 2020"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_arq_1",
        "question": "En la Vista 4+1 de Kruchten (1995), ¿qué vista organiza el código fuente en subsistemas y componentes de compilación?",
        "correct": "Vista de Desarrollo / Construcción",
        "distractor": "Vista Lógica",
        "incorrect": "Vista Física / Despliegue",
        "explanation": "La Vista de Desarrollo organiza la estructura de módulos, bibliotecas y código fuente."
      }
    ]
  },
  {
    "id": "interfaces_ux",
    "name": "Diseño de Interfaces & HCI (10 Heurísticas Nielsen)",
    "icon": "UX",
    "color": "#0891b2",
    "description": "NNG Jakob Nielsen 10 Heurísticas de Usabilidad, Prototipado Low/High Fidelity Pernice.",
    "cards": [
      {
        "id": "ux_1",
        "topic": "Diseño de Interfaces",
        "badge": "10 Heurísticas Nielsen",
        "question": "¿Qué postula la Heurística #1 de Jakob Nielsen (Visibilidad del Estado del Sistema)?",
        "answer": "El sistema debe mantener a los usuarios informados sobre lo que está sucediendo a través de retroalimentación adecuada en un tiempo razonable.",
        "codeSnippet": "Ejemplo: Barra de progreso en descargas o indicador de carga Spin.",
        "citation": "Nielsen, J. (2024) Nielsen Norman Group",
        "connectors": [
          "10 Heurísticas de Nielsen - Usabilidad UX HCI - Visibilidad del Estado del Sistema",
          "Nielsen Norman Group - Prevención de Errores - Control y Libertad del Usuario"
        ]
      },
      {
        "id": "ux_2",
        "topic": "Diseño de Interfaces",
        "badge": "Prototipado Pernice 2016",
        "question": "¿Diferencia entre Prototipos de Baja Fidelidad (Low-Fi) y Alta Fidelidad (Hi-Fi)?",
        "answer": "Low-Fi (bocetos en papel): rápidos y económicos para validar conceptos iniciales. Hi-Fi (interactivos digitales): simulan la UI final exacta.",
        "codeSnippet": "Low-Fi: Wireframes papel | Hi-Fi: Prototipos interactivos Figma",
        "citation": "Pernice, K. (2016) UX Prototypes Nielsen Norman Group",
        "connectors": [
          "Prototipos Low-Fi vs Hi-Fi - Pernice 2016 NNG - Validación Temprana UX",
          "Wireframes - Prototipado Rápido - Pruebas de Usabilidad"
        ]
      },
      {
        "id": "ux_3",
        "topic": "Diseño de Interfaces",
        "badge": "Métricas de Usabilidad",
        "question": "¿Qué es la prueba de usabilidad A/B Testing y la escala System Usability Scale (SUS)?",
        "answer": "A/B Testing: compara 2 variantes de UI con usuarios reales para ver cuál rinde mejor. Escala SUS: cuestionario de 10 ítems para calcular la usabilidad percibida (0-100).",
        "codeSnippet": "Cuestionario SUS (10 preguntas) -> Puntuación de Usabilidad > 68 (Aceptable)",
        "citation": "Nielsen, J. (2024) & Pernice, K. (2016)",
        "connectors": [
          "A/B Testing - Experimentación UI - Medición de Conversión",
          "System Usability Scale SUS - Cuestionario de Usabilidad - Nielsen 2024"
        ]
      },
      {
        "id": "ux_4",
        "topic": "Diseño de Interfaces",
        "badge": "Accesibilidad WCAG",
        "question": "¿Cuáles son los 4 principios de accesibilidad web bajo las pautas WCAG 2.1?",
        "answer": "1) **Perceptible** (información clara), 2) **Operable** (navegación por teclado), 3) **Comprensible** (sintaxis predecible) y 4) **Robusto** (compatible con lectores de pantalla).",
        "codeSnippet": "HTML Semántico: <button aria-label=\"Cerrar\">X</button>",
        "citation": "Pernice, K. (2016) & W3C WCAG Guidelines",
        "connectors": [
          "Accesibilidad WCAG 2.1 - Perceptible Operable Comprensible Robusto",
          "Diseño Inclusivo - Lectores de Pantalla - Contraste de Color UI"
        ]
      },
      {
        "id": "ux_5",
        "topic": "Diseño de Interfaces",
        "badge": "Reconocimiento vs Recuerdo",
        "question": "¿Qué diferencia existe entre Reconocimiento antes que Recuerdo (Heurística #6 Nielsen)?",
        "answer": "Minimiza la carga de memoria del usuario haciendo visibles las opciones e instrucciones, en lugar de obligarlo a recordar comandos de memoria.",
        "codeSnippet": "Ejemplo: Menús desplegables o autocompletado en campos de búsqueda.",
        "citation": "Nielsen, J. (2024) Nielsen Norman Group",
        "connectors": [
          "Heurística 6 Nielsen - Reconocimiento antes que Recuerdo - Carga Cognitiva",
          "Menús Desplegables - Autocompletado UI - Usabilidad NNG"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_ux_1",
        "question": "Mostrar un mensaje de 'Guardando cambios...' con un spinner en tiempo real cumple con la heurística de Nielsen:",
        "correct": "Visibilidad del estado del sistema",
        "distractor": "Consistencia y estándares",
        "incorrect": "Diseño estético y minimalista",
        "explanation": "La Visibilidad del estado del sistema informa al usuario lo que ocurre mediante retroalimentación en tiempo real."
      }
    ]
  },
  {
    "id": "movil",
    "name": "Programación Móvil (Android & iOS)",
    "icon": "MOBILE",
    "color": "#06b6d4",
    "description": "Ciclo de vida en aplicaciones móviles (Android/iOS), Room DB y arquitectura MVVM.",
    "cards": [
      {
        "id": "mov_1",
        "topic": "Programación Móvil",
        "badge": "Ciclo de Vida Android",
        "question": "¿Cuáles son los métodos del ciclo de vida de una Activity en Android?",
        "answer": "`onCreate()` -> `onStart()` -> `onResume()` (foco activo) -> `onPause()` -> `onStop()` -> `onDestroy()`.",
        "codeSnippet": "@Override protected void onCreate(Bundle saved) { super.onCreate(saved); }",
        "citation": "O'Hanlon, P. (2019) Mobile & Web Platforms",
        "connectors": [
          "Ciclo de Vida Android - Activity States - onCreate y onResume",
          "Android Lifecycle - Gestor de Estados - Memoria Móvil"
        ]
      },
      {
        "id": "mov_2",
        "topic": "Programación Móvil",
        "badge": "Persistencia Móvil",
        "question": "¿Opciones de almacenamiento local en Android (SharedPreferences vs Room DB)?",
        "answer": "`SharedPreferences`: clave-valor simple. `Room DB`: abstracción relacional sobre SQLite para datos complejos en el dispositivo.",
        "codeSnippet": "SharedPreferences pref = getSharedPreferences(\"user_config\", MODE_PRIVATE);",
        "citation": "O'Hanlon, P. (2019) Storage in Mobile",
        "connectors": [
          "Almacenamiento Móvil - Room DB y SQLite - Persistencia de Datos Local",
          "SharedPreferences - Clave Valor Móvil - Preferencias de Usuario"
        ]
      },
      {
        "id": "mov_3",
        "topic": "Programación Móvil",
        "badge": "Arquitectura MVVM Móvil",
        "question": "¿Cómo interactúan el Model, View y ViewModel en la arquitectura Android recomendada?",
        "answer": "La `View` observa cambios en el `ViewModel` mediante `LiveData` o `StateFlow`. El `ViewModel` solicita datos al `Model` (Repositorio) y sobrevive a cambios de configuración (rotación de pantalla).",
        "codeSnippet": "viewModel.usuarioLiveData.observe(this, usuario -> updateUI(usuario));",
        "citation": "O'Hanlon, P. (2019) Architecture Components",
        "connectors": [
          "Arquitectura MVVM - ViewModel y LiveData - Patrones Móviles Android",
          "Sobrevivencia a Rotación - Separation of Concerns - O'Hanlon 2019"
        ]
      },
      {
        "id": "mov_4",
        "topic": "Programación Móvil",
        "badge": "Permisos en Ejecución",
        "question": "¿Por qué Android requiere permisos en tiempo de ejecución (Runtime Permissions)?",
        "answer": "Para proteger la privacidad del usuario. Permisos peligrosos (cámara, ubicación, contactos) deben solicitarse explícitamente en ejecución, no sólo en el Manifest.",
        "codeSnippet": "ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA);",
        "citation": "O'Hanlon, P. (2019) Android Security Model",
        "connectors": [
          "Runtime Permissions - Seguridad en Android - Permisos Peligrosos Cámara Ubicación",
          "AndroidManifest.xml - Privacidad de Usuario - O'Hanlon 2019"
        ]
      },
      {
        "id": "mov_5",
        "topic": "Programación Móvil",
        "badge": "Hilos y Corrutinas",
        "question": "¿Por qué NUNCA se deben realizar peticiones de red en el Hilo Principal (UI Thread) en móviles?",
        "answer": "Porque congelan la interfaz provocando un fallo **ANR (Application Not Responding)**. Se deben usar hilos secundarios o Corrutinas (`Dispatchers.IO`).",
        "codeSnippet": "lifecycleScope.launch(Dispatchers.IO) { fetchNetworkData(); }",
        "citation": "O'Hanlon, P. (2019) Concurrency in Mobile",
        "connectors": [
          "ANR Application Not Responding - Hilo de Interfaz UI Thread - Corrutinas Kotlin",
          "Dispatchers.IO - Peticiones Asíncronas Móviles - Rendimiento UI"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_mov_1",
        "question": "En Android, ¿qué método se ejecuta cuando la pantalla pierde el foco parcialmente?",
        "correct": "onPause()",
        "distractor": "onStop()",
        "incorrect": "onDestroy()",
        "explanation": "`onPause()` se invoca cuando la actividad pierde el foco de atención parcial."
      }
    ]
  },
  {
    "id": "paradigmas",
    "name": "Paradigmas de Programación",
    "icon": "PARADIGMS",
    "color": "#a855f7",
    "description": "Gabbrielli & Martini 2010. Secuencial, POO, Concurrente y Funcional.",
    "cards": [
      {
        "id": "par_1",
        "topic": "Paradigmas de Programación",
        "badge": "Los 4 Pilares POO",
        "question": "¿Cuáles son los 4 pilares de la Programación Orientada a Objetos?",
        "answer": "1) Abstracción, 2) Encapsulamiento (private/getters/setters), 3) Herencia (reutilización jerárquica), 4) Polimorfismo (responder distinto al mismo método).",
        "codeSnippet": "class Animal { void hablar(); }\nclass Perro extends Animal { void hablar() { print('Guau'); } }",
        "citation": "Gabbrielli & Martini (2010) Programming Languages",
        "connectors": [
          "POO - Encapsulamiento y Herencia en Java/C++",
          "Polimorfismo - Sobrescritura de Métodos - Abstracción de Clases"
        ]
      },
      {
        "id": "par_2",
        "topic": "Paradigmas de Programación",
        "badge": "Programación Concurrente",
        "question": "¿Qué es Race Condition y Deadlock en programación concurrente?",
        "answer": "Race Condition: modificación simultánea sin sincronización. Deadlock: bloqueo circular infinito de recursos entre hilos.",
        "codeSnippet": "Sincronización: mutex.lock(); modificar(); mutex.unlock();",
        "citation": "Gabbrielli & Martini (2010) Concurrency Principles",
        "connectors": [
          "Race Condition - Acceso Concurrente No Sincronizado - Sección Crítica",
          "Deadlock - Interbloqueo de Hilos - Espera Circular de Recursos"
        ]
      },
      {
        "id": "par_3",
        "topic": "Paradigmas de Programación",
        "badge": "Programación Funcional",
        "question": "¿Principales características del paradigma Funcional (Inmutabilidad y Funciones Puras)?",
        "answer": "Evita efectos secundarios. **Inmutabilidad**: los datos no cambian. **Funciones Puras**: dada la misma entrada devuelven siempre la misma salida sin alterar el estado global.",
        "codeSnippet": "const sumar = (a, b) => a + b; // Función Pura",
        "citation": "Gabbrielli & Martini (2010) Functional Paradigm",
        "connectors": [
          "Programación Funcional - Inmutabilidad - Funciones Puras Sin Efectos Secundarios",
          "Transparencia Referencial - Evaluaciones Limpias - Gabbrielli 2010"
        ]
      },
      {
        "id": "par_4",
        "topic": "Paradigmas de Programación",
        "badge": "Semáforos vs Mutex",
        "question": "¿Diferencia entre Mutex (Exclusión Mutua) y Semáforo Contadoren concurrencia?",
        "answer": "Mutex: cerrojo binario (propietario único). Semáforo: contador entero que permite el acceso a un máximo de N hilos simultáneos a un recurso.",
        "codeSnippet": "Semaphore sem = new Semaphore(3); // Permite máximo 3 hilos",
        "citation": "Martini, S. & Gabbrielli, M. (2010) Synchronization Mechanics",
        "connectors": [
          "Mutex Exclusión Mutua - Cerrojo Binario - Sincronización de Hilos",
          "Semáforo Contador - Acceso Limitado N Hilos - Gabbrielli & Martini"
        ]
      },
      {
        "id": "par_5",
        "topic": "Paradigmas de Programación",
        "badge": "Imperativo vs Declarativo",
        "question": "¿Diferencia filosófica entre Paradigma Imperativo y Declarativo?",
        "answer": "Imperativo: especifica CÓMO lograr el resultado paso a paso (C, Java). Declarativo: especifica QUÉ resultado se desea obtener sin detallar los pasos (SQL, HTML, Prolog).",
        "codeSnippet": "Imperativo: for(i=0;i<n;i++) | Declarativo: SELECT * FROM Tabla",
        "citation": "Gabbrielli & Martini (2010) Language Concepts",
        "connectors": [
          "Paradigma Imperativo - Secuencia de Instrucciones CÓMO - C y Java",
          "Paradigma Declarativo - Especificación de Resultados QUÉ - SQL y Prolog"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_par_1",
        "question": "¿Qué problema ocurre en concurrencia cuando dos hilos quedan bloqueados esperando mutuamente sus recursos?",
        "correct": "Deadlock (Interbloqueo)",
        "distractor": "Race Condition",
        "incorrect": "Memory Leak",
        "explanation": "Deadlock es el bloqueo circular de recursos entre hilos."
      }
    ]
  },
  {
    "id": "metodologias",
    "name": "Metodologías de Desarrollo (Scrum 2020 / XP)",
    "icon": "METHODOLOGY",
    "color": "#10b981",
    "description": "Guía Oficial Scrum 2020 (Schwaber & Sutherland), Kanban, XP (Wells 2013) y Cascada.",
    "cards": [
      {
        "id": "met_1",
        "topic": "Metodologías de Desarrollo",
        "badge": "Guía Scrum 2020",
        "question": "¿Cuáles son los 3 Roles, 3 Artefactos y 5 Eventos en la Guía Oficial de Scrum 2020?",
        "answer": "3 Roles: Product Owner, Scrum Master, Developers. 3 Artefactos: Product Backlog, Sprint Backlog, Incremento. 5 Eventos: Sprint, Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospective.",
        "codeSnippet": "Product Backlog -> Sprint Planning -> Sprint Backlog -> Sprint -> Incremento",
        "citation": "Schwaber, K. & Sutherland, J. (2020) Guía de Scrum 2020",
        "connectors": [
          "Guía Oficial de Scrum 2020 - Schwaber y Sutherland - Product Goal y Sprint Goal",
          "Scrum Team - Developers Product Owner Scrum Master - Artefactos Ágiles"
        ]
      },
      {
        "id": "met_2",
        "topic": "Metodologías de Desarrollo",
        "badge": "Extreme Programming XP",
        "question": "¿Cuáles son los valores y prácticas clave de Extreme Programming (XP) según Wells 2013?",
        "answer": "Valores: Comunicación, Simplicidad, Retroalimentación, Coraje y Respeto. Prácticas clave: **Programación en Parejas (Pair Programming)**, **Desarrollo Guiado por Pruebas (TDD)** y **Refactorización continua**.",
        "codeSnippet": "TDD: Escribir Prueba -> Ver Fallar -> Código Mínimo -> Pasar Prueba -> Refactorizar",
        "citation": "Wells, D. (2013) Extreme Programming: A gentle introduction",
        "connectors": [
          "Extreme Programming XP - Wells 2013 - Programación en Parejas Pair Programming",
          "Desarrollo Guiado por Pruebas TDD - Refactorización Continua - Simplicidad XP"
        ]
      },
      {
        "id": "met_3",
        "topic": "Metodologías de Desarrollo",
        "badge": "Metodología Kanban",
        "question": "¿Qué es Kanban y qué representan los límites WIP (Work In Progress)?",
        "answer": "Sistema visual de gestión de flujo de trabajo. Los límites **WIP** restringen el número máximo de tareas simultáneas por columna para evitar cuellos de botella.",
        "codeSnippet": "Por Hacer -> En Proceso (WIP max 3) -> En Pruebas -> Completado",
        "citation": "Wells, D. (2013) & Anderson, D. (2010)",
        "connectors": [
          "Kanban - Limites WIP Work In Progress - Gestión de Flujo de Trabajo",
          "Cuellos de Botella - Tiempo de Ciclo Lead Time - Anderson 2010"
        ]
      },
      {
        "id": "met_4",
        "topic": "Metodologías de Desarrollo",
        "badge": "Cascada vs Iterativo",
        "question": "¿Diferencia fundamental entre el Modelo en Cascada (Waterfall) y el Desarrollo Iterativo e Incremental?",
        "answer": "Cascada: fases secuenciales estrictas (no vuelve atrás). Iterativo: ciclos cortos (sprints) que entregan versiones funcionales incrementales continuas.",
        "codeSnippet": "Cascada: Req -> Diseño -> Código -> Pruebas\nIterativo: [Req+Diseño+Código+Prueba] x Sprint",
        "citation": "Pressman, R. S. (2020) Software Engineering 9th ed.",
        "connectors": [
          "Modelo en Cascada Waterfall - Fases Secuenciales Rígidas - Pressman 2020",
          "Desarrollo Incremental - Iteraciones Ágiles - Adaptabilidad a Cambios"
        ]
      },
      {
        "id": "met_5",
        "topic": "Metodologías de Desarrollo",
        "badge": "Integración Continua CI/CD",
        "question": "¿Qué es la Integración Continua (CI) y Despliegue Continuo (CD)?",
        "answer": "CI: integrar y probar cambios de código automáticamente en un repositorio compartido varias veces al día. CD: desplegar automáticamente a producción tras pasar las pruebas.",
        "codeSnippet": "Git Push -> CI Build -> Unit Tests -> CD Auto Deploy",
        "citation": "Wells, D. (2013) Continuous Delivery Practices",
        "connectors": [
          "CI/CD Integración Continua - Pruebas Automatizadas Pipeline - GitHub Actions",
          "Continuous Deployment - Automatización de Entregas - Wells 2013"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_met_1",
        "question": "En la metodología Extreme Programming (XP - Wells 2013), la práctica donde dos programadores trabajan juntos en la misma estación de trabajo se denomina:",
        "correct": "Programación en Parejas (Pair Programming)",
        "distractor": "Daily Standup Meeting",
        "incorrect": "Code Review Asíncrono",
        "explanation": "Pair Programming es la práctica insignia de XP donde dos desarrolladores colaboran en tiempo real."
      }
    ]
  },
  {
    "id": "calidad_cocomo",
    "name": "Calidad (ISO 25000) & Métricas COCOMO",
    "icon": "METRICS",
    "color": "#f59e0b",
    "description": "Modelo ISO/IEC 25002:2024 SQuaRE, PMBOK 7a ed. y Estimación COCOMO I y II Garita.",
    "cards": [
      {
        "id": "cal_1",
        "topic": "Calidad & COCOMO",
        "badge": "ISO/IEC 25002:2024 SQuaRE",
        "question": "¿Cuáles son las 8 características del producto de software según ISO/IEC 25002:2024 SQuaRE?",
        "answer": "1) Adecuación Funcional, 2) Eficiencia de Rendimiento, 3) Compatibilidad, 4) Usabilidad, 5) Fiabilidad (Reliability), 6) Seguridad, 7) Mantenibilidad y 8) Portabilidad.",
        "codeSnippet": "SQuaRE 25000: Estándar internacional para evaluación de calidad del producto de software.",
        "citation": "ISO (2024) ISO/IEC 25002:2024 SQuaRE & Arciniega (2017)",
        "connectors": [
          "ISO/IEC 25002:2024 SQuaRE - Modelo de Calidad de Software - 8 Características del Producto",
          "Fiabilidad Seguridad Mantenibilidad - Estándares ISO - Evaluación de Calidad"
        ]
      },
      {
        "id": "cal_2",
        "topic": "Calidad & COCOMO",
        "badge": "COCOMO I y II (Garita)",
        "question": "¿Cómo calcula COCOMO I el Esfuerzo (PM) y cuál es el avance en COCOMO II?",
        "answer": "COCOMO I: $PM = a \\cdot (KLOC)^b$ (Esfuerzo en Personas-Mes usando Miles de Líneas de Código). COCOMO II estima mediante **Puntos de Objeto** y **Puntos de Función** para proyectos modernos O.O.",
        "codeSnippet": "Fórmula COCOMO I Básico: PM = a * (KLOC)^b | TDEV = c * (PM)^d",
        "citation": "Garita & Lizano (2014) Estimación de Costos COCOMO",
        "connectors": [
          "COCOMO - Personas-Mes y Líneas de Código KLOC",
          "COCOMO II - Puntos de Objeto - Estimación Temprana de Arquitectura"
        ]
      },
      {
        "id": "cal_3",
        "topic": "Calidad & COCOMO",
        "badge": "Complejidad Ciclomática",
        "question": "¿Cómo se calcula la Complejidad Ciclomática de McCabe (V(G)) en un grafo de flujo?",
        "answer": "$V(G) = E - N + 2P$ o simplemente **Número de Decisiones Condicionales (if/while) + 1**. Mide el número mínimo de caminos de prueba independientes.",
        "codeSnippet": "Si hay 3 condicionales 'if': V(G) = 3 + 1 = 4 caminos de prueba independientes",
        "citation": "Pressman, R. S. (2020) & McCabe, T. (1976)",
        "connectors": [
          "Complejidad Ciclomática McCabe - V(G) = E - N + 2P - Caminos de Prueba",
          "Métricas de Control de Flujo - Cobertura de Pruebas - Pressman 2020"
        ]
      },
      {
        "id": "cal_4",
        "topic": "Calidad & COCOMO",
        "badge": "COCOMO II Cost Drivers",
        "question": "¿Qué son los Cost Drivers (Multiplicadores de Esfuerzo EM) en COCOMO II Garita?",
        "answer": "Son 17 factores del proyecto (experiencia del equipo, fiabilidad requerida, restricciones de memoria) que escalan o reducen el cálculo del esfuerzo en Personas-Mes.",
        "codeSnippet": "PM_ajustado = PM_nominal * (EM_1 * EM_2 * ... * EM_17)",
        "citation": "Garita & Lizano (2014) COCOMO II Cost Drivers",
        "connectors": [
          "COCOMO II Cost Drivers - Multiplicadores de Esfuerzo EM - Garita 2014",
          "Factores de Proyecto - Experiencia de Equipo - Estimación de Costos"
        ]
      },
      {
        "id": "cal_5",
        "topic": "Calidad & COCOMO",
        "badge": "Tipos de Pruebas",
        "question": "¿Diferencia entre Pruebas de Caja Negra y Pruebas de Caja Blanca?",
        "answer": "Caja Negra: prueba entradas y salidas sin conocer el código interno. Caja Blanca: prueba la estructura interna del código, bucles y caminos de ejecución.",
        "codeSnippet": "Caja Negra: Pruebas Funcionales | Caja Blanca: Cobertura de Código",
        "citation": "Pressman, R. S. (2020) Software Testing Techniques",
        "connectors": [
          "Pruebas de Caja Negra - Entradas y Salidas - Pruebas Funcionales",
          "Pruebas de Caja Blanca - Cobertura de Código - Estructura Interna"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_cal_1",
        "question": "Según ISO/IEC 25002:2024, la capacidad del software para ser transferido de un entorno de hardware/software a otro es:",
        "correct": "Portabilidad (Portability)",
        "distractor": "Mantenibilidad",
        "incorrect": "Compatibilidad",
        "explanation": "La Portabilidad mide la facilidad para trasladar el software entre diferentes entornos."
      }
    ]
  },
  {
    "id": "comprension_lectora",
    "name": "Sección Transversal: Comprensión Lectora (60 Reactivos)",
    "icon": "READING",
    "color": "#eab308",
    "description": "Análisis textual de ingeniería de software, idea principal, inferencias y evaluación CENEVAL.",
    "cards": [
      {
        "id": "tr_1",
        "topic": "Comprensión Lectora",
        "badge": "Idea Principal vs Tesis",
        "question": "¿Cómo identificar la Idea Principal en un texto técnico de evaluación EGEL Plus?",
        "answer": "La Idea Principal afirma la tesis central del autor. Si se elimina, el texto pierde cohesión global. Las ideas secundarias solo argumentan, ejemplifican o detallan la idea principal.",
        "codeSnippet": "Estrategia: Localizar el sujeto gramatical recurrente y la afirmación central del autor.",
        "citation": "Guía Oficial EGEL Plus CENEVAL 2024",
        "connectors": [
          "Comprensión Lectora EGEL Plus - Idea Principal - Sintaxis y Tesis del Texto",
          "Evaluación Transversal - Lectura Técnica - Análisis de Párrafos"
        ]
      },
      {
        "id": "tr_2",
        "topic": "Comprensión Lectora",
        "badge": "Inferencia Lógica Textual",
        "question": "¿Qué caracteriza a una Inferencia Lógica correcta en las preguntas CENEVAL?",
        "answer": "Es una deducción derivada directamente de las premisas escritas en el pasaje. NUNCA inventa información ajena al texto ni contradice las afirmaciones del autor.",
        "codeSnippet": "Premisa -> Deducción lógica fundamentada = Inferencia válida",
        "citation": "Guía Oficial EGEL Plus CENEVAL 2024",
        "connectors": [
          "Inferencia Lógica - Deducción Basada en Evidencia - Prueba Transversal CENEVAL",
          "Comprensión Lectora - Premisas e Implicaciones - Análisis Crítico de Textos"
        ]
      },
      {
        "id": "tr_3",
        "topic": "Comprensión Lectora",
        "badge": "Falacias y Argumentos",
        "question": "¿Cómo detectar una Falacia Ad Homine o de Falsa Causa en un texto de debate técnico?",
        "answer": "Ad Hominem: ataca a la persona en lugar de refutar su argumento técnico. Falsa Causa: asume que porque B ocurrió después de A, A causó B sin evidencia.",
        "codeSnippet": "Falacia Ad Hominem: 'Su arquitectura es mala porque el programador es joven.'",
        "citation": "Guía Oficial EGEL Plus CENEVAL 2024",
        "connectors": [
          "Falacias Lógicas - Argumentación Técnica - Ad Hominem y Falsa Causa",
          "Comprensión Lectora EGEL Plus - Análisis Crítico - CENEVAL 2024"
        ]
      },
      {
        "id": "tr_4",
        "topic": "Comprensión Lectora",
        "badge": "Conectores Lógicos",
        "question": "¿Qué función cumplen conectores como 'Sin embargo', 'Por consiguiente' y 'En consecuencia'?",
        "answer": "'Sin embargo' (adversativo/oposición): introduce una objeción. 'Por consiguiente' / 'En consecuencia' (consecutivos): introducen el efecto directo o conclusión.",
        "codeSnippet": "El sistema es veloz; sin embargo, consume demasiada memoria RAM.",
        "citation": "Guía Oficial EGEL Plus CENEVAL 2024",
        "connectors": [
          "Conectores Lógicos - Oposición Adversativa y Consecuencia - Cohesión Textual",
          "Comprensión Lectora EGEL Plus - Sintaxis y Marcadores Discursivos"
        ]
      },
      {
        "id": "tr_5",
        "topic": "Comprensión Lectora",
        "badge": "Resumen de Especificaciones",
        "question": "¿Cómo elaborar una síntesis objetiva de un informe técnico sin introducir sesgo?",
        "answer": "Extraer los hechos cuantificables clave, la problemática original y la solución propuesta de forma concisa, omitiendo juicios de valor personales.",
        "codeSnippet": "Problema -> Datos Cuantificables -> Solución Técnica Implementada",
        "citation": "Guía Oficial EGEL Plus CENEVAL 2024",
        "connectors": [
          "Síntesis Técnica - Resumen Objetivo - Especificaciones de Software CENEVAL",
          "Sección Transversal - Habilidades de Comunicación - Lectura Técnica"
        ]
      }
    ],
    "quizzes": [
      {
        "id": "q_tr_1",
        "question": "Texto: 'A pesar de los avances en IA, el diseño de arquitecturas sigue requiriendo la intuición humana para sopesar compromisos no cuantificables entre seguridad y costo'. ¿Cuál es la idea principal?",
        "correct": "La intuición humana es indispensable en arquitectura de software para evaluar decisiones complejas no cuantificables",
        "distractor": "La IA ha reemplazado por completo a los ingenieros de software",
        "incorrect": "El costo es el único factor relevante en sistemas de IA",
        "explanation": "El pasaje afirma que la intuición humana sigue siendo necesaria para sopesar decisiones complejas."
      }
    ]
  }
];
