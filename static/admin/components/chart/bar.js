import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: {
    options: {
      default: {}
    },
    width: {
      default: '100%',
      type: String
    },
  },

  mounted() {
    this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)")
    this.gradient.addColorStop(.5, "rgba(255, 0, 0, 0.25)")
    this.gradient.addColorStop(1, "rgba(145, 67, 204, 0.46)")

    this.gradient2 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450)
    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)")
    this.gradient2.addColorStop(.5, "rgba(0, 231, 255, 0.25)")
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)")

    this.renderChart({
      labels: [],
      datasets: [{
        label: '',
        borderColor: '#05CBE1',
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        borderWidth: 1,
        backgroundColor: this.gradient2,
        data: []
      }]
    }, this.options)
  },
  methods: {
    updateChart(data) {
      if (this._chart) {
        this._chart.data.labels = data.labels
        for (let i = 0; i <= 1; ++i) {
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