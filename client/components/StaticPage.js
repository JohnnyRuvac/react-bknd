import React from 'react';
import axios from 'axios';
import AuthService from '../utils/AuthService';
import getSlug from 'speakingurl';


export default class StaticPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      slug: '',
      slugOverridden: false
    }
  }

  render() {
    return (
      <div>
        <h3>New page</h3>
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
        <textarea
          name="content" 
          placeholder="Text"
          value={this.state.content}
          onChange={this.handleChange.bind(this)}
        ></textarea>
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
    axios.get( process.env.SERVER_URL + '/pages/' + this.props.params.slug )
      .then(res => {
        this.setState({
          title: res.data.title,
          slug: res.data.slug,
          content: res.data.content
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
    url += (slug) ? '/pages/' + slug : '/pages/new';
    
    axios.post(url, 
      {
        title: this.state.title,
        slug: this.state.slug || getSlug(this.state.title),
        content: this.state.content
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
      console.log('page save error');
      console.log(error);
    });
  }

}