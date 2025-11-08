import { IAdminApiTokenFull, IAdminApiTokenPostFull } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiTokens extends BaseApiClient {
  private static instance: ApiTokens | null = null;
  static getInstance() {
    this.instance ??= new ApiTokens();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getAll(): Promise<IAdminApiTokenFull[]> {
    const response = await this.sendRequestAuth<IAdminApiTokenFull[]>('get', '/admin/tokens');
    return response;
  }

  async create(): Promise<IAdminApiTokenPostFull> {
    const response = await this.sendRequestAuth<IAdminApiTokenPostFull>('post', '/admin/tokens');
    return response;
  }

  async delete(tokenId: string): Promise<void> {
    await this.sendRequestAuth('delete', `/admin/tokens/${tokenId}`);
  }
}

export default ApiTokens;
