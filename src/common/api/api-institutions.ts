import { IAdminInstitutionBrief, IAdminInstitutionPost, IAdminInstitutionPostFull } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiInstitutions extends BaseApiClient {
  private static instance: ApiInstitutions | null = null;
  static getInstance() {
    this.instance ??= new ApiInstitutions();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getAll(): Promise<IAdminInstitutionBrief[]> {
    const response = await this.sendRequestAuth<IAdminInstitutionBrief[]>('get', '/admin/institutions');
    return response;
  }

  async add(request: IAdminInstitutionPost): Promise<IAdminInstitutionPostFull> {
    const response = await this.sendRequestAuth<IAdminInstitutionPostFull>('post', '/admin/institutions', request);

    return response;
  }

  async delete(institutionId: string): Promise<void> {
    this.sendRequestAuth('delete', `/admin/institutions/${institutionId}`);
  }
}

export default ApiInstitutions;
