import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Jumbotron, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { firestore } from 'helpers/Firebase';
import { adminRoot } from 'constants/defaultValues';
import { connect } from 'react-redux';

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

        setIsLoading(false);
      } else {
        history.push(adminRoot);
      }
    } catch (error) {
      history.push(adminRoot);
    }
  };
  const goToPayments = () => {
    history.push('/app/home/start');
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return <div className="loading" />;
  }
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
                <h1 className="display-4">Payment Failed</h1>
                <p className="lead">We were unable to receive your payment.</p>
                <hr className="my-4" />

                <p className="lead mb-0">
                  <Button onClick={goToPayments} color="primary" size="lg">
                    Try Again
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
