<template>
  <div class="auth-layout">

    <!-- Компонент содержимого -->
    <router-view/>

  </div>
</template>

<style lang="less">
  .auth-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    
    min-height: 100vh;
    background-color: #E5E5E5;
  }
</style>