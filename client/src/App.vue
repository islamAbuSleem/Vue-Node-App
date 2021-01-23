<template>
  <v-app id="inspire">
    <navbar v-if="isLoggedIn" />
    <login v-else-if="$route.path == '/'" />
    <v-main class="mx-4 mb-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import navbar from "@/components/navbar";
import login from "@/components/login";
import {mapGetters} from 'vuex'
export default {
  name: "App",
  components: {
    navbar,
    login
  },
  data() {
    return {};
  },
  computed:{
    ...mapGetters(["isLoggedIn"])
  },created() {
    
  },
};
</script>

<style lang="scss">
.v-application--wrap {
  background-color: #f1f1f1;

  .v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    margin-bottom: 5px;
  }
}
</style>
