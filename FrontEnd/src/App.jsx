import { Outlet, Route, Routes, useActionData } from "react-router-dom";
import { Header } from "./Common/Header";
import { Footer } from "./Common/Footer";
import { HomePage } from "./Pages/HomePage";
import { UserAuthPage } from "./Pages/UserAuthPage";
import { authStore } from "./Stores/authStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { EditorPage } from "./Pages/EditorPage";
import { AuthProtection } from "./Components/AuthProtection";
import { SearchPage } from "./Pages/SearchPage";
import { ProfilePage } from "./Pages/ProfilePage";
import { BlogPage } from "./Pages/BlogPage";
import { SettingsPage } from "./Pages/SettingsPage";
import { EditProfile } from "./Components/EditProfile";
import { ChangePassword } from "./Components/ChangePassword";

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
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route element={<AuthProtection />}>
              <Route path="" element={<SettingsPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:slug" element={<EditorPage />} />
              <Route path="/settings" element={<SettingsPage />}>
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
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
