<template>
  <div>
  </div>
</template>

<script>

export default {
  components: {
    
  },

  data () {
    return {
    }
  },

  computed: {
    chartData () {
      return {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          data: this.data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      }
    }
  },

  mounted: function() {
  }
}
</script>

<style lang="scss" scoped>
</style>
