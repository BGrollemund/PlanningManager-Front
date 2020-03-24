import React from "react";

class DayContent extends React.Component {
    render() {
        let dayContent = '';

        if ( this.props.numCol === 0 ) dayContent = this.props.daysListSelected[ this.props.numLine - 1 ] ?? '';
        if ( this.props.numLine === 0 ) dayContent = this.props.weekInfos;

        return (
            <div className="content-day">
                { dayContent }
            </div>
        );
    }
}

export default DayContent;
