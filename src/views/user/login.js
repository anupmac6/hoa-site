import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { loginUser, loginUserSuccess } from 'redux/actions';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { auth, firestore } from 'helpers/Firebase';
import { setCurrentUser } from 'helpers/Utils';
import { adminRoot } from 'constants/defaultValues';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ history, loading, error }) => {
  const [email] = useState('anupmac6@gmail.com');
  const [password] = useState('Mothermary18');
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onUserLogin = async (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        // loginUserAction(values, history);
        return auth
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            console.log(user);
            const userId = user.user.uid;

            return firestore
              .collection('customers')
              .doc(userId)
              .get()
              .then((userRef) => {
                const data = userRef.data();

                if (data && data.isActive && data.isApproved) {
                  console.log(data);

                  setCurrentUser({ uid: userId, ...data });
                  dispatch(loginUserSuccess({ uid: userId, ...data }));
                  history.push(adminRoot);
                  return { uid: userId, ...data };
                }
                NotificationManager.warning(
                  'Cannot log user in.',
                  'Login Error',
                  3000,
                  null,
                  null,
                  ''
                );
                return null;
              })
              .catch(() => {
                NotificationManager.warning(
                  'Cannot log user in.',
                  'Login Error',
                  3000,
                  null,
                  null,
                  ''
                );
                return null;
              });
          })
          .catch((err) => {
            console.log(err);

            NotificationManager.warning(
              err.message,
              'Registration Error',
              3000,
              null,
              null,
              ''
            );
            return null;
          });
      }
      NotificationManager.warning(
        'Please make sure you fill in all the details',
        'Login Error',
        3000,
        null,
        null,
        ''
      );
      return null;
    }
    return null;
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
