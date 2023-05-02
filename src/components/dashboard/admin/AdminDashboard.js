import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

const AdminDashboard = () => {

    const { userDetails } = useContext(UserContext)
    const [empty, setEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ status: false })
    const [error, setError] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allVendors, setAllVendors] = useState([])
    const [toggle, setToggle] = useState(false);

    const fetchAPI = () => {
        setTimeout(() => {
            axios.get(`https://letsprint-backend.onrender.com/users/type/User/all`).then((res) => {
                setIsLoading(false)
                setAllUsers(res.data)
            }).catch(() => {
                setAlert({ status: true, type: "danger", msg: "Sever Error" })
            });
            axios.get(`https://letsprint-backend.onrender.com/users/type/Vendor/all`).then((res) => {
                setIsLoading(false)
                setAllVendors(res.data)
            }).catch(() => {
                setAlert({ status: true, type: "danger", msg: "Sever Error" })
            });
        }, 1000)
    }

    useEffect(() => {
        fetchAPI();

        const interval = setInterval(() => {
            fetchAPI()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    // const onClickHandler = (id, amount) => {

    // }

    const toggleHandler = () => {
        setToggle(!toggle);
    }

    const statusHandler = (username, status) => {
        setAlert({ status: true, type: "primary", msg: "Processing..." })
        setTimeout(() => {
            axios.put(`https://letsprint-backend.onrender.com/users/username/${username}/status/${!status}`).then((res) => {
                if (res.data.status) {
                    setAlert({ status: true, type: "success", msg: "User Updated Successfully" });
                }
            }).catch(() => {
                setAlert({ status: true, type: "danger", msg: "Server Error" });

            })
        }, 1000)
    }

    return (
        <div className="columns m-1 is-centered">
            <section className="box mt-3 m-2  hero is-primary">
                <div className="hero-body has-text-centered">
                    <p className="title ">Admin</p>
                </div>
            </section>

            {isLoading &&
                <div className="column is-5">
                    <p className={`has-text-centered notification is-success`}>Loading...Please Wait!</p>
                </div>}

            {!isLoading &&

                <div className={`column is-${empty ? 5 : 9}`}>
                    {empty && !error && <div >
                        <p className={`has-text-centered notification is-info`}>You Have No Orders Yet!</p>
                    </div>}

                    {!empty &&
                        <div>
                            <div className="box notification is-info has-text-centered is-size-4">{toggle ? "All Customers" : "All Vendors"}</div>
                            <div className="box"><button onClick={toggleHandler} className="button is-primary">{toggle ? "Show All Vendors" : "Show All Customers"}</button></div>
                            {alert.status && <div>
                                <p className={`mb-3 box has-text-centered notification is-${alert.type}`}>{alert.msg}</p>
                            </div>}
                            <div className="box has-background-info-light table-container">

                                {!toggle && allVendors.length === 0 && <div className="notification is-warning has-text-centered">No Vendors Available</div>}
                                {toggle && allUsers.length === 0 && <div className="notification is-warning has-text-centered">No Customers Available</div>}

                                {!toggle && allVendors.length !== 0 &&
                                    <table className="table is-hoverable is-fullwidth has-text-centered">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>First</th>
                                                <th>Last</th>
                                                <th>Wallet</th>
                                                <th>Rate</th>
                                                <th>City</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                                <th>Document</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allVendors.slice(0).reverse().map(item => {
                                                return (<tr>
                                                    <td>{item.username}</td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>₹{item.wallet}</td>
                                                    <th>₹{item.rate}</th>
                                                    <td>{item.city}</td>
                                                    <td>{item.active ? "Active" : "Deactivated"}</td>
                                                    <td><button onClick={() => { statusHandler(item.username, item.active) }} className={`button is-${item.active ? "danger" : "success"}`}>{item.active ? "Deactivate" : "Activate"}</button></td>
                                                    <th><button className="button is-info has-text-white"><a className="has-text-white" href={item.documentUrl}>Download</a></button></th>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>}

                                {toggle && allUsers.length !== 0 && 
                                    <table className="table is-hoverable is-fullwidth has-text-centered">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>First</th>
                                                <th>Last</th>
                                                <th>Wallet</th>
                                                <th>City</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allUsers.slice(0).reverse().map(item => {
                                                return (<tr>
                                                    <td>{item.username}</td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>₹{item.wallet}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.active ? "Active" : "Deactivated"}</td>
                                                    <td><button onClick={() => { statusHandler(item.username, item.active) }} className={`button is-${item.active ? "danger" : "success"}`}>{item.active ? "Deactivate" : "Activate"}</button></td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>}

                            </div>
                        </div>}
                </div>}
        </div>
    );
};
export default AdminDashboard;
