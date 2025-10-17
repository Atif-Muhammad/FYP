import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DataScreen from "./pages/DataScreen";
import Auth from "./pages/Auth";
import { useQuery } from "@tanstack/react-query";
import { userWho } from "../config/apis";

function App() {
  // check for user token
  // const currentUser = undefined;
  const {data: currentUser, isLoading} = useQuery({
    queryKey: ["currentUser"],
    queryFn: userWho ,
    enabled: true
  })


  return (
    <BrowserRouter>
      <Routes>
        {currentUser ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/data/:for" element={<DataScreen />} />
          </Route>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
