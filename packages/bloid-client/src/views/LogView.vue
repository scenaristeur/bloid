<template>
  <div>
    {{JSON.stringify(logs)}}
  </div>
</template>

<script>
export default {
  name: "LogView",
  data(){
    return {
      logs: []
    }
  },
  watch : {
    ldTestResult(){
      this.logs.unshift(this.ldTestResult)
    }
  },
  computed: {
    ldTestResult() {
      return this.$store.state.ld.ldTestResult
    },
  }
}
</script>

<style>

</style>
