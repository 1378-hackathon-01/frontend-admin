import { AdminAccessLevel } from '.';

interface IAdminUserFull {
  id: string;
  login: string;
  fullName: string;
  accessAdmins: AdminAccessLevel;
  accessInstitutions: AdminAccessLevel;
  accessTokens: AdminAccessLevel;
}

export default IAdminUserFull;
