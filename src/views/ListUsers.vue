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
          <th class="table-container__wrapper__main__header__title">
            <span class="table-container__wrapper__main__header__title__text">#</span>
          </th>
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
              @click="goToDetail(row.id.name)"
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
        <div class="table-container__wrapper__footer__page">
          <button
              class="custom_button"
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
            {{1}}
          </button>
          <button
              class="custom_button"
          >
            <span>Следующая</span>
            <img
                :src="require('/src/assets/svg/Rectangle_33.svg')"
                class="arrow-next"
                alt=""
            >
          </button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Loader from "../components/Loader";
import Selector from "../components/Selector";
export default {
  name: 'Home',
  components: {
    Selector,
    Loader
  },
  data: () => ({
    titles: [
      {name: 'Имя'},
      {name: 'Фамилия'},
      {name: 'Возраст'},
      {name: 'Дата рождения'},
      {name: 'Номер телефона'},
      {name: 'Страна'},
      {name: 'Город'},
    ],

    options: {
      page: 1,
      count: 100,
      sort: 'abc',
    },
  }),
  mounted() {
    this.$store.dispatch('getListUsers')
  },
  methods: {
    dateOfBirth(date) {
      return new Date(date).toJSON().slice(0,10).split('-').reverse().join('/');
    },
    goToDetail(id) {
      if (id) {
        this.$router.push({
          path: `/users/${id}`
        })
      } else {
        /**
         * Не у всех объектов из фейковой даты есть id
         * https://randomuser.me/documentation
         * + смотри комментарий в request.js
        **/
        const random = (Math.random() + 1).toString(36).substring(7)
        this.$router.push({
          path: `/users/${random}`
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import "src/assets/styles/table";
@import "src/assets/styles/customBtn";
</style>
