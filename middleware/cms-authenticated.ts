import moment from 'moment'

export default (context: any) => {
  console.log('any authicanted-context', context)
  const checkDateExpired = () => {
    if (context.store.state.authenticated.dateLogin && context.store.state.authenticated.accessToken) {
      const dateLogin = moment(context.store.state.authenticated.dateLogin)
      const now = moment()

      const checkHours = moment.duration(now.diff(dateLogin)).asHours()

      if (checkHours <= 12) {
        return true
      }
    }
    context.store.dispatch('logoutAccount')

    return false
  }
  if (!context.store.state.authenticated.isAuthen) {
    context.redirect({
      name: 'login'
    })
  }
  if (checkDateExpired() === false) {
    context.redirect({
      name: 'login'
    })
  }
}