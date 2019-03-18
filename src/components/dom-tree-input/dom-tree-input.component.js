import React from 'react';
import { Form, Button } from 'react-bootstrap'
import './dom-tree-input.scss';
import DomTreeOutputComponent from '../dom-tree-output/dom-tree-output.component';
class DomTreeInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domInput: ` 
      <head>
      </head>
      <body>
        <Sub-body One>
          List One
          <--comment-->
          List Two
          This is a very long file name, should truncate to ...
        </Sub-body One>
        <--<div>comment</div>-->
      </body>
      <Folder Two>
      </Folder Two>
      <Folder Three>
      </Folder Three>
      `, 
      modalShow: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  handleSubmit(event) {
    this.setState({ modalShow: true })
    event.preventDefault();
  }

  modalClose = () => this.setState({ modalShow: false });

  render() {
    return (
      <div className="dom-tree-output">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter DOM Tree Below</Form.Label>
            <Form.Control as="textarea" rows="20" 
              value={this.state.domInput} 
              onChange = {(event) => this.setState({domInput: event.target.value })} 
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Run
          </Button>
          {
            this.state.modalShow ? 
            <DomTreeOutputComponent
              show={this.state.modalShow}
              onHide={this.modalClose}
              domTree={this.state.domInput}
            />
           : null
          }
        </Form>
      </div>
    );
  }
}

export default DomTreeInputComponent;

