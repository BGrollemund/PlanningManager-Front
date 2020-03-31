import React from "react";

class GroupNameSpan extends React.Component {

    render() {

        let group = '';

        if ( this.props.sessionsPerSolt > 1 )
            group = "Groupe " + ( this.props.sessionIndex + 1 ) + " : ";

        return (
            <span>
                { group }
            </span>
        );
    }
}

export default GroupNameSpan;
