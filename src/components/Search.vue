<template>
  <div class="mini-search">
    <ais-instant-search
      :search-client="searchClient"
      index-name="wp_prime_searchable_posts"
      label="Prime"
    >
      <ais-configure :hitsPerPage="10" :restrictSearchableAttributes="['post_title']"/>
      <ais-autocomplete :indices="[{ value:'wp_history_posts_post', label: 'History' }]">
        <div slot-scope="{ currentRefinement, indices, refine }">
          <input
            class="form-control input-lg"
            type="search"
            :value="currentRefinement"
            placeholder="Search..."
            @input="refine($event.currentTarget.value)"
            autofocus
          >
          <div v-if="currentRefinement">
            <ul v-for="(index,x) in indices" :key="x" class="search-results">
              <span v-if="index.hits.length">
                <h3>{{index.label}}</h3>
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

                      <div v-if="hit.images.thumbnail && hit.images.thumbnail.url" class="col-xs-2">
                        <img :src="hit.images.thumbnail.url" alt>
                      </div>
                      <div
                        :class="{'col-sm-10': hit.images.thumbnail, 'col-sm-12': !hit.images.thumbnail}"
                      >
                        <h4>
                          <ais-highlight attribute="post_title" :hit="hit"/>
                          <br>
                          <small>{{hit.post_date_formatted}}</small>
                          <br>
                        </h4>
                        <h6>{{hit.post_type_label}}</h6>
                        <p v-html="hit.post_excerpt"></p>
                      </div>
                    </li>
                  </ul>
                </li>
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
      query: ""
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
</style>
