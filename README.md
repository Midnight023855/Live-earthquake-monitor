# EarthQuake — monitor sísmico, alertas y riesgos en vivo

Monitor web cuyo punto de entrada es un archivo HTML independiente, inspirado en la organización visual y algunas ideas de detección por estaciones de [Kanameishi](https://github.com/Lipomoea/kanameishi). Integra catálogos sísmicos, alertas tempranas, estaciones en vivo, mapas de intensidad, tsunami, meteorología, ciclones, volcanes, noticias y avisos de Colombia. El HTML carga librerías, mapas y datos de servicios externos; no es una aplicación desconectada de Internet.

> **Archivo principal:** `EarthQuake_Kanameishi_AGPL.html`  
> **Idioma de la interfaz:** español  
> **Zona horaria de presentación:** `America/Bogota`  
> **Formato:** página HTML independiente, ejecutable en navegador o publicable como sitio estático.

---

## Índice

- [Resumen de funciones](#resumen-de-funciones)
- [Inicio rápido](#inicio-rápido)
- [Vista sísmica principal](#vista-sísmica-principal)
- [Fuentes sísmicas](#fuentes-sísmicas)
- [Alertas tempranas y detección local](#alertas-tempranas-y-detección-local)
- [Estaciones de Japón y Taiwán](#estaciones-de-japón-y-taiwán)
- [Ondas sísmicas y TauP](#ondas-sísmicas-y-taup)
- [Mapas, intensidad y límites administrativos](#mapas-intensidad-y-límites-administrativos)
- [Tsunami](#tsunami)
- [Meteorología, huracanes y tifones](#meteorología-huracanes-y-tifones)
- [Volcanes, GDACS y alertas ambientales](#volcanes-gdacs-y-alertas-ambientales)
- [Centro Meteorológico LIVE](#centro-meteorológico-live)
- [Telop, noticias y Colombia](#telop-noticias-y-colombia)
- [Ajustes](#ajustes)
- [Audio, TTS y avisos](#audio-tts-y-avisos)
- [Caché, conexión y comportamiento offline](#caché-conexión-y-comportamiento-offline)
- [Fuentes y condiciones de los datos](#fuentes-y-condiciones-de-los-datos)
- [Privacidad y seguridad](#privacidad-y-seguridad)
- [Licencia y atribuciones](#licencia-y-atribuciones)
- [Limitaciones conocidas](#limitaciones-conocidas)

---

## Resumen de funciones

- Catálogo global de terremotos procedente de múltiples agencias.
- Separación visual de **USGS** y **NEIC** cuando el feed USGS identifica `net: "us"`.
- Alertas tempranas oficiales JMA/Wolfx y otros canales EEW disponibles.
- Detección local de movimiento mediante estaciones NIED/K-NET/KiK-net y TREM/P-Alert.
- Diferenciación entre sismo oficial, alerta temprana y detección local estimada.
- Mapa Leaflet con capas sísmicas, intensidad, estaciones, fallas, límites y fenómenos meteorológicos.
- Vista de tsunami con JMA, NOAA/PTWC/NTWC y geometrías oficiales disponibles.
- Alertas meteorológicas NWS de Estados Unidos con polígonos oficiales y radar NOAA.
- Huracanes NOAA/NHC y tifones JMA/NMC/CMA.
- Alertas meteorológicas oficiales JMA con zonas coloreadas y retorno automático a la vista sísmica.
- Boletines volcánicos JMA y catálogo volcánico mundial.
- Alertas globales GDACS y avisos de clima espacial NOAA SWPC.
- Visor oficial SIAT-CT México dentro de una vista independiente.
- Telop inferior con sismos recientes, tsunami, volcanes, noticias, clima y alertas.
- Cobertura NHK G automática ante sismos JMA en Japón con Shindo 5− o superior.
- Cinco noticias mundiales y cinco colombianas cuando las fuentes RSS están disponibles.
- Marcador flotante de Colombia, incluido futsal FCF cuando hay fixture oficial.
- Avisos de goles, descanso y final cuando existe información de marcador verificable.
- Síntesis de voz en español, cola de avisos y sonidos diferenciados.
- Configuración persistente en `localStorage`.
- Sin servidor propio obligatorio: se puede ejecutar como página estática.

---

## Inicio rápido

1. Descarga `EarthQuake_Kanameishi_AGPL.html`.
2. Descarga también `LICENSE` si vas a redistribuirlo.
3. Abre el HTML en un navegador moderno.
4. Para una ejecución más fiable, sírvelo mediante un servidor local o una página estática, porque algunos navegadores restringen peticiones desde `file://`.
5. Pulsa **⚙️ Ajustes** para seleccionar fuentes, escalas, audio, TTS y filtros.

Ejemplo de servidor local opcional:

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000/EarthQuake_Kanameishi_AGPL.html`.

El archivo utiliza conexiones externas y algunos accesos pasan por proxies públicos o Workers ya configurados. La interfaz no requiere un backend propio para dibujarse, pero ciertos feeds dependen de esos servicios. Si un proveedor no responde, se muestra como desconectado o se conserva el último dato válido cuando hay caché.

---

## Vista sísmica principal

La pantalla principal incluye:

- Tarjeta del último sismo seleccionado.
- Intensidad visual, magnitud, profundidad, hora y epicentro.
- Enlace al boletín oficial cuando la agencia proporciona una URL.
- Estado de tsunami asociado al evento.
- Lista de sismos con filtros por magnitud y agencia.
- Mapa con enfoque automático al último evento relevante.
- Leyenda de intensidad.
- Reloj y contador de sismos del día.
- Panel de conexiones y estado de las fuentes.
- Telop de información automática.
- Botones de inicio/último sismo, fijar Japón, ajustes, fuentes de Japón, secciones meteorológicas, pantalla completa y mapa base.

### Filtros de la lista

- Magnitud mínima: todas, M2.5+, M4.0+, M5.5+ y M7.0+.
- Agencia: USGS, NEIC, JMA, CENC, EMSC, IGN, INETER, GEOFON, SSN, AFAD, BMKG, GeoNet, INGV, IPGP, SED, PHIVOLCS, CSN, IG-EPN, Early-Est, HKO, NOA, KOERI, KMA, BCSF, NRCan, USP, MMD, CEA-PR, ShakeAlert y GDACS, entre otras. Son opciones de filtrado; no todas corresponden a una consulta directa independiente en el cargador principal.
- Filtros adicionales en Ajustes: magnitud, región, solo sismos sentidos y magnitud mínima del telop.
- Regiones rápidas: Colombia, Venezuela, Caribe/frontera, Japón y Taiwán.

Las revisiones de una misma agencia se fusionan cuando coinciden el evento, la hora, las coordenadas y la magnitud aproximada. Esto evita duplicar informes preliminares y finales.

---

## Fuentes sísmicas

El cargador principal consulta las fuentes de forma paralela e incremental. La lista actual incluye:

- **USGS** — catálogo GeoJSON global.
- **NEIC** — separado de USGS cuando el código de red del evento es `us`; no es una segunda consulta independiente.
- **JMA** — catálogo de Wolfx/JMA y XML oficial JMA.
- **CENC / NowQuake** — catálogo chino y canal Wolfx cuando está disponible.
- **CSN** — Centro Sismológico Nacional de Chile.
- **IG-EPN** — Instituto Geofísico de Ecuador.
- **ISC** — International Seismological Centre.
- **IGP** — Instituto Geofísico del Perú cuando se dispone de registros verificables.
- **EMSC**.
- **IGN España**.
- **INETER/CATAC**.
- **FUNVISIS**.
- **GEOFON/GFZ**.
- **BREQ**.
- **AFAD**.
- **BMKG TEWS oficial** de Indonesia: `autogempa.json` y `gempaterkini.json`.
- **GeoNet** de Nueva Zelanda.
- **INGV** de Italia.
- **IPGP** de Francia y territorios asociados mediante FDSN.
- **SSN** de México.
- **SED**.
- **PHIVOLCS** de Filipinas.
- **CWA** de Taiwán, incluido el Worker configurado para esta edición cuando corresponde.
- **Early-Est**.
- **HKO** de Hong Kong.
- **NOA** de Grecia.
- **KOERI** de Turquía.
- **GDACS** para eventos globales de desastre con componente sísmico.

### BMKG

Esta versión **no integra BMKG InaTEWS WRS ni sus ondas**. Se retiraron completamente el feed WRS, el sondeo, el parser de ondas, los avisos WRS, su activación automática y sus registros de caché. BMKG permanece únicamente como catálogo TEWS normal mediante sus dos feeds oficiales.

### Fuentes no integradas

- IGC, GEOAU y CPPT no se añaden sin un endpoint oficial inequívoco y verificable.
- Fan Studio, FSSN y KMA-PEWS no forman parte de esta versión.
- No se solicita ni se incluye ninguna API key privada de Fan Studio.

---

## Alertas tempranas y detección local

El monitor separa tres tipos de información:

### Canales EEW

Las alertas tempranas **JMA EEW** (recibida por Wolfx), **CENC EEW (Wolfx)** y **Sichuan EEW (Wolfx)** pueden abrir una vista prioritaria mientras están vigentes. Se muestran como alertas tempranas, no como sismos finales confirmados. JMA EEW utiliza WebSocket de Wolfx con respaldo HTTP cuando hace falta; Wolfx es el canal de retransmisión, no una agencia sísmica.

La vista conserva la ubicación y los parámetros entregados por la fuente. Un reporte preliminar JMA cuyo epicentro aún no está confirmado puede mostrarse con marcador **PLUM**.

### Cobertura NHK G

La cobertura de NHK G se activa automáticamente solo ante un evento JMA en Japón con intensidad Shindo 5− o superior. Presenta el evento principal, mantiene una lista de sismos recientes de Japón y permite mostrar la vista de tsunami durante la cobertura. Incluye controles para cerrar, reactivar y ampliar el video. La reproducción automática depende de los permisos del navegador.

### Detección local NIED/Yahoo

La detección japonesa usa lecturas de estaciones K-NET/KiK-net y el feed Kyoshin/Yahoo disponible. Agrupa estaciones cercanas y exige lecturas consecutivas y coherentes antes de abrir una detección de movimiento.

Características principales:

- Hasta seis estaciones cercanas por grupo.
- Vecindad de respaldo cuando corresponde.
- Agrupación por áreas independientes.
- Umbrales ponderados y lecturas consecutivas.
- Celdas y cajas de movimiento sobre Japón.
- Retorno automático a la vista normal después del reposo.
- No inventa epicentro oficial, Shindo oficial ni frentes P/S.
- Se distingue de un evento sísmico confirmado en la lista.

### P-Alert y TREM de Taiwán

Las redes de estaciones se muestran como detección y telemetría, no como una agencia sísmica convencional. La vista puede presentar:

- Máxima intensidad disponible o estimada.
- PGA y PGV cuando la fuente las entrega.
- Estado de conexión y frescura de las tramas.
- Grupos de estaciones activas.
- Área de movimiento sobre Taiwán.
- Panel especial de movimiento cuando se detectan lecturas relevantes.

El catálogo de estaciones no se considera telemetría. El estado **Conectada** requiere datos recientes. PGD solo se muestra si la fuente lo entrega; no se fabrica como medición.

---

## Estaciones de Japón y Taiwán

### Japón

El selector permite:

- Yahoo/Kyoshin CDN.
- NIED oficial K-NET + KiK-net.
- Solo K-NET.
- Solo KiK-net.
- Yahoo + NIED.
- Hi-net como catálogo sin telemetría.
- F-net como catálogo sin telemetría.
- V-net sin catálogo o flujo público verificado.

S-net, DONET y N-net no se muestran como estaciones activas en esta edición porque no hay una telemetría en vivo verificada para esta vista.

La capa NIED puede mostrar intensidad o equivalencias aproximadas de PGA/PGV derivadas de colores del frame. Estas equivalencias llevan `≈` y no se presentan como valores crudos medidos.

También existe una vista independiente del **Mar de Japón**, con estaciones en vivo y encuadre regional.

### Taiwán

P-Alert y TREM se mantienen como redes de alerta temprana y movimiento. Sus estaciones pueden estar ocultas en la vista normal y aparecer cuando se activa una vista de movimiento relevante.

---

## Ondas sísmicas y TauP

La vista de ondas no usa BMKG WRS. Las ondas disponibles corresponden a EEW JMA/Wolfx, eventos compatibles con TauP y detecciones TREM cuando el flujo local las habilita.

Incluye:

- Frentes P y S visuales.
- Marcador del evento o marcador PLUM para epicentro JMA no confirmado.
- Animación temporal de los frentes.
- Seguimiento automático del epicentro y ajuste de zoom.
- Cálculo con modelo IASP91 mediante TauP cuando está disponible.
- Modo TauP preciso.
- Modo TauP rápido.
- Modo de respaldo geométrico cuando se selecciona respaldo o TauP no está disponible.

Los frentes calculados son teóricos. No deben interpretarse como una lectura de waveform de una estación.

---

## Mapas, intensidad y límites administrativos

### Mapas base

- Oscuro (base ArcGIS/Esri).
- Satélite (Esri World Imagery).
- Terreno (OpenTopoMap).
- Referencias de lugares y transporte que pueden añadirse como capas auxiliares.

### Color del mar

Se puede escoger entre oscuro, azul océano, azul profundo, negro, gris pizarra, verde azulado e índigo. El cambio afecta al agua y no sustituye los límites, estaciones o sismos.

### Escalas de intensidad

- Escala de la agencia.
- Shindo JMA.
- MMI.
- CSIS para China.
- CWA para Taiwán.
- GeoNet MMI para Nueva Zelanda.

Las equivalencias entre escalas se marcan como aproximadas cuando no son oficiales.

### Capas y límites

El monitor puede cargar:

- Límites nacionales y subdivisiones administrativas.
- GeoBoundaries para países y subdivisiones.
- TIGERweb/Census para Estados Unidos y Alaska cuando se necesita más detalle.
- Límites locales de China cuando el evento lo requiere.
- Áreas oficiales de intensidad JMA.
- ShakeMap o capas de intensidad USGS cuando están disponibles.
- Fallas PB2002 opcionales.
- Mapa de calor de las últimas 24 horas.

No se crean polígonos oficiales inexistentes. Si una fuente no entrega geometría, se usa su área textual o se mantiene el evento sin contorno inventado.

---

## Tsunami

La sección de tsunami integra y separa los avisos de:

- JMA.
- NOAA/PTWC.
- NOAA/NTWC.
- Geometrías y líneas disponibles de los productos oficiales.

Funciones:

- Panel independiente.
- Capa cartográfica de zonas o líneas oficiales.
- Filtrado de declaraciones no accionables cuando no tienen área de amenaza.
- Traducción del nivel, certeza, urgencia y severidad al español.
- Sonidos diferenciados por nivel.
- Visualización persistente de las zonas oficiales en las vistas compatibles.
- Priorización temporal ante un aviso nuevo.

Cuando el CAP no trae un polígono oficial, el monitor no dibuja un contorno inventado.

---

## Meteorología, huracanes y tifones

### Alertas meteorológicas de Estados Unidos

La vista NWS consulta el feed oficial de alertas activas. Muestra:

- Tipo de aviso.
- Área afectada.
- Texto traducido al español.
- Colores por severidad y categoría.
- Polígonos oficiales de la alerta cuando el feed los entrega.
- Zoom a la zona del aviso.
- Retorno a la vista normal después de la prioridad.

Los polígonos representan áreas publicadas por NWS, normalmente condados, zonas o regiones. No se genera un polígono independiente para cada ciudad.

Incluye una capa independiente de **radar NOAA** que puede activarse o desactivarse desde el botón de radar. El radar no es una fuente de alertas: es una capa meteorológica aparte.

### Huracanes de Estados Unidos

La vista NOAA/NHC muestra:

- Tormentas y huracanes activos.
- Trayectoria observada.
- Trayectoria pronosticada.
- Cono o rango de pronóstico cuando existe.
- Categoría o tipo de sistema.
- Viento y presión cuando la fuente los entrega.
- Mapa enfocado en el sistema activo.
- Narración en español de las actualizaciones relevantes.

### Tifones

La vista de tifones combina, cuando están disponibles:

- JMA.
- NMC de China.
- CMA y fuentes compatibles.

Muestra:

- Posición actual.
- Puntos observados.
- Trayectoria pronosticada.
- Anillos de viento.
- Rango de pronóstico.
- Nombre traducido o normalizado.
- Categoría y detalles.
- Aviso sonoro/TTS para actualizaciones nuevas.

### Alertas meteorológicas JMA

La sección JMA puede abrirse desde la barra o Ajustes y representa las áreas meteorológicas oficiales de Japón. Traduce los avisos al español, colorea las zonas según la categoría oficial y enfoca temporalmente la prefectura o área correspondiente. Ante un boletín nuevo puede abrirse automáticamente y, tras la prioridad, volver al último sismo.

---

## Volcanes, GDACS y alertas ambientales

### Volcanes

Incluye dos funciones distintas:

- **Avisos volcánicos oficiales JMA**, en apartado independiente y con productos traducidos. Los boletines nuevos pueden abrir la vista automáticamente y después retornar al último sismo.
- **Catálogo/alertas volcánicas mundiales**, con apoyo de USGS, NASA EONET y fuentes de observación.

Los marcadores JMA utilizan únicamente coordenadas explícitas de los productos. Los niveles solo se muestran cuando son oficiales. El telop también consulta titulares volcánicos RSS como una fuente informativa separada; no sustituye los boletines oficiales.

### GDACS

La vista GDACS muestra alertas globales de desastres, como:

- Terremotos.
- Ciclones tropicales.
- Inundaciones.
- Erupciones o eventos volcánicos.
- Sequías.
- Incendios forestales.

Incluye tipo, país o zona, nivel, severidad, fecha, descripción, mapa y lectura en español para novedades nuevas.

### Clima espacial NOAA SWPC

El módulo ambiental consulta alertas de NOAA SWPC y GDACS cada dos minutos. Ante una alerta nueva traduce términos habituales, abre el panel por unos 15 segundos y muestra:

- Fulguraciones solares.
- Tormentas geomagnéticas.
- Apagones de radio.
- Vigilancias, advertencias y alertas de clima espacial.

La vista también conserva el texto original para poder comparar la traducción.

---

## Centro Meteorológico LIVE

El Centro Meteorológico LIVE puede abrir Meteo365 dentro del monitor o permitir abrirlo externamente si el navegador bloquea el iframe.

Capas disponibles en el selector:

- Lluvia.
- Temperatura.
- Viento.
- Rayos.
- Incendios.
- Satélite.
- Oleaje.

La vista de clima puede reemplazar temporalmente la lista de sismos por capitales y lugares consultables. La búsqueda de ciudad se ejecuta al confirmar la consulta y al seleccionar un resultado muestra temperatura, sensación térmica, humedad y viento, además de centrar el mapa.

---

## Telop, noticias y Colombia

### Telop automático

El telop inferior puede mostrar, entre otros:

- Sismos recientes.
- Sismos M5+.
- Alertas NWS.
- Tsunami.
- Volcanes.
- Clima espacial.
- Alertas de Colombia.
- Noticias mundiales.
- Noticias de Colombia.
- Resumen meteorológico de Bogotá vía Open-Meteo y alertas de Colombia consultadas a IDEAM/UNGRD.
- Datos curiosos rotativos del monitor.

Los eventos sísmicos del telop son temporales y se filtran por frescura. No se reciclan como novedades nuevas después de caducar.

### Noticias

Se intentan publicar hasta cinco noticias mundiales y cinco colombianas por hora. Las fuentes RSS configuradas incluyen BBC Mundo, The New York Times, EL TIEMPO y El Colombiano. Si una fuente falla, se intenta otra y se conserva caché válida.

### Colombia: fútbol y futsal

El monitor puede mostrar:

- Próximo partido de Colombia.
- Fixture de futsal FCF cuando está disponible.
- Hora en Colombia.
- Marcador en vivo cuando existe una fuente verificable.
- Minuto de juego.
- Descanso y final.
- Goleador y minuto solo si se reciben esos datos.
- Lluvia de balones durante un gol, activable desde Ajustes.
- Widget flotante arrastrable con posición guardada.

Los fixtures no se presentan como marcador en vivo. Si no existe confirmación, se muestra el estado correspondiente.

---

## Ajustes

El panel **⚙️ Ajustes** permite configurar:

### Apartados

- Alertas meteorológicas JMA.
- Estaciones en vivo del Mar de Japón.
- Visor SIAT-CT México.
- Centro Meteorológico LIVE.
- Modo automático de rotación de clima, Japón, alertas JMA, tifones, huracanes, alertas NWS, tsunami, NIED, Mar de Japón, movimiento sísmico, volcanes y clima espacial; después vuelve a Inicio. Las alertas prioritarias pueden interrumpir el ciclo.

### Lista

- Magnitud mínima.
- Región.
- Solo sismos sentidos.
- Agencias visibles.

Desactivar una agencia la oculta de la lista, pero no elimina la conexión ni detiene necesariamente su actualización de fondo.

### Mapa, texto y avisos

- Líneas de fallas PB2002.
- Notificaciones del navegador.
- Magnitud mínima del telop.
- Escala de intensidad.
- Color del mar.
- Fuente y modalidad de estaciones de Japón.
- Paneles TREM, P-Alert y NIED.
- Métrica NIED: intensidad, PGA aproximada, PGV aproximada o ambas.

### General

- Lluvia de balones de Colombia.
- Avisos de goles, descanso y final.
- Voz TTS.
- Sonidos y alertas.
- Modelo TauP: preciso, rápido o respaldo.
- Pruebas de sonidos de interfaz y sonidos SREV.
- Prueba de TTS.
- Restablecer y guardar preferencias.

Las preferencias se guardan en el navegador mediante `localStorage`.

---

## Audio, TTS y avisos

El sistema incluye:

- Sonidos de interfaz.
- Sonidos SREV para EEW, actualizaciones, tsunami y movimiento.
- Cola de TTS para no interrumpir un aviso en curso.
- Voz preferida seleccionable cuando el navegador la ofrece.
- Normalización de siglas y expresiones frecuentes al español.
- Mensajes sísmicos con magnitud, epicentro, profundidad, hora y fuente.
- Mensajes separados para EEW, tsunami, clima, volcanes, GDACS y movimiento local.

El navegador puede exigir un gesto del usuario antes de permitir audio o reproducción automática.

---

## Caché, conexión y comportamiento offline

El HTML conserva en `localStorage`:

- Eventos sísmicos recientes.
- Última respuesta válida de algunas agencias.
- Preferencias del monitor.
- Noticias.
- Posiciones de widgets.
- Identificadores ya anunciados.
- Estado de revisiones y deduplicación.

La caché no convierte un dato antiguo en una alerta nueva. Los estados de conexión se calculan usando la frescura de la respuesta o de la trama, no solo la existencia de un catálogo.

Si una agencia no responde:

- Se muestra como desconectada o sin datos.
- Se conserva el último estado válido cuando el módulo lo permite.
- No se fabrican magnitudes, coordenadas, polígonos, PGA, PGV o PGD.

---

## Fuentes y condiciones de los datos

Algunas fuentes son consultadas directamente; otras requieren CORS, un proxy público, un Worker ya configurado o una respuesta compatible del navegador. El HTML no garantiza que todos los proveedores estén disponibles desde todas las redes.

Fuentes y servicios principales utilizados por módulos:

- USGS Earthquake Hazards Program.
- JMA y Wolfx.
- NIED/Kyoshin/Yahoo.
- CWA y P-Alert/TREM según flujo disponible.
- BMKG TEWS.
- IPGP FDSN.
- NWS API.
- NOAA/NHC y NOAA radar.
- NOAA SWPC.
- PTWC/NTWC.
- GDACS.
- JMA/NMC/CMA para tifones.
- USGS y NASA EONET para volcanes.
- GeoBoundaries y TIGERweb/Census para límites.
- Meteo365 para el Centro Meteorológico LIVE.

Los nombres originales de epicentro de las agencias se conservan en la lista. La traducción al español se utiliza en paneles, telop y voz cuando corresponde.

---

## Privacidad y seguridad

- No contiene API keys privadas de Fan Studio.
- No requiere una cuenta de usuario para abrir el HTML.
- Las preferencias y cachés se guardan localmente en el navegador.
- Las consultas se realizan a los endpoints definidos en el archivo y a los proxies públicos o Workers configurados.
- No se deben añadir tokens, contraseñas o claves privadas directamente al HTML si el repositorio será público.
- Si se incorpora un Worker propio, la clave debe permanecer en el Worker y no en el navegador.

---

## Limitaciones conocidas

- La disponibilidad depende de CORS, TLS, proxies, límites de cada proveedor y conectividad.
- Una fuente puede tardar, bloquearse o cambiar su formato.
- Las equivalencias PGA/PGV de NIED marcadas con `≈` se derivan visualmente del color del frame y no son valores crudos.
- La detección local no sustituye un boletín oficial ni determina por sí sola un epicentro oficial.
- Los frentes P/S de TauP son cálculos teóricos, no waveform medido.
- Un polígono NWS solo se dibuja cuando el aviso entrega geometría o un área compatible; no se inventan límites por ciudad.
- El radar NOAA es una capa de reflectividad y no confirma por sí mismo una alerta.
- SIAT-CT se abre como visor oficial independiente y requiere actualizar desde su propia vista; esta edición no implementa una apertura automática de 15 segundos con zoom geográfico.
- GEOAU, IGC y CPPT no están integrados por falta de endpoints oficiales inequívocos en esta versión.
- El navegador puede bloquear autoplay de vídeo, sonido o voz hasta que el usuario interactúe.
- No se debe interpretar una caché antigua como información en vivo.

---

## Pruebas incorporadas

El archivo incluye una ruta opcional de simulación para revisar algunas vistas sin esperar a una alerta real. Se activa con el parámetro `eqTest` en la URL:

- `?eqTest=eew`
- `?eqTest=shindo`
- `?eqTest=tsunami`
- `?eqTest=solar`
- `?eqTest=civil`
- `?eqTest=all`

Estas simulaciones son visuales y no representan alertas reales.

---

## Licencia y atribuciones

La adaptación se distribuye bajo la **GNU Affero General Public License v3.0 (AGPL-3.0)**.

- Licencia original/adaptación: [`LICENSE`](LICENSE).
- Proyecto Kanameishi: <https://github.com/Lipomoea/kanameishi>.
- Licencia Kanameishi: <https://github.com/Lipomoea/kanameishi/blob/main/LICENSE>.
- El HTML completo es el código fuente de esta adaptación.
- Si publicas o sirves una versión modificada, conserva los avisos de copyright, la licencia y el acceso al código fuente correspondiente.
- El marcador PLUM adaptado del punto de SREV conserva su atribución CC BY-SA 2.0 a Kotoho7: <https://github.com/kotoho7/scratch-realtime-earthquake-viewer-page>.

Los datos y servicios externos mantienen sus propias condiciones, licencias y atribuciones. La licencia del HTML no sustituye las licencias de los datos de cada proveedor.

---

## Publicación recomendada en GitHub Pages

1. Sube `index.html` o renombra el HTML principal como `index.html`.
2. Sube `README.md` y `LICENSE`.
3. Conserva los avisos AGPL dentro del HTML y del repositorio.
4. Activa GitHub Pages desde la rama y carpeta elegidas.
5. Comprueba el monitor en una ventana privada y recarga la caché si el navegador muestra una versión anterior.
6. Verifica en el navegador los endpoints que necesiten CORS, TLS o Worker.

---

## Estado de esta edición

Esta edición conserva la separación entre catálogos oficiales, EEW y detección local; mantiene TauP y la detección NIED/TREM/P-Alert, y elimina por completo BMKG WRS. Las funciones descritas aquí corresponden al archivo `EarthQuake_Kanameishi_AGPL.html` que acompaña a este README.
