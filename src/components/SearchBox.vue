<template>
  <input type="search" v-model="query" />
</template>

<script>
import { connectSearchBox } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch";

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
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  },
  computed: {
    query: {
      get() {
        return this.localQuery;
      },
      set(val) {
        this.localQuery = val;
        this.timeoutId = setTimeout(() => {
          this.state.refine(this.localQuery);
        }, this.delay);
      }
    }
  }
};
</script>
