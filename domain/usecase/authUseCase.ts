/* eslint-disable class-methods-use-this */
import { Response } from '@/domain/entities'
import ICrud from '@/domain/usecase/iCrud'
import Repository from '@/data/repository'
import { login, generateApiKey } from '~/data/source/remote/api'

class AuthUseCase {
  loginProcess(username: string, password: string): any {
    const data = {
      username,
      password
    }
    return new Repository(login(data), null).getResult(false)
  }

  async generateKey() {
    return new Repository(generateApiKey(), null).getResult(false)
  }
}

const authUseCase = new AuthUseCase()

export {
  authUseCase
}