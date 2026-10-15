# Agenda Inteligente

**Una agenda personal instalable (PWA), con recordatorios push y un asistente personal por voz.**

Agenda Inteligente es un proyecto propio de **Cristina Voda**, desarrolladora web y creadora de páginas web personalizadas. Reúne la planificación diaria, las tareas y la organización personal en una interfaz sencilla, con datos en la nube y recordatorios que pueden llegar aunque la aplicación no esté abierta.

<p align="center">
  <a href="https://agenda-pa.netlify.app/"><strong>▶ Abrir Agenda Inteligente</strong></a>
  &nbsp;·&nbsp;
  <a href="https://paginaswebpersonalizadas.es/">Web profesional</a>
  &nbsp;·&nbsp;
  <a href="https://portfolio-developer-web-cristinavoda.netlify.app/proyectos">Portfolio de proyectos</a>
</p>

## Sobre el proyecto

Agenda Inteligente combina una experiencia de usuario minimalista con servicios web y capacidades de asistencia por voz. Su objetivo de diseño es facilitar la organización cotidiana sin exigir una gran experiencia digital.

### Funcionalidades principales

- **Agenda y calendario:** planificación y consulta de eventos.
- **Tareas y notas:** organización de información personal.
- **Lista de la compra:** creación, edición, marcado y eliminación de productos.
- **Generación de listas con IA:** creación de propuestas de compra a partir de texto mediante un módulo propio.
- **PA, asistente personal:** motor extensible de intenciones (`executeIntent`) que conecta peticiones con acciones de la aplicación, navegación y respuestas habladas.
- **Interacción por voz:** síntesis de voz para comunicar acciones y resultados, según las capacidades del navegador.
- **Recordatorios push:** funciones programadas en Netlify, Firebase Cloud Messaging y Service Worker.
- **PWA instalable:** acceso desde dispositivos compatibles como aplicación web progresiva.
- **Cuentas de usuario:** registro e inicio de sesión con Firebase Authentication.
- **Persistencia en la nube:** Cloud Firestore con reglas de seguridad que vinculan documentos personales al usuario autenticado.

## Tecnologías

| Área | Tecnologías |
|---|---|
| Interfaz | Vue 3, JavaScript, Vite |
| Estado y navegación | Pinia, Vue Router |
| Autenticación y datos | Firebase Authentication, Cloud Firestore |
| Notificaciones | Firebase Cloud Messaging, Service Worker |
| Backend serverless | Netlify Functions, Firebase Admin SDK |
| PWA | `vite-plugin-pwa` con estrategia `injectManifest` |
| Voz | Web Speech API, cuando está disponible en el navegador |

## Arquitectura

```text
Usuario
  └─ Interfaz Vue 3
      ├─ Agenda, calendario, tareas, notas y lista de la compra
      ├─ PA: motor de intenciones y ejecución de acciones
      └─ Firebase Authentication + Cloud Firestore

Recordatorios
  └─ Netlify Scheduled Function
      └─ Firebase Admin SDK
          └─ Firebase Cloud Messaging
              └─ Service Worker
                  └─ Notificación del dispositivo
```

El motor `executeIntent()` separa la ejecución de acciones de los componentes visuales. Esta separación permite ampliar PA progresivamente y mantener la lógica de la aplicación organizada. La capa de interpretación de lenguaje y las capacidades avanzadas de análisis pueden evolucionar de forma independiente del motor de ejecución.

## Ejecutar en local

### Requisitos

- Node.js y npm.
- Un proyecto de Firebase con Authentication y Cloud Firestore configurados.
- Netlify CLI y un sitio de Netlify para trabajar con las funciones serverless y los recordatorios.

### Instalación

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

Vite genera los archivos estáticos en `dist/`. El proyecto utiliza un Service Worker personalizado en `src/sw.js`; mantén la configuración de `vite-plugin-pwa` alineada con la estrategia `injectManifest`.

## Configuración de Firebase y Netlify

La configuración cliente de Firebase se encuentra en el módulo de inicialización que utiliza la aplicación (por ejemplo, `src/firebase.js`). Al desplegar una instancia propia, configura allí los valores de tu proyecto Firebase.

La función de recordatorios utiliza estas variables de entorno en el entorno de funciones de Netlify:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

`FIREBASE_CLIENT_EMAIL` y, especialmente, `FIREBASE_PRIVATE_KEY` son credenciales del servidor. Deben mantenerse en variables de entorno seguras y utilizarse exclusivamente desde funciones de servidor. **No deben importarse en el bundle del frontend, publicarse en GitHub ni compartirse en incidencias o mensajes.** No utilices el prefijo `VITE_` para credenciales de Firebase Admin.

Para permitir nuevos registros, debe estar habilitado el proveedor de autenticación correspondiente en Firebase Authentication. Las reglas de Firestore deben conservar el aislamiento por UID y revisarse junto con el modelo de datos antes de cada despliegue.

## Despliegue en Netlify

El proyecto puede compilarse con `npm run build`, publicar `dist/` y empaquetar las funciones de `netlify/functions/`.

Desde una terminal con Netlify CLI autenticada y vinculada al sitio correcto:

```bash
npm run build
netlify deploy --prod --dir=dist --functions=netlify/functions
```

Este comando actualiza el sitio de producción. Después de modificar funciones o variables de entorno, revisa los registros de las funciones. La entrega de notificaciones depende de los permisos del dispositivo, la conectividad y el soporte del navegador; el comportamiento puede variar entre plataformas.

## Seguridad y datos

- Los datos personales deben vincularse al UID del usuario autenticado.
- Las reglas de Firestore deben permitir a cada usuario acceder únicamente a sus propios documentos.
- Las credenciales de Firebase Admin deben permanecer en el servidor.
- Conserva y revisa las reglas existentes antes de desplegar cambios para no bloquear colecciones utilizadas por la aplicación.
- No incluyas archivos `.env`, exportaciones de usuarios, claves de cuentas de servicio ni otros artefactos sensibles en Git.

## Evolución del proyecto

Agenda Inteligente es un proyecto en desarrollo continuo. Entre las líneas de evolución se encuentran la ampliación del asistente PA, el análisis contextual de hábitos, las sugerencias útiles y el perfeccionamiento de la experiencia de notificaciones en dispositivos móviles.

## Autora

**Cristina Voda — Desarrolladora web y creadora de páginas web personalizadas.**

- Web profesional: <https://paginaswebpersonalizadas.es/>
- Portfolio de proyectos: <https://portfolio-developer-web-cristinavoda.netlify.app/proyectos>
- Aplicación: <https://agenda-pa.netlify.app/>

Agenda Inteligente es un proyecto propio que reúne desarrollo frontend, servicios cloud, notificaciones push y una arquitectura extensible para un asistente personal.

