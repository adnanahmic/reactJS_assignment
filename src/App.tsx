import "./scss/main.scss";
import Header from "./components/Header";
import AppRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
