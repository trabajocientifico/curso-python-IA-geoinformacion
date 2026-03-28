/* ============================================================
   Datos del Curso: Espacialización de la Información con Python + IA
   ============================================================ */

const COURSE_DATA = {
  title: "Espacialización de la Información con Python + IA",
  subtitle: "Aprende a crear mapas profesionales, analizar datos geoespaciales y automatizar flujos con IA como copiloto.",
  instructor: "Oscar Iván Vargas Pineda",
  instructorTitle: "MSc | PhD(c) en Ciencias Agrarias · Data Scientist · Fundador de Trabajo Científico",
  totalSessions: 3,
  totalHours: 9,

  modules: [

    /* ── ENCUENTRO 1 ──────────────────────────────────────── */
    {
      id: 1,
      title: "De ArcGIS a Python: Primeros Pasos",
      icon: "🗺️",
      duration: "3 horas",
      description: "Del software de escritorio al código: tu primer mapa con Python desde cero.",
      deliverable: "Mapa coroplético + mapa interactivo de Colombia",
      topics: [
        { name: "Bienvenida y contexto",       desc: "¿Por qué Python? Comparación con ArcGIS. Demo: de CSV a mapa en 5 líneas." },
        { name: "Setup del entorno",            desc: "Google Colab listo en minutos. Primer notebook. La IA como tu asistente." },
        { name: "Datos espaciales en Python",   desc: "GeoDataFrame, geometrías, CRS. Lectura de shapefiles y GeoJSON." },
        { name: "Tu primer mapa",               desc: "Mapa estático con matplotlib + mapa interactivo con Folium. Exportar PNG y HTML." },
      ],
      objectives: [
        "Entender por qué Python complementa o reemplaza herramientas como ArcGIS",
        "Configurar Google Colab y crear tu primer notebook funcional",
        "Leer y manipular datos vectoriales con GeoPandas",
        "Generar un mapa interactivo exportable en HTML",
      ],
      resources: [
        { title: "Google Colab",            url: "https://colab.research.google.com/" },
        { title: "Documentación GeoPandas", url: "https://geopandas.org/" },
        { title: "Datos DANE — Colombia",   url: "https://www.dane.gov.co/" },
      ],
      sessions: [{ id: 1, title: "De ArcGIS a Python: Primeros Pasos", videoId: null, scripts: [] }],
      quiz: {
        title: "Evaluación — Encuentro 1",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué librería de Python se usa principalmente para trabajar con datos vectoriales geoespaciales?",
            options: ["NumPy", "GeoPandas", "Pillow", "Matplotlib"],
            correct: 1,
            explanation: "GeoPandas extiende Pandas para trabajar con datos geoespaciales. Permite leer shapefiles, GeoJSON, hacer operaciones espaciales y visualizar datos sobre un mapa."
          },
          {
            question: "¿Qué formato de salida genera Folium para mapas interactivos?",
            options: ["PDF", "SVG", "HTML", "PNG"],
            correct: 2,
            explanation: "Folium genera archivos HTML que contienen un mapa interactivo basado en Leaflet.js. Este archivo puede abrirse en cualquier navegador o integrarse en una web."
          },
          {
            question: "¿Qué es un GeoDataFrame en GeoPandas?",
            options: [
              "Un archivo shapefile comprimido",
              "Un DataFrame que incluye una columna especial de geometría",
              "Un sistema de referencia de coordenadas",
              "Un tipo de mapa temático",
            ],
            correct: 1,
            explanation: "Un GeoDataFrame es como un DataFrame de Pandas con una columna 'geometry' que almacena formas espaciales (puntos, líneas, polígonos)."
          },
          {
            question: "¿Cuál es la principal ventaja de usar Google Colab en este curso?",
            options: [
              "Permite editar imágenes satelitales",
              "Ejecuta código Python en el navegador sin instalar nada",
              "Descarga mapas en alta resolución automáticamente",
              "Crea presentaciones con datos geoespaciales",
            ],
            correct: 1,
            explanation: "Google Colab es un entorno Jupyter en la nube. No requiere instalación local: todo corre en servidores de Google desde tu navegador."
          },
          {
            question: "¿Qué significa CRS en el contexto de datos geoespaciales?",
            options: [
              "Código de Referencia Satelital",
              "Capa de Referencia Superficial",
              "Sistema de Referencia de Coordenadas",
              "Clasificación de Recursos Satelitales",
            ],
            correct: 2,
            explanation: "CRS (Coordinate Reference System) define cómo los datos espaciales se relacionan con ubicaciones reales en la Tierra. Es fundamental para que los mapas se alineen correctamente."
          },
        ]
      }
    },

    /* ── ENCUENTRO 2 ──────────────────────────────────────── */
    {
      id: 2,
      title: "Análisis Espacial e IA como Copiloto",
      icon: "🤖",
      duration: "3 horas",
      description: "Operaciones espaciales avanzadas con rasters y vectores, usando IA como generador de código.",
      deliverable: "Análisis de proximidad + notebook con flujo IA",
      topics: [
        { name: "Operaciones espaciales",   desc: "Buffers, intersecciones, spatial joins. Cálculo de áreas y distancias." },
        { name: "Análisis de proximidad",   desc: "Cargar puntos de interés, crear buffers, identificar zonas de influencia." },
        { name: "Datos raster",             desc: "Introducción a rasterio: DEMs, imágenes satelitales, extracción de valores." },
        { name: "Prompt engineering geo",   desc: "Cómo pedirle a la IA código geoespacial efectivo. Proyecto asistido completo." },
      ],
      objectives: [
        "Aplicar operaciones espaciales: buffers, intersecciones y spatial joins",
        "Realizar análisis de proximidad con datos reales de Colombia",
        "Extraer valores de datos raster (elevación, temperatura, NDVI)",
        "Formular prompts efectivos para obtener código geoespacial de la IA",
      ],
      resources: [
        { title: "Documentación Rasterio",      url: "https://rasterio.readthedocs.io/" },
        { title: "Overpass Turbo (OSM)",         url: "https://overpass-turbo.eu/" },
        { title: "ChatGPT",                      url: "https://chatgpt.com/" },
      ],
      sessions: [{ id: 2, title: "Análisis Espacial e IA como Copiloto", videoId: null, scripts: [] }],
      quiz: {
        title: "Evaluación — Encuentro 2",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué es un buffer en análisis espacial?",
            options: [
              "Un tipo de archivo de almacenamiento",
              "Una zona de influencia creada alrededor de un objeto geográfico",
              "Una capa de imagen satelital",
              "Un tipo de sistema de coordenadas",
            ],
            correct: 1,
            explanation: "Un buffer crea una zona de influencia a cierta distancia alrededor de un punto, línea o polígono. Es clave para análisis de proximidad como identificar servicios cercanos."
          },
          {
            question: "¿Qué librería de Python se usa principalmente para trabajar con datos raster?",
            options: ["Folium", "Pandas", "Rasterio", "Scikit-learn"],
            correct: 2,
            explanation: "Rasterio es la librería estándar para leer, escribir y analizar archivos raster en Python. Trabaja con DEMs, imágenes satelitales y datos en formato de grilla."
          },
          {
            question: "¿Qué es un spatial join?",
            options: [
              "Una unión de tablas por nombre de columna",
              "Una operación que combina capas según sus relaciones espaciales",
              "Un método para exportar shapefiles",
              "Una función para fusionar proyecciones cartográficas",
            ],
            correct: 1,
            explanation: "Un spatial join combina atributos de dos capas geoespaciales basándose en su relación espacial (intersección, contiene, está dentro), no en un campo común."
          },
          {
            question: "¿Para qué sirven los DEMs en geoinformación?",
            options: [
              "Almacenar datos de texto georreferenciados",
              "Representar la elevación del terreno en formato raster",
              "Calcular áreas de polígonos vectoriales",
              "Conectar bases de datos espaciales",
            ],
            correct: 1,
            explanation: "Los DEM (Digital Elevation Models) son archivos raster donde cada píxel almacena la altura del terreno. Son esenciales para análisis de pendientes, cuencas y visibilidad."
          },
          {
            question: "¿En qué consiste el 'prompt engineering geo'?",
            options: [
              "Escribir código Python directamente sin usar IA",
              "Diseñar interfaces gráficas para mapas interactivos",
              "Formular instrucciones claras para que la IA genere código geoespacial efectivo",
              "Programar GPUs para procesamiento de imágenes satelitales",
            ],
            correct: 2,
            explanation: "El prompt engineering geo consiste en darle a la IA contexto específico: qué librería usar, el formato de los datos, el objetivo del análisis. Un buen prompt produce código funcional desde el primer intento."
          },
        ]
      }
    },

    /* ── ENCUENTRO 3 ──────────────────────────────────────── */
    {
      id: 3,
      title: "Cartografía Profesional y Proyecto Final",
      icon: "🏆",
      duration: "3 horas",
      description: "Datos abiertos, automatización y tu proyecto completo de principio a fin.",
      deliverable: "Proyecto completo + mapa de calidad profesional",
      topics: [
        { name: "Datos abiertos y APIs",        desc: "IGAC, IDEAM, DANE, OpenStreetMap. Descarga programática de geodatos." },
        { name: "Cartografía profesional",       desc: "Basemaps, composición cartográfica, exportación en alta resolución." },
        { name: "Automatización",                desc: "Scripts reutilizables, procesamiento batch, generación de reportes." },
        { name: "Proyecto integrador",           desc: "Mini-proyecto completo: de la pregunta al mapa publicable. Presentación." },
      ],
      objectives: [
        "Acceder y descargar geodatos de fuentes oficiales colombianas (IGAC, IDEAM, DANE)",
        "Crear cartografía de calidad profesional con basemaps y composición visual",
        "Automatizar flujos de procesamiento con scripts reutilizables",
        "Desarrollar y presentar un proyecto integrador completo",
      ],
      resources: [
        { title: "IGAC — Datos Geográficos",  url: "https://www.igac.gov.co/" },
        { title: "IDEAM — Datos Ambientales",  url: "http://www.ideam.gov.co/" },
        { title: "GeoPortal DANE",             url: "https://geoportal.dane.gov.co/" },
      ],
      sessions: [{ id: 3, title: "Cartografía Profesional y Proyecto Final", videoId: null, scripts: [] }],
      quiz: {
        title: "Evaluación — Encuentro 3",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué es el IGAC en el contexto de la geoinformación colombiana?",
            options: [
              "Una librería Python para análisis espacial",
              "El Instituto Geográfico Agustín Codazzi, fuente oficial de geodatos de Colombia",
              "Un formato de archivo geoespacial",
              "Un tipo de proyección cartográfica",
            ],
            correct: 1,
            explanation: "El IGAC (Instituto Geográfico Agustín Codazzi) es la entidad oficial de Colombia que produce y distribuye cartografía, datos catastrales y geodatos de referencia para todo el país."
          },
          {
            question: "¿Qué ventaja ofrece el procesamiento batch en automatización geoespacial?",
            options: [
              "Permite crear un único mapa de alta calidad manual",
              "Procesa automáticamente múltiples archivos o regiones con el mismo script",
              "Genera únicamente mapas interactivos en HTML",
              "Conecta Python directamente con Google Maps",
            ],
            correct: 1,
            explanation: "El procesamiento batch aplica el mismo flujo analítico a muchos archivos automáticamente. Por ejemplo, generar un mapa por cada departamento de Colombia con un solo script."
          },
          {
            question: "¿Cuál es la principal ventaja de Python frente a ArcGIS en términos de costo?",
            options: [
              "Python tiene licencias educativas más económicas",
              "Python es 100% open-source y gratuito, sin licencias costosas",
              "ArcGIS también ofrece una versión completamente gratuita",
              "No existe diferencia real en costos",
            ],
            correct: 1,
            explanation: "ArcGIS requiere licencias anuales costosas. Python con GeoPandas, Rasterio y Folium es completamente gratuito y de código abierto, democratizando el análisis espacial."
          },
          {
            question: "¿Qué es un basemap en cartografía con Python?",
            options: [
              "Una capa base de referencia visual que da contexto geográfico al mapa",
              "Un tipo especial de proyección cartográfica",
              "El formato de exportación final del mapa",
              "Un tipo de join espacial entre capas",
            ],
            correct: 0,
            explanation: "Un basemap es la capa de fondo del mapa (OpenStreetMap, Google Maps, imágenes satelitales) que provee contexto geográfico para las capas de datos que se superponen."
          },
          {
            question: "¿Qué es OpenStreetMap?",
            options: [
              "Un servicio comercial de datos geoespaciales de pago",
              "Un mapa colaborativo, abierto y gratuito creado por la comunidad",
              "Una librería de Python para análisis espacial",
              "Un formato de archivo geoespacial propietario",
            ],
            correct: 1,
            explanation: "OpenStreetMap (OSM) es un proyecto colaborativo que crea mapas editables del mundo de forma gratuita. Sus datos son de libre uso y se pueden descargar programáticamente con OSMnx o la API Overpass."
          },
        ]
      }
    }
  ]
};
