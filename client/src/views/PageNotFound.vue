<template>
  <div>
      <h2 class="not-found-2">404</h2>
      <h3 class="not-found-3"> Page not found</h3>
      <p>You will be redirected to your page within 5 seconds</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    created(){
        console.log("created")
        setTimeout(()=>{
        this.$router.push({ name: "user", params: { name: this.userInfo.name } });
        },5000)
    },
      computed: {
    ...mapGetters(["userInfo"]),
  },
}
</script>

<style lang="scss" scoped>

.not-found-2{
    text-align: center;
    font-size: 10rem;
    background: linear-gradient(60deg,rgb(108, 134, 146),rgb(87, 195, 245),rgb(121, 26, 230)) ;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.not-found-3{
    margin-top:-5% ;
    text-align: center;
    font-size: 3rem;
     background: linear-gradient(60deg,rgb(108, 134, 146),rgb(38, 165, 224),rgb(121, 26, 230)) ;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
p{
        text-align: center;
    font-size: 1.5rem;
      color: rgb(119, 143, 252);
      
}
</style>