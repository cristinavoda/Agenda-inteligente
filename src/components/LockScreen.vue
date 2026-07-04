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
.lock-screen{

    position:fixed;

    inset:0;

    background:#f7f8fa;

    display:flex;

    justify-content:center;

    align-items:center;

}
.lock-card{

    width:360px;

    padding:2rem;

    border-radius:20px;

    background:white;

    box-shadow:
        0 10px 30px rgba(0,0,0,.08);

}
.lock-icon{

    display:flex;

    justify-content:center;

    align-items:center;

    margin-bottom:5rem;
    margin-right: 3rem;

}
.lock-card h1{
    text-align:center;
    font-size:1.5rem;
    font-weight:600;
    color:#333;
    margin-bottom:1rem;
}
.unlock{
    width:100%;
    padding:12px;
    background:transparent;
    color:rgb(78, 77, 77);
    border:none;
    border-bottom:1px solid rgba(151, 148, 148, 0.55);
    cursor:pointer;
    font-size:1rem;
    font-weight:600;
    margin-top:1rem;
}
.unlock:hover{
    border-bottom:2px solid rgba(168, 165, 165, 0.95);
    font-weight:800;
}
.logout{
    width:100%;
    padding:12px;
    background:transparent;
    color:rgb(78, 77, 77);
    border:none;
    border-bottom:1px solid rgba(151, 148, 148, 0.55);
    cursor:pointer;
    font-size:1rem;
    font-weight:600;
    margin-top:1rem;
}
.logout:hover{
    border-bottom:2px solid rgba(168, 165, 165, 0.95);
    font-weight:800;
}
</style>