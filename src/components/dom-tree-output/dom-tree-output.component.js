import React from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import TreeComponent from '../tree/tree.component';

class DomTreeOutputComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      domTree: this.props.domTree
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.domTree !== this.props.domTree) {
      this.setState({domTree: nextProps.domTree});
    }
  }

  // Creates a new empty node 
  createNewNode(currentNode) {
    return {
      children: [], 
      tag: '', 
      files: [], 
      parentNode: currentNode
    }
  }

  // Resets tree state flags
  resetTreeState(treeState) {
    treeState.inOpenTag = false;
    treeState.inCloseTag = false;
    treeState.currentText = '';
  }

  // Handles the < character in html
  handleOpen(treeState) {
    // Add file to current node if exists
    if (treeState.currentText.trim() !== '') {
      treeState.currentNode.files.push(treeState.currentText.trim());
      treeState.currentText = ''
    }
    // New Tag being created, create a new node for it
    if(treeState.inOpenTag) {
      let newNode = this.createNewNode(treeState.currentNode);
      treeState.currentNode.children.push(newNode);
      treeState.currentNode = newNode;
      treeState.tagStack.push(newNode);
    }

  }

  // Handles the > character in html
  handleClose(treeState) {
    if (treeState.inCloseTag) {
      // Check if the stack has a matching open tag
      if (treeState.currentText.trim() !== treeState.tagStack.pop().tag.trim()) {
        alert('Tags did not match');
        treeState.error = true;
        return;
      } else {
        treeState.currentNode = treeState.currentNode.parentNode;
      }
    } else {
      treeState.currentNode.tag = treeState.currentText.trim();
    }
    this.resetTreeState(treeState);
  }

  // Handles the \n character in html
  handleNewLine(treeState) {
    // Create a new file
    if (treeState.currentText.trim() != '') {
      treeState.currentNode.files.push(treeState.currentText.trim());
      treeState.currentText = '';
    }
  }

  /*  Converts a string HTML to a tree like object
      Iterating through each character, the state of the parsing is kept in the treeState.
      Depending on the state and certain characters [<, >, /, \n, -], the HTML can be parsed into a reuseable object
  */
  parseStringDomToJson(domTree) {
    let treeState = {
      inComment: false,
      inOpenTag: false,
      inCloseTag: false,
      currentText: '', 
      tagStack: [],
      currentNode: { files: [], tag: 'DOM Tree',  children: []}, 
      error: false
    }
    let domTreeArr = domTree.split('')
    let i = 0;
    for(i; i < domTreeArr.length - 1; i ++) {
      const char = domTreeArr[i]
      switch(char) {
        // Open Bracket
        case '<':
          // Ignore if in coment
          if (treeState.inComment) {
            break;
          }
          // In close tag
          if (domTreeArr[i+1] === '/') {
            treeState.inOpenTag = false
            treeState.inCloseTag = true
            i += 1
          } 
          // In comment
          else if(domTreeArr[i+1] === '!' && domTreeArr[i+2] === '-' && domTreeArr[i+3] === '-') {
            treeState.inComment = true
            break;
          } 
          // In Open tag
          else { 
            treeState.inOpenTag = true
            treeState.inCloseTag = false
          }
          this.handleOpen(treeState)
        break;

        case '>':
          // Ignore if in coment
          if (treeState.inComment) {
            break;
          }
          this.handleClose(treeState)
        break;

        case '\n': 
          // Ignore if in coment
          if (treeState.inComment) {
            break;
          }
          this.handleNewLine(treeState)
         break;

        case '-':
        // End
          if (treeState.inComment) {
            if (domTreeArr[i+1] === '-' && domTreeArr[i+2] === '>') {
              treeState.inComment = false;
              i += 2
              break;
            }
          } 

        default:
          // Ignore if in coment
          if (treeState.inComment) {
            break;
          }
          treeState.currentText = treeState.currentText.concat(char);
      }
    }
    if (treeState.tagStack.length !== 0) {
      alert("Tags were not closed properly");
      treeState.error = true;
    }
    return treeState;
  }

  render() {
    let treeState = this.parseStringDomToJson(this.state.domTree)
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
            <TreeComponent 
              node={treeState.currentNode}
            />
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

