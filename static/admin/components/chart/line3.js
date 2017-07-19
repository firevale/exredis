import { Line } from 'vue-chartjs'

export default Line.extend({
  props: {
    options: {
      default: function() {
        return {}
      }
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
        borderWidth: 1,
        pointStyle: 'cross',
        pointRadius: 1,
        pointHitRadius: 2,
        data: []
      }, {
        label: '',
        borderColor: '#05CBE1',
        pointRadius: 1,
        pointHitRadius: 2,
        pointStyle: 'cross',
        borderWidth: 1,
        data: []
      }, {
        label: '',
        borderColor: '#56E437',
        pointRadius: 1,
        pointHitRadius: 2,
        pointStyle: 'cross',
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
    addData: function(label, data, n) {
      console.info('add chart data, label:', label, 'data: ', data)
      if (this._chart) {
        if (this._chart.data.labels[this._chart.data.labels.length - 1] != label) {
          this._chart.data.labels.push(label)
          if (this._chart.data.labels.length > n) {
            this._chart.data.labels.shift()
          }
          for (let i = 0; i < data.length; ++i) {
            if (this._chart.data.datasets[i]) {
              this._chart.data.datasets[i].data.push(data[i])
              if (this._chart.data.datasets[i].data.length > n) {
                this._chart.data.datasets[i].data.shift()
              }
            }
          }
          this._chart.update()
        }
      }
    }
  }
})