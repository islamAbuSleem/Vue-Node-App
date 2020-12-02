<template>
    <div>
        {{$route.params.name || "null"}} 
    </div>
</template>

<script>
export default {
    data() {
        return {
            p:"hello from here"
        }
    },created() {
        console.log("i'm here"+ " "+ this.$route.params.name)
    },
}
</script>