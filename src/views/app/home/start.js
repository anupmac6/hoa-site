/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import StateButton from 'components/StateButton';
import { firestore } from 'helpers/Firebase';
import { loadStripe } from '@stripe/stripe-js';
import { connect } from 'react-redux';
// import Data from '../../../data.json';

const Start = ({ match, currentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [paidDues, setPaidDues] = useState(false);
  console.log(currentUser);

  useEffect(() => {
    let subscription;
    let paidDuesSubscription;

    if (currentUser) {
      try {
        subscription = firestore
          .collection('addresses')
          .doc(currentUser?.selectedAddress?.value)
          .onSnapshot((querySnapshot) => {
            if (querySnapshot.exists) {
              setAddress({
                id: querySnapshot.id,
                ...querySnapshot.data(),
              });
              setIsLoading(false);
            }
            setIsLoading(false);
          });

        paidDuesSubscription = firestore
          .collection('payments')
          .doc(new Date().getFullYear().toString())
          .collection('receipts')
          .doc(currentUser?.selectedAddress?.value)
          .onSnapshot((querySnapshot) => {
            if (querySnapshot.exists) {
              console.log(querySnapshot.data());
              setPaidDues({
                id: querySnapshot.id,
                ...querySnapshot.data(),
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    return () => {
      if (subscription) {
        subscription();
      }

      if (paidDuesSubscription) {
        paidDuesSubscription();
      }
    };
  }, []);

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

  // const runScript = async () => {
  //   const updatedData = Data.map((item) => {
  //     return {
  //       defaultOwners: item?.defaultOwners?.split(',') || [],
  //       isActive: true,
  //       isDuesExempt: false,
  //       isTitleCompany: false,
  //       owners: [],
  //       street: item.street,
  //     };
  //   });

  //   console.log(updatedData);

  //   const batch = firestore.batch();

  //   updatedData.forEach((item) => {
  //     const doc = firestore.collection('addresses').doc();
  //     batch.set(doc, item);
  //   });

  //   await batch.commit();
  // };

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
                    {address?.isDuesExempt ? (
                      <Button>You are exempted from HOA Dues</Button>
                    ) : paidDues ? (
                      <Button>You have already paid dues for this year</Button>
                    ) : (
                      <StateButton id="hello" onClick={onOneTimeClickHandler}>
                        Make Payment
                      </StateButton>
                    )}
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
