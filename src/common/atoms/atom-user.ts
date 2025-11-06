import { IAdminUserFull } from 'common/models';
import { atom } from 'recoil';

const atomUser = atom<IAdminUserFull | null>({
  key: 'authorized-user',
  default: null,
});

export default atomUser;
