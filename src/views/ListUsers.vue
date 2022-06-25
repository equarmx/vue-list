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
              v-for="(title, index) in titles"
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
            <td>
              {{ index+1 }}
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
            <td>
              {{ dateOfBirth(row.dob.date) }}
            </td>
            <td>
              {{ row.cell }}
            </td>
            <td>
              {{ row.location.country }}
            </td>
            <td>
              {{ row.location.city }}
            </td>
          </tr>
        </tbody>
      </table>
      <Loader v-else/>
      <div class="table-container__wrapper__footer">
        <div class="table-container__wrapper__footer__counter">
          <span>Показано от {{ 1 }} до {{ 5 }} из {{ 5 }} записей</span>
        </div>
        <PaginationBtns/>
      </div>
    </div>
</div>
</template>

<script>
import Loader from "../components/Loader";
import Selector from "../components/Selector";
import PaginationBtns from "../components/PaginationBtns";
export default {
  name: 'Home',
  components: {
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
