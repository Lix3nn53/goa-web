import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser, notifyTopBar } from "store/actions";
import { Link } from "react-router-dom";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//utils
import NotificationTopBar from "./components/notification/NotificationTopBar";
import NotificationModal from "./components/notification/NotificationModal";

//pages
const AdminDashboard = lazy(() => import("./views/admin/AdminDashboard"));
const LandingPage = lazy(() => import("./views/LandingPage"));
const LoginPage = lazy(() => import("./views/auth/LoginPage"));
const RegisterPage = lazy(() => import("./views/auth/RegisterPage"));
const VerifyPage = lazy(() => import("./views/auth/VerifyPage"));
const LorePage = lazy(() => import("./views/LorePage"));
const StorePage = lazy(() => import("./views/StorePage"));
const ProfilePage = lazy(() => import("./views/ProfilePage"));
const AddCreditPage = lazy(() => import("./views/credits/AddCreditPage"));
const AddCreditCallbackPage = lazy(() =>
  import("./views/credits/AddCreditCallbackPage")
);
const SinglePostContentPage = lazy(() =>
  import("./views/SinglePostContentPage")
);
const MissingPage = lazy(() => import("./views/MissingPage"));

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate() {
    if (this.props.auth) {
      if (!this.props.auth.verified) {
        this.props.notifyTopBar(
          true,
          "warning",
          <>
            Confirm your email address to access all features. A confirmation
            message was sent to {this.props.auth.email}{" "}
            <Link className="mx-2 text-dark" to="/register/verify">
              <u>Help?</u>
            </Link>
          </>
        );
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <NotificationTopBar />
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/admin" component={AdminDashboard} />
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route path="/register/verify" component={VerifyPage} />
              <Route path="/lore" component={LorePage} />
              <Route exact path="/store" component={StorePage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/addcredit" component={AddCreditPage} />
              <Route
                path="/addcredit/callback"
                component={AddCreditCallbackPage}
              />
              <Route path="/post" component={SinglePostContentPage} />
              <Route component={MissingPage} />
            </Switch>
          </Suspense>
          <NotificationModal />
        </div>

        <Footer />
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser, notifyTopBar })(App);
