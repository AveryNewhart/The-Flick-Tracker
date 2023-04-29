import { React} from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import "../styles/Nav.css";
import Searchbar from "./Searchbar"
import Auth from '../utils/auth';
// import { Navigate, Route } from 'react-router-dom';
// import { Redirect } from 'react-router';
// import Profile from '../pages/Profile';
// import Dashboard from '../pages/Dashboard';
// import Font from 'react-font'
// // functions being called in, location will be navigated to

export default function Navigation() {
    const handleLogout = () => {
        Auth.logout();
        window.location.href = '/';
    }
    
    return(
        <>
            <Navbar collapseOnSelect fixed='top' expand='sm' className="back-nav">
                <h1 className="header-head">Flick Tracker</h1>
                <Searchbar />
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' className='container-pos'/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="container-pos link-text">
                            <Nav.Link href='/'>Homepage</Nav.Link>
                             {Auth.loggedIn() && (
                                <>
                                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link href="/profile">Profile</Nav.Link>
                                </>
                            )}
                            {Auth.loggedIn() ? (
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            ) : 
                            (
                                <Nav.Link href='/login'>Login</Nav.Link>
                            )
                            }
                            {/* <Nav.Link href='/searchtest'>Searchtest</Nav.Link> */}
                            {/* <Nav.Link href='/signup'>Signup</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
