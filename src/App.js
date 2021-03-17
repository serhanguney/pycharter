import { useState, useEffect } from "react";
import "./styles/App.scss";
import Homepage from "./pages/Homepage";
import Fleet from "./pages/Fleet";
import { Route, Switch } from "react-router-dom";
import { Portfolio, portfolioObject } from "./context";
import { AnimatePresence } from "framer-motion";

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
      //mobile browser bottom bar triggers resize event on scroll. Prevent this with the following
      if (
        dimensions.height * 0.8 > window.innerHeight ||
        dimensions.width !== window.innerWidth
      ) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }, 1000);
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [dimensions.height, dimensions.width]);
  return (
    <div className="App">
      <Portfolio.Provider value={{ portfolio, setPortfolio, dimensions }}>
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route path="/" component={Homepage} exact />
                <Route exact path="/fleet/:boat" component={Fleet} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Portfolio.Provider>
    </div>
  );
}

export default App;
