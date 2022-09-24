<template>
  <div class="flex items-center">
    <div class="flex items-center" v-for="(item, index) in list" :key="index">
      <!-- <div v-if="item.icon !== null" v-html="item.icon" class="mr-2"></div> -->
      <p :class="classHover(item)" @click="item.routeName !== $route.name ? redirect(item) : ''">
        {{ item.title }}&nbsp;&nbsp;
      </p>
      <p class="text-sm font-bold" v-if="index < list.length - 1">/&nbsp;&nbsp;</p>
      <!-- <div  class="mx-1" v-html="$icon.svg.arrowRightwardFillEva"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: ['list'],
  methods: {
    redirect(item) {
      if (item.routeName !== null) {
        this.$router.push({ name: item.routeName })
      }
    },
    classHover(item) {
      let classes = ''
      if (this.$route.name === item.routeName) {
        classes += 'color-dark-2 font-bold cursor-default'
      }

      if (item.routeName !== null) {
        classes += ' cursor-pointer text-primary-hover color-grey-2'
      }
      return classes
    }
  }
}
</script>
