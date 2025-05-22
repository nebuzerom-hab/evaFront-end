// // original
// import { Routes, Route, useLocation, useNavigate } from "react-router";

// import Home from "./components/Home/Home";

// // import QuestionDetail from "./components/QuestionDetail";
// import About from "./pages/About";
// import styles from "./pages/style/about.module.css";

// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Layout from "./components/Layout/Layout";

// import AskQuestion from "./components/AskQuestion/AskQuestion";
// import SingleQuestion from "./components/Question/SingleQuestion";

// function Routing() {
//   const location = useLocation();
//   const showAbout =
//     location.pathname === "/" || location.pathname == "/register";

//   return (
//     <Layout>
//       <div className={styles.container}>
//         <div className={styles.left}>
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/questions" element={<Home />} />
//             <Route path="/questions/:questionId" element={<SingleQuestion />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/ask-question" element={<AskQuestion />} />
//           </Routes>
//         </div>
//         {showAbout && (
//           <div className={styles.right}>
//             <About />
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// export default Routing;

import { Routes, Route, useLocation } from "react-router";
import Home from "./components/Home/Home";
import About from "./pages/About";
import styles from "./pages/style/about.module.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import SingleQuestion from "./components/Question/SingleQuestion";
import backgroundImage from "./assets/image/evaBG.png";
import EditQuestionPage from "./components/Question/EditQuestion";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import EditAnswer from "./components/AnswerForm/EditAnswer";
import ProfileView from "../src/Profile/ProfileView";
import ProfileEdit from "../src/Profile/ProfileEdit";
import ChangePassword from "../src/Profile/ChangePassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function Routing() {
  const location = useLocation();
  const showAbout =
    location.pathname === "/" || location.pathname === "/register";
  const applyBackground =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <Layout>
      <div
        className={styles.container}
        style={
          applyBackground
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
              }
            : {}
        }
      >
        <div className={styles.left}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/questions" element={<Home />} />
            <Route path="/questions/:questionId" element={<SingleQuestion />} />
            <Route
              path="/edit-question/:questionId"
              element={<EditQuestionPage />}
            />
            <Route path="/edit-answer/:answerId" element={<EditAnswer />} />
            <Route path="/ask-question" element={<AskQuestion />} />
            {/* profile management */}
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* </Route> */}
          </Routes>
        </div>
        {showAbout && (
          <div className={styles.right}>
            <About />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Routing;
