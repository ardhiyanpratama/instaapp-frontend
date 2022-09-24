import { Remote, remoteEnum } from '@/data/source/remote/remote'
import Store from '~/store'

const store = Store() as any
const baseUrl = 'Reporting'

let companyToken = ''
let companyIds = ''

if (store.state?.appActiveUser?.roles === 'Company') {
  companyToken = `?companyToken=${store.state.appActiveUser.token}`
  companyIds = `?companyIds=${store.state.appActiveUser.token}`
}

const fetchAllReporting = (filter = '') => new Remote(remoteEnum.get, `${baseUrl}${companyToken}${filter}`)
const fetchPdfReporting = (filter = '') => new Remote(remoteEnum.get, 'https://report.monstergroup.co.id/api/pdf?reportName=OtpLaporanPrint')
const fetchAllLogs = (filter = '') => new Remote(remoteEnum.get, `${baseUrl}/logs${companyIds}${filter}`)

export {
  fetchAllReporting,
  fetchPdfReporting,
  fetchAllLogs
}