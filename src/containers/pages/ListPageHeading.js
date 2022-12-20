/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Alert,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx, Separator } from 'components/common/CustomBootstrap';

const ListPageHeading = ({
  handleChangeSelectAll,
  selectedItemsLength,
  itemsLength,
  onSelectedItemsClick,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>Registration Queue</h1>

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
                <DropdownItem onClick={() => onSelectedItemsClick('approve')}>
                  Approve
                </DropdownItem>
                <DropdownItem onClick={() => onSelectedItemsClick('hold')}>
                  Put on Hold
                </DropdownItem>
                <DropdownItem onClick={() => onSelectedItemsClick('reject')}>
                  Reject
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>

        <Separator className="mb-5" />
        <Alert color="info" className="rounded">
          These are the list of users who are registered and waiting approval.
          Make sure to verify they belong to the correct address.
        </Alert>
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
