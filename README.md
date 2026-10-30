# EarthQuake — Monitor sísmico multiagencia

Monitor sísmico web de una sola página HTML. Reúne reportes de sismos, alertas tempranas, observaciones instrumentales y alertas ambientales en un mapa interactivo. La interfaz y los avisos están preparados principalmente en español.

> **Importante:** el HTML contiene integraciones con servicios externos. La disponibilidad, la latencia y la cobertura dependen de cada proveedor, de la conexión a Internet, de CORS y de sus cambios de servicio. Que un proveedor figure aquí no garantiza que responda en todo momento. El monitor es informativo y **no sustituye los canales oficiales de emergencia**.

## Inicio

1. Descarga o abre el archivo HTML en un navegador moderno.
2. Conéctate a Internet para cargar mapas, catálogos, geometrías y datos en vivo.
3. Usa **Inicio** para volver al mapa principal. Abre **Ajustes** para configurar agencias, filtros, sonidos, voz, escalas e integraciones opcionales.

Es un HTML independiente: no requiere instalación de paquetes ni un proceso de compilación. Algunas funciones pueden estar sujetas a restricciones del navegador al abrir archivos locales; para uso continuado conviene servir el archivo desde un sitio HTTPS.

## Funciones

### Mapa y lista sísmica

- Mapa interactivo con estilos **SesnaQuake**, oscuro, satélite y terreno; también permite cambiar el color del mar.
- Lista y ficha del evento seleccionado con los datos que publique su fuente, como magnitud, hora, profundidad, ubicación e intensidad. Los campos ausentes se muestran como no disponibles, no se inventan.
- Filtros por agencia, magnitud mínima, región y eventos sentidos; control del zoom de selección de la lista.
- Capas de fallas/límites tectónicos PB2002, mapa de calor de sismicidad reciente y conteos/resúmenes cuando hay datos disponibles.
- Selección de escala de intensidad —la escala original de la agencia, Shindo, MMI, CSIS, CWA o GeoNet— cuando la fuente entrega información compatible. Las conversiones o estimaciones se distinguen de una medición oficial.
- Geometrías administrativas y capas de intensidad cargadas para contextualizar eventos, según la disponibilidad de los límites y datos de cada región.

### Agencias sísmicas y reportes

El HTML incluye integraciones o rutas de consulta para las agencias y redes listadas en el filtro: **USGS, NEIC, JMA, CENC, EMSC, IGN, INETER/CATAC, GEOFON/GFZ, SSN, AFAD, BMKG, GeoNet, INGV, IPGP, SED, PHIVOLCS, CSN, IG-EPN, Early-Est, HKO, VMGD, NOA, KOERI, SGC, KMA, BCSF, NRCan, USP, MMD, CEA-PR, ShakeAlert y FUNVISIS**.

La lista indica integraciones contempladas por el HTML, no un compromiso de disponibilidad ni que todas publiquen el mismo tipo de dato. Los avisos retransmitidos conservan la agencia de origen cuando se conoce; una red o retransmisor no se presenta como autoridad original.

### Alertas tempranas, ondas y reportes finales

- **JMA EEW**, incluidos mensajes de Wolfx, con revisión y estado del reporte; las cancelaciones se diferencian de los reportes finales.
- **CWA (Taiwán)** y otros canales EEW de **Wolfx All_EEW** integrados en el monitor, como CENC y varias regiones de China, de acuerdo con el tipo de mensaje recibido.
- Visualización de tarjetas EEW y frentes P/S estimados; las ondas estimadas se identifican como tales y no equivalen a una observación instrumental ni a una alerta oficial adicional.
- Recuperación de reportes recientes bajo las ventanas temporales configuradas por el código, sin tratar un mensaje cancelado como alerta activa.
- Ticker inferior para reportes sísmicos y avisos prioritarios, con umbral de magnitud configurable.

### Japón: JMA y estaciones NIED/Kyoshin

- Vista de **estaciones de Japón** con intensidades instrumentales de Kyoshin Monitor/Yahoo y NIED K-NET/KiK-net, según la fuente seleccionada en Ajustes.
- Detección local de movimiento a partir de lecturas recientes y estaciones coherentes. Puede abrir y cerrar automáticamente la vista de Japón según movimiento/reposo confirmado; una trama ausente o un feed caído no se interpreta por sí solo como reposo.
- Selección de fuentes Yahoo, NIED oficial, K-NET, KiK-net o combinada cuando estén disponibles. Hi-net y F-net se identifican como catálogos sin telemetría en vivo en esta vista.
- Selector de intensidad o de PGA/PGV aproximados a partir de imágenes cuando corresponda. Los valores aproximados no son datos crudos; no se estima PGD.
- EEW e informes JMA pueden mostrarse junto con la visualización de estaciones. La intensidad oficial de un sismo seleccionado procede del boletín/estaciones JMA correspondientes, no de puntos de catálogo ajenos al evento.
- Opciones TauP para cálculo preciso, rápido o de respaldo.

### Taiwán y otras estaciones

- Integración de **TREM** y **P-Alert** para movimiento instrumental taiwanés y métricas de PGA/PGV cuando el feed las proporciona.
- La detección local de movimiento en estaciones es distinta de un EEW oficial. PGA/PGV no se convierten en Shindo ni en intensidad oficial.
- Visualización de estaciones GeoNet y reportes sentidos asociados al evento seleccionado, con opción de intensidad MMI, PGA o PGV cuando la API correspondiente los entrega.
- Estaciones de la Red Sismológica Nacional de Costa Rica (RSN/TC) y OVSICORI (OV) mediante muestras EarthScope con retraso. Esta telemetría experimental no es una alerta temprana ni una medida oficial de intensidad.

### Tsunami, clima y alertas de protección civil

- Apartado de tsunami con boletines JMA y NOAA/PTWC/NTWC y sus áreas oficiales disponibles.
- Alertas meteorológicas de Japón (JMA), avisos meteorológicos de Estados Unidos (NWS/NOAA) y mapa de condados cuando la fuente publica geometría utilizable.
- Alertas globales GDACS.
- Tifones de Japón y otras fuentes integradas; huracanes de Estados Unidos/NHC con trayectorias/capas disponibles.
- Avisos volcánicos oficiales JMA y catálogo/alertas volcánicas mundiales basados en fuentes de observación incluidas en el código.
- Alertas SIAT-CT de México y avisos de volcanes/tsunami de Colombia y el Caribe, incluidos datos SGC y PTWC/NTWC según el apartado.
- Centro de alertas y ticker para avisos ambientales, de riesgo y de servicio incluidos en la página.

Los apartados prioritarios pueden abrirse automáticamente al detectarse novedades y regresar después al mapa sísmico. El comportamiento depende de la novedad y vigencia que pueda establecer el feed; no todos los avisos se repiten ni se consideran una confirmación independiente.

### Colombia, movilidad e información complementaria

- Apartado de movilidad de Bogotá con panel de avisos y mapas; botones para abrir Waze y consultar el estado de vías nacionales INVÍAS cuando el servicio esté disponible.
- Ticker con avisos de movilidad, servicios, clima y otras fuentes incluidas en el HTML.
- Módulo de partidos de Colombia con ventanas de partido, marcador cuando exista una fuente compatible y efectos/avisos configurables. Un marcador se limita a los datos disponibles en el feed.
- Capas meteorológicas integradas o enlazadas —lluvia, temperatura, viento, rayos, incendios, satélite y oleaje— con disponibilidad variable según el proveedor. El mapa de rayos Blitzortung puede abrirse en un panel independiente.
- Vista de clima por capitales y búsqueda de ubicación en el módulo meteorológico.

## Ajustes

Desde **Ajustes** se pueden modificar, entre otras opciones visibles en el HTML:

- agencias sísmicas habilitadas, magnitud mínima de lista y ticker, región, filtro de sismos sentidos y zoom;
- estilo del mapa, escala de intensidad y opciones TauP;
- fuente de estaciones de Japón, detección local Yahoo/NIED y métricas NIED, TREM y P-Alert;
- capas de GeoNet, estaciones costarricenses y puntos oficiales JMA del sismo seleccionado;
- voz TTS en español, volumen general, sonidos y notificaciones del navegador;
- fallas tectónicas, capas meteorológicas, avisos y efectos de goles de Colombia.

Los nombres y opciones que aparecen dependen de la versión del HTML. Los cambios se guardan en el almacenamiento local del navegador.

## Datos, precisión y limitaciones

- **Catálogo no es telemetría:** que exista la ubicación de una estación no significa que esté conectada. La vista de estaciones requiere datos recientes válidos para mostrar lecturas vivas.
- **Medido, estimado y oficial son cosas distintas:** una estimación basada en estaciones, una conversión de escala o una lectura aproximada de una imagen se etiqueta como tal y no sustituye el boletín de la agencia.
- **Sin datos no significa cero:** el monitor no debe interpretar un campo vacío, una conexión caída o una respuesta tardía como magnitud cero, reposo confirmado o estación desconectada.
- **Los tiempos de actualización y cobertura varían** por producto, red y proveedor. Una función puede permanecer visible aunque la fuente esté temporalmente fuera de servicio.
- Las capas de mapa, límites, iconos, audio y datos pueden estar sujetas a condiciones y licencias de sus proveedores.

## Créditos y licencias

La interfaz incluye atribuciones y avisos de licencia en el propio HTML. Entre las adaptaciones y recursos identificados allí están componentes de **SesnaQuake** (Domiko7) y **Kanameishi** (Lipomoea), bajo **AGPL-3.0**, además de recursos de audio y símbolos SREV/Kotoho7 bajo **CC BY-SA 2.0**. El HTML incluye código fuente correspondiente de las adaptaciones indicadas y una copia de la licencia AGPL para Kanameishi. GeoNet, JMA, EOX Sentinel-2 y otros proveedores conservan sus atribuciones respectivas.

Antes de redistribuir o publicar una versión modificada, revisa las licencias, los avisos incluidos en el HTML y las condiciones vigentes de cada proveedor de datos y recurso.
