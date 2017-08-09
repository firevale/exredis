import { HorizontalBar as HorizontalBar_Raw, Bar as Bar_Raw ,Pie as Pie_Raw} from 'vue-chartjs'

const HorizontalBar = HorizontalBar_Raw.extend({
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options)
  }
})

const Bar = Bar_Raw.extend({
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options)
  }
})


const Pie = Pie_Raw.extend({
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options)
  }
})

export { Bar, HorizontalBar,Pie }