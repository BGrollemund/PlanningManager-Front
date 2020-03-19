import React from "react";

class InputSessions extends React.Component {
    render() {
        return (
            <div className="content-menu">
                <input type="text" id="session_name" placeholder="Cours" />
                <input type="text" id="session_alias" placeholder="Abréviation" />
                <select id="session_color">
                    <option value="white">Blanc</option>
                    <option value="ivory">Ivoire</option>
                    <option value="red">Rouge</option>
                    <option value="tomato">Rouge clair</option>
                    <option value="blue">Bleu</option>
                    <option value="deepskyblue">Bleu clair</option>
                    <option value="green">Vert</option>
                    <option value="palegreen">Vert clair</option>
                    <option value="yellow">Jaune</option>
                    <option value="khaki">Jaune clair</option>
                    <option value="orange">Orange</option>
                    <option value="salmon">Saumon</option>
                    <option value="purple">Violet</option>
                    <option value="orchid">Violet clair</option>
                    <option value="violet">Rose</option>
                    <option value="pink">Rose clair</option>
                    <option value="maroon">Marron</option>
                    <option value="sienna">Marron clair</option>
                </select>
                <input type="button" id="session_add" value="Ajouter" />

                <div className="error" id="session_error"></div>
                <div id="session_list"></div>
            </div>
        );
    }
}

export default InputSessions;
