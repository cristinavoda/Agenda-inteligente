<template>
  <main class="loading-screen">
    <div class="loading-content">
      <div class="calendar-icon">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <rect x="14" y="19" width="52" height="48" rx="12" />
          <path d="M14 32H66" />
          <path d="M27 12V24M53 12V24" />
          <rect class="day-one" x="25" y="41" width="9" height="9" rx="3" />
          <rect class="day-two" x="39" y="41" width="9" height="9" rx="3" />
          <path class="check" d="M27 57L33 62L45 52" />
          <path class="sparkle" d="M62 8V20M56 14H68" />
        </svg>
      </div>

      <h1>Agenda Inteligente</h1>
      <p class="tagline">Tu día, organizado con inteligencia.</p>

      <div class="loading-message">
        <span class="sparkle-icon">✦</span>
        <span>Preparando tu agenda</span>
        <span class="loading-dots" aria-hidden="true">
          <i></i><i></i><i></i>
        </span>
      </div>

      <div
        class="progress-track"
        role="progressbar"
        aria-label="Preparando la aplicación"
      >
        <div class="progress-bar"></div>
      </div>

      <p class="loading-hint">
        Un momento, estamos preparando todo para ti.
      </p>
    </div>
  </main>
</template>

<style scoped>
.loading-screen {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 40%, #e8ebf8 0%, transparent 48%),
    linear-gradient(145deg, #faf9fc, #f1f3f8);
  color: #252b42;
  font-family: inherit;
}

.loading-content {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: appear 650ms ease-out both;
}

.calendar-icon {
  width: 92px;
  height: 92px;
  display: grid;
  place-items: center;
  margin-bottom: 24px;
  border-radius: 26px;
  background: #e2e7f5;
  box-shadow: 0 12px 30px #6676b81a;
  animation: float 3s ease-in-out infinite;
}

.calendar-icon svg {
  width: 78px;
  height: 78px;
  fill: white;
  stroke: #6676b8;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.calendar-icon .day-one {
  fill: #91a5db;
  stroke: none;
}

.calendar-icon .day-two {
  fill: #78b8ac;
  stroke: none;
}

.calendar-icon .check {
  fill: none;
  stroke: #78b8ac;
  stroke-width: 3.5;
}

.calendar-icon .sparkle {
  stroke: #c39b6b;
  stroke-width: 2.5;
}

h1 {
  margin: 0;
  font-size: clamp(25px, 6vw, 30px);
  font-weight: 650;
  letter-spacing: -0.8px;
}

.tagline {
  margin: 10px 0 38px;
  color: #656b7f;
  font-size: 15px;
  line-height: 1.6;
}

.loading-message {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #414860;
  font-size: 14px;
  font-weight: 550;
}

.sparkle-icon {
  color: #6676b8;
  font-size: 18px;
  animation: twinkle 1.8s ease-in-out infinite;
}

.loading-dots {
  display: inline-flex;
  gap: 4px;
}

.loading-dots i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #7488c7;
  animation: dot 1.2s ease-in-out infinite;
}

.loading-dots i:nth-child(2) {
  animation-delay: 160ms;
}

.loading-dots i:nth-child(3) {
  animation-delay: 320ms;
}

.progress-track {
  width: 100%;
  height: 5px;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 10px;
  background: #dee1eb;
}

.progress-bar {
  width: 38%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #7488c7, #78b8ac);
  animation: progress 1.8s ease-in-out infinite;
}

.loading-hint {
  margin: 15px 0 0;
  color: #777d90;
  font-size: 12px;
  line-height: 1.6;
}

@keyframes appear {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}

@keyframes dot {
  0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
}

@keyframes progress {
  0% { transform: translateX(-110%); }
  100% { transform: translateX(270%); }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
  }
}
</style>