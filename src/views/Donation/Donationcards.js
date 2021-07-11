import React, { useEffect, useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import Button from "../../components/CustomButtons/Button.js";

import { cardTitle } from "../../assets/jss/material-kit-react.js";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import CustomLinearProgress from "../../components/CustomLinearProgress/CustomLinearProgress.js";

import TextField from "@material-ui/core/TextField";

import modalStyle from "../../assets/jss/material-kit-react/modalStyle.js";

import axios from "axios";
import { TripOriginOutlined } from "@material-ui/icons";

const styles = {
  cardTitle,
  textCenter: {
    textAlign: "center",
  },
  textMuted: {
    color: "#6c757d",
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

//const useStyles = makeStyles(styles);

export default function Donationcards() {
  const [userlist, setUserlist] = useState([]);
  const [totaldr, setTotaldr] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [userId, setUserId] = useState();
  const [orgId, setOrgId] = useState();
  const classes = useStyles();
  async function fetchData() {
    // console.log(localStorage.getItem("token"));
    let mytoken = localStorage.getItem("token");
    // let drId = localStorage.getItem("drId");

    const headers = {
      Authorization: `Bearer ${mytoken}`,
      "My-Custom-Header": "foobar",
    };
    const req = await axios.get(
      "https://capstone-health.herokuapp.com/donate/getall"
      // { headers }
    );
    // console.log(req.data);
    setUserlist(req.data.donateorg);
    setTotaldr(req.data.totalOrganaization);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const donation = async (orgId) => {
    // e.preventDefault();
    // console.log(as);
    setModal(true);
    let userid = localStorage.getItem("userId");
    console.log(orgId);
    setOrgId(orgId);
    setUserId(userid);
  };

  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    console.log(value);
    console.log(name);

    setUserdata({ ...userdata, [name]: value }); //// will take the name from line 15
  };

  const PostData = async (e) => {
    e.preventDefault();
    setModal(false);
    const { name, email, phone, amount } = userdata;

    // console.log(name, userId, phone, amount, orgId);
    let mytoken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${mytoken}`,
      "My-Custom-Header": "foobar",
    };

    let amnt = parseInt(amount);

    try {
      await axios
        .post(
          "https://capstone-health.herokuapp.com/user/donate",
          {
            name,
            email,
            phone,
            userId,
            orgId,
            amount: amnt,
          },
          { headers }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          fetchData();
          window.alert(" Thank you For Donation ");
        })
        .catch((err) => {
          window.alert("Oops! something went wrong please retry ");
        });
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <div>
      <div>
        <CardBody>
          {/* {" "}
          <h3>Total Organization: {totaldr}</h3>{" "} */}
        </CardBody>
        {userlist.map((row) => (
          <Card className={classes.textCenter}>
            {/* <CardHeader color="danger">
              {" "}
              <h3>SPECIALISATION</h3>
            </CardHeader> */}
            <CardBody>
              <CardHeader color="danger">
                {" "}
                <h3>Emergency :{row.emergency}</h3>
              </CardHeader>
              <h1 className={classes.cardTitle}>
                Organization Name:{row.orgName}
                <VerifiedUserIcon />
              </h1>
              <p>Fund Raised: {row.draised}</p>
              <CustomLinearProgress
                variant="determinate"
                color="primary"
                value={(row.draised / row.drequired) * 100}
              />
              <p>Fund Required: {row.drequired}</p>
              <CustomLinearProgress
                variant="determinate"
                color="primary"
                value={100 - (row.draised / row.drequired) * 100}
              />
              <p>
                Address. {row.address}, {row.city} , {row.state}
              </p>

              <div>
                <Button
                  color="primary"
                  round
                  onClick={() => {
                    donation(row._id);
                  }}
                >
                  Donate Now
                </Button>

                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal,
                  }}
                  open={modal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setModal(false)}
                  aria-labelledby="modal-slide-title"
                  aria-describedby="modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => setModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>
                      You are donating for a good cause.Please fill the form to
                      receive an Appreciation letter from Heatlh Care team with
                      all the details shortly.{" "}
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-basic"
                        label="Name"
                        name="name"
                        value={userdata.name}
                        onChange={handleInputs}
                      />
                      <TextField
                        id="standard-basic"
                        label="Email"
                        name="email"
                        value={userdata.email}
                        onChange={handleInputs}
                      />
                      <TextField
                        id="standard-basic"
                        label="Phone No."
                        name="phone"
                        value={userdata.phone}
                        onChange={handleInputs}
                      />
                      <TextField
                        id="standard-basic"
                        label="Amount."
                        type="number"
                        name="amount"
                        value={userdata.amount}
                        onChange={handleInputs}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions
                    className={
                      classes.modalFooter + " " + classes.modalFooterCenter
                    }
                  >
                    <Button onClick={PostData} color="success">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* <div>
        <CardBody>
          {" "}
          <h3>Total Doctor Available {totaldr}</h3>{" "}
        </CardBody>
        {userlist.map((row) => (
          <Card className={classes.textCenter}>
            <CardHeader color="danger">
              {" "}
              <h3>SPECIALISATION:{row.specialist}</h3>
            </CardHeader>
            <CardBody>
              <h1 className={classes.cardTitle}>Dr.{row.name}</h1>
              <p>Consulting Time: {row.timing}</p>
              <p>Address: {row.address}</p>
              <p>Contact No.: {row.phone}</p>
              <p>Email: {row.email}</p>
              <Button color="primary">Book Appointment </Button>
            </CardBody>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
