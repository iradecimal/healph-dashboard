import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/overviewpage.jsx";
import MealChartsPage from "./pages/mealchartspage.jsx";
import IntakeChartsPage from "./pages/intakechartpage.jsx";
import TrendsPage from "./pages/trendspage.jsx";
import IntakesTablePage from "./pages/intakespage.jsx";
import MealTablePage from "./pages/mealspage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact={true} path="/" element={<OverviewPage />} />
          <Route exact={true} path="/mealcharts" element={<MealChartsPage />} />
          <Route exact={true} path="/intakecharts" element={<IntakeChartsPage />} />
          <Route exact={true} path="/trends" element={<TrendsPage />} />
          <Route exact={true} path="/intakes" element={<IntakesTablePage />} />
          <Route exact={true} path="/meals" element={<MealTablePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;