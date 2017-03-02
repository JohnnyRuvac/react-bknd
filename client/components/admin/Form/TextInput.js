import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


export default class TextInput extends React.Component {
  render() {
    return (
      <FormGroup
        controlId={this.props.controlId}
        validationState={this.getValidationState()}
      >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange.bind(this)}
        />
        <FormControl.Feedback />
        <HelpBlock>{this.props.helpBlock}</HelpBlock>
      </FormGroup>
    );
  }

  getValidationState() {
    return null;
  }

  handleChange(e) {
    const obj = {};
    obj[this.props.controlId] = e.target.value;
    this.props.onChange(obj);
  }
}