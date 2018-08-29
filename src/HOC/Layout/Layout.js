import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: !this.state.showSideDrawer })
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  render () {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout
