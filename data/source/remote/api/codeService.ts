import { Remote, remoteEnum } from '@/data/source/remote/remote'

const baseUrl = 'CodeService'

const fetchAllCodeService = (filter = '') => new Remote(remoteEnum.get, `${baseUrl}${filter}`)
const fetchOneCodeService = (id: number) => new Remote(remoteEnum.get, `${baseUrl}/${id}`)
const addCodeService = (data: any) => new Remote(remoteEnum.post, `${baseUrl}`, data)
const editCodeService = (id: any, data: any) => new Remote(remoteEnum.put, `${baseUrl}/${id}`, data)
const deleteCodeService = (id: any) => new Remote(remoteEnum.delete, `${baseUrl}/${id}`)
const changeIsActiveCodeService = (id: number, data: any) => new Remote(remoteEnum.patch, `${baseUrl}/${id}/isActive`, data)

export {
  fetchAllCodeService,
  fetchOneCodeService,
  addCodeService,
  editCodeService,
  deleteCodeService,
  changeIsActiveCodeService
}
