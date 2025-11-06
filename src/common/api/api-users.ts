import { IAdminUserFull, IAdminUserPut } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiUsers extends BaseApiClient {
  private static instance: ApiUsers | null = null;
  static getInstance() {
    this.instance ??= new ApiUsers();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getMe(): Promise<IAdminUserFull> {
    const response = await this.sendRequestAuth<IAdminUserFull>('get', '/admin/users/me');
    return response;
  }

  async updateMe(request: IAdminUserPut): Promise<void> {
    await this.sendRequestAuth('put', '/admin/users/me', request);
  }
}

export default ApiUsers;
