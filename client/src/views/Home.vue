<template>
  <div class="home">
    <v-alert text color="info" v-if="userInfo">
      <h3 class="text-center">welcome {{ userInfo.name }}</h3>
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {},
};
</script>
