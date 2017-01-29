import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Button } from 'react-bootstrap';
import { bootstrap } from 'Styles/_custom_bootstrap.scss';


export default class StaticPage extends ContentType {
  constructor(props) {
    super(props);
    this.state.contentData = {
      title: '',
      slug: '',
      content: ''
    };
  }
  
  render() {
    return (
      <div className="static-page">
        <h3>New page</h3>
        <input type="text" 
          name="title"
          placeholder="Title"
          value={this.state.contentData.title}
          onChange={this.handleChange.bind(this)}
        />
        <input type="text" 
          name="slug"
          placeholder="slug"
          value={this.state.contentData.slug}
          onChange={this.handleSlugChange.bind(this)}
        />
        <textarea
          name="content" 
          placeholder="Text"
          value={this.state.contentData.content}
          onChange={this.handleChange.bind(this)}
        ></textarea>
        <Button bsStyle="success" bsSize="small" onClick={this.save.bind(this)}>
          Save
        </Button>

      </div>
    );
  }
}