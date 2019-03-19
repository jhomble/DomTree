import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import TreeComponent from '../tree/tree.component';
import { parseStringDomToJson } from '../../util/tree-state';
import LeafComponent from '../leaf/leaf.component.js';

class DomTreeOutputComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      domTree: this.props.domTree
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.domTree !== this.props.domTree) {
      this.setState({ domTree: nextProps.domTree });
    }
  }

  render() {
    let treeState = parseStringDomToJson(this.state.domTree)
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            DOM Tree
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            treeState.error ? null :
              <div>
                {
                  treeState.currentNode.children.map((node, i) => <TreeComponent key={i} node={node} />)
                }{
                  treeState.currentNode.files.map((text, i) => <LeafComponent key={i} text={text} />)
                }
              </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Done</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DomTreeOutputComponent;

