/* eslint-disable class-methods-use-this */
import { Response } from '@/domain/entities'
import Repository from '@/data/repository'
import ICrud from '@/domain/usecase/iCrud'
import {
  fetchAllCompanyAgreement, fetchOneCompanyAgreement, addCompanyAgreement, editCompanyAgreement, deleteCompanyAgreement, changeIsActiveCompanyAgreement, fetchCompanyAgreementByCompany
} from '@/data/source/remote/api'

class AgreementUseCase implements ICrud {
  changeIsActive(id: any, data: any): Promise<Response> {
    return new Repository(changeIsActiveCompanyAgreement(id, data), null).getResult(false)
  }

  getAll(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchAllCompanyAgreement(params), null).getResult(false)
  }

  async getDataForm(id: any): Promise<any> {
    if (id) {
      const response = await new Repository(fetchOneCompanyAgreement(id), null).getResult(false)
      return {
        title: 'Edit Agreement',
        data: response
      }
    }

    return {
      title: 'Tambah Agreement',
      data: null
    }
  }

  submitData(id: any, data: any): Promise<Response> {
    if (id) {
      data.id = id
      return new Repository(editCompanyAgreement(id, data), null).getResult(false)
    }
    return new Repository(addCompanyAgreement(data), null).getResult(false)
  }

  deleteData(id: any): Promise<Response> {
    return new Repository(deleteCompanyAgreement(id), null).getResult(false)
  }

  agreementByCompany(id: any): Promise<Response> {
    return new Repository(fetchCompanyAgreementByCompany(id), null).getResult(false)
  }
}

const agreementUseCase = new AgreementUseCase()

export {
  agreementUseCase
}
