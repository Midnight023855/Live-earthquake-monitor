# EarthQuake — Monitor sísmico multiagencia

README de la edición global `index.html`, en español. Describe las funciones presentes en esta versión del HTML; no corresponde a la edición separada Japón–Taiwán.

**Actualizado:** 11 de octubre de 2026  
**Formato:** aplicación de una sola página HTML, adaptable a escritorio y móvil.

## Qué hace

Reúne catálogos sísmicos, alertas tempranas, señales de redes de estaciones y avisos de protección civil en una interfaz cartográfica. Mantiene separados los eventos sísmicos confirmados, las alertas tempranas y la detección instrumental local. El mapa, la lista y los paneles especiales se actualizan mientras la página está abierta y hay conexión con las fuentes.

## Funciones

### Catálogo de sismos

- Integra eventos de **USGS/NEIC**, **JMA** (catálogo Wolfx y productos XML oficiales), **CENC** (flujos NowQuake/Wolfx), **CSN**, **IG-EPN**, **IGP Perú**, **ISC**, **EMSC**, **IGN**, **INETER/CATAC**, **FUNVISIS**, **GFZ**, **BREQ**, **AFAD**, **BMKG**, **GeoNet**, **INGV**, **IPGP**, **SSN México**, **SED**, **PHIVOLCS**, **CWA Taiwán**, **Early-Est**, **HKO**, **NOA**, **KOERI** y eventos sísmicos de **GDACS**.
- Consulta las fuentes del catálogo en ciclos regulares —la actualización general de la lista está programada cada 2 segundos— y usa conexiones persistentes para los flujos que las ofrecen. La frecuencia real también depende de cada proveedor y de su disponibilidad.
- Normaliza magnitud, hora, coordenadas, profundidad, lugar, intensidad y agencia cuando esos datos existen. Conserva los faltantes como faltantes.
- Consolida duplicados y revisiones del mismo evento, conserva reportes más completos y usa caché/últimos datos válidos si una fuente falla temporalmente.
- Presenta el evento seleccionado con epicentro, magnitud, hora, profundidad, intensidad, estado de tsunami y, cuando hay uno disponible, enlace al boletín oficial. Las horas se muestran en hora de Colombia.
- Permite filtrar por magnitud, agencia, región y sismos sentidos, ocultar agencias de la lista sin desconectar sus fuentes y elegir la magnitud mínima del ticker.

**JMA y CWA:** JMA aporta catálogo y productos oficiales de intensidad; CWA aporta informes sísmicos normales de Taiwán. Esta versión no usa CWA como fuente de EEW en vivo.

### Mapa e intensidad

- Mapa Leaflet con epicentros, capas de alertas, límites administrativos y capas de intensidad disponibles para cada evento.
- Leyendas por escala; admite las escalas nativas de las agencias y permite elegir Shindo, MMI, CSIS (China), CWA o GeoNet MMI (Nueva Zelanda) cuando corresponde.
- Las conversiones que no son el dato oficial de la fuente se marcan con **≈** y se presentan como estimaciones.
- Incluye capas de intensidad oficial JMA, informes de intensidad de Taiwán y ShakeMap de USGS cuando el producto del evento está disponible; dibuja áreas detalladas cuando la fuente entrega geometría.
- Muestra un mapa de calor de sismos de las últimas 24 horas y permite activar las líneas de fallas PB2002.
- La vista se enfoca en eventos y alertas relevantes; el control manual del mapa se respeta al restaurar vistas temporales.

### Alertas tempranas y ondas

- Panel de **JMA EEW**, con recepción en tiempo real por WebSocket Wolfx y consulta HTTP de respaldo/recuperación.
- Calcula y anima frentes P/S mediante TauP, con modos **Preciso**, **Rápido** y **Respaldo**. Son frentes calculados, no posiciones ni reportes oficiales de la agencia.
- Mantiene las alertas tempranas separadas del catálogo de sismos confirmados; las actualizaciones y los reportes de intensidad se relacionan con el evento cuando hay coincidencia.
- La vista especial de cobertura **NHK G** se activa para sismos JMA en Japón con intensidad Shindo 5− o superior. Tiene pantalla completa, cierre y opción para reactivarla; el navegador puede requerir una acción para permitir reproducir el video.

### Estaciones y detección de movimiento

- **Japón — Kyoshin/NIED:** visualiza movimiento de K-NET y KiK-net y permite escoger Yahoo/Kyoshin CDN, NIED oficial o combinaciones disponibles. El mapa de estaciones usa colores de intensidad estilo Shindo.
- Las vistas de Hi-net y F-net que ofrece el selector son de catálogo; no representan telemetría en vivo.
- El panel NIED puede mostrar intensidad y modos PGA/PGV aproximados a partir de colores de imagen, identificados como estimaciones (≈), no como mediciones crudas.
- **Taiwán — TREM y P-Alert:** paneles separados con estado de red, estaciones/movimientos detectados y máximos de intensidad, PGA y PGV; PGD solo se muestra si lo entrega la fuente. La detección de movimiento puede abrir la vista local automáticamente.
- Incluye una vista de estaciones en vivo del Mar de Japón.
- Los paneles de métricas TREM, P-Alert y NIED se pueden mostrar u ocultar desde Ajustes.

### Paneles de alertas

| Panel | Función documentada en esta edición |
|---|---|
| Tsunami | Agrupa avisos JMA y NOAA/PTWC/NTWC, traduce la información al español y representa alertas/zonas disponibles en el mapa. Incluye niveles y avisos sonoros. |
| Meteorología de Japón | Lee avisos oficiales JMA, muestra las áreas y niveles publicados, traduce el contenido y puede priorizar temporalmente esa vista. |
| Alertas de EE. UU. | Muestra avisos oficiales NWS y ofrece una capa de radar NOAA activable. |
| Tifones | Presenta sistemas y trayectorias observadas/pronosticadas de JMA y fuentes meteorológicas de China (NMC/CMA). |
| Huracanes de EE. UU. | Presenta ciclones y productos de seguimiento/cone del NOAA/NHC. |
| GDACS | Panel y mapa de alertas internacionales de desastres, con nivel, tipo y detalles disponibles; también aporta eventos sísmicos al catálogo. |
| Volcanes | Incluye boletines y catálogo oficial de volcanes JMA, además de observaciones volcánicas globales de USGS y NASA EONET. |
| Clima espacial y protección civil | Alerta sobre productos NOAA SWPC y novedades globales de GDACS; el panel y el ticker se activan ante novedades detectadas. |
| SIAT-CT México | Incluye el visor oficial y, con el Worker compatible, las zonas oficiales de ciclones tropicales sobre el mapa principal. |

### SIAT-CT México

- El panel independiente incrusta la [consulta oficial SIAT-CT](https://preparados.gob.mx/SIAT-CT/consulta.php?evento=actual) y ofrece abrir la fuente en otra pestaña, actualizar y cerrar el visor.
- El mapa consulta un Worker para obtener los metadatos del boletín y la geometría oficial de SIAT-CT.
- Dibuja las zonas con los cinco niveles oficiales **ROJA, NARANJA, AMARILLA, VERDE y AZUL**, leyenda dinámica y popups con fase, entidad, municipio asociado y región SIAT oficial.
- Los polígonos representan las regiones oficiales SIAT; el municipio indicado en el popup no significa que se hayan inventado límites municipales para el mapa.
- Un boletín nuevo enfoca temporalmente la zona durante 15 segundos y luego intenta restaurar la vista previa; si la persona mueve el mapa manualmente, no fuerza el retorno.
- **Dependencia:** el Worker debe estar disponible para cargar el overlay y sus datos. El visor oficial incrustado tiene su propio botón para abrirse directamente si el iframe no carga.

### Clima, noticias y fútbol de Colombia

- La lista meteorológica puede mostrar capitales del mundo y buscar ciudades o zonas al pulsar **Enter**. Presenta temperatura, descripción del tiempo y viento; al seleccionar un resultado centra el mapa en esa ubicación.
- Centro meteorológico con capas de lluvia, temperatura, viento, rayos, incendios, satélite y oleaje; permite abrir el mapa externo si el proveedor no admite la vista incrustada.
- Ticker con hasta cinco noticias mundiales y cinco de Colombia, tomadas de RSS y renovadas cada hora, con respaldo de caché.
- Widget de partidos de Colombia con marcador/estado cuando el proveedor ofrece esos datos, avisos de gol, descanso y final, y efecto opcional de lluvia de balones.
- Puede consultar fixtures de futsal publicados por la FCF; esos fixtures no se tratan como marcador en vivo fiable. Los goleadores y minutos solo se muestran si la fuente los proporciona.

### Ticker, audio y Ajustes

- Ticker inferior para novedades sísmicas, avisos, volcanes, noticias y estado de partidos; el umbral de magnitud del ticker es configurable. También hay una rotación periódica de datos breves.
- Sonidos de interfaz y alertas SREV, voz TTS en español con selección/prueba de voz, cola de avisos y pruebas desde Ajustes.
- Control de volumen general de **0 a 100 %** para sonidos y voz; las preferencias se guardan en el navegador.
- Ajustes para modelo TauP, escala de intensidad, color del mar, filtros, agencias visibles, paneles de métricas y opciones de fútbol.
- Notificaciones del navegador disponibles con activación explícita por la persona usuaria; el permiso se solicita al habilitarlas.
- Modo automático opcional: tras 30 segundos sin interacción puede rotar por apartados; las alertas prioritarias interrumpen la rotación y luego permiten continuar.
- Botón de pantalla completa, reloj en hora de Colombia y contador de sismos del día.

## Datos, dependencias y límites

- Requiere conexión a Internet: consulta servicios externos y carga Leaflet, mapas, feeds, capas, iframe y datos de estaciones. Una caída, bloqueo CORS o cambio en un servicio puede dejar un módulo sin datos, aunque otros sigan funcionando.
- Algunas fuentes usan caché o respaldo; el panel de conexiones permite distinguir estados de las API. Que una estación aparezca en un catálogo no significa que su telemetría esté conectada.
- Las lecturas calculadas o derivadas se distinguen de los valores oficiales; la ausencia de un dato no se reemplaza por una cifra inventada.
- La base cartográfica utiliza Leaflet 1.9.4 y servicios externos de mapas. Las preferencias de la interfaz se guardan en `localStorage` del navegador.

## Licencias y atribución

- El HTML incorpora el texto de la **GNU Affero General Public License v3.0 (AGPL-3.0)**. Conserva los avisos de licencia al modificar o distribuir el archivo.
- Los sonidos y el marcador PLUM atribuidos a SREV/Kotoho7 se indican bajo **CC BY-SA 2.0**. Proyecto y atribución: [Scratch Realtime Earthquake Viewer](https://github.com/kotoho7/scratch-realtime-earthquake-viewer-page).
- Las fuentes sísmicas, meteorológicas y cartográficas mantienen sus propias condiciones de uso y atribución.
