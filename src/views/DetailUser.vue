<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "DetailUser",
  data: () => ({

  }),
  mounted() {
    this.$store.dispatch('getDetailUser', this.$route.params.id)
  },
}
</script>

<style lang="scss">

</style>
