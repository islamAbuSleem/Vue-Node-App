<template>
    <div dir="rtl">

<v-btn color="success"><download-excel
  class="btn btn-default"
  :data="json_data"
  :fields="json_fields"
  worksheet="My Worksheet"
  :name="formatDate"
>
  Download Excel
</download-excel></v-btn>

<v-btn color="warning" class="mr-5" @click="dashboard()"> Dashboard</v-btn>

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
    <v-divider></v-divider>
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
            <v-divider class="mb-5"></v-divider>

        <p class="font-weight-bold  text-center" v-if="user.teamLeader"> <v-chip class="" color="primary" label>{{user.teamLeader}}</v-chip></p>
        <p class="font-weight-bold text-center" v-if="user.manager"> <v-chip class="" color="red accent-3" label text-color="white">{{user.manager}}</v-chip></p>
        <p class="font-weight-bold text-center" v-if="user.topManager"> <v-chip class="" color="green" label text-color="white">{{user.topManager}}</v-chip></p>
        <p class="font-weight-bold text-center" v-if="user.hrManager"> <v-chip class="" color="orange" label text-color="white">{{user.hrManager}}</v-chip></p>

      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>


    <v-card-actions v-if="!user.hrManager && user.role=='manager'">
 

 <!--          <v-btn
        color="green lighten-1 "
        text
        @click="done(user._id,user)"
        class="mr-auto"
      >
        done
      </v-btn>-->
       <v-btn
        color="red lighten-2 "
        text
        @click="decline(user._id,user)"
      >
        Decline
      </v-btn>
           <v-btn
        color="green lighten-1 "
        text
        @click="accept(user._id,user)"
        class="mr-auto"
      >
        Approve
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
          teamDayOff: [],
          json_fields: {
          "userId":"userId",
          "userName": "userName",
          "startDate": "startDate",
          "endDate": "endDate",
          "period": "period",
          "dept": "dept",
          "doWorkName": "doWorkName",
          "team": "team",
          "returnDay": "returnDay",
    },json_data: []
    , json_meta: [
      [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    ],
        }
    },
    
    computed:{
        ...mapGetters(["userInfo"]),
        filterAccepted(){
            return this.teamDayOff.filter(i => i.topManager !== '')
        },
        formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return `dayOff-${[year, month, day].join('-')}.xls`;
}
    },
    created() {
        getDayOff.getAllDayOff().then(res =>{
           this.teamDayOff = res.data;
                this.json_data = this.teamDayOff.filter(i => i.status === 'accepted')

        })

    },methods: {
        accept(id,user){
            user.status = "accepted";
            user.hrManager =  `accepted by ${this.userInfo.name}`
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
            user.status = "accepted";
            console.log(id,user)
            getDayOff.updateDayOffStatus(id,user).then(res =>{
                console.log(res)
            })
        },
        dashboard(){
          this.$router.push({name: 'HrDashboard'})
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