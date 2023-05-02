import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import SelectedVendor from "../vendors/SelectedVendor";
import { OrderContext } from "../../../contexts/OrderContext";
import { VendorContext } from "../../../contexts/VendorContext";
import axios from "axios"

const UploadPdf = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate();
  const { setOrderDetails } = useContext(OrderContext)
  const { vendorDetails } = useContext(VendorContext)

  const [alert, setAlert] = useState({ status: false });
  const [selectedFile, setSelectedFile] = useState();
  const [fileDetails, setFileDetails] = useState({ selected: false, uploaded: false, uploading: false });

  const dateHandler = () => {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var AMPM = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var fullTime = hours + ":" + minutes + AMPM;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var fullDate = (today.getDate()) + "-" + (monthNames[today.getMonth()]) + "-" + today.getFullYear();

    setOrderDetails(prevState => {
      return { ...prevState, date: fullDate, time: fullTime }
    })
  }

  const onSelectHandler = (event) => {
    dateHandler();
    setFileDetails({ ...fileDetails, uploading: false })
    setAlert({ status: false })
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      if (file.type === "application/pdf") {
        var reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onloadend = function () {
          var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
          setFileDetails(prevState => {
            return { ...prevState, pages: count }
          })
        }
      }
      setFileDetails({ uploaded: false, selected: true, fileName: file.name });
    }
    else {
      setFileDetails({ selected: false, uploaded: false })
    }
  };

  const onUploadHandler = () => {
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setAlert({ status: true, msg: "Error! Only PDF is Allowed", type: "danger" })
      }
      else {
        if (selectedFile.size > 2097152) {
          setAlert({ status: true, type: "warning", msg: "File Size Must be Smaller Than 2 MB" })
        }
        else {
          setAlert({ status: true, type: "primary", msg: "Uploading! Please Wait!" })
          setFileDetails({ ...fileDetails, uploading: true })
          setTimeout(() => {
            const formData = new FormData();
            formData.append("file", selectedFile);
            axios.post(`https://letsprint-backend.onrender.com/files`, formData).then(res => {
              if (res.data.status === true) {
                setFileDetails({ ...fileDetails, uploaded: true, uploading: false })
                setAlert({ status: true, type: "success", msg: `PDF Uploaded Successfully!` })
                setOrderDetails(prevState => {
                  // console.log("vendorDetails Direct : "+vendorDetails.rate);
                  // console.log("vendorDetails toFixed : "+vendorDetails.rate.toFixed(2));
                  // console.log("Final : "+parseFloat(fileDetails.pages * vendorDetails.rate).toFixed(2))
                  return { ...prevState, fileId: res.data.id, fileName: res.data.name, fileType: res.data.type, fileUrl: res.data.url, fileSize: res.data.size, pages: fileDetails.pages, amount: parseFloat(fileDetails.pages * vendorDetails.rate).toFixed(2) }
                })
              }
              else{
                setFileDetails({ ...fileDetails, uploaded: false, uploading: false })
                setAlert({ status: true, type: "danger", msg: `Server Error` })
              }
            }).catch(() => {
              setAlert({ status: true, type: "danger", msg: `Server Error` })
            })
          }, 800)
        }
      }
    }
    else {
      setAlert({ status: true, type: "warning", msg: "Please Select The PDF First" })
    }
  }

  const onSubmitHandler = () => {
    if(fileDetails.uploaded){
      navigate("/dashboard/proceed");
    }
  };

  return (
    <div>
      <div className="columns m-3 is-centered">
        <nav
          className="box column is-7  breadcrumb has-succeeds-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="is-active">
              <Link to="/">Upload</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="columns m-1 is-centered">
        <div className="column box m-2 has-background-primary is-primary is-3">
          <p className="title has-text-centered has-text-white">
            Upload File
          </p>
          <SelectedVendor />
        </div>

        <div className="column is-4">

          <div className=" has-text-centered is-fullwidth file is-danger has-name is-boxed">
            <label className="file-label">
              <input
                onChange={onSelectHandler}
                className="file-input"
                type="file"
                name="file"
              />
              <span className="file-cta has-background-info">
                <span className="file-label">
                  {fileDetails.selected ? "File Selected" : "Click Here to Select File"}
                </span>
              </span>
              <span className="file-name has-background-warning-light	">
                {fileDetails.selected ? fileDetails.fileName : "No File Selected"}
              </span>
            </label>
          </div>

          {alert.status && <div>
            <p className={`mt-4 has-text-centered notification is-${alert.type}`}>{alert.msg}</p>
          </div>}

          {fileDetails.selected && <div>
            {!fileDetails.uploaded && !fileDetails.uploading && <button onClick={onUploadHandler} className="mt-4 is-link button is-fullwidth">Upload</button>}
            {fileDetails.uploaded && <div className="mt-4">
              <button
                onClick={onSubmitHandler}
                className="is-success button is-fullwidth"
              >
                Proceed
              </button>
            </div>}
          </div>}


        </div>
      </div>
    </div>
  );
};

export default UploadPdf;
