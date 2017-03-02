import React from 'react';
import TextInput from './TextInput';
import getSlug from 'speakingurl';


export default class SlugInput extends React.Component {
  render() {
    return (
      <TextInput 
        controlId={this.props.controlId}
        label={this.props.label}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.handleChange.bind(this)}
      />
    );
  }

  componentWillUpdate(nextProps, nextState) {
    const titleChanged = this.props.titleValue !== nextProps.titleValue;

    if (titleChanged) {
      const slug = getSlug(nextProps.titleValue);
      this.updateSlug(slug);
    }
  }

  handleChange(e) {
    const slug = getSlug(e.target.value);
    this.updateSlug(slug);
  }

  updateSlug(slug) {
    const obj = {};
    obj[this.props.controlId] = slug;
    this.props.onChange(obj);
  }

}