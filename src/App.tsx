import { Provider } from "react-redux";
import "./App.css";
import MainComponent from "./components/main";
import store from "./store/mainStore";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainComponent />
      </Provider>
    </div>
  );
}

export default App;
