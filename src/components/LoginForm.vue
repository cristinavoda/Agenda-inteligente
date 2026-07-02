<script setup>
import { ref } from "vue";
import { login } from "../services/auth";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  await login(email.value, password.value);
};
</script>

<template>
  <div class="login">
    <h2>Login</h2>

    <input v-model="email" placeholder="email" />
    <input v-model="password" type="password" placeholder="password" />

    <button @click="handleLogin">
      Entrar
    </button>
  </div>
</template>