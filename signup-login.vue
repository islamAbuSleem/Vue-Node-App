<template>
  <div class="home">
    <v-container :class="[container, 'w-100',{'sign-up-mode':toggleSign}]">
      <div class="forms-container">
        <div class="signin-signup">
          <v-form
            ref="form"
            class="form sign-in-form d-flex align-center justify-center flex-column "
          >
            <h2 class="title grey--text text--darken-3">Sign In</h2>
            <v-text-field
              v-model="userInfo.email"
              label="Email"
              required
              class="input"
            ></v-text-field>
            <v-text-field
              v-model="userInfo.password"
              label="Password"
              state
              class="input"
            ></v-text-field>
            <v-btn color="primary" @click="login(userInfo)">Login</v-btn>
          </v-form>

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="sign-up-form form d-flex align-center justify-center flex-column "
          >
                      <h2 class="title grey--text text--darken-3">Sign Up</h2>
            <v-text-field
              v-model="userInfo.name"
              :counter="15"
              :rules="nameRules"
              label="Name"
              state
              class="input"
            ></v-text-field>
            <v-text-field
              v-model="userInfo.email"
              :rules="emailRules"
              label="E-mail"
              required
              class="input"
            ></v-text-field>

            <v-text-field
             class="input"
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
            class="input"
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
            <v-row align="center" class="input">
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
              <v-col cols="12" class="text-center">
                <v-btn color="error" @click="register"> register </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>We will be happy to be one of us.</p>
              <v-btn class="grey--text text--lighten-3" rounded outlined depressed @click="toggleSign = true">Sign Up</v-btn>
          </div>
          <img :src="signUpSrc" class="image" alt="">
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
              <p>Welcome back.</p>
              <v-btn class="grey--text text--lighten-3" rounded outlined depressed @click="toggleSign = false">Sign Ip</v-btn>
          </div>
          <img :src="loginSrc" class="image" alt="">
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loginSrc: require("../assets/login.svg"),
      signUpSrc: require("../assets/signup.svg"),
      toggleSign: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  .container {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    &::before{
      content: '';
      position: absolute;
      width: 2000px;
      height: 2000px;
      border-radius: 50%;
      background: linear-gradient(-45deg,#4481eb,#04befe);
      top: -10%;
      right: 48%;
      transform: translateY(-50%);
      z-index: 6;
    }
    &.sign-up-mode::before{
      transform: translate(100%,-50%);
      right: 52%;
    }
    &.sign-up-mode .left-panel .image,
    &.sign-up-mode .left-panel .content{
      transform: translateX(-800px);
    }
   &.sign-up-mode .right-panel .image,
    &.sign-up-mode .right-panel .content{
      transform: translateX(0px) !important;
    }

    &.sign-up-mode .left-panel{
      pointer-events: none !important;
    }
        &.sign-up-mode .right-panel{
      pointer-events: all !important;
    }
     &.sign-up-mode .signin-signup{
       left: 25% !important;
     }
      &.sign-up-mode .form.sign-in-form{
        z-index: 1!important;
        opacity: 0!important;
      }
      &.sign-up-mode .form.sign-up-form{
        z-index: 2 !important;
        opacity: 1 !important;
      }
    .forms-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .signin-signup {
        position: absolute;
        top: 50%;
        left: 75%;
        transform: translate(-50%, -50%);
        width: 50%;
        display: grid;
        grid-template-columns: 1fr;
        z-index: 5;
        .form{
          grid-column: 1 / 2;
          grid-row: 1 / 2; 
          padding: 0 5rem;
          overflow: hidden;
          &.sign-in-form {
            z-index:2;
          }
          &.sign-up-form{
            z-index: 1;
            opacity: 0;
          }
          .title {
            font-size: 2.2rem !important;
            margin-bottom: 10px;
          }
          .input {
            max-width: 380px;
            width: 100%;
            flex: none;
          }
        
        }
          
          

      }
    }
    .panels-container{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .panel{
        display: flex;
        flex-direction: column;
        // align-items: flex-end;
        justify-content: space-around;
        text-align: center;
        z-index: 7;
        &.left-panel{
          padding: 3rem 17% 2rem 12%;
          pointer-events: all;
        }
        &.right-panel{
          padding: 3rem 12% 2rem 17%;
          pointer-events: none;
          .content,
          .image{
            transform: translateX(800px);
          }
        }
        .content{
           color: #f1f1f1;
           h3{
             font-size: 1.5rem;
             font-weight: 600;
             line-height: 1;
           }
           .transparent{
             margin: 0;
             background: none;
             border: 2px solid #f1f1f1;
             width: 130px;
             height: 41px;
             color: #f1f1f1;
           }
        }
        .image{
          width: 100%;
        }
      }
    }
  }
}
</style>
