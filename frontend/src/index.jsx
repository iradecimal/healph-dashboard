import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/overviewpage.jsx";
import MealChartsPage from "./pages/mealchartspage.jsx";
import LifestyleChartsPage from "./pages/lifestylechartpage.jsx";
import TrendsPage from "./pages/trendspage.jsx";
import LifestylesTablePage from "./pages/lifestylepage.jsx";
import MealTablePage from "./pages/mealspage.jsx";
import AboutPage from "./pages/aboutpage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact={true} path="/" element={<OverviewPage />} />
          <Route exact={true} path="/mealcharts" element={<MealChartsPage />} />
          <Route exact={true} path="/lifestylecharts" element={<LifestyleChartsPage />} />
          <Route exact={true} path="/trends" element={<TrendsPage />} />
          <Route exact={true} path="/lifestyles" element={<LifestylesTablePage />} />
          <Route exact={true} path="/meals" element={<MealTablePage />} />
          <Route exact={true} path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;