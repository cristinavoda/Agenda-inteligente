<template>
  <div class="footer ">
     © {{ new Date().getFullYear() }} Cristina Voda · Lleida, Catalunya · España
    </div>
  
</template>

<script setup>

</script>

<style scoped>
.footer  {
 background: transparent;
 width: 100%;
 margin-bottom: 1rem;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 padding: 1rem 1rem;
  color: #575555;
  text-shadow: #ffffff solid 2cqmax 1px 2px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  overflow: hidden;
}






@media (max-width: 600px) {
  .footer{
    grid-template-columns: 1fr;
    text-align: center;
     padding: 0.75rem 1rem;
    font-size: 0.75rem;
  }
 
}

</style>
