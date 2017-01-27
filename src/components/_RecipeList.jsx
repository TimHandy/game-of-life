'use strict'

import React from 'react'
import {
  Button,
  Panel,
  Accordion,
  Popover,
  Modal,
  Tooltip,
  OverlayTrigger,
  PanelGroup
} from 'react-bootstrap';

class RecipeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      editIdx: 0
    }
  }

  handleDelete = (idx) => {
    this.setState({open: false})
    this
      .props
      .deleteRecipe(idx)
  }

  handleEdit = () => {
    this.props.editRecipe(this.state.editIdx)
    this.close()
  }

  close = () => {
    this.setState({
      showModal: false,
      editIdx: 0  
    });
  }

  open = (idx) => {
    this.setState({showModal: true, editIdx: idx })
    const name = this.props.recipe[idx].name
    const ingredients = this.props.recipe[idx].ingredients
    this.props.updateNameAndIngredients(name, ingredients)
    }

  store = (name, ingredients) => {
    this.setState({name: name, ingredients: ingredients})
  }

  handleSelect = (activeKey) => {
    this.setState({activeKey});
  }

  list = () => {

    const list = this
      .props
      .recipe
      .map((recipe, idx) => {
        return (
          <Panel
            collapsible
            eventKey={Symbol(recipe)}  // symbol used... can be anything... symbols are guaranteed to be unique.
            key={idx}
            header={recipe.name}>
            <h3 className="text-center">Ingredients</h3>
            {recipe
              .ingredients
              .map((ingredient, idx) => {
                //console.log(recipe);
                return <li className="list-group-item" key={idx}>{ingredient}</li>
              })}
            <br/>
            <button className='btn btn-primary' onClick={() => this.open(idx) }>Edit Recipe</button>
            <button className='btn btn-danger' onClick={() => this.handleDelete(idx) }>Delete Recipe</button>
          </Panel>
        )
      })

    return list
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
    const rVal = this.props.recipe.length === 0 || this.props.recipe.length === undefined
      ? 'enter value'
      : [
        this.props.recipe[this.state.editIdx].name,
        this.props.recipe[this.state.editIdx].ingredients
      ]

    return (
      <div>
        <h3>{Object.keys(this.props.recipe).length === 0 && "Please add a recipe."}</h3>
        <PanelGroup accordion>
          {this.list()}
        </PanelGroup>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>Recipe name</p><input id='name' defaultValue={rVal[0]} onChange={this.props.handleChange}/>
              <p>Recipe ingredients</p><textarea
                id='ingredients'
                defaultValue={rVal[1]}
                onChange={this.props.handleChange}/><br/>
              <button className='btn btn-primary' onClick={() => {this.props.editRecipe(this.state.editIdx); this.close()}}>Apply Edit</button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

module.exports = RecipeList
