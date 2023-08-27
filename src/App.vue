<template>
  <div class="body">
    <!-- navBar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <img src="https://cdn-icons-png.flaticon.com/512/188/188987.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
          PokeVite
        </RouterLink>
      
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">About</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- content -->
    <div class="main">
    <RouterView></RouterView>
    </div>


    <!-- BottomBar -->
    <footer class="bg-primary text-light">
    <div>Desing in {{ new Date().getFullYear() }}</div>
    </footer>
</div>
</template>
<script setup lang="ts">
</script>
<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
}

.body {
  min-height: 100vh;
  background: rgb(34, 193, 195);
  background: linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(86, 210, 94, 1) 100%);
}
</style>