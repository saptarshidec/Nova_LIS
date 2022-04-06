import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Browse from "./pages/browse/Browse";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ComingSoon from "./pages/comingsoon/ComingSoon";
import RegisterSuccess from "./pages/registersuccess/RegisterSuccess";
import Book from "./components/book/Book";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Users from "./pages/users/Users";
import AddBook from "./pages/addbook/AddBook";
import Reminder from "./pages/reminder/Reminder";

import { Route, Switch, Redirect } from "react-router-dom";
import Expired from "./pages/expired/Expired";
import Faqs from "./pages/faqs/Faqs";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home} exact />
                <Route path="/browse" component={Browse} exact />
                <Route path="/about" component={About} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/book/:bookId" component={Book} />
                <Route path="/register" component={Register} exact />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/users" component={Users} exact />
                <Route path="/reminder" component={Reminder} exact />
                <Route path="/expired" component={Expired} exact />
                <Route path="/faqs" component={Faqs} exact />
                <Route path="/registersuccess/:message" component={RegisterSuccess} exact />
                <Route path="/addbook" component={AddBook} exact />
                <Route path="*" component={ComingSoon} />
            </Switch>
            <Footer />
        </>
    );
};

export default App;
