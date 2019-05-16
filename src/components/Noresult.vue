<template>
<div>
  <p class="result_title">
    No results found from {{index.label}} site
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
 
</div>
</template>

<script>

export default {
  props: ['index'],
  data()
  {
    return {
 

    }
  }
}

</script>
<style lang="scss">

</style>
