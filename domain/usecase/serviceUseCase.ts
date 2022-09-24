/* eslint-disable class-methods-use-this */
import { Response } from '@/domain/entities'
import Repository from '@/data/repository'
import ICrud from '@/domain/usecase/iCrud'
import {
  fetchAllService, fetchOneService, addService, editService, deleteService, changeIsActiveService
} from '@/data/source/remote/api'

class ServiceUseCase implements ICrud {
  changeIsActive(id: any, data: any): Promise<Response> {
    return new Repository(changeIsActiveService(id, data), null).getResult(false)
  }

  getAll(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchAllService(params), null).getResult(false)
  }

  async getDataForm(id: any): Promise<any> {
    if (id) {
      const response = await new Repository(fetchOneService(id), null).getResult(false)
      return {
        title: 'Edit Service',
        data: response
      }
    }

    return {
      title: 'Tambah Service',
      data: null
    }
  }

  submitData(id: any, data: any): Promise<Response> {
    if (id) {
      data.id = id
      return new Repository(editService(id, data), null).getResult(false)
    }
    return new Repository(addService(data), null).getResult(false)
  }

  deleteData(id: any): Promise<Response> {
    return new Repository(deleteService(id), null).getResult(false)
  }
}

const serviceUseCase = new ServiceUseCase()

export {
  serviceUseCase
}
