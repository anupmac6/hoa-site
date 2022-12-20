import React, { useEffect } from 'react';
import { Row, Card, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { adminRoot } from 'constants/defaultValues';

const RegistrationComplete = () => {
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">
                <div className="position-relative image-side ">
                  <p className="text-white h2">Registration Successful</p>
                  <p className="white mb-0">Keep an eye on your mail!</p>
                </div>
                <div className="form-side">
                  <NavLink to="/" className="white">
                    <span className="logo-single" />
                  </NavLink>
                  <CardTitle className="mb-4">
                    Registration Successful
                  </CardTitle>
                  <p className="mb-0 text-muted text-small mb-5">
                    Once the admin approves your account you will have access to
                    the app.
                  </p>
                  {/* <p className="display-1 font-weight-bold mb-5"> Complete</p> */}
                  <NavLink
                    to={adminRoot}
                    className="btn btn-primary btn-shadow btn-lg"
                  >
                    <IntlMessages id="pages.go-back-home" />
                  </NavLink>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </>
  );
};

export default RegistrationComplete;
