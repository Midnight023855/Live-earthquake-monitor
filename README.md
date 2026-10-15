# Monitor Sísmico Multi-Agencia (EarthQuake)

Monitor sísmico en un solo `index.html` (mapa Leaflet, alertas, estaciones, ondas, strong motion y más).

| | |
|--|--|
| **Archivo principal** | `index.html` (o el build más reciente entregado) |
| **Tamaño aproximado** | ~2,8–2,9 MB (HTML monolítico) |
| **Interfaz** | Español (textos mixtos EN/JA según fuente) |
| **Licencia del proyecto (derivados)** | **AGPL-3.0** (ver `LICENSE` y atribuciones) |

> **Aviso:** no sustituye boletines oficiales (JMA, USGS, PTWC, CWA, INGV, SINAPROC, etc.). Es una herramienta de visualización y agregación.

---

## Índice

1. [Mapa y sismos](#1-mapa-y-sismos)
2. [Fuentes / agencias](#2-fuentes--agencias)
3. [Alertas tempranas (EEW)](#3-alertas-tempranas-eew)
4. [Ondas P/S (TauP)](#4-ondas-ps-taup)
5. [Japón · NIED / movimiento](#5-japón--nied--movimiento)
6. [Strong motion e intensidad en mapa](#6-strong-motion-e-intensidad-en-mapa)
7. [Tsunami](#7-tsunami)
8. [Meteorología y otros peligros](#8-meteorología-y-otros-peligros)
9. [Taiwán](#9-taiwán)
10. [Audio, TTS y ticker](#10-audio-tts-y-ticker)
11. [Configuración e interfaz](#11-configuración-e-interfaz)
12. [Modos de mapa](#12-modos-de-mapa)
13. [Licencias y atribuciones](#13-licencias-y-atribuciones)
14. [Publicación (GitHub Pages)](#14-publicación-github-pages)

---

## 1. Mapa y sismos

- Mapa **Leaflet** a pantalla completa
- Lista multiagencia (filtro por magnitud, región, agencia)
- Tarjeta del sismo seleccionado (lugar, M, profundidad, tiempo, intensidad)
- Marcador de epicentro y zoom al evento (con control manual del usuario)
- Capas de intensidad (JMA, estimaciones, ShakeMap cuando aplica)
- Leyenda de intensidad configurable (Shindo, MMI, CSIS, CWA, GeoNet MMI…)
- Paleta de colores tipo **SesnaQuake / SREV** (Shindo y MMI)
- Búsqueda de sismos y ajustes de lista

---

## 2. Fuentes / agencias

El monitor agrega o muestra datos de (según feed activo), entre otras:

| Código | Notas |
|--------|--------|
| **USGS / NEIC** | Global, ShakeMap, productos ComCat |
| **JMA** | Japón: reportes, EEW, intensidad, tsunami, clima, volcanes |
| **NIED** | Estaciones Kyoshin / movimiento Japón |
| **EMSC** | Europa / global |
| **CENC / Wolfx** | China y EEW asociados |
| **CWA** | Taiwán (vía Worker del proyecto) |
| **GeoNet** | Nueva Zelanda + strong motion |
| **INGV** | Italia / EEW y shakedata |
| **BMKG, GFZ/GEOFON, ISC, IPGP, IGN, INETER, FUNVISIS, CSN, SSN, AFAD, BREQ, IGP, HKO, NOA, KOERI, PHIVOLCS, SED, Early-Est…** | Redes regionales |

Los **datos oficiales** siguen los términos de cada organismo.

---

## 3. Alertas tempranas (EEW)

- Panel **JMA EEW**
- EEW de otras vías cuando el evento está marcado (Wolfx, CENC, CWA, KMA, ShakeAlert, TREM, etc.)
- Banner estilo **EQuake / Sesna** en vista Japón: *No Earthquake Warning issued* / alerta activa
- Tarjeta estilo **INGV EEW** (MMI, lugar, hora, M, profundidad)
- Coordinación con vista de ondas TauP

---

## 4. Ondas P/S (TauP)

- Propagación estimada de ondas **P/S** en el mapa
- Asociación a EEW y sismos con datos suficientes
- La lógica de ondas se conserva aunque se haya retirado el panel UI antiguo “Fuentes Ondas P/S”

---

## 5. Japón · NIED / movimiento

- Estaciones **NIED K-NET / KiK-net**
- Métricas NIED (intensidad instrumental, PGA/PGV según configuración)
- Detección local de movimiento (grupos, prefecturas)
- Cuadros tipo EQuake: Weak / Shaking / Strong + prefecturas
- **Local Epicenter Estimation** (estimación local, no boletín oficial)
- Capas Yahoo·NIED / “Japón en vivo”
- KMONI (puede estar oculto en UI según build)

El cuadro de overlay Japón está orientado a **movimiento y EEW**, no a reportes finales de la lista.

---

## 6. Strong motion e intensidad en mapa

Capas independientes (panel **Intensidad / Strong Motion**):

| Capa | Origen | Contenido |
|------|--------|-----------|
| 🇳🇿 **GeoNet** | `api.geonet.org.nz` `/intensity/strong/processed/{publicID}` | Estaciones MMI, PGA (%g), PGV (cm/s) **medidos** |
| 🇺🇸 **USGS estaciones** | ShakeMap `stationlist.json` | `station_type: seismic` |
| 🇺🇸 **USGS macrosísmico** | Mismo producto | DYFI / `macroseismic` (no instrumental) |
| 🇺🇸 **Contornos MMI / PGA / PGV** | `cont_mmi.json`, `cont_pga.json`, `cont_pgv.json` | Geometrías oficiales del modelo ShakeMap |
| 🇹🇼 **CWA estaciones** | Worker `cwa-worker.terremotis123.workers.dev/cwa` | Intensidad, PGA (gal), PGV (kine), coordenadas |
| 🇮🇹 **INGV shakedata** | `webservices.ingv.it/ingvws/shakedata` `format=event_dat` | PGA/PGV (acc/vel API) por estación |

- Colores según intensidad cuando hay MMI
- Popup: agencia, estación, parámetros, **tipo de dato** (medido / macrosísmico / contorno modelo)
- Al cambiar de sismo se limpian o recargan las capas del evento
- GeoNet **no se sustituye** por las demás fuentes

---

## 7. Tsunami

- Panel de avisos / forecast (p. ej. JMA)
- Integración con cobertura tipo NHK en escenarios de alta intensidad Japón
- Fuentes tipo PTWC cuando el monitor las tiene cableadas

---

## 8. Meteorología y otros peligros

- **Tifones** (JMA / productos asociados)
- **Huracanes EE. UU.** (NOAA / NHC)
- **Alertas meteorológicas EE. UU.**
- **Clima / alertas JMA**
- **Volcanes JMA** y paneles de volcanes globales / Colombia (módulos)
- **GDACS** (desastres globales)
- **SIAT-CT México** (ciclones tropicales)

---

## 9. Taiwán

- Feed **CWA** (Worker)
- Métricas **TREM** / **P-Alert** según disponibilidad
- Vista de movimiento Taiwán

---

## 10. Audio, TTS y ticker

- **TTS** (lectura de alertas; voces configurables)
- Sonidos de interfaz / intensidad (SREV / kotoho7 según atribución)
- **Ticker** inferior con mensajes rotativos
- Respeto a `prefers-reduced-motion` en varias animaciones

---

## 11. Configuración e interfaz

- Modal de ajustes (magnitud mínima, métricas NIED, etc.)
- Panel de estado de conexiones por fuente
- Pantalla completa
- Reloj (estilo SesnaQuake) y contadores
- Tema oscuro, lista compacta, tipografías **Akshar** + **BIZ UDPGothic** + Roboto
- Telop JMA (japonés + español)
- Barra de acciones del mapa (inicio, TTS, ajustes…)

---

## 12. Modos de mapa

Clases frecuentes en `#mainLayout`:

| Modo | Uso |
|------|-----|
| `japan-focus` | NIED / Japón en vivo |
| `wave-focus` | Ondas TauP |
| `tsunami-focus` | Tsunami |
| `typhoon-focus` / `hurricane-focus` / `us-alerts-focus` | Meteo |
| `taiwan-focus` / `taiwan-motion-focus` | Taiwán |
| `jma-volcano-focus` / `jma-weather-focus` | Volcán / clima JMA |
| `gdacs-focus` / `siat-focus` | GDACS / SIAT-CT |
| `nhk-coverage-focus` | Cobertura alta intensidad Japón |

---

## 13. Licencias y atribuciones

### Este proyecto (partes derivadas)

**GNU Affero General Public License v3.0 (AGPL-3.0)**

Si publicas el monitor en red (p. ej. GitHub Pages), debes ofrecer el **código fuente** de esa versión.

### SesnaQuake

- https://github.com/Domiko7/SesnaQuake — **AGPL-3.0**
- Lista, colores de intensidad, tema/reloj, ideas de panel EEW

### Kanameishi

- https://github.com/Lipomoea/kanameishi — **AGPL-3.0**
- Patrones del ecosistema de monitores abiertos presentes en el HTML

### Datos y otros

| Recurso | Notas |
|---------|--------|
| **GeoNet / GNS Science** | API pública; política de datos GeoNet |
| **USGS ShakeMap** | Productos ComCat / ShakeMap |
| **CWA** | Open Government Data; acceso vía Worker del proyecto |
| **INGV** | FDSN / shakedata |
| **SREV / kotoho7** | Sonidos; ver meta en el HTML |
| **Leaflet** | Licencia propia de Leaflet |

Atribución corta sugerida:

```
Partes de UI: SesnaQuake (Domiko7) y Kanameishi (Lipomoea) — AGPL-3.0
Datos: JMA, NIED, USGS, GeoNet, CWA, INGV y demás agencias según sus términos
```

---

## 14. Publicación (GitHub Pages)

1. Sube `index.html`, este `README.md` y `LICENSE` (AGPL).
2. Activa GitHub Pages sobre la rama/carpeta del sitio.
3. Repo **público** con fuente accesible (AGPL en red).
4. No presentes estimaciones NIED/TauP/contornos de modelo como alertas oficiales.

---

## Estructura sugerida del repo

```
/
├── index.html      # Monitor completo
├── README.md       # Este archivo
└── LICENSE         # Texto AGPL-3.0
```

---

## Créditos

- **SesnaQuake** — Domiko7  
- **Kanameishi** — Lipomoea  
- **Mantenedores de este monitor**  
- **Agencias y redes** — solo como fuentes de datos  

*README orientado al HTML multiagencia actual (incl. strong motion GeoNet / USGS / CWA Worker / INGV). Octubre 2026.*
