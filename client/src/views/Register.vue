<template>
  <div class="register w-50">
    <template>
      <v-alert type="error" v-if="userInfo.check" class="mt-5" outlined>
        {{ userInfo.feedback }}
      </v-alert>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="userInfo.name"
          :counter="15"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="userInfo.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          :rules="[rules.required, rules.min]"
          v-model="userInfo.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          :rules="[rules.required, rules.min]"
          v-model="userInfo.repassword"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="Re-Password"
          hint="At least 8 characters"
          counter
          v-on:blur="validate"
          @click:append="show1 = !show1"
        ></v-text-field>
        <p v-if="passwordMatch">
          {{ passwordMatch }}
        </p>
        <v-row align="center">
          <v-col cols="6" class="ml-auto">
            <v-text-field
              v-model.number="userInfo.userId"
              :rules="emailRules"
              label="User ID"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="ml-auto">
            <v-select
              :items="items"
              v-model="userInfo.dept"
              label="Department"
            ></v-select>
          </v-col>
          <v-col class="text-center">
            <v-btn color="error" @click="register"> register </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </div>
</template>

<script>
import authService from "../services/AuthenticationService";
export default {
  data() {
    return {
      passwordMatch: "",
      show1: false,
      items: ["التشغيل", "الشبكات", "المسانده", "الدعم القني"],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      userInfo: {
        name: "",
        first: "",
        last: "",
        email: "",
        password: "",
        repassword: "",
        userId: "",
        dept: "",
        feedback: "",
        check: false,
        isactive: true,
        createdOn: Date.now().toString(),
      },
    };
  },
  methods: {
    register() {
      this.userInfo.first = this.userInfo.name.split(" ")[0];
      this.userInfo.last = this.userInfo.name.split(" ")[1];
      authService.register(this.userInfo).then((res) => {
        if (res.data["_id"]) {
          this.userInfo.check = false;
          this.userInfo.feedback = "";
        } else {
          this.userInfo.check = true;
          this.userInfo.feedback = res.data;
        }
        console.log(res.status);
      });
    },
    validate() {
      console.log(this.userInfo.password === this.userInfo.repassword);
      if (this.userInfo.password === this.userInfo.repassword) {
        this.passwordMatch = "";
      } else {
        this.passwordMatch = "Password Don't match";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 50%;
  margin: 3% auto;
  border: 1px solid #ccc;
  background-color: #fafafa;
  border-radius: 5px;
  padding: 5%;
  p {
    color: rgb(231, 44, 44);
  }
}
</style>
