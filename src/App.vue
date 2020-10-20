<template>
  <div id="app">
    <div id="nav m-0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" :to="{ name: 'home' }">Cov@19</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
<!--              <a class="nav-link" href="#"><router-link :to="{ name: 'messages' }">Django Rest</router-link></a>-->
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'states' }">Estados</router-link>
            </li>
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'twitter' }">twitter</router-link>
            </li>
<!--            <li class="nav-item active">-->
<!--              <router-link class="nav-link" :to="{ name: 'template' }">template</router-link>-->
<!--            </li>-->
          </ul>
        </div>
      </nav>
     <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>