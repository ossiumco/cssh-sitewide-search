<template>
  <div>
    <search
      :primaryIndex="primaryIndex"
      :additionalIndicies="additionalIndicies"
      :refinement="refinement"
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
      additionalIndicies: [],
      refinement: ""
    };
  },
  created() {
    if (window.algolia_indicies) {
      let indexJson = tryParseJSON(window.algolia_indicies);
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
    let test = getUrlVars();
    console.log("typeof", typeof test);
    if (test.searchFor) {
      console.log("JESSE JES JSEJASDF", decodeURI(test.searchFor));
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
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
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
body {
  /*"Helvetica Neue", Helvetica, Arial, sans-serif*/
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

@media screen and (min-width: 768px) {
  .modal:before {
    display: inline-block;
    vertical-align: middle;
    content: " ";
    height: 100%;
  }
}
.modal {
  @media (max-width: 768px) {
    left: 2.5vw;
    right: auto;
  }
}
.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  @media screen and (min-width: 768px) {
    width: 85% !important;
    max-width: 1085px !important;
    margin: 20px 0 !important;
  }
  @media (max-width: 768px) {
    display: block;
    width: 95vw !important;
  }
}
.modal-content {
  padding-bottom: 0;
  border-radius: 0 !important;
  @media screen and (min-width: 768px) {
    border-radius: 6px !important;
  }
}

.modal-content {
  padding-bottom: 0 !important;
}
.modal-body {
  padding: 0 25 10px !important;
  @media screen and (min-width: 768px) {
    padding: 25px 25px 10px !important;
  }
}
</style>
