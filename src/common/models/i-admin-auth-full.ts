interface IAdminAuthFull {
  id: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  createdAtUtc: string;
}

export default IAdminAuthFull;
