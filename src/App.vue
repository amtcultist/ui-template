<template>
  <div id="material-kit">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div id="app">
        <router-view />
      </div>
      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
$primary: purple;

@import "bootstrap";
.backdrop {
  backdrop-filter: brightness(75%);
}
</style>
