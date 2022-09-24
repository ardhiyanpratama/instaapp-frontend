<template>
  <Card class="no-bs">
    <template #content>
      <div>
        <div class="mb-5">
          <p class="font-semibold">Alamat Lengkap</p>
          <p class="color-grey text-sm mt-1">{{`${details.address}`}}</p>
        </div>
        <div class="mb-5">
          <p class="font-semibold">Email</p>
          <p class="color-grey text-sm mt-1">{{`${details.email}`}}</p>
        </div>
        <!-- <div class="mb-5">
          <p class="font-semibold">Contact Person</p>
          <p class="color-grey text-sm mt-1">{{`${details.contactPerson}`}}</p>
        </div> -->
        <div class="mb-5">
          <p class="font-semibold">Jenis Usaha</p>
          <p class="color-grey text-sm mt-1">{{`${details.jenisUsaha}`}}</p>
        </div>
        <div class="mb-5">
          <p class="font-semibold">Keterangan</p>
          <p class="color-grey text-sm mt-1" v-if="details.notes != ''">{{`${details.notes}`}}</p>
          <p class="color-grey text-sm mt-1" v-if="details.notes == ''"> - </p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
export default {
  name: 'InformationCard',
  props: {
    details: [],
  }
}
</script>

<style lang="scss">
.card-grey {
  background: rgba(255, 255, 255, 1)
}
</style>
