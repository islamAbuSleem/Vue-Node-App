<template>
  <div dir="rtl">
    <v-row class="">
      <v-col cols="3" v-for="user in filterAccepted" :key="user._id">
        <template>
          <v-card class="mx-auto mt-6" max-width="374" shaped elevation="5">
            <v-card-title class="red--text text--darken-1">{{
              user.userName
            }}</v-card-title>

            <v-card-text>
              <div>
                <p class="font-weight-bold">
                  <span class="grey--text text--darken-3">الاداره : </span>
                  {{ user.dept }}
                </p>
                <p class="font-weight-bold">
                  <span class="grey--text text--darken-3">رقم الموظف : </span>
                  {{ user.userId }}
                </p>
                <p class="font-weight-bold">
                  <span>نوع الاجازه: </span>{{ user.offType }}
                </p>
                <p class="font-weight-bold">
                  <span>تبدا بتاريخ: </span>{{ user.startDate }}
                </p>
                <p class="font-weight-bold">
                  <span>تنتهي بتاريخ:</span> {{ user.endDate }}
                </p>
                <p class="font-weight-bold">
                  <span>اجازه لمده: </span>{{ user.period }} يوم
                </p>
                <!-- <p class="font-weight-bold"><span>يوم العوده: </span>{{user.returnDay}}</p>
        <p class="font-weight-bold"><span>تاريخ العوده: </span>{{user.returnDate}}</p>-->
                <p class="font-weight-bold">
                  <span>سيقوم بالعمل بدلا مني: </span>{{ user.doWorkName }}
                </p>
                <v-divider class="mb-5"></v-divider>

                <p class="font-weight-bold text-center" v-if="user.teamLeader">
                  <v-chip class="" color="primary" label>{{ user.teamLeader }}</v-chip>
                </p>
                <p class="font-weight-bold text-center" v-if="user.manager">
                  <v-chip class="" color="red accent-3" label text-color="white">{{
                    user.manager
                  }}</v-chip>
                </p>
                <p class="font-weight-bold text-center" v-if="user.topManager">
                  <v-chip class="" color="green" label text-color="white">{{
                    user.topManager
                  }}</v-chip>
                </p>
                <p class="font-weight-bold text-center" v-if="user.hrManager">
                  <v-chip class="" color="orange" label text-color="white">{{
                    user.hrManager
                  }}</v-chip>
                </p>
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn color="red lighten-2 " text @click="decline(user._id, user)">
                Decline
              </v-btn>
              <v-btn
                color="green lighten-1 "
                text
                @click="accept(user._id, user)"
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
import { mapGetters } from "vuex";
import getDayOff from "../services/dayOffoperations";
import getUser from "../services/userOperations";
export default {
  data() {
    return {
      teamDayOff: [],
      userData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo", "items"]),
    filterAccepted() {
      return this.teamDayOff.filter((i) => i.status === "inital accepted");
    },
  },
  created() {
    getDayOff.getDayOffForApprove(this.userInfo.dept).then((res) => {
      this.teamDayOff = res.data;
    });
  },
  methods: {
    accept(id, user) {
      user.status = "accepted by manager";
      user.manager = `accepted by ${this.userInfo.name}`;
      //update status
      getDayOff.updateDayOffStatus(id, user);


      // if (user.offType == this.items[0]) {
      //   this.userData.normal = +this.userData.normal - +user.period;
      // } else if (user.offType == this.items[1]) {
      //   this.userData.urgent = +this.userData.urgent - +user.period;
      // } else if (user.offType == this.items[2]) {
      //   this.userData.quarterDay = 0;
      // }

      getUser.getUser(user.userId).then((res) => {
        this.userData = res.data[0];
        if (user.offType == this.items[0]) {
          this.userData.normal = +this.userData.normal - +user.period;
        } else if (user.offType == this.items[1]) {
          this.userData.urgent = +this.userData.urgent - +user.period;
        } else if (user.offType == this.items[2]) {
          this.userData.quarterDay = 0;
        }
        getDayOff.updateDayOffCount(user.userId, this.userData)
      });
    },
    decline(id, user) {
      user.status = "declined";
      getDayOff.updateDayOffStatus(id, user);
    },
  },
};
</script>

<style lang="scss" scoped>
.dept {
  color: #797979;
}
p {
  font-size: 1rem;
  color: #01579b;
  // color: rgb(0, 30, 70);
  span {
    color: #212121;
    // color: rgb(0, 101, 160);
  }
}
</style>
