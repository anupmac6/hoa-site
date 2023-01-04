import React, { useState, useEffect } from 'react';
import { Card, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { connect } from 'react-redux';

import { firestore } from 'helpers/Firebase';
import TooltipItem from 'components/common/TooltipItem';

const BlankPage = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const subscription = firestore
      .collection('addresses')
      .onSnapshot((querySnapshot) => {
        const addressDoc = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();

          addressDoc.push({
            id: doc.id,
            ...docData,
          });
        });

        setIsLoading(false);
        setAddresses(addressDoc);
      });
    return () => {
      subscription();
    };
  }, []);

  const onActiveToggleHandler = async (addressId) => {
    const data = await firestore.collection('addresses').doc(addressId).get();

    if (data.exists) {
      data.ref.update({
        isActive: !data.data().isActive,
      });
    }
  };

  const onTitleToggleHandler = async (addressId) => {
    const data = await firestore.collection('addresses').doc(addressId).get();

    if (data.exists) {
      data.ref.update({
        isTitleCompany: !data.data().isTitleCompany,
      });
    }
  };

  const onDuesToggleHandler = async (addressId) => {
    const data = await firestore.collection('addresses').doc(addressId).get();

    if (data.exists) {
      data.ref.update({
        isDuesExempt: !data.data().isDuesExempt,
      });
    }
  };

  const renderActiveStatus = (address) => {
    if (address.isActive) {
      return 'Active';
    }
    return 'Inactive';
  };

  const renderTitleStatus = (address) => {
    if (address.isTitleCompany) {
      return 'Owned By Title Company';
    }
    return 'Owned By Individuals';
  };
  const renderDuesStatus = (address) => {
    if (address.isDuesExempt) {
      return 'Exempted from Dues';
    }
    return 'Paying Dues';
  };
  console.log(addresses);
  if (isLoading) {
    return <div className="loading" />;
  }
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Addresses" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        {addresses?.map((address) => {
          return (
            <Colxx xxs="12" className="mb-3" key={address.id}>
              <Card className="d-flex flex-row">
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <div className="w-40 w-sm-100">
                      <p className="list-item-heading mb-1 truncate">
                        {address.street}
                      </p>
                    </div>

                    <p className="mb-1 w-15 w-sm-100">
                      <TooltipItem
                        onClick={() => onActiveToggleHandler(address.id)}
                        item={{
                          placement: 'top',
                          text: renderActiveStatus(address),
                          body: 'Clicking it will toggle the status',
                        }}
                      />
                    </p>
                    <p className="mb-1 w-15 w-sm-100">
                      <TooltipItem
                        onClick={() => onTitleToggleHandler(address.id)}
                        item={{
                          placement: 'top',
                          text: renderTitleStatus(address),
                          body: 'Clicking it will toggle the status',
                        }}
                      />
                    </p>
                    <p className="mb-1 w-15 w-sm-100">
                      <TooltipItem
                        onClick={() => onDuesToggleHandler(address.id)}
                        item={{
                          placement: 'top',
                          text: renderDuesStatus(address),
                          body: 'Clicking it will toggle the status',
                        }}
                      />
                    </p>
                  </div>
                </div>
              </Card>
            </Colxx>
          );
        })}
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};

export default connect(mapStateToProps, {})(BlankPage);
