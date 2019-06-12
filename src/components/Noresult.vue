<template>
  <div>
    <p v-if="index.label !== 'primary'" class="result_title">No results found from {{index.label}}</p>
    <p v-else class="result_title">No results found on this site</p>
    <!-- <hr class="result_title_hr"> -->
    <div class="content noresult">
      <span
        style="font-size: 1.5em;"
      >No results were found for your search. Would you like to retry your search across all of CSSH?</span>
      <button @click="goToSiteWideSearch" class="btn btn-danger btn-lg btn-block">Search All of CSSH</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "searchTerm"],
  data() {
    return {};
  },
  methods: {
    goToSiteWideSearch() {
      let searchTerm = encodeURI(this.searchTerm);
      window.location.assign(
        `https://cssh.northeastern.edu/people/sitewide-search?searchFor=${searchTerm}`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  margin-top: 2em;
}
</style>
