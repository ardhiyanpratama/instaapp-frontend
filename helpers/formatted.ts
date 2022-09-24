/* eslint-disable */
const converQueryRoute = (params: any) => {
  const query = params
  if (query) {
    const queryString = JSON.stringify(query)
    const replace = queryString.replace('{', '').replace(/"/g, '').replace(/,/g, '&').replace('}', '').replace(/:/g, '=')
    return `?${replace}`
  }
  return ''
}

export {
  converQueryRoute
}