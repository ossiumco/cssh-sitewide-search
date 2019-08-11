<template>
  <div id="vue-site-wide-search-app" class="modal-app">
    <button
      class="btn btn-orange pull-right"
      type="submit"
      role="button"
      style="background: rgb(127, 8, 8) !important;border-radius:5px!important;"
      @click="open=true"
    >
      <span class="glyphicon glyphicon-search"></span>
    </button>
    <modal
      style="text-align:center;"
      id="vue-site-wide-search-app-search-modal"
      v-model="open"
      :header="false"
      :footer="false"
      :append-to-body="true"
    >
      <search
        @closeModalEvent="open = false"
        :primaryIndex="primaryIndex"
        :additionalIndices="additionalIndices"
        :refinement="null"
        :indexes="indexes"
      ></search>
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
      indexes: null,
      primaryIndex: null,
      additionalIndices: []
    };
  },
  created() {
    if (window.algolia_indices) {
      console.log("window.algolia_indices", window.algolia_indices);
      let indexJson = tryParseJSON(window.algolia_indices);
      console.log("indexJson", indexJson);
      this.indexes = [...indexJson];
      if (indexJson) {
        if (!indexJson.length) {
          console.log("simple");
          this.primaryIndex = indexJson;
        } else {
          console.log("complex");
          this.primaryIndex = indexJson.shift(); // returns "zero"
          if (indexJson.length > 0) {
            console.log("remainder");
            this.additionalIndices = indexJson; // ["one", "two", "three"]
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
