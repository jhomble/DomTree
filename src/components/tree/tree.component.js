import React, { ReactDOM, Component } from 'react';
import { Button, Collapse } from 'react-bootstrap'
import './tree.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LeafComponent from '../leaf/leaf.component.js';

class TreeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        node: this.props.node,
        open: false, 
        color: this.props.node.tag === 'head' ? '#ff3b30' : '#0076FF'
    };
  }

  render() {
    return (
      <div className="tree">
        <div className="content">
          <div className="folder-content" onClick={() => this.setState({ open: !this.state.open })}>
            {this.state.open ? 
              <FontAwesomeIcon color={this.state.color} icon={['far', 'minus-square']}/> : 
              <FontAwesomeIcon color={this.state.color} icon={['far', 'plus-square']}/> 
            }
            &nbsp;&nbsp;
            <FontAwesomeIcon className="content-tag" color={this.state.color} icon={['far', 'folder']}/> 
            &nbsp;&nbsp;{this.state.node.tag}
          </div>
        </div>
        <Collapse in={this.state.open}>
        <div>
          {
            this.state.node.children.map((node, i) => <TreeComponent key={i} node={node}/>)
          }{
            this.state.node.files.map((text, i) => <LeafComponent key={i} text={text}/>)
          }
        </div>
        </Collapse>

      </div>
    );
  }
}

export default TreeComponent;

