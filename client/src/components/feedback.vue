<template>
    <div class="text-center" dir="ltr">
        <v-snackbar
          color="success"
          class="modal"
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
<script>
export default {
    props:["text"],
      data() {
          return {
                timeout: 30000000,
                    snackbar: true,

          }
      },    
}
</script>

<style lang="scss" scoped>
  .modal {
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
</style>