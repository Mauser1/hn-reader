import getMuiTheme from "material-ui/styles/getMuiTheme";
import { orange800 } from "material-ui/styles/colors";

// TODO?
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange800
  },
  appBar: {
    height: 50
  }
});

export default muiTheme;
