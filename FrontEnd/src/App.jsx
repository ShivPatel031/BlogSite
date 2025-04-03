import { Outlet, Route, Routes, useActionData } from "react-router-dom";
import { Header } from "./Common/Header";
import { Footer } from "./Common/Footer";
import { HomePage } from "./Pages/HomePage";
import { UserAuthPage } from "./Pages/UserAuthPage";
import { authStore } from "./stores/authStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { EditorPage } from "./Pages/EditorPage";
import { AuthProtection } from "./Components/AuthProtection";

function PagesWithHeaderFooter() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  const { refreshTokenAndLogin } = authStore();

  useEffect(() => {
    refreshTokenAndLogin();
  }, []);

  return (
    <>
      <div className="w-screen min-h-screen">
        <Toaster />
        <Routes>
          <Route element={<PagesWithHeaderFooter />}>
            <Route index element={<HomePage />} />
            <Route element={<AuthProtection />}>
              <Route path="/editor" element={<EditorPage />} />
            </Route>
          </Route>
          <Route path="/sign-in" element={<UserAuthPage type="sign-in" />} />
          <Route path="/sign-up" element={<UserAuthPage type="sign-up" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
