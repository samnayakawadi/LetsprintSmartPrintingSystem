import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate();

  const [alert, setAlert] = useState({ status: false });
  const [selectedFile, setSelectedFile] = useState();
  const [fileDetails, setFileDetails] = useState({
    selected: false,
    uploaded: false,
    uploading: false
  });
  const [toggle, setToggle] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    wallet: 0,
    shopName: "",
    address: "",
    rate: "",
    aadhar: "",
    email:""
  });

  const onSelectHandler = (event) => {
    setFileDetails({ ...fileDetails, uploading: false });
    setAlert({ status: false });
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      if (file.type === "application/pdf") {
        var reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onloadend = function () {
          var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
          setFileDetails((prevState) => {
            return { ...prevState, pages: count };
          });
        };
      }
      setFileDetails({ uploaded: false, selected: true, fileName: file.name });
    } else {
      setFileDetails({ selected: false, uploaded: false });
    }
  };

  const onUploadHandler = () => {
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setAlert({
          status: true,
          msg: "Error! Only PDF is Allowed",
          type: "danger"
        });
      } else {
        if (selectedFile.size > 2097152) {
          setAlert({
            status: true,
            type: "warning",
            msg: "File Size Must be Smaller Than 2 MB"
          });
        } else {
          setAlert({
            status: true,
            type: "primary",
            msg: "Uploading! Please Wait!"
          });
          setFileDetails({ ...fileDetails, uploading: true });
          setTimeout(() => {
            const formData = new FormData();
            formData.append("file", selectedFile);
            axios
              .post(`https://letsprint-backend.onrender.com/files`, formData)
              .then((res) => {
                if (res.data.status === true) {
                  setFileDetails({
                    ...fileDetails,
                    uploaded: true,
                    uploading: false
                  });
                  setAlert({
                    status: true,
                    type: "success",
                    msg: `PDF Uploaded Successfully!`
                  });
                  setLoginDetails((prevState) => {
                    return {
                      ...prevState,
                      documentId: res.data.id,
                      documentUrl: res.data.url
                    };
                  });
                } else {
                  setFileDetails({
                    ...fileDetails,
                    uploaded: false,
                    uploading: false
                  });
                  setAlert({
                    status: true,
                    type: "danger",
                    msg: `Server Error`
                  });
                }
              })
              .catch(() => {
                setAlert({ status: true, type: "danger", msg: `Server Error` });
              });
          }, 800);
        }
      }
    } else {
      setAlert({
        status: true,
        type: "warning",
        msg: "Please Select The Document"
      });
    }
  };

  const onChangeHandler = (events) => {
    setLoginDetails({
      ...loginDetails,
      [events.target.name]: events.target.value
    });

    if(events.target.name === "username"){
      console.log("Inside Username - Converting to Lower Case");
      setLoginDetails(prevState=>{
        return {...prevState, username:events.target.value.toLowerCase()}
      })
    }

    setAlert({ status: false, ...alert });

    if (events.target.name === "type" && events.target.value === "Vendor") {
      setToggle(true);
      setLoginDetails((prevState) => {
        return { ...prevState, active: false };
      });
    } else if (
      events.target.name === "type" &&
      events.target.value === "User"
    ) {
      setToggle(false);
      setLoginDetails((prevState) => {
        return {
          ...prevState,
          shopName: "",
          address: "",
          rate: "",
          aadhar: "",
          documentId: "",
          documentUrl: "",
          active: true
        };
      });
    }
  };

  const validateUser = () => {
    setAlert({
      status: true,
      type: "primary",
      msg: "Processing..."
    });
    axios
      .get(
        `https://letsprint-backend.onrender.com/users/username/${loginDetails.username}`
      )
      .then((res) => {
        if (res.data.username === loginDetails.username) {
          setAlert({
            status: true,
            type: "warning",
            msg: "Username Already Exists"
          });
          setLoginDetails((prevState) => {
            return { ...prevState, username: "" };
          });
        } else {
          onRegisterHandler();
          console.log(loginDetails);
        }
      })
      .catch(() => {
        setAlert({ status: true, type: "danger", msg: "Server Error" });
      });
    setLoginDetails({
      ...loginDetails,
      password: ""
    });
  };

  const onRegisterHandler = () => {
    axios
      .post(`https://letsprint-backend.onrender.com/users/`, loginDetails)
      .then((res) => {
        if (res.data.status === true) {
          setAlert({
            status: true,
            type: "success",
            msg: "Registration Successful"
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setAlert({
            status: true,
            type: "danger",
            msg: "Server Error"
          });
        }
      })
      .catch(() => {
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
      if (toggle) {
        if (
          loginDetails.firstName.trim() === "" ||
          loginDetails.lastName.trim() === "" ||
          loginDetails.city.trim() === "" ||
          loginDetails.username.trim() === "" ||
          loginDetails.password.trim() === "" ||
          loginDetails.shopName.trim() === "" ||
          loginDetails.address.trim() === "" ||
          loginDetails.rate.trim() === "" ||
          loginDetails.aadhar.trim() === ""
        ) {
          setAlert({
            status: true,
            type: "warning",
            msg: "Fields Cannot be Empty"
          });
        } else {
          validateUser();
        }
      } else {
        if (
          loginDetails.firstName.trim() === "" ||
          loginDetails.lastName.trim() === "" ||
          loginDetails.city.trim() === "" ||
          loginDetails.username.trim() === "" ||
          loginDetails.password.trim() === ""
        ) {
          setAlert({
            status: true,
            type: "warning",
            msg: "Fields Cannot be Empty"
          });
        } else {
          validateUser();
        }
      }
    }, 1000);
  };

  return (
    <div className="columns m-1 is-tablet is-centered">
      <section className="box mt-3 m-2  hero is-primary">
        <div className="hero-body">
          <p className="title has-text-centered">Register</p>
          <p className="subtitle"></p>
        </div>
      </section>
      <div className="column is-tablet is-two-fifths">
        <form autoComplete="off" onSubmit={onSubmitHandler}>
          <div className="box m-1">
            <div className="field box has-text-centered has-background-info has-text-white">
              <div className="control is-size-5 has-text-weight-bold">
                <label className="radio 	">Register as</label>
                <label className="radio">
                  <input
                    onChange={onChangeHandler}
                    type="radio"
                    name="type"
                    value="User"
                    checked={!toggle}
                  />{" "}
                  User
                </label>
                <label className="radio">
                  <input
                    onChange={onChangeHandler}
                    type="radio"
                    name="type"
                    value="Vendor"
                    checked={toggle}
                  />{" "}
                  Shop
                </label>
              </div>
            </div>

            <div className="box mt-3 has-background-info-light">
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    onChange={onChangeHandler}
                    name="firstName"
                    value={loginDetails.firstName}
                    className="input"
                    type="text"
                    placeholder="Enter Your Username"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    onChange={onChangeHandler}
                    name="lastName"
                    value={loginDetails.lastName}
                    className="input"
                    type="text"
                    placeholder="Enter Your Username"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    onChange={onChangeHandler}
                    name="email"
                    value={loginDetails.email}
                    className="input"
                    type="email"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">City</label>
                <div className="select mb-3 is-fullwidth">
                  <select
                    name="city"
                    onChange={onChangeHandler}
                    value={loginDetails.city}
                  >
                    <option value="">Select City</option>
                    <option value="Kolhapur">Kolhapur</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    onChange={onChangeHandler}
                    name="username"
                    value={loginDetails.username}
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
                    value={loginDetails.password}
                    className="input"
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </div>
              </div>
            </div>

            {toggle && (
              <div className="box has-background-link-light mb-3">
                <div className="field">
                  <label className="label">Shop Name</label>
                  <div className="control">
                    <input
                      onChange={onChangeHandler}
                      name="shopName"
                      value={loginDetails.shopName}
                      className="input"
                      type="text"
                      placeholder="Enter Your Shop Name"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Shop Address</label>
                  <div className="control">
                    <input
                      onChange={onChangeHandler}
                      name="address"
                      value={loginDetails.address}
                      className="input"
                      type="text"
                      placeholder="Enter Your Shop Address"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Per Page Rate</label>
                  <div className="control">
                    <input
                      onChange={onChangeHandler}
                      name="rate"
                      value={loginDetails.rate}
                      className="input"
                      type="number"
                      placeholder="Enter Your Per Page Rate"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Addhar Number</label>
                  <div className="control">
                    <input
                      onChange={onChangeHandler}
                      name="aadhar"
                      value={loginDetails.aadhar}
                      className="input"
                      type="number"
                      placeholder="Enter Your Addhar Number"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Upload Shop Document</label>
                  <div className="file has-name">
                    <label className="file-label">
                      <input
                        className="file-input"
                        onChange={onSelectHandler}
                        type="file"
                        name="file"
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload" />
                        </span>
                        <span className="file-label">
                          {fileDetails.selected
                            ? "File Selected"
                            : "Choose a file"}
                        </span>
                      </span>
                      <span className="file-name">
                        {fileDetails.selected
                          ? fileDetails.fileName
                          : "No File Selected"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {alert.status && (
              <div className={`notification is-${alert.type}`}>{alert.msg}</div>
            )}

            {fileDetails.selected && (
              <div>
                {!fileDetails.uploaded && !fileDetails.uploading && (
                  <button
                    onClick={onUploadHandler}
                    className="mt-4 is-link button is-fullwidth"
                  >
                    Upload
                  </button>
                )}
                {fileDetails.uploaded && (
                  <div className="control ml-0">
                    <button
                      type="submit"
                      className=" button is-success is-fullwidth"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            )}

            {!toggle && (
              <div className="control ml-0">
                <button
                  type="submit"
                  className=" button is-success is-fullwidth"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
