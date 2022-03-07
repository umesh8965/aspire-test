<template>
  <div class="leftblock">
    <div class="leftblock-holder">
      <div class="leftblock-content">
        <img src="../assets/images/aspire-logo.svg" />
        <span class="leftblock-content__logocontent"
          >Trusted way of banking for 3,000+ SMEs and startups in
          Singapore</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.leftblock {
  position: relative;
}
.leftblock-holder {
  background-color: #0c365a;
  position: fixed;
  height: 100vh;
  min-height: 500px;
  width: 100%;
  left: 0;
  top: 0;
  max-width: 25%;
}
.leftblock-content {
  padding: 45px 60px 0 45px;
}
.leftblock-content__logocontent {
  display: block;
  font-size: 15px;
  color: #ffffff;
  margin-top: 20px;
  opacity: 0.3;
}
@media only screen and (max-width: 768px) {
    .leftblock-content__logocontent{
        display: none;
    }
  .leftblock-content {
    padding: 20px 10px 0 10px;
    text-align: right;
  }
  .leftblock-holder {
    max-width: inherit;
  }
}
</style>