import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { firestore } from 'helpers/Firebase';

const Start = ({ match, currentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    let customerPaymentsSubscription;
    let paymentsSubscription;

    try {
      customerPaymentsSubscription = firestore
        .collection('customers')
        .doc(currentUser?.uid)
        .collection('payments')
        .where('status', '==', 'succeeded')
        .orderBy('created', 'desc')
        .onSnapshot((querySnapshot) => {
          const custPayments = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data();
            custPayments.push({
              id: doc.id,
              ...docData,
            });
          });

          setIsLoading(false);
          setPayments(custPayments);
        });

      paymentsSubscription = firestore
        .collection('payments')
        .doc(new Date().getFullYear().toString())
        .collection('receipts')
        .doc(currentUser?.selectedAddress?.value)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.exists) {
            const data = querySnapshot.data();

            if (data?.method !== 'online') {
              setReceipts([{ id: querySnapshot.id, ...querySnapshot.data() }]);
            }
          }
        });
    } catch (error) {
      setIsLoading(false);
      setPayments([]);
    }

    return () => {
      if (customerPaymentsSubscription) {
        customerPaymentsSubscription();
      }
      if (paymentsSubscription) {
        paymentsSubscription();
      }
    };
  }, []);

  const getDate = (date) => {
    try {
      return new Date(date * 1000).toLocaleString();
    } catch (error) {
      return '-';
    }
  };

  const combined = useMemo(
    () => payments.concat(receipts),
    [payments, receipts]
  );
  console.log(currentUser, isLoading, payments);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Payments" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-5">
            <CardBody>
              <>
                <p className="lead">List of all the payments</p>

                <hr className="my-4" />

                {!combined.length && <p>No Payments made yet.</p>}
                {combined.map((payment) => {
                  return (
                    <div
                      key={payment.id}
                      className="d-flex flex-row mb-3 pb-3 border-bottom justify-content-between align-items-center"
                    >
                      <div className="pl-3 flex-fill">
                        <NavLink to="#" location={{}}>
                          <p className="font-weight-medium mb-0">
                            Successful Payment
                          </p>
                          <p className="text-muted mb-0 text-small">
                            {getDate(payment?.created)}
                          </p>
                        </NavLink>
                      </div>
                      <div>
                        {payment?.charges?.data?.[0]?.receipt_url && (
                          <a
                            className="btn btn-outline-primary btn-xs"
                            href={payment?.charges?.data?.[0]?.receipt_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Receipt
                          </a>
                        )}
                        {payment?.method && (
                          <Badge color="success" pill>
                            {payment?.method}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
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

export default connect(mapStateToProps, {})(Start);
