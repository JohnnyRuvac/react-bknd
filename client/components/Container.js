import React from 'react';


export default class Container extends React.Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        //sends auth instance from route to children
        auth: this.props.route.auth
      });
    }
    
    return (
      <div>
        {children}
      </div>
    );
  }
}