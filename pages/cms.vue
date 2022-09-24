<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'CmsPages',
  layout: 'cms',
  // watch: {
  //   $route(to, from) {
  //     console.log('cahnge to =>', to)
  //     console.log('change from => ', from)
  //     if (from.query && to.query) {
  //       this.$router.go()
  //     }
  //   }
  // },
}
</script>

<style>

</style>
