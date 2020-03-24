import React from "react";

import SessionsAdd from "./SessionsAdd";
import SessionsList from "./SessionsList";

class SpeakersMenu extends React.Component {

    changeSessionsList = ( data ) => {
        this.props.changeSessionsList( data );
    };

    update = () => {
        this.props.update();
    };

    render() {
        return (
            <div>
                <SessionsAdd
                    addSession={ this.changeSessionsList } />
                <SessionsList
                    removeSession={ this.changeSessionsList }
                    sessions={ this.props.sessions }
                    update={ this.update } />
            </div>
        );
    }
}

export default SpeakersMenu;
