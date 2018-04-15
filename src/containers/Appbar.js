import React from "react";
import { AppBar } from "material-ui";
import FlatButton from "material-ui/FlatButton";

const AppbarButtons = () => (
  <div>
    <FlatButton label="Ask" />
    <FlatButton label="Show" />
    <FlatButton label="Jobs" />
  </div>
);

const Menu = () => (
  <div>
    <AppbarButtons />
  </div>
);
const Appbar = () => (
  <div>
    <AppBar
      id="hn-client"
      title="HN Reader"
      iconButtonElement={<Menu />}
      showMenuIconButton={false}
    />
  </div>
);

export default Appbar;
