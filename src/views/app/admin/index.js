import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Registrations = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './users/registrations')
);

const AllUsers = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './users/allUsers')
);
const Admin = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/users/registration-queue`}
      />
      <Route
        path={`${match.url}/users/registration-queue`}
        render={(props) => <Registrations {...props} />}
      />
      <Route
        path={`${match.url}/users/all-users`}
        render={(props) => <AllUsers {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admin;
