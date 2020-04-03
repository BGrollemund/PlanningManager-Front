import React from "react";
import ReactDom from "react-dom";

import StatsDashboard from "./StatsDashboard";
import StatsSessions from "./StatsSessions";
import StatsSpeakers from "./StatsSpeakers";

class Stats extends React.Component {

    /**
     * Deactivate stats button
     */
    deactivateStatsBtn = () => {
        document.querySelectorAll('.stats-btn').forEach(el => {
            el.classList.remove('activated');
        });
    };

    /**
     * Render needed menu in stats menu
     *
     * @param domElement
     * @param reactComponent
     */
    onStatsBtnClick = ( domElement, reactComponent ) => {
        const $contentStats = document.querySelector('#content-stats-box');

        if( domElement.classList.contains( 'activated' ) ) {
            this.deactivateStatsBtn();
            ReactDom.unmountComponentAtNode( $contentStats );
            return;
        }

        this.deactivateStatsBtn();
        domElement.classList.add('activated');
        ReactDom.render(
            reactComponent,
            $contentStats
        );
    };

    /**
     * Stats menu handler
     *
     * @param event
     */
    onStatsClick = ( event ) => {
        if( event.target.classList.contains('stats-dashboard') )
            this.onStatsBtnClick(
                event.target,
                <StatsDashboard/>
            );
        if( event.target.classList.contains('stats-sessions') )
            this.onStatsBtnClick(
                event.target,
                <StatsSessions/>
            );
        if( event.target.classList.contains('stats-speakers') )
            this.onStatsBtnClick(
                event.target,
                <StatsSpeakers/>
            );
    };

    render() {
        return (
            <nav>
                <ul onClick={ this.onStatsClick }>
                    <li className="stats-btn stats-dashboard">Statistiques</li>
                    <li className="stats-btn stats-speakers">Par intervenants</li>
                    <li className="stats-btn stats-sessions">Par activités</li>
                </ul>
                <div id="content-stats-box"></div>
            </nav>
        );
    }
}

export default Stats;
