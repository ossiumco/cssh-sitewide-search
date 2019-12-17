<template>
  <input type="search" v-model="query" />
</template>

<script>
import { connectSearchBox } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch";
import _ from "lodash";
export default {
  mixins: [createWidgetMixin({ connector: connectSearchBox })],
  props: {
    delay: {
      type: Number,
      default: 200,
      required: false
    }
  },
  data() {
    return {
      localQuery: ""
    };
  },
  destroyed() {
    console.log("destroyed");
    if (this.timerId) {
      console.log("clearing");
      clearTimeout(this.timerId);
    }
  },
  computed: {
    // query: {
    //   get() {
    //     return this.localQuery;
    //   },
    //   set: _.debounce(val => {
    //     console.log("allo");
    //     this.localQuery = val;
    //     this.state.refine(this.localQuery);
    //   }, this.delay)
    //   // set(val) {
    //   //   this.localQuery = val;
    //   //   console.log("delay", this.delay);
    //   //   _.debounce(() => {
    //   //     console.log("debounce", this);
    //   //     this.state.refine(this.localQuery);
    //   //   }, this.delay);
    //   //   // this.timerId = setTimeout(() => {
    //   //   //   console.log("timeout indeed");
    //   //   //   this.state.refine(this.localQuery);
    //   //   // }, this.delay);
    //   // }
    // }
  }
};
</script>
