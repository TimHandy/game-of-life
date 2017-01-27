'use strict'

import React from 'react'
import {Button, Popover, Modal, Tooltip, OverlayTrigger} from 'react-bootstrap';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  handleSubmit = () => {
    console.log('hello')
    this.props.submitRecipe()
    this.close()
  }

  close = () => {
    this.setState({showModal: false});
  }

  open = () => {
    this.setState({showModal: true});
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>Recipe name</p><input
                id='name'
                value={this.props.recipe.name}
                onChange={this.props.handleChange}
                placeholder='Recipe name'/>
              <p>Recipe ingredients</p><textarea
                id='ingredients'
                value={this.props.recipe.ingredients}
                onChange={this.props.handleChange}
                placeholder='Enter ingredients separated by commas'/><br/>
              <button className='btn btn-primary' onClick={this.handleSubmit}>Add Recipe</button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
        <button className='btn btn-primary' onClick={this.open}>Add Recipe</button>
      </div>
    );
  }
}

module.exports = AddRecipe
