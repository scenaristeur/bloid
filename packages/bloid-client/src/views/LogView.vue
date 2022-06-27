<template>
  <div>
    {{ldTestResult}}
  </div>
</template>

<script>
export default {
  name: "LogView",
  computed: {
    ldTestResult() {
      return this.$store.state.ld.ldTestResult
    },
  }
}
</script>

<style>

</style>
