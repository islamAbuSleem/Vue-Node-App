<template>
  <div class="vac" dir="rtl">
    <!-- <p v-if="feedback" class="text-center red--text feedback">{{feedback}}</p> -->
        <v-alert
      prominent
      
      type="info"
      v-if="feedback"
      class="text-center feedback"
    >
     {{feedback}}
    </v-alert>
    <template>
      <div class="text-center">
        <v-snackbar
          color="success"
          class="mt-5 modal"
          v-model="snackbar"
          :timeout="timeout"
          v-if="snackbar"
          absolute
          centered
          text
        >
          {{ text }}
        </v-snackbar>
      </div>
    </template>

    <form>
      <div class="user-data pt-5">
        <h2 class="text-center">طلب اجازه</h2>
        <v-container class="text-center">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col class="d-flex ml-auto" cols="12" sm="4">
                  <v-text-field
                    v-model="userInfo.userId"
                    label="رقم الموظف"
                    readonly
                    reverse
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="12" sm="4" dir="ltr">
                  <v-select :items="items" label="اجازه" v-model="dayOff.offType" reverse >
                  </v-select>
                </v-col>
              </v-row>
            </v-col>

            <v-col>
              <v-row>
 

                <v-col cols="12" sm="6" class="ml-auto">
                  <v-text-field
                    label="اسم مقدم الطلب"
                    v-model="userInfo.name"
                    :hint="userInfo.name"
                    justify-right
                    reverse
                    readonly
                  ></v-text-field>
                </v-col>
                    <v-col cols="12" sm="3" class="ml-auto">
                  <v-menu
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dayOff.startDate"
                        label="تبدا بتاريخ"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        reverse
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dayOff.startDate" no-title></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="3" class="ml-auto">
                  <v-menu
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dayOff.endDate"
                        label="تنتهي بتاريخ"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        reverse
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dayOff.endDate" no-title></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>

                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="userInfo.dept"
                    label="السيد رئيس قطاع/مدير اداره"
                    readonly
                    reverse
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>

                <v-col cols="12" sm="3">
                  <v-text-field
                    label="اجازه لمده"
                    v-model="dayOff.period"
                    hint="بالايام"
                    justify-right
                    readonly
                    reverse
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" sm="4" class="ml-auto">
                  <v-menu
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dayOff.returnDate"
                        label="تاريخ العوده"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        reverse
                      ></v-text-field>
                    </template>

                    <v-date-picker v-model="dayOff.returnDate" no-title></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" class="ml-auto">
                  <v-text-field
                    label="العوده من الاجازه ومباشره العمل من يوم"
                    v-model="dayOff.returnDay"
                    justify-right
                    readonly
                    reverse
                  ></v-text-field>
                </v-col>
         

                <v-col cols="12" sm="4" class="ml-auto">
                  <v-text-field
                    label="سيقوم بالعمل خلال اجازتي"
                    v-model="dayOff.doWorkName"
                    justify-right
                    reverse
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn
            depressed
            @click="
              send(dayOff);
              sentSuccess();
              snackbar = true;
            "
            class="m-auto"
            color="primary text-center"
            :disabled="validated"
          >
            send
          </v-btn>
        </v-container>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import {renewDayOff} from '../mixins/renewDayOff'

export default {
  mixins:[renewDayOff],
  data: () => ({
    now: new Date(),
    feedback:null,
    snackbar: false,
    text: "Sent Successfully ",
    timeout: 3000,
    success: false,
    valid: true,
    dayOff: {
      userId: "",
      offType: "",
      userName: "",
      startDate: "",
      endDate: "",
      dept: "",
      period: "",
      returnDay: "",
      returnDate: "",
      doWorkName: "",
      team: "",
      status: "pending",
    },
    days: {
      0: "الاحد",
      1: "الاثنين",
      2: "الثلاثاء",
      3: "الاربعاء",
      4: "الخميس",
      5: "الجمعه",
      6: "السبت",
    },
  }),
  beforeUpdate() {
      this.calcStartAndEndDate()
      this.calcReturnDate()
      this.calcReturnDay()
  },
  created() {
    this.dayOff.userId = this.userInfo.userId;
    this.dayOff.dept = this.userInfo.dept;
    this.dayOff.userName = this.userInfo.name;
    if(this.userInfo.role == "Manager"){
        this.dayOff.status = "accepted by manager";
        this.dayOff.manager = `accepted by ${this.userInfo.name}`;
    }

  },
  computed: {
    ...mapGetters(["userInfo", "datOff", "response", "items"]),
    validated: function () {
      let dayOffValues = Object.values(this.dayOff);
      let boolDayOffValues = dayOffValues.map(function (x) {
        return !!x;
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.valid = boolDayOffValues.includes(false);
      return this.valid;
      
    },
  },
  watch: {
  dayOff: {
     handler(){
      this.quarterDayDate();
      this.quarterDayCheckAvailability()
      this.normalDayOffAvailability()
      this.urgentDayOffAvailability()
      this.halfDay()
     },
     deep: true
  },
  feedback:{
    handler(){
      setTimeout(()=>{
        this.feedback = null
      },15000)
    }
  }
},
  methods: {
    ...mapActions(["send"]),
    sentSuccess() {
      this.success = true;
      setTimeout(() => {
        this.$router.push({ name: "user", params: { name: this.userInfo.name } });
        this.success = false;
      }, 2000);
    },quarterDayDate(){
      // do stuff
          if(this.dayOff.offType == this.items[2]){
              this.dayOff.endDate = this.dayOff.startDate
              let x = this.dateToYMD(new Date(+new Date(this.dayOff.startDate) + (24 * 3600 * 1000)))
              if(this.dayOff.startDate == ''){
                this.dayOff.returnDate = ''
              }else{
              this.dayOff.returnDate = x

              // here if will increment start date by 1 until start date be come greater than  now by 1 then
              // make return date = start date + 1
              if(this.dayOff.startDate <= this.dateToYMD(this.now)){
                this.dayOff.startDate = x
              }
              }            
            }
    }
    ,quarterDayCheckAvailability(){
            if(this.dayOff.offType == this.items[2]){
            if(this.userInfo.quarterDay == '0'){
            this.feedback = 'لقد استخدمت اليوم الاداري بالفعل سيتم احتساب الاجازه من الاعتيادي'
            setTimeout(()=>{
              this.dayOff.offType = this.items[0];
            },5000)
           }
       }
    }
    ,normalDayOffAvailability(){
       if(this.dayOff.offType == this.items[0]){
         if(this.userInfo.normal <= '0'){
            this.feedback = 'ليس لديك رصيد اعتيادي سيتم الخصم من المرتب '
         }
       }
    }
    ,urgentDayOffAvailability(){
       if(this.dayOff.offType == this.items[1]){
         if(this.userInfo.urgent <= '0'){
            this.feedback = 'ليس لديك رصيد عارضه سيتم الخصم من المرتب '
         }
       }
    },
    halfDay(){
                if(this.dayOff.offType == this.items[4]){
              this.dayOff.endDate = this.dayOff.startDate
              let x = this.dateToYMD(new Date(+new Date(this.dayOff.startDate) + (24 * 3600 * 1000)))
              if(this.dayOff.startDate == ''){
                this.dayOff.returnDate = ''
              }else{
              this.dayOff.returnDate = this.dayOff.startDate
              // here if will increment start date by 1 until start date be come greater than  now by 1 then
              // make return date = start date + 1
              if(this.dayOff.startDate < this.dateToYMD(this.now)){
                this.dayOff.startDate = x
              }
              }            
            }
    },
    calcStartAndEndDate(){
          const date1 = new Date(this.dayOff.startDate);
    const date2 = new Date(this.dayOff.endDate);
    if (date2 < date1) {
      this.dayOff.period = "inValid";
      this.dayOff.returnDate = ''
    }else if(this.dayOff.offType == this.items[4]){
        this.dayOff.period = "0.5"
    } else {
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (isNaN(diffTime)) {
        this.dayOff.period = "";
      } else {
        this.dayOff.period = diffDays + 1;
      }
    }
    },
    calcReturnDate(){
           let inc_endDate = this.dateToYMD(new Date(+new Date(this.dayOff.endDate) + (24 * 3600 * 1000)))
     if(this.dayOff.endDate == ''){
       this.dayOff.returnDate = ''
     }else{
    this.dayOff.returnDate = inc_endDate

     }
    },
    calcReturnDay(){
    let x = new Date(this.dayOff.returnDate);
    x.getDay();
    this.dayOff.returnDay = this.days[x.getDay()];
    this.dayOff.team = this.userInfo.team;
    }
  },
};
</script>

<style lang="scss" scoped>
.vac {
  .user-data {
    border: 1px solid #ccc;
    background-color: #fafafa;
    border-radius: 5px;
    margin: 5%;

    .v-text-field__slot input {
      text-align: right;
    }
  }
  .modal {
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
  .feedback{
    // background-color: rgb(119, 149, 241);
    width: 20%;
    margin: auto;
    // padding: 5px;
    // border-radius: 4px;
    position: fixed;
    right: 1%;
    bottom: 7%;
    z-index: 59;
    opacity: .7;
  }
}
</style>
