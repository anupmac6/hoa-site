import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { firestore, auth } from 'helpers/Firebase';
import CustomSelectInput from 'components/common/CustomSelectInput';

import Select from 'react-select';
import { NotificationManager } from 'components/common/react-notifications';
import StateButton from '../../components/StateButton';

const Register = ({ registerUserAction, history }) => {
  const [email, setEmail] = useState('demo@gogo.com');
  const [password, setPassword] = useState('gogo123');
  const [name, setName] = useState('Sarah Kortney');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);

  console.log(registerUserAction);

  const loadAddresses = async () => {
    const data = await firestore
      .collection('addresses')
      .where('isActive', '==', true)
      .get();

    if (!data.empty) {
      const addressesDoc = [];

      data.docs.forEach((doc, index) => {
        const docData = doc.data();
        addressesDoc.push({ key: index, label: docData.street, value: doc.id });
      });

      setAddresses(addressesDoc);
      console.log(addressesDoc);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // eslint-disable-next-line consistent-return
  const onUserRegister = async () => {
    if (
      email !== '' &&
      password !== '' &&
      selectedAddress !== '' &&
      name !== ''
    ) {
      const postdata = { email, password, selectedAddress, name };
      console.log(postdata);
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          const userId = user.user.uid;

          return firestore.collection('customers').doc(userId).set({
            name,
            email,
            isApproved: false,
            isActive: true,
            isAdmin: false,
            selectedAddress,
            status: 'waiting approval',
          });
        })
        .then(() => {
          history.push('/registration-complete');
          return true;
        })
        .catch((error) => {
          console.log(error);

          NotificationManager.warning(
            error.message,
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
      'Registration Error',
      3000,
      null,
      null,
      ''
    );
    return null;

    // call registerUserAction()
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.fullname" />
                </Label>
                <Input
                  type="name"
                  value={name}
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input
                  type="email"
                  defaultValue={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>Address</Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  value={selectedAddress}
                  onChange={setSelectedAddress}
                  options={addresses}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.password" />
                </Label>
                <Input
                  type="password"
                  defaultValue={password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value?.trim())}
                />
              </FormGroup>

              <div className="d-flex justify-content-end align-items-center">
                <StateButton
                  id="register"
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => onUserRegister()}
                >
                  <IntlMessages id="user.register-button" />
                </StateButton>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
