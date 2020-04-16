import React from "react";
import { Redirect } from "react-router-dom";

import HeaderAdmin from "./header/HeaderAdmin";
import Footer from "../footer/Footer";
import MainAdmin from "./main-content/MainAdmin";
import MenuAdmin from "./menu/MenuAdmin";

class Admin extends React.Component {

    state = {
        goToHome: false,
        userAttr: {}
    };

    componentDidMount() {
        if ( this.props.location.state
                && this.props.location.state.userAttr
                && this.props.location.state.userAttr.role === 'ADMIN' ) {
            this.setState( { userAttr: this.props.location.state.userAttr } );
        }
        else {
            this.setState( { goToHome: true } );
        }
    }

    render() {
        if ( this.state.goToHome ) return <Redirect to = { { pathname: '/' } } />;

        return (
            <div id="content">
                 <HeaderAdmin
                    userAttr={ this.state.userAttr } />
                 <MenuAdmin/>
                 <MainAdmin
                     userAttr={ this.state.userAttr } />
                 <Footer/>
            </div>
        );
    }
}

export default Admin;
