<template>
  <div class="register w-50">
    <template>
      <v-alert type="error" v-if="userInfo.check" class="mt-5" outlined>
        {{ userInfo.feedback }}
      </v-alert>
      <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
      
        <v-col cols="9">
                <v-text-field
          v-model="userInfo.name"
          :counter="15"
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


        <v-text-field
          v-model="userInfo.email"
          label="E-mail"
          required
        ></v-text-field>
<v-row>
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


        <p v-if="passwordMatch">
          {{ passwordMatch }}
        </p>
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
                     <option v-for="(dept_obj, dept) in dept" :value="dept" :key="dept">{{dept}}</option>
                </select>
</v-col>
<v-col>
                    <select :disabled="teams.length == 0" v-model="selectedTeam" class="main-select" v-if="selectedDept">
                    <option value="" disabled>Select a Team</option>
                    <option v-for="(team_obj, team) in teams" :key="team">{{team_obj}}</option>
                </select>
</v-col>



</v-row>
             

     

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
      dept:{
              "operation":["oracle","power","system admin"],
              "support":["support","help desk", "warsha"]
          },
      teams:[],
      selectedDept: "",
      selectedTeam:[],
      passwordMatch: "",
      show1: false,
      items: ["Team member", "Team leader", "Manager"],
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
        normal:"",
        urgent:"",
        role:"",
        team:""
      },
    };
  },beforeUpdate() {
    console.log(this.userInfo) 
  }
  
  ,watch:{
        selectedDept:function(){
            this.teams = [];
            this.selectedTeam = ""
            if(this.selectedDept.length > 0){
                this.teams = this.dept[this.selectedDept]
            }
        }
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
        } else {
          this.userInfo.check = true;
          this.userInfo.feedback = res.data;
        }
        console.log(res.status);
      });
      console.log(JSON.stringify(this.userInfo))
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
  .main-select{
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
}
</style>
