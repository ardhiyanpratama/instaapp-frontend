<template>
  <div class="header-filter">
    <div class="section-left gap-3">
      <h5>{{title}}</h5>
      <span class="p-input-icon-left rounded-lg">
        <i class="pi pi-search" />
        <InputText
          type="text"
          :placeholder="placeholderSearch"
          class="rounded-lg input-on-header"
          v-model="inputSearch"
          @keypress.enter="onEnterSearch(inputSearch)" />
      </span>
    </div>
    <div class="section-right">
      <Button
        v-if="isShowButton"
        :label="labelBtn"
        icon="pi pi-plus"
        class="font-semibold p-button-sm btn-primary" @click="$emit('onClickBtn')"/>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderFilter',
  props: {
    labelBtn: {
      default: () => 'Button Tambah'
    },
    title: {
      default: () => 'New Page'
    },
    placeholderSearch: {
      default: () => 'Search...'
    },
    isShowButton: {
      default: () => true
    }
  },
  emits: ['onSearch', 'onClickBtn'],
  data() {
    return {
      inputSearch: this.$route.query.name
    }
  },
  methods: {
    async onEnterSearch(val) {
      await this.$router.replace({
        name: this.$route.name,
        query: {
          pageSize: this.$route.query.pageSize,
          pageNumber: this.$route.query.pageNumber,
          name: val
        }
      }).then(() => {
        this.$emit('onSearch', val)
      }).catch(() => {
        // console.log('err', err)
        // this.$emit('onSearch', val)
      })
    }
  }
}
</script>

<style lang="scss">
.header-filter {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .section-left {
    display: flex;
    align-items: center;
  }

  .input-on-header.p-inputtext {
    border: none;
    border-radius: 1rem;
  }
}
</style>
