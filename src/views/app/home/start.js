import React, { useState } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import StateButton from 'components/StateButton';
import { firestore } from 'helpers/Firebase';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';

const Start = ({ match, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onOneTimeClickHandler = async () => {
    setIsLoading(true);
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

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Pay HOA Dues" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {isLoading && <div className="loading" />}
      {!isLoading && (
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card className="mb-5">
              <CardBody>
                <>
                  <p className="lead">HOA Dues are to be paid annually.</p>
                  <p>We collect HOA dues to .... add text here</p>
                  <hr className="my-4" />
                  <p className="lead mb-0">
                    <StateButton id="hello" onClick={onOneTimeClickHandler}>
                      Make Payment
                    </StateButton>
                  </p>
                </>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};

export default connect(mapStateToProps, {})(Start);
