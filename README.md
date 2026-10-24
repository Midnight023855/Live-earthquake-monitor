# EarthQuake 🌎

Monitor sísmico interactivo en HTML que reúne información de distintas
agencias y visualizaciones en un mapa. Su contenido depende de la
disponibilidad y actualización de las fuentes de datos; no sustituye los
avisos oficiales ni constituye un sistema certificado de protección
civil.

## Funciones principales

### 🌐 Monitoreo de terremotos

-   Consulta y presenta eventos sísmicos de múltiples agencias
    nacionales e internacionales.
-   Muestra datos disponibles del evento, como magnitud, ubicación,
    profundidad, hora, agencia informante e intensidad.
-   Permite filtrar el catálogo por magnitud mínima y por agencia.
-   Mantiene los eventos organizados en el mapa y en los paneles del
    monitor.

### 🗺️ Mapa interactivo

-   Mapa geográfico con marcadores de eventos sísmicos.
-   Acercamiento a zonas de interés y vistas específicas para algunas
    funciones.
-   Capas geográficas y límites regionales cuando los datos
    correspondientes están disponibles.
-   Visualizaciones adicionales para estaciones, alertas y actividad
    sísmica.

### 〰️ Ondas sísmicas

-   Vista dedicada a la visualización de ondas estimadas asociadas a
    eventos compatibles.
-   Animación de frentes de onda sobre el mapa.
-   Seguimiento del evento activo y actualización de la visualización
    conforme llegan nuevos datos.
-   Las ondas son una representación calculada y no una medición directa
    del movimiento del suelo en cada punto.

### 🇯🇵 Estaciones y detección de movimiento en Japón

-   Vista de estaciones sísmicas japonesas con actualizaciones
    periódicas.
-   Panel de detección de actividad instrumental.
-   Presentación de estaciones activas y cuadros visuales de movimiento
    cuando se cumplen los criterios de detección configurados.
-   Herramientas de enfoque y retorno a la vista de Japón.

### 🇹🇼 Estaciones de Taiwán y movimiento instrumental

-   Visualización de estaciones TREM disponibles.
-   Evaluación de lecturas instrumentales recientes para identificar
    actividad.
-   Agrupación de estaciones cercanas para evitar tratar una lectura
    aislada como una detección confirmada por el panel.
-   Uso del panel y de los cuadros visuales compartidos con la detección
    japonesa cuando se detecta actividad en Taiwán.
-   La detección instrumental depende de que lleguen datos válidos y
    actualizados.

### 🌊 Información y visualización de tsunamis

-   Panel y modo de mapa para avisos y zonas de tsunami disponibles.
-   Representación diferenciada de niveles de información, como
    *Forecast*, *Advisory*, *Warning* y *Major Warning*, cuando los
    reportes los incluyen.
-   Líneas costeras y zonas de aviso con actualización de la información
    recibida.
-   Sonidos de aviso asociados a cambios de nivel, sujetos a la
    configuración y a las restricciones de audio del navegador.

### 🌋 Otras alertas y capas

-   Paneles para determinados avisos meteorológicos y fenómenos
    geofísicos disponibles en la versión.
-   Vistas especializadas que pueden cambiar temporalmente el enfoque
    del mapa para mostrar la región pertinente.
-   Capas complementarias, como límites geográficos y fallas, cuando la
    fuente correspondiente está disponible.

### 🔊 Audio y avisos

-   Reproducción de sonidos para determinados reportes y cambios de
    alerta.
-   Algunas funciones de audio requieren una interacción inicial con la
    página debido a las políticas del navegador.
-   La disponibilidad de sonidos puede variar según el tipo de evento y
    el estado del reporte.

## Uso

1.  Abre el archivo HTML en un navegador compatible.
2.  Permite que cargue el mapa y espera a que se consulten las fuentes
    de datos.
3.  Selecciona un evento o una función del monitor para explorar su
    información.
4.  Usa los filtros del catálogo para limitar los eventos por magnitud o
    agencia.
5.  Para obtener información de seguridad, confirma siempre los avisos
    en los canales oficiales de las autoridades correspondientes.

## Consideraciones

-   EarthQuake es un monitor informativo, no un instrumento certificado
    de alerta temprana.
-   La latencia, precisión, cobertura y disponibilidad dependen de cada
    fuente de datos y de la conexión a Internet.
-   Los datos preliminares pueden cambiar cuando la agencia publica una
    actualización o un informe final.
-   Las ondas estimadas y las detecciones basadas en estaciones no deben
    interpretarse como confirmación automática de daños ni como garantía
    de que se emitirá una alerta oficial.
-   Algunas secciones solo muestran información cuando existe un reporte
    activo o cuando la fuente proporciona datos compatibles.
-   Este README describe las funciones visibles del monitor; no
    documenta detalles internos de conexión.

## Créditos

EarthQuake integra datos y conceptos de visualización procedentes de
distintas agencias y proyectos públicos. Consulta las atribuciones y
condiciones de uso que aparecen en el propio código y en las fuentes
originales.
