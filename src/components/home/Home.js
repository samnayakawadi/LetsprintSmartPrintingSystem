import {Link} from "react-router-dom"
const Dashboard = () => {
  return (
    <div className="columns m-1 is-tablet is-centered">
      <section className="box mt-3 m-2  hero is-primary">
        <div className="hero-body has-text-centered">
          <p className="title ">Lets Print</p>
          <p className="subtitle">by Nayakawadi</p>
        </div>
      </section>

      <div className="column  is-three-fifths is-centered">
        <section className="box  hero is-">
          <div className="hero-body">
            <p className="subtitle">Printing. Simplified.</p>
          </div>
        </section>

        <div className="">
          <div className="card">
            <div className="card-content">
              <p className="is-size-6">
                The idea behind developing this project is to digitalize the
                printing in xerox or printing centers. We deal with lots of
                problems that needs to be solved. Also, we have the big
                challenge of social distancing due to the COVID-19 pandemic.
                Taking this into consideration I am introducing the Smart
                Printing Solution.
              </p>
            </div>
            <footer className="card-footer">
              <p className="card-footer-item">
                <span>
                  {/* Follow on{" "}
                  <a href="https://www.instagram.com/samnayakawadi/">
                    Instagram
                  </a> */}
                  Go to {" "}
                  <Link to="/login">Login</Link>
                </span>
              </p>
              <p className="card-footer-item">
                <span>
                  
                Go to {" "}
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
