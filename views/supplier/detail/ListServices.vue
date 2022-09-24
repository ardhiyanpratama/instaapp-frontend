<template>
  <div>
    <div class="flex w-full justify-between items-center mb-3">
      <p class="text-2xl">Services</p>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          class="input-primary"
          type="text"
          v-model="searchInput"
          @keypress.enter="submitSearch(searchInput)"
          placeholder="Search..." />
      </span>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div
        class="card-services rounded-lg p-2"
        v-for="data in serviceDetails"
        :key="data.id">
        <!-- <img src="~/assets/img/bg-services.svg" /> -->
        <div class="header flex justify-end mb-10">
          <img src="~/assets/img/ic-signal-green.svg" style="width: 24px; height: 24px;" />
        </div>
        <div class="">
          <p class="text-xl font-bold mb-1 break-words">{{data.name}}</p>
          <p class="color-grey text-xs break-words mb-1">{{data.description}}</p>
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex rounded-full background-orange-2 p-1 items-center justify-center">
                <img src="~/assets/img/ic-briefcase-orange.svg" style="width: 11px; height: 11px;" />
              </div>
              <p class="color-grey text-xs break-words">{{data.attributes1}} Company is using </p>
            </div>
            <i class="pi pi-arrow-right text-black cursor-pointer text-sm font-bold" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  serviceUseCase
} from '~/domain/usecase'

export default {
  name: 'ListService',
  props: {
    tokenSupplier: null,
  },
  data() {
    return {
      searchInput: '',
      serviceDetails: [],
    }
  },
  mounted() {
    this.getServiceById()
  },
  methods: {
    getServiceById() {
      serviceUseCase.getDataForm(this.tokenSupplier).then((res) => {
        if (!res.data.error) {
          this.serviceDetails = res.data.result
        } else {
          this.$router.back()
        }
      })
    },
    submitSearch(val) {
      this.$router.replace({
        query: {
          name: val
        }
      }).then(() => {
        this.getServiceById()
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.card-services {
  background-image: url('~/assets/img/bg-services.svg');
  background-position: left top;
  background-repeat: no-repeat;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 0.75rem
    /* 8px */
  ;
  // background-size: contain;
}
</style>
