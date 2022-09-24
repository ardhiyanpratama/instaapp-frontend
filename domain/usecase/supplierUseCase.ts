/* eslint-disable class-methods-use-this */
import { Response } from '@/domain/entities'
import Repository from '@/data/repository'
import ICrud from '@/domain/usecase/iCrud'
import {
  fetchAllSupplier, fetchOneSupplier, addSupplier, editSupplier, deleteSupplier, changeIsActiveSupplier
} from '@/data/source/remote/api'

class SupplierUseCase implements ICrud {
  changeIsActive(id: any, data: any): Promise<Response> {
    return new Repository(changeIsActiveSupplier(id, data), null).getResult(false)
  }

  getAll(filter: any = ''): Promise<Response> {
    const params = filter
    return new Repository(fetchAllSupplier(params), null).getResult(false)
  }

  async getDataForm(id: any): Promise<any> {
    if (id) {
      const response = await new Repository(fetchOneSupplier(id), null).getResult(false)
      return {
        title: 'Edit Supplier',
        data: response
      }
    }

    return {
      title: 'Tambah Supplier',
      data: null
    }
  }

  submitData(id: any, data: any): Promise<Response> {
    if (id) {
      data.id = id
      return new Repository(editSupplier(id, data), null).getResult(false)
    }
    return new Repository(addSupplier(data), null).getResult(false)
  }

  deleteData(id: any): Promise<Response> {
    return new Repository(deleteSupplier(id), null).getResult(false)
  }
}

const supplierUseCase = new SupplierUseCase()

export {
  supplierUseCase
}
