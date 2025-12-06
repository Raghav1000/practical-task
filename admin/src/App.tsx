import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import UsersPage from "./pages/users/users.page";
import { ConfigProvider } from "antd";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeShadow: "none",
            },
          },
          token: {
            colorPrimary: "#000000",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
