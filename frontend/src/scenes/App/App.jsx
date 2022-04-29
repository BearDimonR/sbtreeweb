import { Provider } from "react-redux";

import store, { history } from "../../store";
import { ConnectedRouter } from "connected-react-router";
import Routing from "../../containers/Routing";
import { ToastContainer } from "react-toastify";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ruLocale from "date-fns/locale/ru";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <Routing />
      </LocalizationProvider>
    </ConnectedRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>
);

export default App;
