import React, { useMemo } from 'react';
import { Route, useLocation } from 'react-router';
import { withTheme } from '@abst/theme/hoc';
import { AnimatedSwitch } from '@abst/web-components';
import { Main } from './Main';
import routes from '@src/routes';

const getItemConf = (_routes) => {
  /* filter routes with params */
  const filtered = _.filter(_routes, (route) => !_.includes(route.path, '/:'));
  return _.map(filtered, (route) => {
    const ret = _.omit(route, ['component', 'render']);
    if (!!route?.routes?.length) ret.routes = getItemConf(route.routes);
    return ret;
  });
};

const items = getItemConf(routes);

function renderRoute(conf, key) {
  return <Route { ...{ key, exact: true, ...conf } } />;
}

function _Router() {
  const children = useMemo(() => _.map(routes, renderRoute), []);
  const location = useLocation();

  return (
    <Main { ...{ items } }>
      <AnimatedSwitch { ...{ children, location } } type='glide' />
    </Main>
  );
}

export const Router = withTheme()(_Router);
