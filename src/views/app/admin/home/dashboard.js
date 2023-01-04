import React, { useEffect, useState, useMemo } from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IconCardsCarousel from 'containers/dashboards/IconCardsCarousel';
import RecentOrders from 'containers/dashboards/RecentOrders';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import { connect } from 'react-redux';
import { firestore } from 'helpers/Firebase';
import { UserRole } from 'constants/defaultValues';

const BlankPage = ({ match }) => {
  const [addresses, setAddresses] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    let addressSubscription;
    let userSubscription;
    let paymentSubscription;

    try {
      addressSubscription = firestore
        .collection('addresses')
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            const addressesData = [];
            querySnapshot.docs.forEach((doc) => {
              addressesData.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setAddresses(addressesData);
          } else {
            setAddresses([]);
          }
        });

      userSubscription = firestore
        .collection('customers')
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            const customersData = [];
            querySnapshot.docs.forEach((doc) => {
              customersData.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setUsers(customersData);
          } else {
            setUsers([]);
          }
        });

      paymentSubscription = firestore
        .collection('payments')
        .doc(new Date().getFullYear().toString())
        .collection('receipts')
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty) {
            const paymentsData = [];
            querySnapshot.docs.forEach((doc) => {
              paymentsData.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setPayments(paymentsData);
          } else {
            setPayments([]);
          }
        });
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (addressSubscription) {
        addressSubscription();
      }
      if (userSubscription) {
        userSubscription();
      }
      if (paymentSubscription) {
        paymentSubscription();
      }
    };
  }, []);

  console.log(addresses, users, payments);

  const activeAddresses = useMemo(
    () =>
      addresses?.filter((address) => address.isActive && !address.isDuesExempt)
        ?.length,
    [addresses]
  );

  const waitingApproval = useMemo(
    () => users?.filter((user) => user.isActive && !user.isApproved)?.length,
    [users]
  );
  const activeUsers = useMemo(
    () => users?.filter((user) => user.isActive)?.length,
    [users]
  );
  const admins = useMemo(
    () => users?.filter((user) => user.role === UserRole.Admin)?.length,
    [users]
  );
  const inactiveUsers = useMemo(
    () => users?.filter((user) => !user.isActive)?.length,
    [users]
  );

  const titleOwned = useMemo(
    () =>
      addresses?.filter((address) => address.isActive && address.isTitleCompany)
        ?.length,
    [addresses]
  );
  const individuallyOwned = useMemo(
    () =>
      addresses?.filter(
        (address) => address.isActive && !address.isTitleCompany
      )?.length,
    [addresses]
  );
  const duesExempted = useMemo(
    () =>
      addresses?.filter((address) => address.isActive && !address.isDuesExempt)
        ?.length,
    [addresses]
  );
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Dashboard" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx lg="12" xl="12" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-clock"
            title="Payment Received"
            detail="via Online, Cash or Check"
            percent={
              payments.length ? (payments.length * 100) / activeAddresses : 0
            }
            progressText={`${payments.length} / ${activeAddresses}`}
          />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="12">
          <IconCardsCarousel
            data={[
              {
                title: 'User Waiting Approval',
                icon: 'iconsminds-clock',
                value: waitingApproval || 'None',
              },
              {
                title: 'Active Users',
                icon: 'iconsminds-basket-coins',
                value: activeUsers || 'None',
              },
              {
                title: 'Admin Users',
                icon: 'iconsminds-arrow-refresh',
                value: admins || 'None',
              },
              {
                title: 'Inactive Users',
                icon: 'iconsminds-mail-read',
                value: inactiveUsers || 'None',
              },
            ]}
          />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="12">
          <IconCardsCarousel
            data={[
              {
                title: 'Title Owned Addresses',
                icon: 'iconsminds-clock',
                value: titleOwned || 'None',
              },
              {
                title: 'Individually Owned Addresses',
                icon: 'iconsminds-basket-coins',
                value: individuallyOwned || 'None',
              },
              {
                title: 'Dues Exempted Addresses',
                icon: 'iconsminds-arrow-refresh',
                value: duesExempted || 'None',
              },
              {
                title: 'Payments Left',
                icon: 'iconsminds-mail-read',
                value: activeAddresses - payments.length,
              },
            ]}
          />
        </Colxx>
      </Row>

      {!!payments?.length && (
        <Row>
          <Colxx lg="12" xl="12" className="mb-4">
            <RecentOrders payments={payments} />
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

export default connect(mapStateToProps, {})(BlankPage);
