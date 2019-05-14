<template>
<div class="result-item row">
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
</div>
</template>

<script>

export default {
   props: ['hit'],
  data()
  {
    return {
 

    }
  }
}

</script>
<style lang="scss">

</style>
