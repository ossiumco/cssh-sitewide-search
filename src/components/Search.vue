<template>

   <div class="mini-search">
    <ais-instant-search
      :search-client="searchClient"
      index-name="wp_prime_searchable_posts"
      label="Prime"
    >
      <ais-configure :hitsPerPage="10" :restrictSearchableAttributes="['post_title']"/>
     
      <ais-search-box autofocus placeholder="Search . . ." />
    
      <ais-autocomplete :indices="[{ value:'wp_history_posts_post', label: 'History' }]">
        <div slot-scope="{ currentRefinement, indices, refine }">
          <input
            class="form-control input-lg"
            type="search"
            :value="currentRefinement"
            placeholder="Search..."
            @input="refine($event.currentTarget.value)"
            autofocus
            show-loading-indicator
          >
          <div v-if="currentRefinement" class="result_hits" >
            
            
            <ul v-for="(index,x) in indices" :key="x" class="search-results">
              <span v-if="index.hits.length" >
                <p class="result_title"
                 @click="log(index.hits)"
                >
                  Results from {{index.label}}
                </p>
                <hr class="result_title_hr"> 
 
                <h3 class="sub_title">{{index.label}}</h3>
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

                      <div v-if="hit.images.thumbnail && hit.images.thumbnail.url" class="photo" >
                        <img :src="hit.images.thumbnail.url" alt class="profileImg">
                      </div>
                      <div v-if="!hit.images.thumbnail || !hit.images.thumbnail.url" class="photo" >
                        <img src="https://www.deedsalone.com/wp-content/uploads/2019/03/empty-face-athlete.svg" alt class="profileImg empty">
                      </div>                     
                      <div class="content">
                        <h4>
                          <ais-highlight attribute="post_title" :hit="hit"/>
                          <br>
                          <small>{{hit.content}}</small>
                          <br>
                        </h4>
                      
                        <p v-html="hit.post_excerpt"></p>
                      </div>
                    </li>
                    <hr class="item_hr">
                  </ul>
                </li>
              </span>
              
              <span v-if="!index.hits.length">
                  <p class="result_title">
                    No Results Found from {{index.label}}
                  </p>
                  <hr class="result_title_hr">
                  <div class="content noresult" > 
                    <h4>
                      <small>No results were found for your search. Would you lkie to retry your search across all of CSSH?</small>
                      <br>
                    </h4>
                    <button>
                      Search All of CSSH
                    </button>
                  </div>
                      
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
import { VueAutosuggest } from "vue-autosuggest";
export default {
  components: { VueAutosuggest },
  data() {
    return {
      searchClient: algoliasearch(
        "XAJ79GTSZV",
        "f62cf6274acbcdf43e219996a7966f06"
      ),
      query: "",
      FoundResult: "0",
    };
  },
  methods: {
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

    log: function (e) {
     
      console.log(e);
    } 
  
  }
};
</script>
<style lang="scss">
.search-results {
  list-style: none;
  margin: 0;
  padding: 0;
}
.result-items {
  ul {
    list-style: none;
  }
}
.result-item {
  cursor: pointer;
  margin-bottom: 1em;
}
$searchboxFontSize: 3em;
$searchIconColor:#9E9E9E;
$headerColor: #404040;
$sub_titleColor:#505050;
$textColor:#9E9E9E;
$borderColor: #8E8E8E;
$titleLeftPadding: 18px;
$sub_titleTopPadding:5px;
$sub_titleBottomPadding:5px;
$resultRightPadding:20px;

/* Styling for SearchBox*/
.ais-Autocomplete input{
    display:none !important;
}
input.ais-SearchBox-input {
    width: 100%;
    font-size: $searchboxFontSize;
    padding-left:$titleLeftPadding;
    
}
svg.ais-SearchBox-submitIcon {
    width: 3em!important;
    height: 3em!important;
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
    transform: translate(7px,7px) scale(0.7);
}
form.ais-SearchBox-form {
    display: flex;
}
button.ais-SearchBox-submit {
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
    border: 1.5px solid #8E8E8E;
    margin-top: 1.5em;
    min-height: 50vh !important;
}
.result_title {
    font-weight: 700;
    font-size: 1.5em !important;
    padding: 0.5em;
    font-weight: bold;
    font-size: 1.5em !important;
    margin: 0em;
    padding: 0.5em 0.5em 0 $titleLeftPadding;
    color:$headerColor;

}
hr.result_title_hr {
    margin: 0px !important;
    border: 1px solid $borderColor;
}
hr.item_hr
{
    margin: $titleLeftPadding 0!important;
    margin-right:$resultRightPadding !important;
    border: 1px solid $borderColor;
}
.sub_title{
    padding-left:$titleLeftPadding !important;
    padding-top: $sub_titleTopPadding !important;
    padding-bottom: $sub_titleBottomPadding !important;
    margin:0px !important;
    text-transform: capitalize;
    font-size:1.2em !important;
    font-weight:600;
    color:$sub_titleColor;
}
.result-items ul{
    padding-left:$titleLeftPadding;
}

.result-item.row {
    display: flex;
    margin:0;
}
.result-item .content {
    padding-left: 1em;
    padding-right: 1em;
}
.result-item img.profileImg {
    width: 5em !important;
    margin-top:10px;
}
.result-item  p {
    font-size: 15px !important;
}
.ais-Highlight
{
    font-weight:700 !important;
    font-size:15px !important;
}

.empty.profileImg
{
    filter:grayscale(100%);
}

.content.noresult
{
    padding-left:$titleLeftPadding;
}

.content.noresult button {
    margin-top: 2em;
    margin-bottom:2em;
}
</style>
