/* eslint-disable class-methods-use-this */
import { Response } from '@/domain/entities'
import Repository from '@/data/repository'
import ICrud from '@/domain/usecase/iCrud'
import {
  fetchAllCodeService, fetchOneCodeService, addCodeService, editCodeService, deleteCodeService, changeIsActiveCodeService
} from '@/data/source/remote/api'

class CodeUseCase implements ICrud {
  changeIsActive(id: any, data: any): Promise<Response> {
    return new Repository(changeIsActiveCodeService(id, data), null).getResult(false)
  }

  getAll(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchAllCodeService(params), null).getResult(false)
  }

  async getDataForm(id: any): Promise<any> {
    if (id) {
      const response = await new Repository(fetchOneCodeService(id), null).getResult(false)
      return {
        title: 'Edit Code Service',
        data: response
      }
    }

    return {
      title: 'Tambah Code Service',
      data: null
    }
  }

  submitData(id: any, data: any): Promise<Response> {
    if (id) {
      data.id = id
      return new Repository(editCodeService(id, data), null).getResult(false)
    }
    return new Repository(addCodeService(data), null).getResult(false)
  }

  deleteData(id: any): Promise<Response> {
    return new Repository(deleteCodeService(id), null).getResult(false)
  }
}

const codeUseCase = new CodeUseCase()

export {
  codeUseCase
}
