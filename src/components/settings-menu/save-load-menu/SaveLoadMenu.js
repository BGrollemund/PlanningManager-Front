import React from "react";
import SaveLoadDetails from "./SaveLoadDetails";

class SaveLoadMenu extends React.Component {

    render() {
        let content =   <h5>Vous devez être connecté pour accéder à ses options.</h5>;

        if ( this.props.userAttr.userId.length > 0 ) {
            content = <SaveLoadDetails
                            schedule={ this.props.schedule }
                            scheduleId={ this.props.scheduleId }
                            userAttr={ this.props.userAttr }
                            updateFromDB={ this.props.updateFromDB } />;
        }

        return (
            <div className="content-menu">
                { content }
            </div>
        );
    }
}

export default SaveLoadMenu;
