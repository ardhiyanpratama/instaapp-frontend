/* eslint-disable class-methods-use-this */
import { Response } from '@/domain/entities'
import Repository from '@/data/repository'
import ICrud from '@/domain/usecase/iCrud'
import {
  fetchAllReporting, fetchPdfReporting, fetchAllLogs
} from '@/data/source/remote/api'

class ReportingUseCase implements ICrud {
  changeIsActive(id: any, data: any): Promise<Response> {
    throw new TypeError('error')
  }

  getAll(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchAllReporting(params), null).getResult(false)
  }

  async getDataForm(id: any): Promise<any> {
    throw new TypeError('error')
  }

  getPdfReporting(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchPdfReporting(params), null).getResult(false)
  }

  getAllLogs(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchAllLogs(params), null).getResult(false)
  }

  submitData(id: any, data: any): Promise<Response> {
    throw new TypeError('error')
  }

  deleteData(id: any): Promise<Response> {
    throw new TypeError('error')
  }
}

const reportingUseCase = new ReportingUseCase()

export {
  reportingUseCase
}
