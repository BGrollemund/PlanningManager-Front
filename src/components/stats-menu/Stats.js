import React from "react";

import StatsDashboard from "./StatsDashboard";
import StatsSessions from "./StatsSessions";
import StatsSpeakers from "./StatsSpeakers";

import statsUtils from "../../utils/StatsUtils";

class Stats extends React.Component {

    /**
     * Deactivate stats buttons
     */
    deactivateStatsBtn = () => {
        document.querySelectorAll( '.stats-btn' ).forEach(el => {
            el.classList.remove( 'activated' );
        });
    };

    /**
     * Hide stats contents
     */
    hideStatsContent = () => {
        document.querySelectorAll( '.stats-content' ).forEach(el => {
            el.classList.add( 'hidden' );
        });
    };

    /**
     * Show needed menu in stats menu
     *
     * @param domElement
     * @param domId
     */
    onStatsBtnClick = ( domElement, domId ) => {
        if ( domElement.classList.contains( 'activated' ) ) {
            this.deactivateStatsBtn();
            this.hideStatsContent();
            return;
        }

        this.deactivateStatsBtn();
        this.hideStatsContent();
        domElement.classList.add( 'activated' );
        document.querySelector( '#' + domId ).classList.remove( 'hidden' );
    };

    /**
     * Stats menu handler
     *
     * @param event
     */
    onStatsClick = ( event ) => {
        const classList = event.target.classList;

        if( classList.contains( 'stats-dashboard' ) )
            this.onStatsBtnClick( event.target, 'stats-dashboard' );

        if( event.target.classList.contains('stats-sessions') )
            this.onStatsBtnClick( event.target, 'stats-sessions' );

        if( event.target.classList.contains('stats-speakers') )
            this.onStatsBtnClick( event.target, 'stats-speakers' );

        if( event.target.classList.contains('toggle-stats-details') )
            event.target.nextElementSibling.classList.toggle( 'hidden' );
    };

    render() {
        const stats = statsUtils.calculate( this.props.schedule );

        return (
            <nav onClick={ this.onStatsClick }>
                <ul>
                    <li className="stats-btn stats-dashboard">Statistiques</li>
                    <li className="stats-btn stats-sessions">Par activités</li>
                    <li className="stats-btn stats-speakers">Par intervenants</li>
                </ul>
                <div className="stats-content hidden" id="stats-dashboard">
                    <StatsDashboard
                        stats={ stats } />
                </div>
                <div className="stats-content hidden" id="stats-sessions">
                    <StatsSessions
                        stats={ stats } />
                </div>
                <div className="stats-content hidden" id="stats-speakers">
                    <StatsSpeakers
                        stats={ stats } />
                </div>
            </nav>
        );
    }
}

export default Stats;
