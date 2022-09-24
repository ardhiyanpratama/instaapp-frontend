const getInitials = (params: any) => {
  const text = params
  const fullName = text.split(' ')
  if (fullName.length > 1) {
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0)
    return initials.toUpperCase()
  }

  const singleInitials = fullName.shift().charAt(0)
  return singleInitials.toUpperCase()
}

export {
  getInitials
}