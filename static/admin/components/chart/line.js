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
  mounted () {
    this.renderChart({}, this.options)
  },
  methods: {
    updateChart(data) {
      if (this._chart) {
        this._chart.destroy()
      }
      this.renderChart(data, this.options)
    }
  }
})