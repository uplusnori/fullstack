import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostListPage from "./pages/PostListPage.jsx";
import WritePage from "./pages/WritePage.jsx";
import TestPage from "./pages/TestPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  return worker.start();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "posts",
        element: <PostListPage />,
      },
      {
        path: "write",
        element: <WritePage />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
      // 앞으로 다른 페이지들을 이곳에 추가할 수 있습니다.
      // { path: "login", element: <LoginPage /> }
      {
        path: "*", // 일치하는 경로가 없을 때
        element: <ErrorPage />,
      },
    ],
  },
]);

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
