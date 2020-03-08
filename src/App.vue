<template>
  <div class="app">
    <Menu id="menu"/>
    <Content id="content"/>
    <Footer id="footer"/>
  </div>
</template>

<script>
import Menu from '@/components/templates/Menu.vue'
import Content from '@/components/templates/Content.vue'
import Footer from '@/components/templates/Footer.vue'

window.$ = require('jquery')
window.JQuery = require('jquery')

export default {
  name: "app",
  components: {
    Menu,
    Content,
    Footer
  }
}

</script>

<style>
body{
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#menu{
  grid-area: "menu";
}

#content{
  grid-area: "content";
}

#footer{
  grid-area: "footer";
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  min-height: 100vh;
  display: grid;
  grid-template-rows: 70px 1fr 100px;
  grid-template-columns: 1fr;
  grid-template-areas: 
    "menu"
    "content"
    "footer";
}

</style>
