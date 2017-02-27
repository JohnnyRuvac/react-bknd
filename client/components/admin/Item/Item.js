import React from 'react';
import ContentType from '../ContentType/ContentType';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import TextEditor from '../TextEditor/TextEditor';
import axios from 'axios';


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
          <Col xs={12}>
            <h3>{this.props.route.title}</h3>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup
              controlId="title"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                placeholder="Title"
                value={this.state.contentData.title}
                onChange={this.handleChange.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup
              controlId="slug"
              validationState={this.getValidationState()}
            >
              <ControlLabel>{window.location.origin}/pages/</ControlLabel>
              <FormControl
                type="text"
                placeholder="some-name"
                value={this.state.contentData.slug}
                onChange={this.handleSlugChange.bind(this)}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup controlId="content">
              <ControlLabel>Text</ControlLabel>
              <TextEditor
                ref="te"
                content={this.state.contentData.content}
              />
            </FormGroup>
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
          <Col xs={12}>
            <Button bsStyle="success"
              bsSize="small" 
              onClick={this.save.bind(this)}
            >
              Save
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

  save() {
    // get html content from me editor, add to contentData and save
    const html = this.refs.te.me.getContent()
    this.state.contentData.content = html;
    super.save();
  }

}
