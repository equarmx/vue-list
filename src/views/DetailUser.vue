<template>
  <div class="table-container">
    <div class="table-container__wrapper">
      <div class="upper_btn">
        <button class="custom_button" @click="onGoBack()">
          <img
              :src="require('/src/assets/svg/Rectangle_33.svg')"
              class="arrow-prev"
              alt=""
          >
          <span>Назад</span>
        </button>
      </div>
      <div class="detail_wrapper" v-if="doneData">
        <div class="detail_wrapper__left">
          <img class="detail_wrapper__left__img" :src="$store.state.userInfo.picture.large" alt="">
          <span class="detail_wrapper__left__fullName">{{ fullName }}</span>
        </div>
        <div class="detail_wrapper__right">
          <span class="detail_wrapper__right__title">{{ fullName }}</span>

          <div class="detail_wrapper__right__prop">
            <span class="detail_wrapper__right__prop__name">
              Возраст
            </span>
            <span class="detail_wrapper__right__prop__value">
              {{ $store.state.userInfo.dob.age }}
            </span>
          </div>
          <div class="detail_wrapper__right__prop">
            <span class="detail_wrapper__right__prop__name">
              Дата рождения
            </span>
            <span class="detail_wrapper__right__prop__value">
              {{ dateOfBirth }}
            </span>
          </div>
          <div class="detail_wrapper__right__prop">
            <span class="detail_wrapper__right__prop__name">
              Номер телефона
            </span>
            <span class="detail_wrapper__right__prop__value">
              {{ $store.state.userInfo.cell }}
            </span>
          </div>
          <div class="detail_wrapper__right__prop">
            <span class="detail_wrapper__right__prop__name">
              Страна
            </span>
            <span class="detail_wrapper__right__prop__value">
              {{ $store.state.userInfo.location.country }}
            </span>
          </div>
          <div class="detail_wrapper__right__prop">
            <span class="detail_wrapper__right__prop__name">
              Город
            </span>
            <span class="detail_wrapper__right__prop__value">
              {{ $store.state.userInfo.location.city }}
            </span>
          </div>
        </div>
      </div>
      <Loader v-else/>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader";
export default {
  name: "DetailUser",
  components: {Loader},
  data: () => ({

  }),
  mounted() {
    if (!this.doneData) {
      this.$store.dispatch('getDetailUser', this.$route.params.id)
    }
  },
  computed: {
    doneData() {
      return this.$store.state.userInfo && Object.keys(this.$store.state.userInfo).length
    },
    fullName() {
      return `${this.$store.state.userInfo.name.first} ${this.$store.state.userInfo.name.last}`
    },
    dateOfBirth() {
      return new Date(this.$store.state.userInfo.dob.date).toJSON().slice(0,10).split('-').reverse().join('/');
    },
  },
  methods: {
    onGoBack() {
      this.$router.push({
        path: '/users'
      })
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/table";
@import "src/assets/styles/detail";
@import "src/assets/styles/customBtn";
</style>
