import React from 'react';
import axios from 'axios';
import AuthService from '../utils/AuthService';
import getSlug from 'speakingurl';


export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      slug: '',
      slugOverridden: false
    }
  }

  render() {
    return (
      <div>
        <h3>New category</h3>
        <input type="text" 
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange.bind(this)}
        />
        <input type="text" 
          name="slug"
          placeholder="slug"
          value={this.state.slug}
          onChange={this.handleSlugChange.bind(this)}
        />
        <button onClick={this.save.bind(this)}>Save</button>
      </div>
    );
  }

  componentDidMount() {
    const isEditPage = this.props.params.slug;
    if (isEditPage) {
      this.getPageData();
    }
  }

  getPageData() {
    axios.get( process.env.SERVER_URL + '/categories/' + this.props.params.slug )
      .then(res => {
        this.setState({
          title: res.data.title,
          slug: res.data.slug
        });
      })
  }

  handleChange(e) {
    const name = e.target.name;
    const newState = {};
    newState[name] = e.target.value;

    // update slug after title change
    if ( name === 'title' && !this.state.slugOverridden ) {
      newState.slug = getSlug(e.target.value);
    }

    this.setState(newState);
  }

  handleSlugChange(e) {
    const val = e.target.value;
    const slugNotEmpty = val !== '';
    const differentThanTitle = val !== this.state.title;
    
    this.setState({
      slug: val,
      slugOverridden: ( slugNotEmpty && differentThanTitle )
    });
  }

  save() {
    console.log('saving');
    var url = process.env.SERVER_URL;
    const slug = this.props.params.slug;
    url += (slug) ? '/categories/' + slug : '/categories/new';
    
    axios.post(url, 
      {
        title: this.state.title,
        slug: this.state.slug || getSlug(this.state.title)
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
      }
    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log('category save error');
      console.log(error);
    });
  }

}