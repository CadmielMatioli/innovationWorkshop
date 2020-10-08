<!--<template>-->
<!--  <div>-->
<!--    <div class="container">-->
<!--      <div class="row">-->
<!--        <div class="col-md-12">-->
<!--          <div class="card">-->
<!--            <div class="card-header">-->
<!--              <h1>sui9fhyseoidfhnsdokjlfhsdf</h1>-->
<!--            </div>-->
<!--            <div class="card-body">-->
<!--              <select class="form-control">-->
<!--                <option>Selecione um estado...</option>-->
<!--              </select>-->

<!--            </div>-->
<!--            </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->


<script>
  import { Bar } from 'vue-chartjs'
  import axios from 'axios'
  export default {
    extends: Bar,
    data () {
      return {
        states: [],
        cases: [],
        randomColor: []
      }
    },
    mounted () {
      const self = this
      axios.get('/homecova')
      .then(response => {
        response.data.list.map(function (item, index) {
          self.states[index] = item.state
          self.cases[index] = item.cases
          self.randomColor[index] = '#' + Math.floor(Math.random() * 16777215).toString(16)
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
      this.renderChart({
        labels: self.states,
        datasets: [{
          label: 'Gráfico de Usuários',
          data: self.cases,
          backgroundColor: self.randomColor,
          datalabels: {
            color: '#ffffff'
          }
        }]
      }, {response: true,
        maintainAspectRatio: false
      })
    }
}
</script>
<style>
    .small {
        height: 200px
    }
</style>
