import Vue from 'vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import Sidebar from 'primevue/sidebar'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Password from 'primevue/password'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import OverlayPanel from 'primevue/overlaypanel'
import InputSwitch from 'primevue/inputswitch'
import Textarea from 'primevue/textarea'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'

Vue.use(PrimeVue, { ripple: true })
Vue.use(ToastService)
Vue.use(ConfirmationService)

const components = {
  Sidebar,
  Avatar,
  AvatarGroup,
  Dialog,
  InputText,
  ProgressSpinner,
  Button,
  Password,
  Toast,
  DataTable,
  Column,
  ColumnGroup,
  OverlayPanel,
  InputSwitch,
  Textarea,
  ConfirmDialog,
  Card
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})