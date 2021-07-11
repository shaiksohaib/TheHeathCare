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
import "./Profilecard.css";
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

export default function Profilecard() {
  const [modal, setModal] = React.useState(false);
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      console.log(localStorage.getItem("token"));
      let mytoken = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      setUserId(userId);
      const headers = {
        Authorization: `Bearer ${mytoken}`,
        "My-Custom-Header": "foobar",
      };
      const req = await axios.get(
        `https://capstone-health.herokuapp.com/user/data/${userId}`,
        { headers }
      );
      // console.log(req.data.data);
      setUserdata(req.data.data);
      // setUser(req.data.data);
      console.log(userdata);
    }

    fetchData();
  }, []);

  const appointment = async () => {
    // e.preventDefault();
    // console.log(as);
    setModal(true);
  };
  //   console.log(drid);
  //   setDrId(drid);
  //   setUserId(userid);

  //   // const { name, email, password, category } = user;
  //   // try {
  //   //   await Axios.post("https://capstone-health.herokuapp.com/user/signup", {
  //   //     name,
  //   //     email,
  //   //     password,
  //   //     category,
  //   //   })
  //   //     .then((res) => {
  //   //       console.log(res);
  //   //       setIsingnup(true);
  //   //       console.log(res.data);
  //   //       window.alert("Successfully signup");
  //   //       <Redirect to="/login" />;
  //   //     })
  //   //     .catch((err) => {
  //   //       window.alert("Email id is already Exist");
  //   //     });
  //   // } catch (err) {
  //   //   window.alert(err);
  //   // }
  // };

  const [userdata, setUserdata] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    address: "",
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
    const { name, city, phone, state, address } = userdata;
    console.log(userId);

    console.log(localStorage.getItem("token"));
    let mytoken = localStorage.getItem("token");
    // let userId = localStorage.getItem("userId");
    console.log(userId);

    const headers = {
      Authorization: `Bearer ${mytoken}`,
      "My-Custom-Header": "foobar",
    };

    try {
      await axios
        .post(
          "https://capstone-health.herokuapp.com/user/update",
          {
            name,
            city,
            phone,
            state,
            address,
            id: userId,
          },
          { headers }
        )
        .then((res) => {
          console.log(res);
          // setIsingnup(true);
          console.log(res.data);
          window.alert(" Updated Successfully ");
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
        {/* {userdata.map((row) => ( */}
        <Card className={classes.textCenter}>
          {/* <CardHeader color="danger">
              {" "}
              <h3>SPECIALISATION</h3>
            </CardHeader> */}
          <CardBody>
            <CardHeader color="danger">
              <h3>{userdata.name}</h3>
            </CardHeader>
            <h3 className={classes.cardTitle}>Email : {userdata.email}</h3>
            <p>Contact No : {userdata.phone}</p>
            <p>
              Address: {userdata.address}, {userdata.city},{userdata.state}
            </p>
            <Button
              color="primary"
              round
              onClick={() => {
                appointment();
              }}
            >
              Edit Profile
            </Button>
            <div>
              <Dialog
                classes={{
                  root: classes.center,
                  paper: classes.modal,
                }}
                open={modal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModal(true)}
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
                  <h4 className={classes.modalTitle}>Edit Profile</h4>
                </DialogTitle>
                <DialogContent
                  id="modal-slide-description"
                  className={classes.modalBody}
                >
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="standard-basic"
                      label="Name"
                      name="name"
                      placeholder={userdata.name}
                      value={userdata.name}
                      onChange={handleInputs}
                    />
                    <TextField
                      id="standard-basic"
                      label="Phone"
                      name="phone"
                      placeholder={userdata.phone}
                      value={userdata.phone}
                      onChange={handleInputs}
                    />
                    <TextField
                      id="standard-basic"
                      label="City"
                      name="city"
                      placeholder={userdata.city}
                      value={userdata.city}
                      onChange={handleInputs}
                    />
                    <TextField
                      id="standard-basic"
                      label="State"
                      name="state"
                      placeholder={userdata.state}
                      value={userdata.state}
                      onChange={handleInputs}
                    />
                    <TextField
                      id="standard-basic"
                      label="Address"
                      name="address"
                      placeholder={userdata.address}
                      value={userdata.address}
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
        {/* ))} */}
      </div>
    </div>
  );
}
