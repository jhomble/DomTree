import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import DomTreeInputComponent from './components/dom-tree-input/dom-tree-input.component.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile, faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons'

library.add(faFolder, faFile, faPlusSquare, faMinusSquare)
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="page-layout">
            <div className="input">
              <DomTreeInputComponent />
            </div>
          </div>
          </header>
      </div>
    );
  }
}

export default App;
