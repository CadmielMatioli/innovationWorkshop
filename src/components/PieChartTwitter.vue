<script>
  import { Pie } from 'vue-chartjs'
  import axios from 'axios'
    export default {
      name: 'CharStates',
      extends: Pie,
      data() {
        return {
          states: [],
          cases: [],
          randomColor: []
        }
      },
      mounted() {
        axios.get('/apicov/tweets/sentiment')
            .then(response => {
             this.renderChart({
                labels: ['Triste %', 'Neutro %', 'Feliz %'],
                datasets: [
                  {
                    labels:'Twitter',
                    backgroundColor: [
                      '#fc0703',
                      '#000',
                      '#f7f300',
                    ],
                    data: [response.data.list[0].positive, response.data.list[0].neutral, response.data.list[0].negative]
                  }
                ]
              }, {responsive: true, maintainAspectRatio: false})
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
