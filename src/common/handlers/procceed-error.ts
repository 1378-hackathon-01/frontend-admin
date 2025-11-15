import { ApiError, ApiErrorCode } from 'common/api-lib';
import { RoutingUrls } from 'common/const';

function procceedError(e: Error, redirectToAuth: boolean) {
  if (e instanceof ApiError && e.code === ApiErrorCode.BadRequest) {
    window.location.assign(RoutingUrls.Error.replace(':code?', '400'));
  } else if (e instanceof ApiError && e.code === ApiErrorCode.Conflict) {
    window.location.assign(RoutingUrls.Error.replace(':code?', '400'));
  } else if (e instanceof ApiError && e.code === ApiErrorCode.Unauthorized) {
    if (redirectToAuth) {
      window.location.assign(RoutingUrls.Auth);
    } else {
      window.location.assign(RoutingUrls.Error.replace(':code?', '401'));
    }
  } else if (e instanceof ApiError && e.code === ApiErrorCode.Forbidden) {
    if (redirectToAuth) {
      window.location.assign(RoutingUrls.Auth);
    } else {
      window.location.assign(RoutingUrls.Error.replace(':code?', '401'));
    }
  } else if (e instanceof ApiError && e.code === ApiErrorCode.NotFound) {
    window.location.assign(RoutingUrls.Error.replace(':code?', '404'));
  } else {
    window.location.assign(RoutingUrls.Error);
  }
}

export default procceedError;
