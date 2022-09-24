<template>
  <div class="">
    <ul>
      <li
        class="cursor-pointer py-1"
        @click="$emit('details')"
        v-if="details">
        <div class="flex items-center gap-2">
          <img src="~/assets/img/ic-file-text.svg" class="w-3" alt="details" />
          <p class="text-sm whitespace-nowrap text-primary-hover">See Details</p>
        </div>
      </li>
      <li
        class="cursor-pointer py-1"
        @click="$emit('add')"
        v-if="edit">
        <div class="flex items-center gap-2">
          <img src="~/assets/img/ic-folder-plus.svg" class="w-3" alt="add" />
          <p class="text-sm whitespace-nowrap text-primary-hover">{{`${titleAdd}`}}</p>
        </div>
      </li>
      <li
        class="cursor-pointer py-1"
        @click="$emit('edit')"
        v-if="edit">
        <div class="flex items-center gap-2">
          <img src="~/assets/img/ic-edit.svg" class="w-3" alt="edit" />
          <p class="text-sm whitespace-nowrap text-primary-hover">{{`${titleEdit}`}}</p>
        </div>
      </li>
      <li
        class="cursor-pointer py-1"
        @click="$emit('actived')"
        v-if="edit">
        <div class="flex items-center gap-2">
          <img src="~/assets/img/ic-toggle-left.svg" class="w-3" alt="actived" />
          <p class="text-sm whitespace-nowrap">Non-Active</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListActions',
  props: {
    details: {
      default: () => null
    },
    edit: {
      default: () => null
    },
    add: {
      default: () => null
    },
    actived: {
      default: () => null
    },
    titleEdit: {
      default: () => 'Edit'
    },
    titleAdd: {
      default: () => 'Add'
    }
  }
}
</script>

<style>

</style>
