import iconDependency from '~/dependencies/iconDependencies'
import Store from '~/store'

// eslint-disable-next-line consistent-return
const menus = () => {
  const store = Store() as any
  const iconSvg = iconDependency()

  console.log('store', store)

  if (store.state?.appActiveUser?.roles === 'Admin') {
    console.log('store test', store)
    return [
      {
        label: 'Dashboard',
        route: 'cms-dashboard',
        icon: iconSvg.homeOutline
      },
      {
        label: 'Reporting',
        route: 'cms-reporting',
        icon: iconSvg.fileText
      },
      {
        label: 'Supplier List',
        route: 'cms-supplier',
        icon: iconSvg.radio
      },
      {
        label: 'Company List',
        route: 'cms-company',
        icon: iconSvg.buildingOutline
      },
      {
        label: 'Setting',
        route: 'cms-settings',
        icon: iconSvg.cog
      },
    ]
    // eslint-disable-next-line no-else-return
  } else if (store.state?.appActiveUser?.roles === 'Company') {
    console.log('store test company', store)
    return [
      {
        label: 'Dashboard',
        route: 'cms-dashboard',
        icon: iconSvg.homeOutline
      },
      {
        label: 'Reporting',
        route: 'cms-reporting',
        icon: iconSvg.fileText
      },
      {
        label: 'Agreements',
        route: 'cms-agreement',
        icon: iconSvg.fileText
      },
      {
        label: 'Setting',
        route: 'cms-settings',
        icon: iconSvg.cog
      },
    ]
  }
}

export default menus