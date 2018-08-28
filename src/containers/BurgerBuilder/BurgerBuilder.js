import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/buildcontrols/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/burger/ordersummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  bacon: 0.5,
  meat: 1.0
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false
  }

  isPurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({ purchasable: sum > 0 })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('Continue')
  }

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
    this.isPurchasable(updatedIngredients)
  }

  removeIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] - 1
    if (updatedCount < 0) {
      return
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients })
    this.isPurchasable(updatedIngredients)
  }

  render() {
    const disabledButton = {
      ...this.state.ingredients
    }
    for (let key in disabledButton) {
      disabledButton[key] = disabledButton[key] <= 0
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledButton}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder
