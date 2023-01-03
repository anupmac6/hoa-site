import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import StateButton from 'components/StateButton';
import { firestore } from 'helpers/Firebase';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';

const Start = ({ match, currentUser }) => {
  console.log(currentUser);
  const onClickHandler = async () => {
    return firestore
      .collection('customers')
      .doc(currentUser?.uid)
      .collection('checkout_sessions')
      .add({
        price: 'price_1MFhRaJWmex15Pmf8XEROVy8',
        success_url: `${window.location.origin}/app/payment-success`,
        cancel_url: `${window.location.origin}/app/payment-error`,
      })
      .then((docRef) => {
        docRef.onSnapshot(async (snap) => {
          const { error, sessionId } = snap.data();

          if (error) {
            alert(`An error occured: ${error.message}`);
          }

          if (sessionId) {
            const stripe = await loadStripe(
              'pk_test_51MF1E4JWmex15PmfSMNpiS8UVyS9YcWeFgQ16Se5PMs4siO39i59PDzww8mC46unA3lzjUyy5G3y79kh5JfTffcq00h9fR4kmB'
            );

            await stripe.redirectToCheckout({ sessionId });
          }
        });
      });
  };
  const onOneTimeClickHandler = async () => {
    return firestore
      .collection('customers')
      .doc(currentUser?.uid)
      .collection('checkout_sessions')
      .add({
        mode: 'payment',
        line_items: [
          {
            price: 'price_1MF2A3JWmex15PmfGEYYfEux',
            quantity: 1,
          },
        ],

        success_url: `${window.location.origin}/app/payment-success`,
        cancel_url: `${window.location.origin}/app/payment-error`,
      })
      .then((docRef) => {
        docRef.onSnapshot(async (snap) => {
          const { error, sessionId } = snap.data();

          if (error) {
            alert(`An error occured: ${error.message}`);
          }

          if (sessionId) {
            const stripe = await loadStripe(
              'pk_test_51MF1E4JWmex15PmfSMNpiS8UVyS9YcWeFgQ16Se5PMs4siO39i59PDzww8mC46unA3lzjUyy5G3y79kh5JfTffcq00h9fR4kmB'
            );

            await stripe.redirectToCheckout({ sessionId });
          }
        });
      });
  };
  console.log(currentUser);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.start" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
            <IntlMessages id="menu.start" />
          </p>

          <StateButton id="hello" onClick={onClickHandler}>
            subscribe
          </StateButton>
          <StateButton id="hello" onClick={onOneTimeClickHandler}>
            one time
          </StateButton>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};

export default connect(mapStateToProps, {})(Start);
