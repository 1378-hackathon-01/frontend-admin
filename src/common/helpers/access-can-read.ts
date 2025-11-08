import { AdminAccessLevel } from 'common/models';

function accessCanRead(access: AdminAccessLevel): boolean {
  return access === 'read' || access === 'write';
}

export default accessCanRead;
