import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
// import Header from "components/Header/Header.js";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import HeaderLink from "../../components/Header/HeaderLink.js";
import Parallax from "../../components/Parallax/Parallax.js";

// import styles from "assets/jss/material-kit-react/views/landingPage.js";
import styles from "../../assets/jss/material-kit-react/views/landingPage";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function Home(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Health Care"
        rightLinks={<HeaderLink />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      {/* <Parallax filter image={require("assets/img/landing-bg.jpg").default}> */}
      <Parallax
        filter
        image={require("../../assets/img/background.jpeg").default}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                Your Health is Our Responsibility
              </h1>
              <h4>
                We care for you, that's why we have brought a new Health Care
                App that will help you to search Doctors and Hospitals nearby
                you and you can easily book Appiontments. You can also donate to
                the People who are in Emergency, with utmost transparency.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="/doctor"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch Video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          {/* <TeamSection /> */}
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
