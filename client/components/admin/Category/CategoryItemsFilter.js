import React from 'react';
import axios from 'axios';
import Helpers from 'Utils/Helpers';
import { Link } from 'react-router';
import { Grid, Col, Row, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import styles from './ItemsInCategory.sass';
import FilteredCategoryItem from './FilteredCategoryItem';


export default class CategoryItemsFilter extends React.Component {
  serverUrl = Helpers.getServerUrl();
  state = {
    items: [],
    slug: (this.props.route) ? Helpers.slugFromRoute(this.props.route) : this.props.slug,
    categories: [],
    selectedCategory: 'all',
  };

  render() {
    const selected = this.state.selectedCategory;

    return (
      <Grid>
        <Row>
          <Col sm={12} className="head">
            <Row>
              <Col xs={7}>
                <h3 className="title">{this.props.title || this.props.route.title}</h3>
              </Col>

              <Col xs={4} className="category-select">
                <FormControl 
                  componentClass="select" 
                  placeholder="select"
                  onChange={this.handleSelectChange.bind(this)}
                >
                  <option value="all">All Categories</option>
                  <option value="_uncategorized">Uncategorized</option>
                  {this.state.categories.map( (cat, index) => 
                    <option key={index} value={cat.slug}>{cat.title}</option>  
                  )}
                </FormControl>
              </Col>

              <Col xs={1}>
                <Link to="/admin/items/add">
                  <Button className="add" bsStyle="success" bsSize="small">Add</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        
        <Row className="table-head">
          <Col xs={6} className="item-cell">
            <h4>Item</h4>
          </Col>
          <Col xs={6} className="link-cell">
            <h4>Category</h4>
          </Col>
        </Row>
        {this.state.items
          .filter( item => selected === 'all' || selected.indexOf(item.categorySlug) > -1 )
          .map( (item,index) => 
            <FilteredCategoryItem 
              key={index}
              title={item.title}
              slug={item.slug}
              categorySlug={item.categorySlug}
            />
          )
        }
        
      </Grid>
    );
  }

  componentDidMount() {
    this.fetchItems(this.state.slug);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.route) {
      const newSlug = Helpers.slugFromRoute(nextProps.route);
      if (newSlug !== nextState.slug) {
        this.fetchItems(newSlug);
        nextState.slug = newSlug;
      }
    }

    // update after received categorySlug in props
    if (nextProps.categorySlug !== this.props.categorySlug) {
      this.fetchItems(this.state.slug);
    }

  }

  handleSelectChange(e) {
    const slug = e.target.value;
    this.setState({
      selectedCategory: slug,
    });
  }

  fetchItems(slug) {
    if (!slug) return;

    let url = this.serverUrl + '/api/' + slug;

    // fetch all category items
    if (this.props.categorySlug) {
      url += '/' + this.props.categorySlug;
    }

    axios
      .get(url)
      .then(res => {
        this.setState({
          items: res.data
        });
      });

    // fetch all categories
    const catUrl = this.serverUrl + '/api/categories'
    axios
      .get(catUrl)
      .then(res => {
        this.setState({
          categories: res.data,
        });
      });

  }

}