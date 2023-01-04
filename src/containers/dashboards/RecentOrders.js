/* eslint-disable react/no-array-index-key */
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle } from 'reactstrap';

const RecentOrders = ({ payments }) => {
  const getDate = (date) => {
    try {
      return new Date(date * 1000).toLocaleString();
    } catch (error) {
      return '-';
    }
  };
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button type="button" className="btn btn-header-light icon-button">
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>Recent Payments</CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {payments.map((payment, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <div>
                      <p className="list-item-heading">{payment.street}</p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          {payment.method ? payment.method : 'Online'}
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                        {getDate(payment.created)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default RecentOrders;
