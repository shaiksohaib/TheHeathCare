import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import PanToolIcon from "@material-ui/icons/PanTool";
// core components
// import GridContainer from "components/Grid/GridContainer.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem.js";
import InfoArea from "../../../components/InfoArea/InfoArea.js";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Welcome,</h2>
          <h3 className={classes.description}>
            These are the valuable services that we provide to our Health Care
            family.
          </h3>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Hospitals Near Me"
              description="All the hospital near you under once click!"
              icon={LocalHospitalIcon}
              iconColor="info"
              vertical
            />
            <Link to="/hospital">
              <Button variant="contained" color="primary" disableElevation>
                View Now
              </Button>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Donate Now"
              description="Your penny can save a life. Please donate oxygen to needed, your donation will be transparent and acknoledged!"
              icon={PanToolIcon}
              iconColor="success"
              vertical
            />
            <Link to="/donate">
              <Button variant="contained" color="primary" disableElevation>
                Donate Now
              </Button>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Doctors Near Me"
              description="All available DOCTORS near you are one click away!"
              icon={PersonPinIcon}
              iconColor="primary"
              vertical
            />
            <Link to="/doctor">
              <Button variant="contained" color="primary" disableElevation>
                View Now
              </Button>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
