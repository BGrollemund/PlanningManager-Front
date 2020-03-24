import React from "react";

class TitleContent extends React.Component {
    render() {
        return (
            <div>
                <h2>{ this.props.scheduleTitle }</h2>
            </div>
        );
    }
}

export default TitleContent;
