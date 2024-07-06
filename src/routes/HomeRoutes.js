import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SIZE_LARGE } from 'static/Constants';
import DelayedFallback from 'common/components/indicator/SuspendIndicator';
import { appRoutes } from './paths';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/global/actions';
import _ from 'lodash';

const HomeRoutes = (props) => {
  let allRoutes = [];
  const dispatch = useDispatch();
  const [containers, setContainers] = useState([]);
  const permissionsUser = JSON.parse(localStorage.getItem('userInfo'))?.permissions;

  const resetStateGlobal = () => {
    dispatch(actions.filters(''));
  }

  useEffect(() => {
    flattenRoutes(appRoutes, null, allRoutes);
    if (allRoutes.length > 0) {
      const containers = allRoutes
        .filter((route) => route.path && route.component && (route.permissions === true || permissionsUser.includes(route.permissions)))
        .map((route, index) => < Route key={index} path={`/${route.path}`} exact component={route.component} />);
      setContainers(containers)
    }
  }, [])

  useEffect(() => {
    resetStateGlobal()
  }, [containers])

  return (
    <div className={props.cls} style={props.style}>
      <Suspense fallback={<DelayedFallback size={SIZE_LARGE} tip={'Loading'} />}>
        <Switch>{containers}</Switch>
      </Suspense>
    </div>
  );
};

export default HomeRoutes;

const flattenRoutes = (routes, isAccessible, collectedRoutes) => {
  routes.forEach((route) => {
    if (route.children) flattenRoutes(route.children, isAccessible, collectedRoutes);
    else collectedRoutes.push(route);
  });
};
