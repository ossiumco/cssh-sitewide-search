<template>
  <div id="app">
    <btn type="primary" @click="open=true">Search</btn>
    <modal v-model="open" :header="false" :footer="false">
      <search></search>
    </modal>
  </div>
</template>

<script>
import Search from "@/components/Search";
export default {
  name: "NetworkSearch",
  components: {
    Search
  },
  data() {
    return {
      open: false
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media screen and (min-width: 768px) {
  .modal:before {
    display: inline-block;
    vertical-align: middle;
    content: " ";
    height: 100%;
  }
}

.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
.modal-content {
  padding-bottom: 0;
}
</style>
