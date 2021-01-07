<template>
  <div class="history">
      <div class="dayoff-history"  v-if="userHisotry.length">
          <h3 class="text-center my-5">الاجازات التي تم طلبها</h3>
      <template>
        <v-expansion-panels focusable>
            <v-expansion-panel
            v-for="(item,i) in userHisotry"
            :key="i"
            >
            <v-expansion-panel-header> <h3> From: </h3>{{item.startDate}}  <h3 class="ml-5"> to: </h3> {{item.endDate}}</v-expansion-panel-header>
            <v-expansion-panel-content class="text-right" dir="rtl">
                <v-row>
                    <v-col cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">نوع الاجازه: </span>{{item.offType}}</p></v-col>
                    <v-col cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">المده: </span>{{item.period}}</p></v-col>
                    <v-col cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">تاريخ العوده:</span> {{item.returnDate}}</p></v-col>
                    <v-col cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">يوم العوده: </span>{{item.returnDay}}</p></v-col>
                    <v-col cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">الموافقه: </span>{{item.status}}</p></v-col>
                    <v-col cols="12" sm="4"><p class="mt-3"><span class="font-weight-black"> القائم بالعمل بدلا مني:</span> {{item.doWorkName}}</p></v-col>
                </v-row>

            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        </template>
          
      </div>
      <div class="dayoff-history" v-if="ezen.length">
          <h3 class="text-center my-5" >الاذونات التي تم طلبها</h3>
      <template>
        <v-expansion-panels focusable>
            <v-expansion-panel
            v-for="(item,i) in ezen"
            :key="i"
            >
            <v-expansion-panel-header> {{item.date}} </v-expansion-panel-header>
            <v-expansion-panel-content class="text-right" dir="rtl">
                <v-row>
                    <v-col v-if="item.type == 'ezen enseraf'" cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">التوقيت: </span>{{item.time}}</p></v-col>
                    <v-col cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">النوع: </span>{{item.type}}</p></v-col>
                    <v-col v-if="item.type == 'ezen m2moria'" cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">تبدأ بتاريخ :</span> {{item.startDate}}</p></v-col>
                    <v-col v-if="item.type == 'ezen m2moria'" cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">تاريخ العوده:</span> {{item.endDate}}</p></v-col>
                    <v-col v-if="item.type == 'ezen m2moria'" cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">الوسيله: </span>{{item.means}}</p></v-col>
                    <v-col v-if="item.type == 'ezen m2moria'" cols="12" sm="4"><p class="mt-3"><span class="font-weight-black">المده: </span>{{item.period}} ايام</p></v-col>
                    <v-col v-if="item.type == 'ezen m2moria'" cols="12" sm="4"><p class="mt-3"><span class="font-weight-black"> سبب المأموريه:</span> {{item.desc}}</p></v-col>
                </v-row>

            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        </template>
          
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import getDayOff from '../services/dayOffoperations';
import getEzen from '../services/ezenOperations';

export default {
data() {
    return {
        userHisotry:[],
        ezen:[]
    }
},
created() {
     getDayOff.getDayOfForUser(this.userInfo.userId).then(res => {
         this.userHisotry = res.data
     })
     getEzen.getEzenForUser(this.userInfo.userId).then(res => {
         this.ezen = res.data
     })
},
computed: {
     ...mapGetters(["userInfo"]),
},
}
</script>

<style lang="scss" scoped>
.dayoff-history{
    width: 60%;
    margin: auto;
}
</style>