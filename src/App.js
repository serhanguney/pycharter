import { useState, useEffect } from "react";
import "./styles/App.scss";
import Homepage from "./pages/Homepage";
import Fleet from "./pages/Fleet";
import { Route, Switch } from "react-router-dom";
import { Portfolio, portfolioObject } from "./context";

function App() {
  const [portfolio, setPortfolio] = useState(portfolioObject);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function debounce(fn, ms) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  useEffect(() => {
    let vh = dimensions.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [dimensions]);
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000);
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);
  return (
    <div className="App">
      <Portfolio.Provider value={{ portfolio, setPortfolio, dimensions }}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/fleet/:boat" component={Fleet} />
        </Switch>
      </Portfolio.Provider>
    </div>
  );
}

export default App;
