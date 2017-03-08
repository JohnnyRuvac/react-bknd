import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { TextInput, SlugInput, TextEditor } from '../Form';
import { FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import Uploader from '../Uploader/Uploader';
import styles from './Item.sass';


export default class Item extends ContentType {
  state = {
    contentData: {
      title: '',
      slug: '',
      content: '',
      categorySlug: (this.props.params.categorySlug) ? [this.props.params.categorySlug] : [],
      images: [],
    },
    allCategories: [],
  };
  
  render() {
    const title = this.state.contentData.title || "New Item";

    return (
      <Grid className="admin-item">
        <Row className="underlined">
          <Col sm={8} smOffset={2}>

            <Row>
              <Col xs={6}>
                <h3>{title}</h3>
              </Col>

              <Col xs={6} className="clearfix">
                <Button bsStyle="success"
                  bsSize="small" 
                  onClick={this.save.bind(this)}
                >Save
                </Button>

                <Button 
                  onClick={this.handleRemove.bind(this)}
                  className="delete"
                  bsStyle="link"
                  bsSize="small" 
                >Delete
                </Button>
              </Col>
            </Row>

          </Col>
        </Row>

        <Row className="underlined">
          <Col sm={8} smOffset={2}>
            <TextInput 
              controlId="title"
              label="Title"
              placeholder="Title"
              value={this.state.contentData.title}
              onChange={this.updateContentDataState.bind(this)}
            />
          </Col>
          
          <Col sm={8} smOffset={2}>
            <SlugInput 
              controlId="slug"
              label="Slug"
              placeholder="some-name"
              value={this.state.contentData.slug}
              titleValue={this.state.contentData.title}
              onChange={this.updateContentDataState.bind(this)}
            />
          </Col>

          <Col sm={8} smOffset={2}>
            <TextEditor
              label="Content"
              content={this.state.contentData.content}
              receiver={this.updateContentDataState.bind(this)}
              contentKey="content"
            />
          </Col>
        </Row>

        <Row className="underlined">
          <Col sm={8} smOffset={2}>
            <FormGroup controlId="categories">
              <h3>Categories</h3>
              {this.state.allCategories.map( (cat, index) => 
                <Checkbox
                  key={index}
                  checked={this.state.contentData.categorySlug.indexOf(cat.slug) > -1}
                  onChange={() => this.handleCheckboxClick(cat.slug)}
                >
                  {cat.title}
                </Checkbox>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row className="underlined">
          <Col sm={8} smOffset={2}>
            <Uploader 
              images={this.state.contentData.images}
              onChange={this.updateContentDataState.bind(this)}
              folder="folder"
              deleteUrl={this.serverUrl + '/upload/delete/'}
            />
          </Col>
        </Row>
      </Grid>
    );
  }

  componentDidMount() {
    this.fetchItemData();
  }

  handleCheckboxClick(catSlug) {
    let catSlugs = this.state.contentData.categorySlug;
    const isActive = catSlugs.indexOf(catSlug) > -1;
    
    if (isActive) {
      catSlugs = catSlugs.filter( item => item !== catSlug);
    } else {
      catSlugs.push(catSlug);
    }

    this.updateContentDataState({
      categorySlug: catSlugs,
    });
  }

  fetchItemData() {
    // fetch all categories for selecting them
    const catUrl = this.serverUrl + '/api/categories';
    axios
      .get(catUrl)
      .then(res => {
        this.setState({
          allCategories: res.data
        });
      });


    if (!this.props.params.slug) {
      return;
    }

    const url = this.serverUrl + '/api/items/single/' + this.props.params.slug;
    
    axios
      .get(url)
      .then(res => {
        this.originalSlug = res.data[0].slug;
        this.setState({
          contentData: res.data[0]
        });
      });
  }

  getValidationState() {
    return null;
  }

  handleRemove() {
    const confirm = window.confirm('Delete ' + this.state.contentData.title + '?');
    if (!confirm) {
      return;
    }

    const slug = this.state.contentData.slug;
    const deleteUrl = this.serverUrl + '/api/items/' + slug;

    axios
      .delete( deleteUrl, { 
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('id_token') 
        }
      })
      .then(res => {
        browserHistory.goBack();
      })
      .catch(err => {
        console.log(this.state.slug + ' delete error: ');
        console.log(err);
      });
  }

  removeFromUncategorized() {
    const categories = this.state.contentData.categorySlug;
    if (categories.length > 1) {
      this.state.contentData.categorySlug = categories.filter(item => item !== '_uncategorized');
    }
  }

  checkUncategorized() {
    const categories = this.state.contentData.categorySlug;
    if (categories.length === 0) {
      this.state.contentData.categorySlug = ['_uncategorized'];
    }
  }

  save() {
    // after adding uncategorized item to some category,
    // remove it from uncategorized
    this.removeFromUncategorized();

    // if item doesn't belong to any category, move it to _uncategorized
    this.checkUncategorized();

    super.save();
  }

}
