<template>
  <div class="table-container">
    <div class="table-container__wrapper">
      <div class="table-container__wrapper__header">
        <div class="table-container__wrapper__header__views">
          Показать
          <Selector/>
          записей
        </div>
        <div class="table-container__wrapper__header__search">
          <input class="custom_input" placeholder="Поиск...">
        </div>
      </div>
      <table class="table-container__wrapper__main eight_columns" v-if="!$store.state.loadingList">
        <thead class="table-container__wrapper__main__header">
        <tr>
          <th
              class="table-container__wrapper__main__header__title"
              v-for="(title, index) in refactoredTitles"
              :key="index"
              data-type="text-short"
          >
            <span class="table-container__wrapper__main__header__title__text">{{ title.name }}</span>
          </th>
        </tr>
        </thead>
        <tbody
            class="table-container__wrapper__main__items"
        >
          <tr
              v-for="(row, index) in $store.state.listUsers"
              :key="index"
              @click="goToDetail(row)"
          >
            <td v-if="!isMobile">
              {{ startList+index}}
            </td>
            <td>
              {{ row.name.first }}
            </td>
            <td>
              {{ row.name.last }}
            </td>
            <td>
              {{ row.dob.age }}
            </td>
            <td v-if="!isMobile">
              {{ dateOfBirth(row.dob.date) }}
            </td>
            <td v-if="!isMobile">
              {{ row.cell }}
            </td>
            <td v-if="!isMobile">
              {{ row.location.country }}
            </td>
            <td v-if="!isMobile">
              {{ row.location.city }}
            </td>
          </tr>
        </tbody>
      </table>
      <Loader v-else/>
      <div class="table-container__wrapper__footer">
        <CountItems/>
        <PaginationBtns/>
      </div>
    </div>
</div>
</template>

<script>
import Loader from "../components/Loader";
import Selector from "../components/Selector";
import PaginationBtns from "../components/PaginationBtns";
import CountItems from "../components/CountItems";
export default {
  name: 'Home',
  components: {
    CountItems,
    PaginationBtns,
    Selector,
    Loader
  },
  data: () => ({
    titles: [
      {name: '#'},
      {name: 'Имя'},
      {name: 'Фамилия'},
      {name: 'Возраст'},
      {name: 'Дата рождения'},
      {name: 'Номер телефона'},
      {name: 'Страна'},
      {name: 'Город'},
    ],
  }),
  mounted() {
    this.$store.dispatch('getListUsers')
  },
  computed: {
    refactoredTitles() {
      if (this.isMobile) {
        return this.titles.filter(title => {
          return title.name === 'Имя' || title.name === 'Фамилия' || title.name === 'Возраст'
        })
      } else return this.titles
    },
    startList() {
      return (this.$store.state.options.page-1) * this.$store.state.options.count + 1
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  },
  methods: {
    dateOfBirth(date) {
      return new Date(date).toJSON().slice(0,10).split('-').reverse().join('/');
    },
    goToDetail(user) {
      /**
       * Не у всех объектов из фейковой даты есть id
       * https://randomuser.me/documentation
       * + смотри комментарий в request.js
       **/

      const id = user.id.name ? user.id.name : (Math.random() + 1).toString(36).substring(7)

      /**
       * ВАЖНО! Изначально собирался получать детальную информацию по API https://randomuser.me/?id=1 e.g.
       * НО у этой фейковой даты нет такой возможности, поэтому чтобы решить поставленную задачу, буду прокидывать дату из таблички напрямую
       **/

      this.$store.commit('changeUserInfo', user)

      this.$router.push({
        path: `/users/${id}`
      })
    },
  },
}
</script>

<style lang="scss">
@import "src/assets/styles/table";
@import "src/assets/styles/customBtn";
</style>
