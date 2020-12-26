import * as React from 'react';

export const navigationRef = React.createRef();

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
