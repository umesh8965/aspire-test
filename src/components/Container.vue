<template>
<b-container fluid>
  <b-row>
    <b-col sm="3"><LeftPanel /></b-col>
    <b-col sm="9"><RightPanel /></b-col>
  </b-row>
</b-container>
</template>

<script>
import LeftPanel from "./LeftPanel.vue";
import RightPanel from "./RightPanel.vue";
import "@/assets/css/style.css";

export default {
  name: 'Container',
  components: {
    LeftPanel,
    RightPanel
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
