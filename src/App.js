import { useState, useEffect } from "react";
import "./styles/App.scss";
import Homepage from "./pages/Homepage";
import Yacht from "./pages/Yacht";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Route, Switch } from "react-router-dom";
import { Portfolio, portfolioObject } from "./context";
import { AnimatePresence, useMotionValue } from "framer-motion";
import Fleet from "./pages/Fleet";

function App() {
  const [portfolio, setPortfolio] = useState(portfolioObject);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const motionMenu = useMotionValue(0);
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
      //preventing mobile bugs
      if (
        dimensions.width < 620 &&
        dimensions.height * 0.8 > window.innerHeight
      ) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      if (dimensions.width > 620) {
        //enabling the full resize on desktop
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
    <div>
      <Portfolio.Provider
        value={{ portfolio, setPortfolio, dimensions, motionMenu }}
      >
        <Navbar />
        {dimensions.width < 620 ? (
          <Menu
            close={() => setPortfolio({ ...portfolio, menuOpen: false })}
            menuOpen={portfolio.menuOpen}
          />
        ) : null}
        <Route
          render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route path="/" component={Homepage} exact />
                <Route path="/fleet" component={Fleet} exact />
                <Route path="/fleet/:boat" component={Yacht} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Portfolio.Provider>
    </div>
  );
}

export default App;
