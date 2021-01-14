<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card elevation="3" outlined class="text-center urgent">
          <v-row justify="center" align="center">
            <v-col>
              <v-icon color="deep-orange lighten-2" class="icon"
                >mdi-card-account-details-outline</v-icon
              >
            </v-col>
            <v-col>
              <v-card-title class="justify-center"> عارضه </v-card-title>
              <v-card-subtitle class="headline pt-1">
                {{ +userInfo.urgent }}</v-card-subtitle
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="3" outlined class="text-center normal">
          <v-row justify="center" align="center">
            <v-col>
              <v-icon color="amber accent-3" class="icon"
                >mdi-card-account-details-outline</v-icon
              >
            </v-col>
            <v-col>
              <v-card-title class="justify-center"> اعتيادي </v-card-title>
              <v-card-subtitle class="headline pt-1">
                {{ +userInfo.normal }}</v-card-subtitle
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="3" outlined class="text-center count">
          <v-row justify="center" align="center">
            <v-col>
              <v-icon class="icon" color="green lighten-1"
                >mdi-card-account-details-outline</v-icon
              >
            </v-col>
            <v-col>
              <v-card-title class="justify-center"> الرصيد </v-card-title>
              <v-card-subtitle class="headline pt-1">
                {{ +userInfo.urgent + +userInfo.normal }}</v-card-subtitle
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-right">
      <v-btn class="mx-1 ml-auto" color="warning" @click="messages = 0 ; teamleaderAccept()" v-if="userInfo.role == 'Team leader'">
         موافقه مبدائيه
      </v-btn>
      <v-btn class="mx-1 ml-auto" color="error" @click="messages = 0 ; mangerAccept()" v-if="userInfo.role == 'Manager'">
       موافقه
      </v-btn>
      <v-btn class="mx-1 ml-auto" color="error" @click="messages = 0 ; topMangerAccept()" v-if="userInfo.role == 'Top Manager'">
       موافقه
      </v-btn>
      <v-btn class="mx-1 ml-auto" color="primary" @click="messages = 0 ;hrList()" v-if="userInfo.team == 'Hr'">
        HR List 
      </v-btn>
      <v-btn class="mx-1 ml-auto" color="primary" @click="messages = 0 ;history()">
        Hisotry 
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    console.log("i'm here" + " " + this.userInfo.role);
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },methods:{
    hrList(){
      this.$router.push({name: 'hr-list'})
    },
    mangerAccept(){
      this.$router.push({name: 'approve'})
    },
    teamleaderAccept(){
      this.$router.push({ name: 'initialapprove'})
    },
    history(){
      this.$router.push({name: 'user-hisotry'})
    },
    topMangerAccept(){
      this.$router.push({name: 'topManager'})

    }
  }
};
</script>

<style lang="scss" scoped>
.headline {
  font-size: 3.2rem !important;
}
.icon {
  font-size: 3rem;
}
.count,
.urgent,
.normal {
  border-left: 5px solid;
}
.count {
  border-left-color: #66bb6a !important ;
}
.urgent {
  border-left-color: #ff8a65;
}
.normal {
  border-left-color: #ffc400;
}
.approve-link {
  text-decoration: none;
  color: #fff;
}
</style>