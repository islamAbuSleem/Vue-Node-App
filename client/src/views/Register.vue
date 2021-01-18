<template>
  <div class="register w-50">
    <v-btn class="back-btn" color="#ddd" @click="$router.go(-1)">
      <v-icon>mdi-arrow-left-bold-outline</v-icon>
    </v-btn>
    <template>
      <v-alert type="error" v-if="userInfo.check" class="mt-5" outlined>
        {{ userInfo.feedback }}
      </v-alert>
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="9">
            <v-text-field
              v-model="userInfo.name"
              :counter="40"
              label="Name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="ml-auto">
            <v-text-field
              v-model.number="userInfo.userId"
              label="User ID"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="userInfo.email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field v-model="userInfo.normal" label="اعتيادي" required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field v-model="userInfo.urgent" label="عارضه" required>
            </v-text-field>
          </v-col>
        </v-row>

 <!--       <v-row>
          <v-col>
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
          </v-col>
          <v-col>
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
          </v-col>
        </v-row>
-->
        <v-row align="center">
          <v-col cols="3">
            <v-select
              :items="items"
              v-model="userInfo.role"
              label="Role"
            ></v-select>
          </v-col>
          <v-col cols="9" class="ml-auto">
            <v-row>
              <v-col>
                <select v-model="selectedDept" class="main-select">
                  <option value="" disabled>Department</option>
                  <option
                    v-for="(dept_obj, dept) in dept"
                    :value="dept"
                    :key="dept"
                  >
                    {{ dept }}
                  </option>
                </select>
              </v-col>
              <v-col>
                <select
                  :disabled="teams.length == 0"
                  v-model="selectedTeam"
                  class="main-select"
                  v-if="selectedDept"
                >
                  <option value="" disabled>Select a Team</option>
                  <option v-for="(team_obj, team) in teams" :key="team">
                    {{ team_obj }}
                  </option>
                </select>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="text-center">
            <v-btn color="error" @click="register" :disabled="validated"> Create User </v-btn>
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
      dept: {
        operation: ["oracle", "power", "system admin"],
        support: ["support", "help desk", "warsha"],
      },
      teams: [],
      selectedDept: "",
      selectedTeam: [],
      show1: false,
      items: ["Team member", "Team leader", "Manager"],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      userInfo: {
        valid: true,
        name: "",
        first: "",
        last: "",
        email: "",
        userId: "",
        dept: "",
        feedback: "",
        check: false,
        isactive: true,
        createdOn: Date.now().toString(),
        normal: "",
        urgent: "",
        role: "",
        team: "",
      },
    };
  },
  updated() {
          this.userInfo.first = this.userInfo.name.split(" ")[0];
      this.userInfo.last = this.userInfo.name.split(" ")[1];
      this.userInfo.dept = this.selectedDept;

      this.userInfo.team = this.selectedTeam;
  },

  watch: {
    selectedDept: function () {
      this.teams = [];
      this.selectedTeam = "";
      if (this.selectedDept.length > 0) {
        this.teams = this.dept[this.selectedDept];
      }
    },
  },
  methods: {
    register() {
      this.userInfo.first = this.userInfo.name.split(" ")[0];
      this.userInfo.last = this.userInfo.name.split(" ")[1];
      this.userInfo.dept = this.selectedDept;

      this.userInfo.team = this.selectedTeam;
      authService.register(this.userInfo).then((res) => {
        if (res.data["_id"]) {
          this.userInfo.check = false;
          this.userInfo.feedback = "";
                        setTimeout(()=>{
        this.$router.push({name: 'HrDashboard'})
      },2000)
        } else {
          this.userInfo.check = true;
          this.userInfo.feedback = res.data;
        }

        console.log(res.status);
      });
      console.log(JSON.stringify(this.userInfo));

    },

  },
  computed: {
        validated: function () {
let dummy = {};
          Object.assign(dummy,this.userInfo)

          delete dummy.feedback;
          delete dummy.check;
      let userValues = Object.values(dummy);
      console.log(dummy);
      console.log(this.userInfo);
      console.log(userValues)
      let boolUserValues = userValues.map(function (x) {
        return !!x;
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.valid = boolUserValues.includes(false);
      console.log(boolUserValues.includes(false));
      return this.valid;
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
  .main-select {
    width: 100%;
    min-width: 60px;

    border: 1px solid var(--select-border);
    padding: 0.25em 0.5em;
    font-size: 1rem;
    cursor: pointer;
    line-height: 1.1;
    display: inline-block;
    border-bottom: 1px solid #888;
    margin-left: 10px;
    color: #666;
    -moz-appearance: auto;
    -webkit-appearance: auto;
  }
  .back-btn{
    position: absolute;
    top: 20px;
    left: 20px;
  }
}
</style>
