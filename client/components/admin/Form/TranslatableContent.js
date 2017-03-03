import React from 'react';
import { TextInput, SlugInput, TextEditor } from './';
import { Tabs, Tab } from 'react-bootstrap';


export default class TranslatableContent extends React.Component {
  state = {
    key: 1
  }

  render() {
    return (
      <Tabs 
        activeKey={this.state.key} 
        onSelect={this.handleSelect.bind(this)}
        bsStyle="tabs"
        animation={false}
        id="translatable-title-and-slug"
      >
        
        <Tab eventKey={1} title="SK">
          <TextInput
            controlId="title"
            label="Názov"
            placeholder="Názov"
            value={this.props.titleVal}
            onChange={this.props.onChange.bind(this)}
          />
          <SlugInput 
            controlId="slug"
            label="Slug SK"
            placeholder="some-name"
            value={this.props.slugVal}
            titleValue={this.props.titleVal}
            onChange={this.props.onChange.bind(this)}
          />
          <TextEditor
            controlId="text"
            label="Obsah"
            content={this.props.content}
            onChange={this.props.onChange.bind(this)}
            contentKey="text"
          />
        </Tab>
        
        <Tab eventKey={2} title="EN">
          <TextInput
            controlId="en-title"
            label="Title"
            placeholder="Title"
            value={this.props.enTitleVal}
            onChange={this.props.onChange.bind(this)}
          />
          <SlugInput 
            controlId="en-slug"
            label="Slug EN"
            placeholder="some-name"
            value={this.props.enSlugVal}
            titleValue={this.props.enTitleVal}
            onChange={this.props.onChange.bind(this)}
          />
          <TextEditor
            controlId="en-text"
            label="Content"
            content={this.props.enContent}
            onChange={this.props.onChange.bind(this)}
            contentKey="en.text"
          />
        </Tab>

      </Tabs>
    );
  }

  handleSelect(key) {
    this.setState({key: key});
  }
}