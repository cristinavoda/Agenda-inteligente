<script setup>
import { ref, onMounted, computed } from "vue";
import { login, register } from "../services/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const isRegistering = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const showPassword = ref(false)
async function handleAuth() {
  errorMessage.value = "";

  const userEmail = email.value.trim();

  if (!userEmail || !password.value) {
    errorMessage.value = "Introduce tu correo y contraseña.";
    return;
  }

  if (isLoading.value) return;

  isLoading.value = true;

  try {
    if (isRegistering.value) {
      await register(userEmail, password.value);
    } else {
      await login(userEmail, password.value);
    }

    // Firebase inicia la sesión al crear una cuenta correctamente.
    await router.push("/agenda");
  } catch (error) {
    console.error("Error de autenticación:", error.code);

    const messages = {
      "auth/email-already-in-use":
        "Este correo ya tiene una cuenta. Prueba a iniciar sesión.",
      "auth/invalid-email":
        "El correo electrónico no tiene un formato válido.",
      "auth/weak-password":
        "La contraseña no cumple los requisitos de seguridad.",
      "auth/invalid-credential":
        "El correo o la contraseña no son correctos.",
      "auth/operation-not-allowed":
        "El registro por correo y contraseña no está habilitado en Firebase.",
      "auth/network-request-failed":
        "No se ha podido conectar. Comprueba tu conexión a Internet."
    };

    errorMessage.value =
      messages[error.code] || "No se ha podido completar la operación.";
  } finally {
    isLoading.value = false;
  }
}


const bgVideo = ref(null)
const videoSrc = ref('/videos/day.mp4')
onMounted(() => {

  bgVideo.value.playbackRate = 0.5

  const hour = new Date().getHours()

  if (hour >= 6 && hour < 11)
    videoSrc.value = '/videos/morning.mp4'

  else if (hour >= 11 && hour < 18)
    videoSrc.value = '/videos/day.mp4'

  else if (hour >= 18 && hour < 21)
    videoSrc.value = '/videos/evening.mp4'

  else
    videoSrc.value = '/videos/night.mp4'
})



onMounted(() => {
  bgVideo.value.playbackRate = 0.3
}) 
</script>

<template>
   
  <div id="background-container">


   <video
  ref="bgVideo"
  autoplay
  loop
  muted
  playsinline
  id="bg-video"
>
  <source :src="videoSrc" type="video/mp4" />
</video>

  <div class="login">
  <h2>{{ isRegistering ? 'Crear cuenta' : 'Iniciar sesión' }}</h2>
<label>Correo electrónico</label>


   <input
  v-model="email"
  type="email"
  class="form-control"
  placeholder="Correo electrónico"
  autocomplete="email"
  required
/>
    
    <div class="password-field">
  <label>Contraseña</label>

 <input
  v-model="password"
  class="form-control"
  :type="showPassword ? 'text' : 'password'"
  :autocomplete="isRegistering ? 'new-password' : 'current-password'"
  minlength="6"
  required
/>

  <button
    type="button"
    class="toggle-password"
    @click="showPassword = !showPassword"
  >
    {{ showPassword ? "👁️‍🗨️" : "👁️" }}
  </button>

<button
  type="button"
  @click="handleAuth"
  class="handleLogin-btn"
  :disabled="isLoading"
>
  {{
    isLoading
      ? 'Procesando...'
      : isRegistering
        ? 'Crear cuenta'
        : 'Iniciar sesión'
  }}
</button>

<p v-if="errorMessage" role="alert" class="auth-error">
  {{ errorMessage }}
</p>

<button
  type="button"
  class="auth-switch"
  @click="isRegistering = !isRegistering; errorMessage = ''"
>
  {{
    isRegistering
      ? 'Ya tengo una cuenta · Iniciar sesión'
      : '¿Nuevo usuario? Crear cuenta'
  }}
</button>
       
</div>

  </div>
  </div>
</template>
<style scoped>

.login {
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 0px!important;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
 
  opacity: 0.0;
}
.login:hover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 0px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
  z-index:10;
}
.login input {
  width: 100%;
  padding: 12px 10px;
  margin-bottom: 24px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(151, 148, 148, 0.55);
  border-radius: 0px!important;
  color: rgb(26, 25, 25);
  font-size: 1rem;
  outline: none;
  transition: border-color .3s ease;
}

.login input:focus {
  border-bottom: 2px solid rgba(168, 165, 165, 0.95);
}
.login h2 {
  margin-bottom: 1rem;
  text-align: center;
  color: #3e3f41;
  font-weight: 300;
  font-size: 2rem;
}
.btn {
  width: 100%;
  padding: 12px;
  background-color: transparent;
  font-size: 1rem;
  color: #1d1e1f;
  border: none;
border-bottom: 1px solid rgba(83, 82, 82, 0.55);
  cursor: pointer;
  transition: background-color .3s ease;
}


.btn:hover {
  
  transition: border-color .3s ease;
  border-bottom: 2px solid  #27292b;
}
.handleLogin-btn{
  width: 100%;
  padding: 12px;
  margin: 10px auto 0;
  background-color: transparent;
  font-size: 1rem;
  color: #1d1e1f;
  border: none;
border-bottom: 1px solid rgba(83, 82, 82, 0.55);
  cursor: pointer;}


#background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1; 
 
}


#bg-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center center; 
 
}
.password-field{
    position:relative;
}

.password-field input{
    width:90%;
    padding-right:40px;
}

.toggle-password{
    position:absolute;
    right:0;
    
top:50%;
    transform:translateY(-190%);
    background:none;
    border:none;
    cursor:pointer;

    font-size:1.2rem;
}
.form-control{
    width:80%;
    padding:12px 10px;
    border-radius:8px;
    border:1px solid rgba(151,148,148,.55);
    margin-bottom:1rem;
}
.auth-error {
  color: #b42318;
  font-size: 0.9rem;
  margin-top: 12px;
}

.auth-switch {
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border: none;
  background: transparent;
  color: #555;
  cursor: pointer;
}
@media (max-width: 768px) {
  #bg-video {
    height: 160dvh
  }}

</style>