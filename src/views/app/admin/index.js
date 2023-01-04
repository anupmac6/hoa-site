import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Registrations = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './users/registrations')
);

const AllUsers = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './users/allUsers')
);

const Addresses = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './dues/addresses')
);

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './home/dashboard')
);
const Admin = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/home/dashboard`}
      />
      <Route
        path={`${match.url}/users/registration-queue`}
        render={(props) => <Registrations {...props} />}
      />
      <Route
        path={`${match.url}/users/all-users`}
        render={(props) => <AllUsers {...props} />}
      />
      <Route
        path={`${match.url}/dues/addresses`}
        render={(props) => <Addresses {...props} />}
      />
      <Route
        path={`${match.url}/home/dashboard`}
        render={(props) => <Dashboard {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admin;
