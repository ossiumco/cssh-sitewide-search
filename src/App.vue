<template>
  <div>
    <button
      class="btn btn-orange pull-right"
      type="submit"
      role="button"
      style="background: rgb(127, 8, 8) !important;"
      @click="open=true"
    >
      <span class="glyphicon glyphicon-search"></span>
    </button>
    <modal
      style="text-align:center;"
      v-model="open"
      :header="false"
      :footer="false"
      :append-to-body="true"
    >
      <search :primaryIndex="primaryIndex" :additionalIndicies="additionalIndicies"></search>
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
      open: false,
      primaryIndex: null,
      additionalIndicies: []
    };
  },
  created() {
    if (window.algolia_indices) {
      let indexJson = tryParseJSON(window.algolia_indices);
      if (indexJson) {
        if (!indexJson.length) {
          this.primaryIndex = indexJson;
        } else {
          this.primaryIndex = indexJson.shift(); // returns "zero"
          if (indexJson.length > 0) {
            this.additionalIndicies = indexJson; // ["one", "two", "three"]
          }
        }
      }
    }
  }
};

function tryParseJSON(possibleJSONString) {
  try {
    var o = JSON.parse(possibleJSONString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {
    if (possibleJSONString !== "") {
      let indexArray = possibleJSONString.split(",");
      let algoliaIndexArray = [];
      for (let i = 0; i < indexArray.length; i++) {
        const element = indexArray[i];
        let object = { value: element.trim(), label: "" };
        algoliaIndexArray.push(object);
      }
      return algoliaIndexArray;
    }
  }
  return false;
  // Prime (a default?)
  // name="wp_prime_searchable_posts"
  // label="Prime"
}
</script>

<style lang="scss">
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
