<template>
  <div>
    <TabView :activeIndex.sync="active" @tab-change="tabChange">
      <TabPanel v-for="(item, index) in listPanel" :key="index">
        <template #header>
          <i :class="item.icon"></i>
          <span>{{`${item.label}`}}</span>
        </template>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import {
  get
} from 'http'

export default {
  name: 'TabNavigation',
  components: {
    TabView,
    TabPanel
  },
  props: {
    positionActive: {
      default: () => 0
    },
    listPanel: {
      default: () => []
    }
  },
  emits: ['tabChange'],
  // data() {
  //   return {
  //     items: this.props.listPanel,
  //     active: this.props.positionActive
  //   }
  // },
  computed: {
    active: {
      get() {
        return this.positionActive
      },
      set(val) {
        return val
      }
    }
  },
  methods: {
    tabChange(val) {
      // console.log('tabChane', val)
      this.$emit('tabChange', val.index)
    },
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/variable.scss';

::v-deep .tabmenudemo-content {
  padding: 2rem 1rem;
}

.p-tabview .p-tabview-nav {
  background:none;
}

.p-tabmenu .p-tabmenu-nav {
  background: transparent;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  background: transparent;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  background: transparent;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem:not(.p-highlight):not(.p-disabled):hover .p-menuitem-link {
  background: transparent;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  background:none;
}

.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background:none;
  span{
    color: #2196F3;
  }
}

.p-tabview .p-tabview-panels {
  background:none;
  padding:0;
}

.pi-fw {
  text-align: left;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  outline: none;
  box-shadow: none;
}

.p-tabview .p-tabview-nav li:not(.p-highlight):not(.p-disabled):hover .p-tabview-nav-link {
  background: none;
  border-color: #2196F3;
  color: #2196F3;
  span{
    color: #2196F3;
  }
}

</style>
