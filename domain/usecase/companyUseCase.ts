/* eslint-disable class-methods-use-this */
import { Response } from '@/domain/entities'
import Repository from '@/data/repository'
import ICrud from '@/domain/usecase/iCrud'
import {
  fetchAllCompany, fetchOneCompany, addCompany, editCompany, deleteCompany, changeIsActiveCompany, changePassword, generateQrCode
} from '@/data/source/remote/api'

class CompanyUseCase implements ICrud {
  changeIsActive(id: any, data: any): Promise<Response> {
    return new Repository(changeIsActiveCompany(id, data), null).getResult(false)
  }

  changePassword(data: any): Promise<Response> {
    return new Repository(changePassword(data), null).getResult(false)
  }

  getAll(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchAllCompany(params), null).getResult(false)
  }

  async getDataForm(id: any): Promise<any> {
    if (id) {
      const response = await new Repository(fetchOneCompany(id), null).getResult(false)
      return {
        title: 'Edit Company',
        data: response
      }
    }

    return {
      title: 'Tambah Company',
      data: null
    }
  }

  submitData(id: any, data: any): Promise<Response> {
    if (id) {
      data.Id = Number(id)
      return new Repository(editCompany(id, data), null).getResult(false)
    }
    return new Repository(addCompany(data), null).getResult(false)
  }

  deleteData(id: any): Promise<Response> {
    return new Repository(deleteCompany(id), null).getResult(false)
  }

  async generaeQrCode(id: any): Promise<Response> {
    return new Repository(generateQrCode(id), null).getResult(false)
  }
}

const companyUseCase = new CompanyUseCase()

export {
  companyUseCase
}