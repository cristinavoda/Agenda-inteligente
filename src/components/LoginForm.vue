<script setup>
import { ref, onMounted } from "vue";
import { login } from "../services/auth";

const email = ref("");
const password = ref("");
const bgVideo = ref(null)
const showPassword = ref(false)
const handleLogin = async () => {
  console.log("CLICK")
  await login(email.value, password.value);
};

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
      id="bg-video"
     
    >
      <source src="/video-background.mp4" type="video/mp4" />
    </video>


  <div class="login">
    <h2>Login</h2>
<label>Correo electrónico</label>


    <input v-model="email" class="form-control" placeholder="email" />
    
    <div class="password-field">
  <label>Contraseña</label>

  <input
    v-model="password"
    :type="showPassword ? 'text' : 'password'"
  />

  <button
    type="button"
    class="toggle-password"
    @click="showPassword = !showPassword"
  >
    {{ showPassword ? "👁️‍🗨️" : "👁️" }}
  </button>
</div>

    <button @click="handleLogin" class="btn ">
      Entrar
    </button>
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
  border-radius: 8px;
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
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
  z-index:10;
}
.login input {
  width: 100%;
  padding: 12px 0;
  margin-bottom: 24px;

  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(151, 148, 148, 0.55);

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
  color: #0056b3;
  font-weight: 300;
  font-size: 2rem;
}
.btn {
  width: 100%;
  padding: 12px;
  background-color: transparent;
  font-size: 1rem;
  color: #0056b3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color .3s ease;
}


.btn:hover {
  
  transition: border-color .3s ease;
  border-bottom: 2px solid  #0056b3;
}

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
    width:100%;
    padding-right:40px;
}

.toggle-password{
    position:absolute;
    right:0;
    bottom:10px;

    background:none;
    border:none;
    cursor:pointer;

    font-size:1.2rem;
}
@media (max-width: 768px) {
  #bg-video {
    height: 160dvh
  }}

</style>