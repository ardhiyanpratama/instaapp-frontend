<template>
  <div class="header-title">
    <div class="card-header">
      <div class="flex w-full justify-between items-center mb-2">
        <div class="flex items-start gap-4 ">
          <div class="flex background-red-4 rounded-full p-2 items-start justify-center">
            <img src="~/assets/img/ic-building-outline-red.svg" style="width: 25px; height: 25px;" />
          </div>
          <div>
            <p class="text-white font-bold text-lg">{{`${details.name}`}}</p>
            <p class="text-white font-medium text-base">{{`${details.phone}`}}</p>
            <div class="flex items-center">
              <div class="flex gap-2 text-white items-center my-2">
                <i class="pi pi-user text-xs"></i>
                <p class="text-white justify-start text-xs">{{`${details.username}`}}</p>
              </div>
              <div class="flex gap-2 ml-8 text-white items-center my-2">
                <i class="pi pi-lock text-xs"></i>
                <p class="text-white justify-start text-xs">Test</p>
                <i class="pi pi-eye text-xs"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <button @click="editData()" class="bg-white rounded">
            <p class="font-bold px-4 py-1 text-xs">Edit</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderTitle',
  props: {
    details: [],
  },
  methods: {
    editData() {
      this.$router.push({
        name: 'cms-company-edit-id',
        params: {
          id: this.details.id
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

.header-title {
  .card-header {
    // background-color: yellow;
    background-image: url('~/assets/img/bg-company.svg');
    background-repeat: no-repeat;
    // background-size: auto;
    // background-size: 300px 100px;
    padding: 1rem;
    background-size: 100%;
    background-position: center center;
    border-radius: $border-radius;
    background-color: rgba(218, 116, 144, 1);
    // background: linear-gradient(rgba(218,116,144) 100%,rgba(201,53,53) 100%);
  }
}
</style>
