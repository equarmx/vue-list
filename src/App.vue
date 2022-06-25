<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

html {
  background: #eef2f5;
}

body {
  margin:0 auto;
  height:100%;
  width: 100%;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  font-family: 'Roboto', sans-serif;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
