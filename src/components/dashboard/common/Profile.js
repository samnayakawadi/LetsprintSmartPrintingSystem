import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <div className="columns m-1 is-centered">
      <section className="box mt-3 m-2  hero is-primary">
        <div className="hero-body has-text-centered">
          <p className="title ">Profile</p>
        </div>
      </section>

      <div className="column is-4">
        <div className="notification is-info is-size-4 has-text-centered">User Details</div>
        <div className="box has-background-info-light">
          <div className="table-container">
          <table className="table is-hoverable is-fullwidth">
            <tbody>
              <tr>
                <td>Username</td>
                <td>{userDetails.username}</td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>{userDetails.firstName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{userDetails.lastName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userDetails.email}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{userDetails.city}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
      {userDetails.type === "Vendor" &&
        <div className="column is-4">
          <div className="notification is-info is-size-4 has-text-centered">Shop Details</div>
          <div className="box has-background-info-light">
            <table className="table is-hoverable is-fullwidth">
              <tbody>
                <tr>
                  <td>Shop</td>
                  <td>{userDetails.shopName}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{userDetails.address}</td>
                </tr>
                <tr>
                  <td>Rate</td>
                  <td>₹{userDetails.rate} Per Page</td>
                </tr>
                <tr>
                  <td>Aadhar</td>
                  <td>{userDetails.aadhar}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{userDetails.active ? "Verified" : "Verification Pending"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>}
    </div>
  );
};
export default Profile;
