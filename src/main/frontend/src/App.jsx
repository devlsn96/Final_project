import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// 페이지 컴포넌트
import LoginPage from "./pages/login/LoginPage.jsx";
import LoginForm from "./pages/login/LoginForm.jsx";
import RegitForm from "./pages/login/RegitForm.jsx";
import MainLayout from "./component/main/MainLayout.jsx";
import LogoutCallback from "./pages/login/LogoutCallback.jsx";
import RegitPhone from "./pages/login/RegitPhone.jsx";
import MyPage from "./pages/mypage/MyPage.jsx";
import ProfileInfo from "./pages/mypage/ProfileInfo.jsx";
import ReservationHistory from "./pages/mypage/ReservationHistory.jsx";
import Wishlist from "./pages/mypage/Wishlist.jsx";
import AccommodationDetailPage from "./component/AccommodationDetail/AccommodationDetailPage.jsx";
import PaymentCheckoutPage from "./pages/payment/PaymentCheckout.jsx";
import PaymentSuccessPage from "./pages/payment/PaymentSuccess.jsx";
import PaymentFailPage from "./pages/payment/PaymentFail.jsx";
import AccommodationList from "./component/AccommodationList/AccommodationList.jsx";
import MainPage from "./component/main/Main.jsx";
import Jeju from "./component/PopularDestinations/jeju.jsx";
import Busan from "./component/PopularDestinations/busan.jsx";
import { UserContextProvider } from "./UserContext.jsx";

function App() {
  // const [user, setUser] = useState(null); // 사용자 정보
  // const [token, setToken] = useState(null); // 카카오 토큰
  // const [loading, setLoading] = useState(true); // 로딩 상태

  // 로딩 중 화면 표시
  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <MainPage /> }, // 기본 리디렉션
        { path: "/logout-callback", element: <LogoutCallback /> },
        { path: "/login", element: <LoginPage /> },
        {
          path: "/login/email",
          element: <LoginForm />,
        },
        { path: "/login/email/regit", element: <RegitForm /> },
        { path: "/login/regitPhone", element: <RegitPhone /> },
        {
          path: "/mypage",
          element: <MyPage />,
          children: [
            {
              index: true, // 기본 경로 설정
              element: <Navigate to="profile-info" replace />,
            },
            {
              path: "profile-info",
              element: <ProfileInfo />,
            },
            {
              path: "reservation-history",
              element: <ReservationHistory />,
            },
            { path: "wishlist", element: <Wishlist /> },
          ],
        },
        {
          path: "/accommodations/search",
          element: <AccommodationList />,
        },
        {
          path: "/accommodation/:accomId",
          element: <AccommodationDetailPage />,
        },
        {
          path: "/destination/jeju",
          element: <Jeju />,
        },
        {
          path: "/destination/busan",
          element: <Busan />,
        },
        {
          path: "/payment/checkout",
          element: <PaymentCheckoutPage />,
        },
        {
          path: "/payment/success",
          element: <PaymentSuccessPage />,
        },
        { path: "/payment/fail", element: <PaymentFailPage /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
