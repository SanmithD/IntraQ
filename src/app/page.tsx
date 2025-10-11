import { lazy } from "react";

const MainPage = lazy(()=>import("./pages/Home/page"))

export default function Home() {
  return (
    <div>
      <MainPage/>
    </div>
  );
}
