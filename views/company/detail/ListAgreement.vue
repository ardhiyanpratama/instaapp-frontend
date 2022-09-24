<template>
  <div class="list-agreement">
    <div>
      <HeaderFilter
        labelBtn="Buat Agreement"
        title="Agreements"
        :isShowButton="isShowButton"
        @onSearch="onSearch"
        @onClickBtn="addData" />

      <div class="mt-5">
        <div class="w-full flex rounded-lg card-list" v-for="data in agreementDetils" :key="data.id">
          <div class="flex gap-4 w-full ">
            <div>
              <img src="~/assets/img/ic-briefcase-orange.svg" style="width: 24px; height: 24px;" />
            </div>
            <div class="w-full">
              <p class="font-bold text-lg">{{data.attributes4}}</p>
              <div class="flex w-full items-center justify-between">
                <p class="text-xs font-medium color-grey">{{data.attributes5}}</p>
                <div class="flex items-center gap-2">
                  <p class="text-xs font-medium color-grey">{{data.guid}}</p>
                  <img class="cursor-pointer" src="~/assets/img/ic-copy-blue.svg" style="width: 16px; height: 16px;" />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="grid grid-cols-2">
              <div class="flex items-center p-2 ml-2 mt-1">
                <i class="pi pi-briefcase text-base" style="color:#FFB525"></i>
              </div>
              <div class="flex item-center bg-red-100">
                <div class="w-full">
                  <p class="font-bold text-lg">PT. Telkomsel</p>
                </div>
                <div class="flex float-right justify-end pt-4 pr-5">
                  <p class="font-weight-500 text-sm mb-2">081335143</p>
                  <p class="font-bold text-lg">PT. Telkomsel</p>
                </div>
              </div>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderFilter from '~/components/header-filter/HeaderFilter.vue'
import { agreementUseCase } from '~/domain/usecase'

export default {
  name: 'ListAgreement',
  components: {
    HeaderFilter
  },
  props: {
    details: null,
  },
  data() {
    return {
      agreementDetils: [],
      ids: null,
      isShowButton: true,
    }
  },
  mounted() {
    this.getAgreementByIdCompany()
  },
  methods: {
    getAgreementByIdCompany() {
      this.isLoading = true
      if (this.$store.state.appActiveUser.roles === 'Company') {
        this.ids = this.$store.state.appActiveUser.token
        this.isShowButton = false
      } else {
        this.ids = this.details.guid
      }

      agreementUseCase.agreementByCompany(`?token=${this.ids}`).then((res) => {
        console.log('response details agreement', res.result)
        if (res.result != null) {
          this.agreementDetils = res.result
        } else {
          // this.$router.back()
        }
        this.isLoading = false
      })
    },
    onSearch() {
      console.log('search')
    },
    addData() {
      this.$router.push({
        name: 'cms-agreement-add-id',
        params: {
          id: this.details.id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.list-agreement {
  .card-list {
    padding: 1rem;
    background-image: radial-gradient(circle at top left, #FFB525 -25.29%, rgba(255, 181, 37, 0) 9.72%);
    background-color: #FFFFFF;
    margin-bottom: 1.25rem;
    // background-position: left top;
    // background-repeat: no-repeat;
    // transform: matrix(0.71, -0.58, 0.86, 0.71, 0, 0);
  }

  .card-list:last-child {
    margin-bottom: 0;
  }
}
</style>
