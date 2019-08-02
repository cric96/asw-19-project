<template>
<div id="movies-app" class="container-fluid">
  <h1>Amazing Movies</h1>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Movies</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/movies-crud">Movies Manager</router-link>
        </li>
      </ul>
    </div>
  </nav>	
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
