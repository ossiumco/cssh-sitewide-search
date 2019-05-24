<template>
  <div>
    <p
      v-if="index.label !== 'primary'"
      class="result_title"
    >No results found from {{index.label}} site</p>
    <p v-else class="result_title">No results found</p>
    <!-- <hr class="result_title_hr"> -->
    <div class="content noresult">
      <span
        style="font-size: 1.5em;"
      >No results were found for your search. Would you like to retry your search across all of CSSH?</span>
      <a href class="btn btn-danger btn-lg btn-block">Search All of CSSH</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.btn {
  margin-top: 2em;
}
</style>
