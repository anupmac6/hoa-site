import React, { useMemo } from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const DataListView = ({ product, isSelect, collect, onCheckItem }) => {
  const pillColor = useMemo(() => {
    if (product.status === 'waiting approval') {
      return 'warning';
    }
    if (product.status === 'on hold') {
      return 'danger';
    }

    if (product.status === 'rejected') {
      return 'dark';
    }

    if (product.status === 'approved') {
      return 'success';
    }
    return 'info';
  }, [product]);
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.name}
                </p>
              </NavLink>

              <p className="mb-1   w-15 w-sm-100">
                {product?.selectedAddress?.label}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {product.email}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={pillColor} pill>
                  {product?.status}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
