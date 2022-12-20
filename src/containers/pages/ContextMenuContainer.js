import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu id="menu_id" onShow={(e) => onContextMenu(e, e.detail.data)}>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'approve' }}>
        <i className="simple-icon-docs" /> <span>Approve</span>
      </MenuItem>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'hold' }}>
        <i className="simple-icon-drawer" /> <span>Put on Hold</span>
      </MenuItem>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'reject' }}>
        <i className="simple-icon-trash" /> <span>Reject</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainer;
