<script>
  import { Bar } from 'vue-chartjs'
  import axios from 'axios'

    export default {
      name: 'CharStates',
      extends: Bar,
      data() {
        return {
          states: [],
          cases: [],
          randomColor: []
        }
      },
      mounted() {
        const self = this
        axios.get('/apicov/states/')
            .then(response => {
              response.data.list.map(function (item, index) {
                self.states[index] = item.state
                self.cases[index] = item.cases
                self.randomColor[index] = '#' + Math.floor(Math.random() * 16777215).toString(16)
              })

              this.renderChart({
                labels: self.states,
                datasets: [{
                  label: 'Gráfico de casos nos estados',
                  data: self.cases,
                  backgroundColor: self.randomColor,
                }]
              }, {
                response: true,
                maintainAspectRatio: false
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
      }
    }
</script>
<style>
    .small {
        height: 200px
    }
</style>
