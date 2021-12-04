import {Provider} from "react-redux";

import store, { history } from '../../store';
import {ConnectedRouter} from "connected-react-router";
import Routing from "../../containers/Routing";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (<Provider store={store}>
    <ConnectedRouter history={history}>
        <Routing/>
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
</Provider>);


export default App;
