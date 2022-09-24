<template>
  <!-- eslint-disable -->
  <Sidebar class="left-panel-sidebar" @hide="hiddenSidebar" :showCloseIcon="false" :modal="false" :visible="activeSlider">
    <div class="header py-4 px-4">
      <div class="flex items-center">
        <img src="~/static/logo-monster-otp.png" class="mr-2" style="width: 35px; height: 35px;"/>
        <p class="font-normal text-2xl">Monster&nbsp;</p>
        <p class="font-semibold text-2xl">OTP</p>
      </div>
    </div>
    <div class="list-menu">
      <NuxtLink class="list-item w-full gap-4" v-for="(item, key) in listMenu" :key="key" :class="classItemMenu(item)" :to="{ name: item.route }">
        <div class="left-colom" :class="classItemMenu(item)"></div>
        <div class="flex gap-3 items-center my-2">
          <!-- <i class="pi pi-home text-lg"></i> -->
          <span v-html="item.icon"></span>
          <p class="text-lg active">{{item.label}}</p>
        </div>
      </NuxtLink>
    </div>
    <div class="footer py-4 px-4">
      <div class="flex items-center gap-2 cursor-pointer" @click="signOut()">
        <i class="pi pi-sign-out font-light text-lg" />
        <p class="text-danger font-light text-lg">Log Out</p>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import menus from '~/data/source/local/json/leftmenu'

console.log('meunu', menus())

export default {
  name: 'LeftPanel',
  data() {
    return {
      activeSlider: true,
      listMenu: menus()
    }
  },
  methods: {
    hiddenSidebar(val) {
      console.log('wowow', val)
    },
    activeMenu(item) {
      return this.$route.name.includes(item.route)
    },
    classItemMenu(item) {
      if (this.activeMenu(item) === true) {
        return 'active'
      }
      return ''
    },
    async signOut() {
      await this.$store.dispatch('logoutAccount')
      this.$router.push({
        name: 'login'
      })
    }
  },
  mounted() {
    console.log('i am mount', this.listMenu)
  }
}
</script>

<style>

</style>
