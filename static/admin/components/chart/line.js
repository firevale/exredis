import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['options'],
  mounted () {
    this.renderChart({}, this.options)
  },
  methods: {
    updateChart(data) {
      this.renderChart(data, this.options)
    }
  }
})