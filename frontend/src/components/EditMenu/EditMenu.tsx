import React from "react";
import { IMenu } from "../../types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const EditMenu: React.FC<IMenu> = ({
  menu,
  closeMenu,
  deleteHours,
  hourId,
}) => {
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Edit</MenuItem>
        <MenuItem onClick={() => deleteHours(hourId)}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default EditMenu;
