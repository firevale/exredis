<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1>Data grid</h1>
        </article>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      rawData: [
        ['', 'Kia', 'Nissan', 'Toyota', 'Honda'],
        ['2008', 10, 11, 12, 13],
        ['2009', 20, 11, 14, 13],
        ['2010', 30, 15, 12, 13]
      ]
    }
  }
}
</script>
