<template>
  <div class="edit-user">
      <span class="close-icon" @click="close()">×</span>
  <v-form class="data-holder text-center">
<v-row >
    <v-col cols="12" sm="4">
          <v-text-field
            label="Name"
            v-model="user.name"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="User Id"
            v-model="user.userId"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="E-mail"
            v-model="user.email"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="اعتيادي"
            v-model="user.normal"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="عارضه"
            v-model="user.urgent"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="Department"
            v-model="user.dept"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="Team"
            v-model="user.team"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="Role"
            v-model="user.role"
          ></v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
          <v-text-field
            label="permission"
            v-model="user.name"
          ></v-text-field>
    </v-col>


</v-row>
    <v-btn 
    class="m-auto"
    color="warning"
    @click="save"
    >
        Save
    </v-btn>
  </v-form>
  </div>
</template>

<script>
export default {
props:["user"],
methods: {
    close(){
        this.$emit('close')
    },
    save(){
        this.$emit('save',this.user,)
    }
},
}
</script>

<style lang="scss" scoped>
.edit-user{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 99;
    padding-top: 30px;
    overflow: hidden;
    .close-icon{
        color: #fff;
        font-size: 1.6rem;
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
    }
    .data-holder{
        background-color: rgb(247, 247, 247);
        width: 80%;
        margin: 10px auto;
        padding: 35px 15px;
    }
}
</style>