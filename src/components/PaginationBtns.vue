<template>
  <div class="table-container__wrapper__footer__page">
    <button
        class="custom_button"
        :class="{disabled: endedPage}"
        @click="changePage('minus')"
    >
      <img
          :src="require('/src/assets/svg/Rectangle_33.svg')"
          class="arrow-prev"
          alt=""
      >
      <span>Предыдущая</span>
    </button>
    <button
        class="custom_button"
    >
      {{$store.state.options.page}}
    </button>
    <button
        class="custom_button"
        @click="changePage('plus')"
    >
      <span>Следующая</span>
      <img
          :src="require('/src/assets/svg/Rectangle_33.svg')"
          class="arrow-next"
          alt=""
      >
    </button>
  </div>
</template>

<script>
export default {
  name: "PaginationBtns",
  data: () => ({

  }),
  computed: {
    endedPage() {
      return this.$store.state.options.page <= 1
    }
  },
  methods: {
    changePage(action) {
      const page = this.$store.state.options.page

      if (action === 'plus') {
        if (!page) {
          this.$store.commit('changeOptions', {
            value: 1,
            prop: 'page',
          })
        } else {
          this.$store.commit('changeOptions', {
            value: parseInt(page)+1,
            prop: 'page',
          })
        }
      } else {
        if (!page) {
          this.$store.commit('changeOptions', {
            value: 1,
            prop: 'page',
          })
        } else if (parseInt(page) > 0) {
          this.$store.commit('changeOptions', {
            value: parseInt(page)-1,
            prop: 'page',
          })
        } else this.$store.commit('changeOptions', {
          value: 1,
          prop: 'page',
        })
      }

      this.$store.dispatch('getListUsers')
    },
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/table";
@import "src/assets/styles/customBtn";
</style>
