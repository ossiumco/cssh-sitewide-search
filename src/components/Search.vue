<template>
  <div class="mini-search">
    <ais-instant-search
      :search-client="searchClient"
      :index-name="primaryIndex.value"
      :label="primaryIndex.label"
    >
      <ais-configure :hitsPerPage="3" :restrictSearchableAttributes="['post_title']"/>
      <ais-search-box v-if="urlRefinement" :value="urlRefinement"/>
      <ais-search-box v-else autofocus placeholder="Search"/>

      <ais-autocomplete :indices="additionalIndicies">
        <div slot-scope="{ currentRefinement, indices, refine }">
          <input
            class="form-control input-lg"
            type="search"
            :value="refinement || currentRefinement"
            placeholder="Search..."
            @input="refine($event.currentTarget.value)"
            autofocus
            show-loading-indicator
          >
          <div v-if="currentRefinement" class="result_hits">
            <ul v-for="(index,x) in indices" :key="x" class="search-results">
              <span v-if="index.hits.length">
                <p
                  v-if="index.label === 'primary'"
                  class="result_title jesse"
                >Results from this site</p>
                <p v-else class="result_title homer">{{index.label}}</p>

                <hr class="result_title_hr">
                <li class="result-items">
                  <ul>
                    <li
                      v-for="(hit,i) in index.hits"
                      :key="i"
                      @click="hitRedirect(hit)"
                      class="result-item row"
                    >
                      <!--
                      TODO
                      This would be a good place to put 'sub-components' for each type of result - e.g. post, faculty, spotlight, etc.
                      -->

                      <Spotlights
                        v-if="hit.post_type && hit.post_type_label==='Spotlights'"
                        v-bind:hit="hit"
                      ></Spotlights>
                      <Faculty
                        v-else-if="hit.post_type && hit.post_type_label==='Faculty'"
                        v-bind:hit="hit"
                      ></Faculty>
                      <Events
                        v-else-if="hit.post_type && hit.post_type_label==='Events'"
                        v-bind:hit="hit"
                      ></Events>
                      <News
                        v-else-if="hit.post_type && hit.post_type_label==='Newsletters'"
                        v-bind:hit="hit"
                      ></News>
                      <Pathways
                        v-else-if="hit.post_type && hit.post_type_label==='Publications'"
                        v-bind:hit="hit"
                      ></Pathways>
                      <Posts
                        v-else-if="hit.post_type && hit.post_type_label==='Posts'"
                        v-bind:hit="hit"
                      ></Posts>
                      <Positions
                        v-else-if="hit.post_type && hit.post_type_label==='Positions'"
                        v-bind:hit="hit"
                      ></Positions>
                      <Publications
                        v-else-if="hit.post_type && hit.post_type_label==='Posts'"
                        v-bind:hit="hit"
                      ></Publications>
                      <Pages
                        v-else-if="hit.post_type && hit.post_type_label==='pages'"
                        v-bind:hit="hit"
                      ></Pages>
                      <Profiles v-else v-bind:hit="hit"></Profiles>
                    </li>
                    <hr class="item_hr">
                  </ul>
                </li>
              </span>
              <!-- Show NoResult Template for empty hits -->
              <span v-if="!index.hits.length">
                <Noresult v-bind:index="index" :searchTerm="currentRefinement"></Noresult>
              </span>
            </ul>
          </div>
        </div>
      </ais-autocomplete>
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";

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
export default {
  components: {
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
  props: ["primaryIndex", "additionalIndicies", "refinement"],
  data() {
    return {
      searchClient: algoliasearch(config.appId, config.key),
      query: "",
      FoundResult: "0",
      sawFirstIndex: "false"
    };
  },
  computed: {
    urlRefinement() {
      if (this.refinement) {
        return this.refinement;
      } else {
        return false;
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
    }
  },
  mounted: function() {
    console.log("primaryIndex", this.primaryIndex);
    console.log("additionalIndicies", this.additionalIndicies);
  }
};
</script>

<style lang="scss">
.mobile-close-button {
  @media screen and (min-width: 768px) {
    display: none;
  }
}
.search-results {
  list-style: none;
  margin: 0;
  padding: 0;
}
.result-items {
  ul {
    @media screen and (max-width: 768px) {
      padding-left: 0 !important;
    }
    list-style: none;
  }
}
.result-item {
  cursor: pointer;
  margin-bottom: 1em;
}
$searchboxFontSize: 3em;
$searchIconColor: black;
$headerColor: #404040;
$sub_titleColor: #505050;
$textColor: #9e9e9e;
$borderColor: black;
$borderWidth: 3px;
$titleLeftPadding: 18px;
$sub_titleTopPadding: 5px;
$sub_titleBottomPadding: 5px;
$resultRightPadding: 20px;
$highlightcolor: white;
$highlightBackcolor: gray;
$paddingfirstresult: 10px;
$paddingcontent: $titleLeftPadding;

input.ais-SearchBox-input:focus {
  outline-color: white;
}
input.ais-SearchBox-input {
  border: none;
  box-shadow: 10px 10px 10px -15px;
}
.ais-Autocomplete input {
  display: none !important;
}
input.ais-SearchBox-input {
  @media screen and (max-width: 768px) {
    padding-left: 0;
  }
  width: 100%;
  font-size: $searchboxFontSize;
  padding-left: $titleLeftPadding;
  font-weight: bold;
}
svg.ais-SearchBox-submitIcon {
  width: 3em !important;
  height: 3em !important;
  /* stroke-width: 16px !important; */
}
button.ais-SearchBox-reset {
  display: none;
}
svg.ais-SearchBox-submitIcon path {
  stroke: $searchIconColor;
  stroke-width: 3.5px;
  -webkit-text-stroke-width: 4px !important;
  transform: scale(0.7);
  transform: translate(7px, 7px) scale(0.7);
}
form.ais-SearchBox-form {
  display: flex;
}
button.ais-SearchBox-submit {
  /*background: $searchIconColor;*/
  background: transparent;
  border: none;
  margin-left: -5em;
  width: 5em;
  height: 5em;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 3;
}
/* Styling for Result*/
.result_hits {
  // border: $borderWidth solid $borderColor;
  margin-top: 1.5em;
  min-height: 50vh !important;
}
.result_title {
  @media screen and (max-width: 768px) {
    padding: 0.5em 0;
  }
  font-weight: 700;
  font-size: 1.5em !important;
  padding: 0.5em;
  font-weight: bold;
  font-size: 1.5em !important;
  margin: 0em;
  padding: 0.5em 0.5em 0 $titleLeftPadding;
  color: $headerColor;
}
hr.result_title_hr {
  @media screen and (max-width: 768px) {
    margin: 0.3em 0 0;
  }
  margin: 0.3em 1.4em 0;
  border: 1px solid $borderColor;
}
hr.item_hr {
  margin: $titleLeftPadding 0 !important;
  margin-right: $resultRightPadding !important;
  border: 1px solid $borderColor;
}
.sub_title {
  padding-left: $titleLeftPadding !important;
  padding-top: $sub_titleTopPadding !important;
  padding-bottom: $sub_titleBottomPadding !important;
  margin: 0px !important;
  text-transform: capitalize;
  font-size: 1.2em !important;
  font-weight: 600;
  color: $sub_titleColor;
}
.category {
  text-transform: capitalize;
}
.result-items ul {
  padding-left: $titleLeftPadding;
  padding-top: $paddingfirstresult;
}

.result-item.row {
  display: flex;
  margin: 0 0 0.5em 0;
}
.result-item .content {
  padding-left: 1em;
  padding-right: 1em;
}
.result-item img.profileImg {
  width: 5em !important;
  // margin-top: 10px;
}
.result-item p {
  font-size: 15px;
}
.ais-Highlight {
  // font-weight: 700 !important;
  // font-size: 15px !important;
  margin-bottom: 20px;
}

.content.noresult {
  padding-top: $paddingfirstresult;
  padding-left: $titleLeftPadding;
}

/* Padding between content title and detail*/
.content .detail {
  padding-top: $paddingcontent;
}
/* Highlighted mark*/
mark {
  background: $highlightBackcolor !important;
  color: $highlightcolor !important;
}

.modal.in .modal-dialog {
  margin: auto !important;
}
</style>
