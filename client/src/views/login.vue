<template>
  <div class="login">
    <v-form ref="form">
      <v-text-field
        v-model="userInfo.email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field v-model="userInfo.password" label="Password" required>
      </v-text-field>

      <v-btn color="primary" @click="login(userInfo)">Login</v-btn>
    </v-form>

    <v-alert type="error" v-if="userInfo.check" class="mt-5" outlined>
      {{ userInfo.feedback }}
    </v-alert>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userInfo: {
        email: null,
        password: "",
        check: false,
        feedback: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 50%;
  margin: 3% auto;
  border: 1px solid #ccc;
  background-color: #fafafa;
  border-radius: 5px;
  padding: 5%;
}
</style>
