import React, { useState, useEffect } from 'react';
import { Badge, Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { firestore } from 'helpers/Firebase';

const Start = ({ match, currentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  const fetchData = async () => {
    try {
      const docs = await firestore
        .collection('customers')
        .doc(currentUser?.uid)
        .collection('payments')
        .where('status', '==', 'succeeded')
        .orderBy('created', 'desc')
        .get();

      if (!docs.empty) {
        const paymentsDoc = [];
        console.log(docs);
        docs.docs.forEach((doc) => {
          const docData = doc.data();
          paymentsDoc.push({
            id: doc.id,
            ...docData,
          });
        });
        setIsLoading(false);
        setPayments(paymentsDoc);
      } else {
        setIsLoading(false);
        setPayments([]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setPayments([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDate = (date) => {
    try {
      return new Date(date * 1000).toLocaleString();
    } catch (error) {
      return '-';
    }
  };
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

                {!payments.length && <p>No Payments made yet.</p>}
                {payments.map((payment) => {
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
