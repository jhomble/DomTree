import React from 'react';
import './leaf.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LeafComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        };

    }

    render() {
        return (
            <div className="leaf">
                <div className="content" onClick={() => { alert(this.state.text) }}>
                    <p><FontAwesomeIcon color="#0076FF" icon={['far', 'file']} />&nbsp;&nbsp;{this.state.text}</p>
                </div>
            </div>
        );
    }
}

export default LeafComponent;

