<template>
  <div class="card">
    <h4 class="mb-3 font-bold">Settings</h4>
    <TabNavigation
      :positionActive="positionTab"
      :listPanel="itemsPanel"
      @tabChange="tabChange" />
    <div v-if="positionTab === 0">
      <div v-if="roles === 'Company'">
        <AccountsPages/>
      </div>
      <div v-else>
        <div class="flex items-center mb-2 mt-8 gap-1">
        <p class="color-black text-2xl font-bold break-words">Code Services</p>
        <div class="flex p-1 items-center justify-center" @click="addCodes()">
          <i class="pi pi-plus-circle text-blue-500 text-xl font-bold" />
        </div>
      </div>
      <div class="grid grid-cols-3">
        <div
          class="card-services rounded-lg p-2"
          v-for="data in codeList"
          :key="data.id">
          <Card class="border-solid border-2 border-none-500 shadow-none">
            <template #title>
              <div class="flex w-full items-center justify-between">
                {{data.name}}
                <i class="pi pi-ellipsis-h text-black text-sm font-bold" />
              </div>
            </template>
            <template #content>
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="flex p-1 items-center justify-center">
                    <i class="pi pi-hashtag text-blue-500 text-sm font-bold" />
                  </div>
                  <p class="color-grey text-xs break-words">{{data.guid}}</p>
                </div>
                <InputSwitch
                  class="switch-og"
                  v-model="data.isactive"
                  @change="changeIsActive(data)" />
              </div>
            </template>
          </Card>
        </div>
      </div>
      </div>
    </div>
    <div v-if="positionTab === 1">
      <AccountsPages/>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card'
import {
  ToggleButton
} from 'vue-js-toggle-button'
import TabNavigation from '~/components/tab-navigation/TabNavigation.vue'
import {
  codeUseCase
} from '~/domain/usecase'
import AccountsPages from '../accounts/index.vue'

export default {
  name: 'SettingsPages',
  components: {
    TabNavigation,
    Card,
    AccountsPages,
  },
  data() {
    return {
      codeList: [],
      roles: this.$store.state.appActiveUser.roles,
      itemsPanel: [],
      positionTab: 0
    }
  },
  // computed: {
  //   positionTab: {
  //     get() {
  //       return
  //     },
  //     set(val) {

  //     }
  //   }
  // },
  mounted() {
    this.tabItems()
    this.getAll()
  },
  methods: {
    tabChange(val) {
      console.log('positionTab', val)
      this.positionTab = val
    },
    tabItems() {
      if (this.roles === 'Company') {
        this.itemsPanel.push({
          label: 'Account',
          icon: 'pi pi-fw pi-user-edit',
          to: 'cms-accounts'
        })
      } else {
        this.itemsPanel.push({
          label: 'Master Data',
          icon: 'pi pi-fw pi-cog',
          to: 'cms-settings'
        })
        this.itemsPanel.push({
          label: 'Account',
          icon: 'pi pi-fw pi-user-edit',
          to: 'cms-accounts'
        })
      }
    },
    getAll() {
      this.isLoading = true
      codeUseCase.getAll(window.location.search).then((response) => {
        if (!response.error) {
          this.codeList = response.result.data
        } else {
          this.$toast.add({
            group: 'bc',
            severity: 'error',
            // summary: 'Error Message',
            detail: response.message,
            life: 3000
          })
        }
        this.isLoading = false
      })
    },
    changeIsActive(val) {
      this.$confirm.require({
        message: this.$strInd.confirm.msgChange,
        header: 'Status Aktif',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.processIsActive(val)
        },
        reject: () => {
          val.isactive = !val.isactive
        }
      })
    },
    async processIsActive(val) {
      this.$store.dispatch('showLoading')
      const dataForm = {
        IsActive: val.IsActive
      }
      const response = await codeUseCase.changeIsActive(val.id, dataForm)
      if (response.error) {
        val.isactive = !val.isactive
        this.$toast.add({
          severity: 'error',
          detail: response.message,
          group: 'bc',
          life: 1500
        })
      } else {
        this.$toast.add({
          severity: 'success',
          detail: response.result.detail,
          group: 'bc',
          life: 1500
        })
      }
      this.$store.dispatch('hideLoading')
    },
    addCodes() {
      this.$router.push({
        name: 'cms-settings-codes-add'
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

.p-card {
  box-shadow: none;
}
</style>
