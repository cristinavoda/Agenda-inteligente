<script setup>
import { ref } from 'vue'
import { Lock } from '@lucide/vue'

const emit = defineEmits(['unlock', 'logout'])

const password = ref('')
function unlock() {
   emit('unlock')
}
function logout() {
   emit('logout')
}
</script>

<template>

<div class="lock-screen">

    <div class="lock-card">

        <div class="lock-icon">
            <Lock :size="46" />
        </div>

        <h1>Agenda Inteligente</h1>

        <p>La aplicación está bloqueada</p>

        <input
            type="password"
            v-model="password"
            placeholder="Contraseña"
            class="password-input"
        >

        <button  class="unlock" @click="unlock">
            Desbloquear
        </button>

        <button class="logout" @click="logout">
            Cerrar sesión
        </button>

    </div>

</div>

</template>

<style scoped>
.lock-card{
    width:360px;
    padding:2rem;
    border-radius:20px;
    background:white;
    box-shadow:0 10px 30px rgba(0,0,0,.08);

    display:flex;
    flex-direction:column;
    align-items:center;
}
.lock-screen{

    position:fixed;

    inset:0;

    background:#f7f8fa;

    display:flex;

    justify-content:center;

    align-items:center;

}

.lock-icon{

    margin-bottom:5rem;
    

}
.lock-card h1{
    text-align:center;
    font-size:1.5rem;
    font-weight:600;
    color:#333;
    margin-bottom:1rem;
}


*{
    box-sizing:border-box;
}
.unlock:hover{
    border-bottom:2px solid rgba(168, 165, 165, 0.95);
    font-weight:800;
}

.logout:hover{
    border-bottom:2px solid rgba(168, 165, 165, 0.95);
    font-weight:800;
}
.password-input{
    width:80%;
    padding:12px 10px;
    margin :10px auto 0;
    border: none;
    border-bottom:1px solid rgba(151,148,148,.55);
    margin-bottom:1rem;
}
 
.unlock{
    width:80%;
    padding:12px;
    border:none;
    border-bottom:1px solid rgba(151,148,148,.55);
    background:transparent;
}

.logout{
    width:80%;   
    padding:12px;
    border:none;
    border-bottom:1px solid rgba(151,148,148,.55);
    background:transparent;
    margin-top:1rem;
}
</style>