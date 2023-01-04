import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Jumbotron, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { connect } from 'react-redux';
import { firestore } from 'helpers/Firebase';
import { adminRoot } from 'constants/defaultValues';

const BlankPage = ({ history, match, currentUser }) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const sessions = await firestore
        .collection('customers')
        .doc(currentUser?.uid)
        .collection('checkout_sessions')
        .get();

      if (!sessions.empty) {
        sessions.docs.forEach((snapshot) => {
          snapshot.ref.delete();
        });

        await firestore
          .collection('payments')
          .doc(new Date().getFullYear().toString())
          .collection('receipts')
          .doc(currentUser?.selectedAddress?.value)
          .set({
            method: 'online',
            created: Math.floor(new Date().getTime() / 1000),
            userId: currentUser?.uid,
            notes: 'Payment received via Stripe',
          });

        setIsLoading(false);
      } else {
        history.push(adminRoot);
      }
    } catch (error) {
      history.push(adminRoot);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return <div className="loading" />;
  }

  const goToPayments = () => {
    history.push('/app/home/payments');
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Payment Success" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">Payment Success</h1>
                <p className="lead">We have received your payment.</p>
                <hr className="my-4" />

                <p className="lead mb-0">
                  <Button onClick={goToPayments} color="primary" size="lg">
                    View Payments
                  </Button>
                </p>
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};

export default connect(mapStateToProps, {})(BlankPage);
