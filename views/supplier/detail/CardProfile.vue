<template>
  <div class="">
    <Card class="no-bs">
      <template #title>
        <div class="flex items-center gap-4 pb-5 border-b-grey-4">
          <div class="flex rounded-full background-blue-3 p-3">
            <img src="~/assets/img/ic-radio-blue.svg" style="width: 24px; height: 24px;" />
          </div>
          <div>
            <p class="truncate text-lg">{{supplierDetails.name}}</p>
            <p class="truncate text-sm color-grey">{{supplierDetails.phone}}</p>
          </div>
        </div>
      </template>
      <template #content>
        <div>
          <div class="grid grid-cols-2 gap-8 mb-5">
            <div class="rounded-lg border-grey-4 p-3">
              <div>
                <div class="flex justify-center mb-2">
                  <div class="flex rounded-full background-green-2 p-3 items-center justify-center">
                    <img src="~/assets/img/ic-signal-green.svg" style="width: 24px; height: 24px;" />
                  </div>
                </div>
                <div class="flex justify-center mb-2">
                  <p class="font-bold text-2xl">{{supplierDetails.attributes1}}</p>
                </div>
                <div class="flex justify-center">
                  <p class="text-base color-grey-2">Services</p>
                </div>
              </div>
            </div>
            <div class="rounded-lg border-grey-4 p-3">
              <div>
                <div class="flex justify-center mb-2">
                  <div class="flex rounded-full background-orange-2 p-3 items-center justify-center">
                    <img src="~/assets/img/ic-briefcase-orange.svg" style="width: 24px; height: 24px;" />
                  </div>
                </div>
                <div class="flex justify-center mb-2">
                  <p class="font-bold text-2xl">{{supplierDetails.attributes2}}</p>
                </div>
                <div class="flex justify-center">
                  <p class="text-base color-grey-2">Total Client</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center mb-5">
            <Button @click="addService()" class="p-button-outlined rounded-lg btn-primary-outlined flex justify-center w-full">
              <p>Add Services</p>
            </Button>
          </div>
          <div class="mb-5">
            <p class="font-semibold">Alamat Lengkap</p>
            <p class="color-grey text-sm mt-1">{{supplierDetails.address}}</p>
          </div>
          <div class="mb-5">
            <p class="font-semibold">Email</p>
            <p class="color-grey text-sm mt-1" v-if="supplierDetails.email != null">{{supplierDetails.email}}</p>
            <p class="color-grey text-sm mt-1" v-if="supplierDetails.email == null"> - </p>
          </div>
          <div class="mb-5">
            <p class="font-semibold">Contact Person</p>
            <p class="color-grey text-sm mt-1">{{supplierDetails.contactPerson}}</p>
          </div>
          <div class="">
            <p class="font-semibold">Keterangan</p>
            <p class="color-grey text-sm mt-1" v-if="supplierDetails.notes != null">{{supplierDetails.notes}}</p>
            <p class="color-grey text-sm mt-1" v-if="supplierDetails.notes == null"> - </p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'CardProfile',
  props: {
    supplierDetails: [],
  },
  mounted() {
    console.log('test', this.supplierDetails)
  },
  methods: {
    addService() {
      this.$router.push({
        name: 'cms-supplier-service-add-id',
        params: {
          id: this.supplierDetails.id
        }
      })
    }
  }
}
</script>

<style>

</style>
