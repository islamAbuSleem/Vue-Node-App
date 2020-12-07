<template>
    <div>
        {{$route.params.name || "null"}} 

    <v-row
    justify="end"
    align="end"
  >
    <v-chip class="ma-2 " color="">{{+userInfo.normal + +userInfo.urgent}}</v-chip>
             <v-chip class="ma-2 text-right" color="primary">الرصيد</v-chip>
  </v-row>
    <v-row
    justify="end"
    align="end"
  >
    <v-chip class="ma-2 " color="">{{+userInfo.normal}}</v-chip>
             <v-chip class="ma-2 text-right" color="primary">الاعتيادي</v-chip>
  </v-row>
    <v-row
    justify="end"
    align="end"
  >
    <v-chip class="ma-2 " color="">{{ +userInfo.urgent}}</v-chip>
             <v-chip class="ma-2 text-right" color="primary">العارضه</v-chip>
  </v-row>
       




    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
          
        }
    },created() {
        console.log("i'm here"+ " "+ this.$route.params.name)
    },computed:{
        ...mapGetters(["userInfo"])
    }
    
}

</script>

<style lang="scss" scoped>
 
</style>