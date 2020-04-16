import React from "react";
import { Redirect } from "react-router-dom";

class NotFound extends React.Component {

    state = {
        goToHome: false
    };

    goToHome = () => {
        this.setState( { goToHome: true } );
    };

    render() {
        if ( this.state.goToHome ) return <Redirect to = { { pathname: '/' } } />;

        return (
            <div className="not-found-content">
                <input
                    onClick= { this.goToHome }
                    value= "Accueil"
                    type= "button" />
                <h1>Oups... Cette page n'existe pas.</h1>
            </div>
        );
    }
}

export default NotFound;
