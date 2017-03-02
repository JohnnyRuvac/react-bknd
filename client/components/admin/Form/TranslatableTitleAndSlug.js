// use this to config:
// const translatableData = [
//   {
//     titleVal: this.state.contentData.title,
//     slugVal: this.state.contentData.slug,
//   },
// ];

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { TextInput, SlugInput } from './';


export default class TranslatableTitleAndSlug extends React.Component {
  state = {
    key: 1
  }

  render() {
    const data = this.props.data;

    return (
      <Tabs 
        activeKey={this.state.key} 
        onSelect={this.handleSelect.bind(this)}
        bsStyle="tabs"
        animation={false}
        id="translatable-title-and-slug"
      >
        
        <Tab eventKey={1} title="Tab 1">
          <TextInput
            controlId="title"
            label="Title"
            placeholder="Title"
            value={data[0].title}
            onChange={this.props.onChange.bind(this)}
          />
          <SlugInput 
            controlId="slug"
            label="Slug"
            placeholder="some-name"
            value={data[0].slug}
            titleValue={data[0].title}
            onChange={this.props.onChange.bind(this)}
          />
        </Tab>
        
        <Tab eventKey={2} title="Tab 2">
          <TextInput
            controlId="title"
            label="Title one"
            placeholder="Title"
            value={data[0].title}
            onChange={this.props.onChange.bind(this)}
          />
          <SlugInput 
            controlId="slug"
            label="Slug one"
            placeholder="some-name"
            value={data[0].slug}
            titleValue={data[0].title}
            onChange={this.props.onChange.bind(this)}
          />
        </Tab>

      </Tabs>
    );
  }

  handleSelect(key) {
    console.log('selected ' + key);
    this.setState({key: key});
  }

}