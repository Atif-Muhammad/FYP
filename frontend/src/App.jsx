import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DataScreen from "./pages/DataScreen";
import Auth from "./pages/Auth";
import { useQuery } from "@tanstack/react-query";
import { userWho } from "../config/apis";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/ui/LoadingScreen"

function App() {
  const { data: currentUser, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: userWho,
    enabled: true,
    retry: 1
  });

  if (isLoading && !isError && !isSuccess) return <LoadingScreen/>

  return (
    <>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>

          {/* If logged in: show protected pages */}
          {currentUser ? (
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data/:for" element={<DataScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
