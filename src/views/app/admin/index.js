import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Registrations = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './registrations')
);
const Admin = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/registrations`}
      />
      <Route
        path={`${match.url}/registrations`}
        render={(props) => <Registrations {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admin;
