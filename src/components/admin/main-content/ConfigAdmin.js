import React from "react";

// import Connector from "../../../connector/Connector";

class ConfigAdmin extends React.Component {

    state = {

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( prevProps !== this.props ) {

        }
    }

    render() {
        return (
            <div>
                <div className="content-admin-list">
                    { this.props.userAttr.role }
                </div>
            </div>
        );
    }
}

export default ConfigAdmin;
