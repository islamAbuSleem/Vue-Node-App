<template>
    <div dir="rtl">


        <v-row class="">
            <v-col cols="3" v-for="user in filterAccepted" :key="user._id">
           <template >
  <v-card 
    
    class="mx-auto mt-6"
    max-width="374"
    shaped
      elevation="5"

  >
    <v-card-title class="red--text text--darken-1">{{user.userName}}</v-card-title>

    <v-card-text>
  
      <div>
        <p class="font-weight-bold"><span class="grey--text text--darken-3">الاداره : </span> {{user.dept}}</p>
        <p class="font-weight-bold"><span class="grey--text text--darken-3">رقم الموظف : </span> {{user.userId}}</p>
        <p class="font-weight-bold"><span>نوع الاجازه: </span>{{user.offType}}</p>
        <p class="font-weight-bold"><span>تبدا بتاريخ: </span>{{user.startDate}}</p>
        <p class="font-weight-bold"><span>تنتهي بتاريخ:</span> {{user.endDate}}</p>
        <p class="font-weight-bold"><span>اجازه لمده: </span>{{user.period}} يوم</p>
       <!-- <p class="font-weight-bold"><span>يوم العوده: </span>{{user.returnDay}}</p>
        <p class="font-weight-bold"><span>تاريخ العوده: </span>{{user.returnDate}}</p>-->
        <p class="font-weight-bold"><span>سيقوم بالعمل بدلا مني: </span>{{user.doWorkName}}</p>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>


    <v-card-actions >
 

           <v-btn
        color="green lighten-1 "
        text
        @click="done(user._id,user)"
        class="mr-auto"
      >
        done
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import getDayOff from '../services/dayOffoperations';
export default {
    data() {
        return {
            teamDayOff: []
        }
    },computed:{
        ...mapGetters(["userInfo"]),
        filterAccepted(){
            return this.teamDayOff.filter(i => i.status === 'accepted')
        }
    },
    created() {
        getDayOff.getAllDayOff().then(res =>{
           this.teamDayOff = res.data;
        })
    },methods: {
        accept(id,user){
            user.status = "inital accepted";
            console.log(id,user)
            getDayOff.updateDayOffStatus(id,user).then(res =>{
                console.log(res)
            })
        },
        decline(id,user){
            user.status = "declined";
            console.log(id,user)
            getDayOff.updateDayOffStatus(id,user).then(res =>{
                console.log(res)
            })
        },
        done(id,user){
            user.status = "Done";
            console.log(id,user)
            getDayOff.updateDayOffStatus(id,user).then(res =>{
                console.log(res)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .dept{
        color: #797979;
    }
    p{
        font-size: 1rem;
        color: #01579B;
        // color: rgb(0, 30, 70);
        span{
            color: #212121;
            // color: rgb(0, 101, 160);
        }
    }
</style>