import { IAdminAuthBrief, IAdminAuthFull } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiAuth extends BaseApiClient {
  private static instance: ApiAuth | null = null;
  static getInstance() {
    this.instance ??= new ApiAuth();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async login(login: string, password: string): Promise<IAdminAuthBrief> {
    const response = await this.sendRequest<IAdminAuthBrief>('get', '/admin/auth/login', {
      login: login.trim(),
      password: password.trim(),
    });

    return response;
  }

  async getCurrent(): Promise<IAdminAuthFull> {
    const response = await this.sendRequestAuth<IAdminAuthFull>('get', '/admin/auth');
    return response;
  }

  async getAll(): Promise<IAdminAuthFull[]> {
    const response = await this.sendRequestAuth<IAdminAuthFull[]>('get', '/admin/auth/list');
    return response;
  }

  async logoutCurrent(): Promise<void> {
    await this.sendRequestAuth<IAdminAuthFull>('delete', '/admin/auth/logout');
  }

  async logout(authId: string): Promise<void> {
    await this.sendRequestAuth<IAdminAuthFull>('delete', `/admin/auth/logout/${authId}`);
  }
}

export default ApiAuth;
