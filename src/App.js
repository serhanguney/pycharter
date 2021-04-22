import { useState, useEffect } from "react";
import "./styles/App.scss";
import Homepage from "./pages/Homepage";
import Yacht from "./pages/Yacht";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import { Route, Switch } from "react-router-dom";
import { Portfolio, portfolioObject } from "./context";
import { AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import Fleet from "./pages/Fleet";

function App() {
  const [portfolio, setPortfolio] = useState(portfolioObject);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const loadPage = useAnimation();
  async function pageTransition() {
    await loadPage.start({
      x: window.innerWidth,
      skewX: [0, -5, 0],
      transition: { duration: 1.2, ease: portfolioObject.ease, delay: 0.2 },
    });
    await loadPage.start({
      width: "0%",
      x: 0,
      transition: { duration: 0.1, x: { delay: 0.2 } },
    });
  }

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
      //mobile browser bottom bar triggers resize event on scroll. Prevent this with setting the max value all the time.
      //preventing mobile bugs
      if (dimensions.width < 620) {
        setDimensions({
          width: window.innerWidth,
          height: Math.max(window.innerHeight, dimensions.height),
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
    <>
      <Portfolio.Provider
        value={{
          portfolio,
          setPortfolio,
          dimensions,
          motionMenu,
          pageTransition,
          loadPage,
        }}
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
                <Route path="/destinations" component={Destinations} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </AnimatePresence>
          )}
        />
        {/* <Footer /> */}
      </Portfolio.Provider>
    </>
  );
}

export default App;
