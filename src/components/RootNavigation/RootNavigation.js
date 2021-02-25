import * as React from 'react';

export const navigationRef = React.createRef();

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function getRouteParams(name) {
  return navigationRef.current?.getRootState().routes.find(route => route.name === name).params;
}
