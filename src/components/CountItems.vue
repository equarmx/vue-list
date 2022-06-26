<template>
  <div class="table-container__wrapper__footer__counter">
    <span>Показано от {{ startList }} до {{ endList }} из {{ $store.state.maxUsers }} записей</span>
  </div>
</template>

<script>
export default {
  name: "CountItems",
  data: () => ({

  }),
  computed: {
    startList() {
      return (this.$store.state.options.page-1) * this.$store.state.options.count + 1
    },
    endList() {
      return this.$store.state.options.page * this.$store.state.options.count
    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/table";
</style>
