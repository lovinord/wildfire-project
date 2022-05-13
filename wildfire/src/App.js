import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
import TaskContextProvider from "./contexts/TaskContext";
import MenuContextProvider from "./contexts/MenuContext";
import Main from "./views/Main";
import LoginOrSignup from "./components/LoginAndSignup/LoginOrSignup";
import LogInForm from "./components/LoginAndSignup/LogInForm";
import SignUpForm from "./components/LoginAndSignup/SignUpForm";
import Dashboard from "./components/Dashboard";
import GlobalStyling from "./styles/global";
import DashboardContextProvider from "./contexts/DashboardContext";
import TreeContextProvider from "./contexts/TreeContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <TaskContextProvider>
          <TreeContextProvider>
            <Router>
              <MenuContextProvider>
                <DashboardContextProvider>
                  <GlobalStyling />
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/menu" element={<Main />}>
                      <Route path="welcome" element={<LoginOrSignup />} />
                      <Route path="sign-in" element={<LogInForm />} />
                      <Route path="register" element={<SignUpForm />} />
                      <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                  </Routes>
                </DashboardContextProvider>
              </MenuContextProvider>
            </Router>
          </TreeContextProvider>
        </TaskContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
