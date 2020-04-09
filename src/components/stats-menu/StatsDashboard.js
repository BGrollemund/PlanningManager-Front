import React from "react";

import StatsHeader from "./StatsHeader";

class StatsDashboard extends React.Component {

    render() {
        return (
            <div className="content-stats-list">
                <StatsHeader
                    stats={ this.props.stats } />
            </div>
        );
    }
}

export default StatsDashboard;
