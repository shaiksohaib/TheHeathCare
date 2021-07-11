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
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import TextField from "@material-ui/core/TextField";

import modalStyle from "../../assets/jss/material-kit-react/modalStyle.js";

import axios from "axios";

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

export default function Hospitalcards() {
  const [userlist, setUserlist] = useState([]);
  const [totaldr, setTotaldr] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [userId, setUserId] = useState();
  const [drId, setDrId] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      console.log(localStorage.getItem("token"));
      let mytoken = localStorage.getItem("token");
      let drId = localStorage.getItem("drId");

      const headers = {
        Authorization: `Bearer ${mytoken}`,
        "My-Custom-Header": "foobar",
      };
      const req = await axios.get(
        "https://capstone-health.herokuapp.com/user/allhospital",
        { headers }
      );
      console.log(req.data);
      setUserlist(req.data.hospital);
      setTotaldr(req.data.totalDoctor);
    }

    fetchData();
  }, []);

  console.log(userlist);
  const appointment = async (drid) => {
    // e.preventDefault();
    // console.log(as);
    setModal(true);
    let userid = localStorage.getItem("userId");
    console.log(drid);
    setDrId(drid);
    setUserId(userid);

    // const { name, email, password, category } = user;
    // try {
    //   await Axios.post("https://capstone-health.herokuapp.com/user/signup", {
    //     name,
    //     email,
    //     password,
    //     category,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       setIsingnup(true);
    //       console.log(res.data);
    //       window.alert("Successfully signup");
    //       <Redirect to="/login" />;
    //     })
    //     .catch((err) => {
    //       window.alert("Email id is already Exist");
    //     });
    // } catch (err) {
    //   window.alert(err);
    // }
  };

  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    phone: "",
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
    const { name, email, phone } = userdata;
    console.log(drId);
    console.log(userId);

    try {
      await axios
        .post(
          "https://capstone-health.herokuapp.com/appointment/appointmentCreate",
          {
            name,
            email,
            phone,
            userId,
            drId,
          }
        )
        .then((res) => {
          console.log(res);
          // setIsingnup(true);
          console.log(res.data);
          window.alert(" Appointment Booked Successfully ");
          // <Redirect to="/login" />;
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
          {" "}
          <h3>Total Hospital Available : {totaldr}</h3>{" "}
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
                <h3> Hospital Name :{row.hospitalName}</h3>
              </CardHeader>
              <h1 className={classes.cardTitle}>24/7</h1>
              <p>
                <b>SPECIALISATION : {row.specialist} </b>
              </p>
              <p>Equipment : {row.equipment}</p>

              <p>Contact No.: {row.phone}</p>
              <p>Email: {row.email}</p>
              <p>About: {row.about}</p>
              <p>
                Address: {row.address}, {row.city}
              </p>

              <div>
                <Button
                  color="primary"
                  round
                  onClick={() => {
                    appointment(row._id);
                  }}
                >
                  Book Appointment
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
                    <h4 className={classes.modalTitle}>Book Appointment</h4>
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
                        value={userdata.phonel}
                        onChange={handleInputs}
                      />
                    </form>
                    <h5>Are you sure you want to do this?</h5>
                  </DialogContent>
                  <DialogActions
                    className={
                      classes.modalFooter + " " + classes.modalFooterCenter
                    }
                  >
                    <Button onClick={PostData} color="success">
                      Confirm
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
