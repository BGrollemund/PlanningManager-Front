import React from "react";

import InfosAdmin from "./InfosAdmin";
import UsersAdmin from "./UsersAdmin";

class MainAdmin extends React.Component {

    /**
     * Update React Components
     */
    update = () => {
        this.forceUpdate();
    };

    render() {
        return (
            <main>
                <div className="admin-content" id="admin-infos">
                    <InfosAdmin
                        userAttr={ this.props.userAttr } />
                </div>
                <div className="admin-content hidden" id="admin-users">
                    <UsersAdmin
                        update={ this.update }
                        userAttr={ this.props.userAttr } />
                </div>
            </main>
        );
    }
}

export default MainAdmin;
