import React, { ReactDOM, Component } from 'react';
import { Button, Collapse } from 'react-bootstrap'
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
    const { open } = this.state;

    return (
      <div className="leaf">
        <div className="content" onClick={() => {alert(this.state.text)}}>
        <FontAwesomeIcon color="#0076FF" icon={['far', 'file']}/>
            &nbsp;&nbsp;<p>{this.state.text}</p>
        </div>
      </div>
    );
  }
}

export default LeafComponent;

