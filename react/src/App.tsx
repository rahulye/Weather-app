/** @format */
import type { FC } from "react";
import { MainPage } from "./components/MainPage";

const App:FC = () => {
	return (
    <div className="h-screen text-w flex justify-center bg-black">
      <MainPage />
    </div>
  );
}

export default App;
