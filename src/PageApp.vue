<template>
  <div id="vue-site-wide-search-app" class="page-app">
    <search
      :primaryIndex="primaryIndex"
      :additionalIndices="additionalIndices"
      :refinement="refinement"
      :indexes="indexes"
    ></search>
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
      indexes: null,
      additionalIndices: [],
      refinement: ""
    };
  },
  created() {
    if (window.algolia_indices) {
      let indexJson = tryParseJSON(window.algolia_indices);
      if (indexJson) {
        console.log("indexJson", indexJson);
        this.indexes = [...indexJson];
        if (!indexJson.length) {
          this.primaryIndex = indexJson;
        } else {
          this.primaryIndex = indexJson.shift(); // returns "zero"
          if (indexJson.length > 0) {
            this.additionalIndices = indexJson; // ["one", "two", "three"]
          }
        }
      }
    }
    let test = getUrlVars();
    if (test.searchFor) {
      this.refinement = decodeURI(test.searchFor);
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

function getUrlVars() {
  var vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
</script>

<style lang="scss">
#vue-site-wide-search-page-app {
}
</style>
