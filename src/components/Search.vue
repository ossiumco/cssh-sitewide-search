<template>
  <div>
    <div v-for="(algoliaIndex, index) in indexes" :key="index">
      <ais-instant-search
        :search-client="searchClient"
        :index-name="algoliaIndex.value"
        :label="algoliaIndex.label"
      >
        <div v-if="index > 0">
          <ais-configure :query="query" />
        </div>
        <div v-if="index === 0">
          <ais-search-box
            v-if="urlRefinement"
            :value="urlRefinement"
            :class-names="{
        'ais-SearchBox-input': 'search-page-vue-search-input'
      }"
          ></ais-search-box>
          <ais-search-box v-else autofocus v-model="query" placeholder="Search">
            <!-- <debounced-search-box :delay="400" /> -->
          </ais-search-box>
        </div>
        <p
          v-if="algoliaIndex.label === 'primary' && query"
          class="result_title"
        >Results from this site</p>
        <p
          v-if="algoliaIndex.label !== 'primary' && query"
          class="result_title"
        >{{algoliaIndex.label}}</p>
        <ais-hits
          :class-names="{
        'ais-Hits': 'site-search-ais-Hits',
        'ais-Hits-list': 'site-search-Hits-list',
        'ais-Hits-item': 'site-search-Hits-item'
      }"
        >
          <template slot="item" slot-scope="{ item }">
            <div @click="hitRedirect(item)">
              <Spotlights
                v-if="item.post_type && item.post_type_label==='Spotlights'"
                v-bind:hit="item"
              ></Spotlights>
              <Faculty
                v-else-if="item.post_type && item.post_type_label==='Faculty'"
                v-bind:hit="item"
              ></Faculty>
              <Events
                v-else-if="item.post_type && item.post_type_label==='Events'"
                v-bind:hit="item"
              ></Events>
              <News
                v-else-if="item.post_type && item.post_type_label==='Newsletters'"
                v-bind:hit="item"
              ></News>
              <Pathways
                v-else-if="item.post_type && item.post_type_label==='Publications'"
                v-bind:hit="item"
              ></Pathways>
              <Posts v-else-if="item.post_type && item.post_type_label==='Posts'" v-bind:hit="item"></Posts>
              <Positions
                v-else-if="item.post_type && item.post_type_label==='Positions'"
                v-bind:hit="item"
              ></Positions>
              <Publications
                v-else-if="item.post_type && item.post_type_label==='Posts'"
                v-bind:hit="item"
              ></Publications>
              <Pages v-else-if="item.post_type && item.post_type_label==='pages'" v-bind:hit="item"></Pages>
              <Profiles v-else v-bind:hit="item"></Profiles>
            </div>
          </template>
        </ais-hits>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";

// import DebouncedSearchBox from "./SearchBox";
import Spotlights from "./Spotlights";
import Faculty from "./Faculty";
import Events from "./Events";
import News from "./News";
import Pathways from "./Pathways";
import Posts from "./Posts";
import Publications from "./Posts";
import Positions from "./Posts";
import Pages from "./Posts";
import Profiles from "./Profiles";

import Noresult from "./Noresult";
import { config } from "@/algolia.config.js";

const algoliaClient = algoliasearch(config.appId, config.key);

const algoliaSearchClient = {
  search(requests) {
    if (
      requests.every(({ params }) => !params.query || params.query.length < 3)
    ) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          processingTimeMS: 0
        }))
      });
    }

    return algoliaClient.search(requests);

    // https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/out-of-the-box-analytics/how-to/how-to-remove-empty-search-from-analytics/?language=vue#exclude-searches-from-your-analytics
    // Why? We need to exclude empty searches from analytics

    // const newRequests = requests.map(request => {
    //   // test for empty string and change request parameter: analytics
    //   if (!request.params.query || request.params.query.length === 0) {
    //     request.params.analytics = false;
    //   }
    //   return request;
    // });
    // return algoliaClient.search(newRequests);
  }
};

export default {
  components: {
    // DebouncedSearchBox,
    Spotlights,
    Faculty,
    Events,
    News,
    Pathways,
    Posts,
    Publications,
    Pages,
    Positions,
    Profiles,
    Noresult
  },
  name: "AlgoliaSearchUI",
  props: ["primaryIndex", "additionalIndices", "refinement", "indexes"],
  data() {
    return {
      searchClient: algoliaSearchClient,
      query: "",
      FoundResult: "0",
      sawFirstIndex: "false",
      someValue: this.refinement,
      searchPageEventAnchor: false
    };
  },
  computed: {
    urlRefinement: {
      get() {
        if (this.someValue) {
          return this.someValue;
        } else {
          return false;
        }
      },
      set(newValue) {
        this.someValue = null;
        return newValue;
      }
    }
  },
  directives: {
    trim: {
      // directive definition
      inserted: function(el) {
        var str = el.innerHTML;
        var max_words = 200;
        var resultString = str.split(" ");
        resultString = resultString.slice(0, max_words).join(" ");
        if (resultString.length > max_words)
          resultString = resultString + "...";
        el.innerHTML = resultString;
      }
    }
  },
  methods: {
    alertHello() {
      alert("hello");
    },
    closeModal() {
      this.$emit("closeModalEvent");
    },
    hitRedirect(selected) {
      if (selected) {
        window.open(selected.permalink);
      }
    },
    indicesToSuggestions(indices) {
      return indices.map(({ hits }) => ({ data: hits }));
    },
    isEmpty: function(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    },
    SawFirstIndexVal: function() {
      var result = false;
      if (this.sawFirstIndex == "false") result = true;
      this.sawFirstIndex = "true";
      return result;
    },

    log: function(e) {
      console.log(e);
    },
    handleKeyCheck: function(event) {
      console.log("handling key check");
      let keyTest = KeyCheck(event);
      if (keyTest) {
        if (this.urlRefinement.length) {
          this.urlRefinement = this.urlRefinement.substring(
            0,
            this.urlRefinement.length - 1
          );
        } else if (!this.urlRefinement && this.searchPageEventAnchor) {
          this.searchPageEventAnchor = false;
        } else {
          return;
        }
      }
    }
  },
  mounted: function() {
    // console.log("primaryIndex", this.primaryIndex);
    // console.log("additionalIndices", this.additionalIndices);
    if (this.urlRefinement) {
      setTimeout(() => {
        let eventAnchor = document.getElementsByClassName(
          "search-page-vue-search-input"
        );
        this.searchPageEventAnchor = eventAnchor[0].addEventListener(
          "keydown",
          this.handleKeyCheck
        );
      }, 500);
    }
  }
};

function KeyCheck(event) {
  var KeyID = event.keyCode;
  if (KeyID === 8 || KeyID === 46) {
    return true;
  } else {
    return false;
  }
  // switch (KeyID) {
  //   case 8:
  //     // alert("backspace");
  //     break;
  //   case 46:
  //     // alert("delete");
  //     break;
  //   default:
  //     break;
  // }
}
</script>
<style lang="scss">
.site-search-ais-Hits {
  margin: 0 1.4em;
}
.site-search-Hits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.site-search-Hits-item {
  &:not(:last-of-type) {
    border-bottom: 1px solid #404040;
  }
  .result-item {
    display: flex;
    margin: 0 0 0 0;
    padding: 0.7em 0;
    cursor: pointer;
  }
  .result-item .content {
    padding-left: 1em;
    padding-right: 1em;
  }
  .result-item img.profileImg {
    width: 5em !important;
  }
  .result-item p {
    font-size: 15px;
  }
}
</style>

<style lang="scss">
#vue-site-wide-search-app,
#vue-site-wide-search-app-search-modal {
  // modal specific stuff
  &.modal {
    @media (min-width: 768px) {
      &:before {
        display: inline-block;
        vertical-align: middle;
        content: " ";
        height: 100%;
      }
    }
    &.in .modal-dialog {
      margin: auto !important;
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
    }
    .modal-content {
      padding-bottom: 0 !important;
      border-radius: 0 !important;
      @media screen and (min-width: 768px) {
        border-radius: 6px !important;
      }
    }
    // .modal-body {
    //   padding: 0 25 10px !important;
    //   @media screen and (min-width: 768px) {
    //     padding: 25px 25px 10px !important;
    //   }
    // }
  }
  // end modal specific stuff
  .result_title {
    @media screen and (max-width: 768px) {
      padding: 0.5em 0;
    }
    font-weight: 700;
    font-size: 1.5em !important;
    font-weight: bold;
    font-size: 1.5em !important;
    margin: 0em 1em;
    padding: 0.5em 0;
    color: #404040;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  .photo {
    display: inline-block;
    padding-right: 1em;
    img {
      max-width: 100px;
    }
  }
  /* Padding between content title and detail*/
  .content {
    // display: inline-block;
    .detail {
      padding-top: 18px;
    }
  }
  .ais-Highlight {
    // font-weight: 700 !important;
    // font-size: 15px !important;
    margin-bottom: 20px;
  }
  svg.ais-SearchBox-submitIcon {
    width: 3em !important;
    height: 3em !important;
    /* stroke-width: 16px !important; */
  }
  input.ais-SearchBox-input:focus {
    outline-color: white;
  }
  input.ais-SearchBox-input {
    border: none;
    // box-shadow: 10px 10px 10px -15px;
  }
  .ais-Autocomplete input {
    display: none !important;
  }
  input.ais-SearchBox-input {
    @media screen and (max-width: 768px) {
      padding-left: 0;
    }
    width: 100%;
    font-size: 3em;
    padding-left: 18px;
    font-weight: bold;
  }
  button.ais-SearchBox-reset {
    display: none;
  }
  svg.ais-SearchBox-submitIcon path {
    stroke: black;
    stroke-width: 3.5px;
    -webkit-text-stroke-width: 4px !important;
    transform: scale(0.7);
    transform: translate(7px, 7px) scale(0.7);
  }
  form.ais-SearchBox-form {
    display: flex;
  }
  button.ais-SearchBox-submit {
    /*background: black;*/
    background: transparent;
    border: none;
    margin-left: -5em;
    width: 5em;
    height: 5em;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 3;
  }
  /* Highlighted mark*/
  mark {
    background: gray !important;
    color: white !important;
  }
  .mobile-close-button {
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
  // end of namespacing
}
</style>
