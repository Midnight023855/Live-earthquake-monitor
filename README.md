# EarthQuake — adaptación de Kanameishi

Este archivo acompaña a `EarthQuake_Kanameishi_AGPL.html`, una versión modificada del monitor que incorpora una adaptación de la detección local de movimiento por estaciones de [Kanameishi](https://github.com/Lipomoea/kanameishi).

## Qué incluye

- Detección de movimiento NIED/Kyoshin reutilizando el feed Yahoo/Kyoshin que ya carga el monitor.
- Sensibilidad configurable desde los ajustes.
- Representación de celdas y agrupaciones de estaciones como movimiento local.
- KMA-PEWS no está integrado en esta edición; no solicita ni contiene una API Key de Fan Studio.

La detección local **no es una alerta EEW oficial** y no determina por sí sola un epicentro oficial, Shindo oficial ni frentes P/S.

## Atribución y licencia

La adaptación de Kanameishi se distribuye bajo la **GNU Affero General Public License, versión 3 (AGPL-3.0)**. El texto completo está en el archivo `LICENSE` y también dentro del HTML. Consulta el [proyecto original](https://github.com/Lipomoea/kanameishi) y su [licencia](https://github.com/Lipomoea/kanameishi/blob/main/LICENSE); conserva sus avisos de copyright y licencia.

El HTML modificado es el código fuente de esta adaptación. Si lo publicas o lo sirves por una web, mantén disponible el archivo fuente completo y esta licencia para quienes lo usen. Antes de combinarlo con un repositorio que tenga otra licencia, revisa la compatibilidad y no sustituyas una licencia existente sin comprobarlo.
