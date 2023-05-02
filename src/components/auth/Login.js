import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Login = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { userDetails, setUserDetails } = useContext(UserContext);

  const [alert, setAlert] = useState({ status: false });

  const onChangeHandler = (events) => {
    setUserDetails({
      ...userDetails,
      [events.target.name]: events.target.value
    });
    setAlert({ status: false, type: "", msg: "" });
    console.log("Checking events.target");
    console.log(events.target);
  };

  const validateUser = () => {
    setAlert({ status: true, type: "primary", msg: "Processing..." });
    axios
      .get(
        `https://letsprint-backend.onrender.com/users/username/${userDetails.username}`
      )
      .then((res) => {
        if (res.data.username !== userDetails.username) {
          setAlert({
            status: true,
            type: "warning",
            msg: "User Doesn't Exists"
          });
        } else if (res.data.active === false) {
          setAlert({
            status: true,
            type: "warning",
            msg: "You are not allowed to Login"
          });
        } else if (res.data.password === userDetails.password) {
          setAlert({
            status: true,
            type: "success",
            msg: "Login Successful"
          });

          setTimeout(async () => {
            await setUserDetails(res.data);

            await setUserDetails((prevState) => {
              return { ...prevState, status: true };
            });
          }, 1000);
        } else {
          setAlert({
            status: true,
            type: "danger",
            msg: "Wrong Credentials"
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setAlert({
          status: true,
          type: "danger",
          msg: "Server Error"
        });
      });
  };

  const onSubmitHandler = (events) => {
    events.preventDefault();
    setAlert({ status: true, type: "primary", msg: "Processing..." });

    setTimeout(() => {
      if (
        userDetails.username.trim() === "" ||
        userDetails.password.trim() === ""
      ) {
        setAlert({
          status: true,
          type: "warning",
          msg: "Fields cannot be empty"
        });
      } else {
        validateUser();

        setUserDetails({
          username: "",
          password: ""
        });
      }
    }, 1000);
  };

  return (
    <div className="columns m-1 is-centered">
      <section className="box mt-3 m-2 hero is-primary">
        <div className="hero-body">
          <p className="title has-text-centered">Login</p>
        </div>
      </section>

      <div className="column is-tablet is-one-third">
        <form autoComplete="off" onSubmit={onSubmitHandler}>
          <div className="box">
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  onChange={onChangeHandler}
                  name="username"
                  value={userDetails.username}
                  className="input"
                  type="text"
                  placeholder="Enter Your Username"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  onChange={onChangeHandler}
                  name="password"
                  value={userDetails.password}
                  className="input"
                  type="password"
                  placeholder="Enter Your Password"
                />
              </div>
            </div>

            {alert.status && (
              <div className={`notification is-${alert.type}`}>{alert.msg}</div>
            )}

            <div className="control ml-0 is-fullwidth">
              <button type="submit" className=" button is-success is-fullwidth">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
