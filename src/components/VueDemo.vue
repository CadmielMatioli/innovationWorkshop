<template>
    <div class="row m-2">
      <div class="col-md-6 form-group">
         <div class="card">
            <div class="card-body">
                <bar-chart></bar-chart>
            </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
         <div class="card">
            <div class="card-body">
                <pie-chart></pie-chart>
            </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
         <div class="card">
            <div class="card-body">
                <bar-chart></bar-chart>
            </div>
        </div>
      </div>
      <div class="col-md-6 form-group">
         <div class="card">
            <div class="card-body">
                <pie-chart></pie-chart>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BarChart from '@/components/ChartStates'
import PieChart from '@/components/PieChartTwitter'
  export default {

    name: 'VueDemo',
    props: {

    },
     components: {
      BarChart,
      PieChart
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

img {
  width: 250px;
}

</style>
