<template>
  <div class="table-container">
    <div class="table-container__wrapper">
      <div class="table-container__wrapper__header">
        <div class="table-container__wrapper__header__views">
          Показать
          <select
          ></select>
          записей
        </div>
        <div class="table-container__wrapper__header__search">
          Поиск:
          <input>
        </div>
      </div>
      <table class="table-container__wrapper__main seven_columns">
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
              @click="goToDetail(row.id.name)"
          >
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
              {{ row.dob.date }}
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
      <div class="table-container__wrapper__footer">
        <div class="table-container__wrapper__footer__counter">
          <span>Показано от {{ 1 }} до {{ 5 }} из {{ 5 }} записей</span>
        </div>
        <div class="table-container__wrapper__footer__page">
          <button
          >
<!--            <v-icon small>-->
<!--              mdi-chevron-left-->
<!--            </v-icon>-->
            <span>Предыдущая</span>
          </button>
          <button
          >
            {{1}}
          </button>
          <button
          >
            <span>Следующая</span>
<!--            <v-icon small>
              mdi-chevron-right
            </v-icon>-->
          </button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  components: {
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
    this.$store.dispatch('getListUsers', this.options)
  },
  methods: {
    goToDetail(id) {
      if (id) {
        this.$router.push({
          path: `/users/${id}`
        })
      } else {
        /**
         * Не у всех объектов из фейковой даты есть id
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

</style>
