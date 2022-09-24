<template>
  <div>
    <table class="table-custom mb-3">
      <tr class="row-header">
        <th v-for="(col, key) in columns" :key="key">
          <p>{{col.title}}</p>
        </th>
      </tr>
      <tr v-if="isLoading" class="">
        <td
          colspan="100%"
          class="px-auto"
          style="vertical-align: middle;">
          <div class="flex ">
            <ProgressSpinner />
          </div>
        </td>
      </tr>
      <tr
        v-for="(val, index) in values"
        :key="index"
        :class="`row-content ${val.isactive === undefined ? '' : val.isactive === true ? '' : 'non-active'}`"
        v-else>
        <td
          v-for="(col, key) in columns"
          :key="key"
          class="mb-5">
          <slot :name="col.field" v-bind:slotProps="{data: val, index: index}"></slot>
        </td>
      </tr>
    </table>
    <Pagination :totalRecords="totalRecords" @changePage="onPage" />
  </div>
</template>

<script>
import Pagination from '../pagination/Pagination.vue'

export default {
  name: 'TableCustom',
  props: {
    values: {
      default: () => []
    },
    columns: {
      default: () => []
    },
    isLoading: {
      default: () => true
    },
    totalRecords: {
      required: true,
      type: Number,
      default: () => 0
    }
  },
  emits: ['changePage'],
  components: {
    Pagination
  },
  methods: {
    onPage() {
      this.$emit('changePage')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

.table-custom {
  // position: relative;
  border-collapse: collapse;
  border-collapse: separate;
  border-spacing: 0 15px;
  width: 100%;
  min-width: 400px;
  text-align: left;

  .row-header {
    margin: 0 0 1.25rem 0;

    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: $secondary;
    }
  }

  tr {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 8px;
  }

  td:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    padding: 0 0 0 1rem;
  }

  td {
    padding: 0.75rem 0 0.75rem 0;
  }

  td:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding: 0 1rem 0 0;
  }

  th {
    padding: 0.5rem 0 0.5rem 1rem;
  }

  th:last-child {
    padding: 0.5rem 1rem 0.5rem 0;
  }

  tr.row-content {
    width: 100%;
    background: #FFFFFF;
    border-radius: 8px;
  }

  tr.row-content.non-active {
    background: $color-grey-4 !important;
    color: $color-grey-2;
  }
}
</style>
