<template>
  <v-container >
    <v-row>
      <v-col cols="12" sm="3">
        <v-card elevation="3" outlined class="text-center urgent">
          <v-row justify="center" align="center">
            <v-col>
              <v-icon color="deep-orange lighten-2" class="icon"
                >mdi-card-account-details-outline</v-icon
              >
            </v-col>
            <v-col>
              <v-card-title class="justify-center"> اداري </v-card-title>
              <v-card-subtitle class="headline pt-1">
                {{ +userInfo.quarterDay }}</v-card-subtitle
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
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
      <v-col cols="12" sm="3">
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
      <v-col cols="12" sm="3">
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
      <v-btn class="mx-1 ml-auto" color="error" @click="messages = 0 ; topMangerAccept()" v-if="userInfo.role == 'Manager' && userInfo.dept=='Sector'">
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
import { mapGetters , mapActions} from "vuex";
import {renewDayOff} from '../mixins/renewDayOff'
import getDayOff from '../services/dayOffoperations';

export default {
  mixins:[renewDayOff],
  data() {
    return {
       now: new Date(),
       x:null,
       y:null
    };
  },
   created() {
    this.updateUserInfo(this.userInfo.userId)
    this.quarterDayRenew()

    this.annualDayOffRenew()
  },beforeUpdate(){
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods:{
    ...mapActions(["updateUserInfo"]),
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

    },quarterDayRenew(){
      if(
        this.dateToYMD(this.now) == this.dateToYMD(new Date(`${this.now.getFullYear()}-01-01`)) ||
        this.dateToYMD(this.now) == this.dateToYMD(new Date(`${this.now.getFullYear()}-04-01`)) ||
        this.dateToYMD(this.now) == this.dateToYMD(new Date(`${this.now.getFullYear()}-07-01`)) ||
        this.dateToYMD(this.now) == this.dateToYMD(new Date(`${this.now.getFullYear()}-10-01`)) 
        ){
         this.userInfo.quarterDay = 1
           getDayOff.updateDayOffCount(this.userInfo.userId,this.userInfo)
      }
    },
    annualDayOffRenew(){
     if(
        this.dateToYMD(this.now) == this.dateToYMD(new Date(`${this.now.getFullYear()}-01-01`))
       ){
         console.log('annual renewal !!!')
         this.renewalCount()
        }
        if(this.userInfo.normal == null || this.userInfo.urgent == null){
          this.calculateDayoffCount()
        }

    },renewalCount(){
          this.userInfo.normal = this.userInfo.annualNormal;
          this.userInfo.urgent = this.userInfo.annualUrgent;
           getDayOff.updateDayOffCount(this.userInfo.userId,this.userInfo)
    },
    calculateDayoffCount(){

      const createdOn = new Date(this.userInfo.createdOn)
      const workingDuration = Math.floor(Math.abs(createdOn - this.now)/ (1000 * 60 * 60 * 24 * 30))
      const normalPerMonth = this.userInfo.annualNormal / 12
      const urgentPerMonth = this.userInfo.annualUrgent / 12
      const yearRemainingDays = Math.floor(Math.abs(new Date(`${this.now.getFullYear()}-12-31`) - this.now)/ (1000 * 60 * 60 * 24*30))
      
      if(workingDuration <= 6){
        this.userInfo.normal = ''
        this.userInfo.urgent = ''
            console.log('no renewal !!!')
            getDayOff.updateDayOffCount(this.userInfo.userId,this.userInfo)
      }else{
        if((new Date(this.now).getMonth() + 1) == 1){
          if(!(+this.userInfo.normal + +this.userInfo.urgent)){
         console.log('full renewal !!!')

            this.renewalCount()
          }
        }else{
          if(!(+this.userInfo.normal + +this.userInfo.urgent)){
            console.log('custome renewal !!!')
            this.userInfo.normal = Math.floor(normalPerMonth  * yearRemainingDays)
            this.userInfo.urgent = Math.floor(urgentPerMonth * yearRemainingDays)
            getDayOff.updateDayOffCount(this.userInfo.userId,this.userInfo)
          }
        }
      }
    },
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