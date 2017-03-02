import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import TextEditor from '../TextEditor/TextEditor';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { TextInput, SlugInput } from '../Form';


export default class Item extends ContentType {
  state = {
    contentData: {
      title: '',
      slug: '',
      content: '',
      categorySlug: (this.props.params.categorySlug) ? [this.props.params.categorySlug] : [],
    },
    allCategories: [],
  };
  
  render() {
    return (
      <Grid className="static-page">
        <Row>
          <Col xs={9}>
            <h3>{this.props.route.title}</h3>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <TextInput 
              controlId="title"
              label="Title"
              placeholder="Title"
              value={this.state.contentData.title}
              onChange={this.updateContentDataState.bind(this)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <SlugInput 
              controlId="slug"
              label="Slug"
              placeholder="some-name"
              value={this.state.contentData.slug}
              titleValue={this.state.contentData.title}
              onChange={this.updateContentDataState.bind(this)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <TextEditor
              label="Content"
              content={this.state.contentData.content}
              ref="te"
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup controlId="categories">
              <ControlLabel>Categories:</ControlLabel>
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

        <Row>
          <Col xs={3}>
            <Button bsStyle="success"
              bsSize="small" 
              onClick={this.save.bind(this)}
            >
              Save
            </Button>
          </Col>
          <Col xs={3}>
            <Button 
              onClick={this.handleRemove.bind(this)}
              className="delete"
              bsStyle="danger"
              bsSize="small" 
            >Delete
            </Button>
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
