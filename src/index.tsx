import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { RecoilRoot } from 'recoil';
import { RoutingUrls } from 'common/const';
import { PageAuth, PageError, PageInstitutions, PageMain, PageProfile, PageTokens } from 'pages';
import './index.scss';

const router = createBrowserRouter([
  {
    path: RoutingUrls.Auth,
    element: <PageAuth />,
  },
  {
    path: RoutingUrls.Main,
    element: <PageMain />,
  },
  {
    path: RoutingUrls.Error,
    element: <PageError />,
  },
  {
    path: RoutingUrls.Tokens,
    element: <PageTokens />,
  },
  {
    path: RoutingUrls.Profile,
    element: <PageProfile />,
  },
  {
    path: RoutingUrls.Institutions,
    element: <PageInstitutions />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
