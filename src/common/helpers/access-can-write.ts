import { AdminAccessLevel } from 'common/models';

function accessCanWrite(access: AdminAccessLevel): boolean {
  return access === 'write';
}

export default accessCanWrite;
