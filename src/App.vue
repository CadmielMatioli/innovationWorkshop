<template>
  <div class="container">
    <div id="app">
      <div class="row">
        <div class="col-md-4">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5>Paises</h5>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5>Estados</h5>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5>Pais</h5>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5>Brasil Por Data</h5>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5>Estado</h5>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <h5>Predição</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
                <router-view name="ChartStates"/>
            </div>
          </div>
        </div>
      </div>
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
  margin-top: 60px;
}
</style>
