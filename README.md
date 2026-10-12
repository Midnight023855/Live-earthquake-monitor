# Monitor Sísmico Multi-Agencia (EarthQuake / Live Earthquake Monitor)

Monitor sísmico en un solo `index.html` (mapa Leaflet, alertas, estaciones, ondas y más).

- **Archivo principal:** `index.html`
- **Idioma de interfaz:** español (con textos mixtos EN/JA según fuente)
- **Licencia del proyecto (derivados):** **AGPL-3.0** (ver sección de licencias)

> **Aviso:** no sustituye boletines oficiales (JMA, USGS, PTWC, SINAPROC, etc.). Es una herramienta de visualización y agregación.

---

## Índice

1. [Funciones principales](#funciones-principales)
2. [Fuentes de datos / agencias](#fuentes-de-datos--agencias)
3. [Apartados y modos de mapa](#apartados-y-modos-de-mapa)
4. [Detección y ondas](#detección-y-ondas)
5. [Interfaz y UX](#interfaz-y-ux)
6. [Licencias y atribuciones](#licencias-y-atribuciones)
7. [Publicación (GitHub Pages)](#publicación-github-pages)
8. [Créditos](#créditos)

---

## Funciones principales

### Mapa y sismos
- Mapa interactivo **Leaflet** a pantalla completa
- Lista de sismos recientes multiagencia (filtro por magnitud, región, agencia)
- Tarjeta del sismo seleccionado (lugar, magnitud, profundidad, tiempo, intensidad)
- Marcador de epicentro (icono en X)
- Zoom automático al último sismo / alerta (con overrides de control manual del usuario)
- Capas de intensidad (zonas JMA oficiales, estimaciones, ShakeMap USGS cuando aplica)
- Leyenda de intensidad configurable (Shindo, MMI, CSIS, CWA, etc.)
- Paleta de colores de intensidad tipo **SesnaQuake / SREV** (Shindo y MMI)

### Alertas tempranas (EEW)
- Panel **JMA EEW** (alerta temprana Japón)
- Integración de EEW de otras vías cuando el evento viene marcado como EEW (p. ej. Wolfx, CENC, CWA, KMA, ShakeAlert, TREM, etc.)
- Cuadro de estado EEW en el **mapa de Japón** (estilo EQuake):
  - Inactivo: *No Earthquake Warning issued*
  - Activo: título del alerta + informe
- Tarjeta estilo **INGV EEW** (MMI, lugar, hora, M, profundidad) cuando hay evento INGV relevante
- Coordinación con vista de **ondas TauP** (no pierde el EEW al abrir otros apartados un momento)

### Ondas sísmicas (TauP)
- Propagación estimada de ondas **P/S** sobre el mapa
- Modo ondas asociado a EEW y a sismos con datos suficientes
- No depende del panel antiguo “Fuentes Ondas P/S” si fue retirado de la UI; la lógica de ondas se conserva

### Japón · estaciones NIED / movimiento
- Estaciones **NIED K-NET / KiK-net** (feed / visualización)
- Métricas NIED (intensidad instrumental, PGA/PGV aproximados según configuración)
- Detección local de movimiento (quórum de estaciones, grupos, prefecturas)
- Cuadros tipo EQuake al detectar movimiento:
  - **Weak shaking detected** (intensidad ~0) — verde
  - **Shaking detected** (1–3) — amarillo
  - **Strong shaking detected** (4–7) — rojo
  - Lista de **prefecturas** afectadas
- **Local Epicenter Estimation** (estimación local No.N, intensidad, M, profundidad, hora)
- Panel / capas asociadas a Yahoo·NIED y modo “Japón en vivo”
- Visor **KMONI** (si está habilitado en la build; puede estar oculto en UI)

### Tsunami
- Panel de avisos / forecast de tsunami (p. ej. JMA)
- Líneas de costa / regiones de forecast cuando hay datos
- Integración con cobertura tipo NHK en escenarios de Japón de alta intensidad

### Meteorología y otros peligros
- **Tifones** (datos JMA / NMC / CMA según la build)
- **Huracanes EE. UU.** (NOAA / NHC)
- **Alertas meteorológicas EE. UU.**
- **Clima JMA** / alertas meteorológicas Japón
- **Volcanes JMA**
- **GDACS** (desastres globales, panel dedicado)
- **SIAT-CT México** (ciclones tropicales): overlay / consulta de boletín oficial

### Taiwán
- Detector / movimiento Taiwán
- Métricas **TREM** y **P-Alert** (según disponibilidad; P-Alert puede figurar desconectado)

### Audio y accesibilidad
- **TTS** (lectura de alertas; voces configurables)
- Sonidos de interfaz y de intensidad (recursos SREV / kotoho7 según atribución del HTML)
- Barra informativa inferior (**ticker**) con mensajes rotativos
- Preferencia `prefers-reduced-motion` en varias animaciones

### Configuración
- Modal de ajustes (magnitud mínima de lista/ticker, métricas NIED/P-Alert, coincidencias Colombia, etc.)
- Conexiones por fuente (panel de estado: conectada / desconectada)
- Pantalla completa
- Reloj local (estilo SesnaQuake) + contador de sismos del día

### Presentación / estilo
- Tema de interfaz inspirado en **SesnaQuake** (grises, paneles, reloj)
- Lista de sismos compacta (badge de intensidad, lugar, hora, agencia, magnitud)
- Tipografía **Akshar** + **BIZ UDPGothic** + Roboto
- Banner telop JMA (japonés + español) en escenarios correspondientes

---

## Fuentes de datos / agencias

El HTML agrega o muestra datos de (entre otras, según feed activo):

| Código | Notas típicas |
|--------|----------------|
| **USGS / NEIC** | Sismos globales, ShakeMap |
| **JMA** | Japón: reportes, EEW, intensidad, tsunami, clima, volcanes |
| **NIED** | Estaciones Kyoshin / movimiento Japón |
| **EMSC** | Europa / global |
| **CENC / Wolfx / NowQuake** | China y EEW asociados |
| **CWA / TREM / P-Alert** | Taiwán |
| **KMA** | Corea (si feed activo) |
| **ShakeAlert** | EE. UU. (EEW) |
| **INGV** | Italia / EEW estilo tarjeta |
| **BMKG** | Indonesia |
| **GeoNet** | Nueva Zelanda |
| **GFZ / GEOFON, ISC, IPGP, IGN, INETER, FUNVISIS, CSN, SSN, AFAD, BREQ, IGP, HKO, NOA, CEA…** | Otras redes regionales |

Los **datos oficiales** siguen los términos de cada organismo. Este proyecto **no** reclama propiedad sobre esos datos.

---

## Apartados y modos de mapa

Clases / modos frecuentes en `#mainLayout`:

- Vista lista + mapa global
- `japan-focus` — estaciones / NIED Japón
- `wave-focus` — ondas TauP
- `tsunami-focus`
- `typhoon-focus` / `hurricane-focus` / `us-alerts-focus`
- `taiwan-focus` / `taiwan-motion-focus`
- `jma-volcano-focus` / `jma-weather-focus`
- `gdacs-focus` / `siat-focus`
- `nhk-coverage-focus` — cobertura tipo alta intensidad Japón

Cada apartado suele ocultar paneles ajenos para no saturar la UI.

---

## Detección y ondas

1. **EEW oficial o de feed** → panel JMA / banner EEW / ondas.
2. **Movimiento NIED** (sin EEW) → cuadros Weak/Shaking/Strong + prefecturas + estimación local.
3. **Sismo confirmado en lista** → tarjeta, intensidad, zoom, capas.
4. **Tsunami / meteo / SIAT** → paneles propios con temporizadores o cierre al volver.

La detección local **no es un epicentro oficial JMA**.

---

## Interfaz y UX

- Panel izquierdo: evento actual + lista
- Mapa: capas, alertas flotantes, estaciones
- Barra de acciones (inicio, TTS, ajustes…)
- Ticker inferior
- Panel de conexiones API
- Diseño pensado para escritorio; en móvil hay reglas responsive (no se garantiza paridad total sin prueba en dispositivo)

---

## Licencias y atribuciones

### Licencia de este proyecto (partes derivadas)

**GNU Affero General Public License v3.0 (AGPL-3.0)**

Si modificas y publicas el monitor en una red (p. ej. **GitHub Pages**), debes ofrecer el **código fuente** de esa versión a los usuarios.

Texto: https://www.gnu.org/licenses/agpl-3.0.html

### SesnaQuake

| | |
|--|--|
| **Repo** | https://github.com/Domiko7/SesnaQuake |
| **Licencia** | AGPL-3.0 |
| **Autor** | Domiko / Domiko7 |

**Adaptado aquí (no es un fork completo de la app Tauri+React):**
- Estilo de lista e intensidades
- Colores Shindo/MMI (`transform.ts`)
- Tema de UI y reloj
- Concepto de panel EEW inactivo / activo
- Ideas de presentación de sacudida local

### Kanameishi

| | |
|--|--|
| **Repo** | https://github.com/Lipomoea/kanameishi |
| **Licencia** | AGPL-3.0 |
| **Upstream** | Web Vue + Leaflet para alertas y datos sísmicos vía APIs públicas |

**En este HTML:** patrones / piezas del ecosistema de monitores abiertos y cualquier lógica o UI relacionada con Kanameishi presente en el archivo. Mantener AGPL y este README al redistribuir.

### Otros

| Recurso | Notas |
|---------|--------|
| **SREV / kotoho7** | Sonidos / intensidad; ver meta `srev-audio-attribution` en el HTML (p. ej. CC BY-SA 2.0 según origen) |
| **Leaflet** | Licencia propia de Leaflet |
| **Fuentes sísmicas oficiales** | Términos de JMA, NIED, USGS, etc. |

### Atribución corta (pie de página / Acerca de)

```
Partes de interfaz y presentación adaptadas de:
• SesnaQuake (Domiko7) — AGPL-3.0 — https://github.com/Domiko7/SesnaQuake
• Kanameishi (Lipomoea) — AGPL-3.0 — https://github.com/Lipomoea/kanameishi

```

## Créditos

- **SesnaQuake** — Domiko7  
- **Kanameishi** — Lipomoea  
- **Autores del monitor** — mantenedores de este repositorio  
- **Agencias y redes** — únicamente como fuentes de datos  

---

## Estructura sugerida del repo

```
/
├── index.html      # Monitor completo
├── README.md       # Este archivo
└── LICENSE         # Texto AGPL-3.0 (recomendado)
```

---

*README generado para documentar funciones del HTML actual y obligaciones de licencia. Octubre 2026.*
