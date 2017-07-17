import { Line } from 'vue-chartjs'

export default Line.extend({
  props: {
    options: {
      default: {}
    },
    width: {
      default: '100%',
      type: String
    }
  },

  mounted() {
    this.renderChart({
      labels: [],
      datasets: [{
        label: '',
        borderColor: '#FC2525',
        pointBackgroundColor: 'white',
        borderWidth: 1,
        pointBorderColor: 'white',
        data: []
      }, {
        label: '',
        borderColor: '#05CBE1',
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        borderWidth: 1,
        data: []
      }, {
        label: '',
        borderColor: '#CB05E1',
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        borderWidth: 1,
        data: []
      }]
    }, this.options)
  },
  methods: {
    updateChart(data) {
      if (this._chart) {
        this._chart.data.labels = data.labels
        for (let i = 0; i <= 2; ++i) {
          if (data.datasets[i]) {
            this._chart.data.datasets[i].label = data.datasets[i].label
            this._chart.data.datasets[i].data = data.datasets[i].data
          }
        }
        this._chart.update()
      }
    },
  }
})