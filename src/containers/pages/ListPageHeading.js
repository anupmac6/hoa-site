/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

import Breadcrumb from '../navs/Breadcrumb';

const ListPageHeading = ({
  handleChangeSelectAll,
  match,
  selectedItemsLength,
  itemsLength,
  heading,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            {'  '}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 &&
                        selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem>Reject</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    console.log('approve');
                  }}
                >
                  Approve
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <Breadcrumb match={match} />
        </div>

        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
