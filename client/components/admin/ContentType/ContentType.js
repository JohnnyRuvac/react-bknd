import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import AuthService from 'Utils/AuthService';
import getSlug from 'speakingurl';
import Helpers from 'Utils/Helpers';


export default class ContentType extends React.Component {
  constructor(props) {
    super(props);
    this.serverUrl = Helpers.getServerUrl();
    this.state = {
      contentData: {},
      slugOverridden: false,
    }
  }

  render() {
    return (
      <div>Base content type, extend it.</div>
    );
  }

  componentDidMount() {
    const isEditing = this.props.params.slug;
    if (isEditing) {
      this.fechItemData();
    }
  } 

  fechItemData() {
    const url = this.serverUrl + '/api/' + this._getContentTypeSlug() + '/' + this.props.params.slug;
    
    axios.get(url)
      .then(res => {
        this.originalSlug = res.data.slug;
        this.setState({
          contentData: res.data
        });
      });
  }

  updateContentDataState(changedData) {
    const contentData = Object.assign({}, this.state.contentData);
    for (const key in changedData) {
      contentData[key] = changedData[key];
    }
    this.setState({contentData: contentData});
  }

  handleChange(e) {
    const name = e.target.name;
    const changedData = {};
    changedData[name] = e.target.value;

    // update slug after title change
    if ( name === 'title' && !this.state.slugOverridden ) {
      changedData.slug = getSlug(e.target.value);
    }

    this.updateContentDataState(changedData);
  }

  handleSlugChange(e) {
    const val = e.target.value;
    const slugNotEmpty = val !== '';
    const differentThanTitle = val !== this.state.contentData.title;
    
    this.setState({
      contentData: {
        slug: val,
      },
      slugOverridden: ( slugNotEmpty && differentThanTitle )
    });
  }

  _getContentTypeSlug() {
    const path = this.props.route.path;
    const segments = path.split('/');
    const adminIndex = segments.indexOf('admin');
    return segments[adminIndex + 1]
  }

  _removeIdFromContentData(data) {
    const newData = Object.assign({}, data);
    delete newData._id;
    return newData;
  }

  save() {
    console.log('saving');
    const isEditing = !!this.props.router.params.slug;
    // patch if item already exists, post if doesn't
    const method = ( isEditing ) ? 'patch' : 'post';
    // if updating use original slug
    const slug = ( isEditing ) ? this.originalSlug : this.state.contentData.slug
    const url = this.serverUrl + '/api/' + this._getContentTypeSlug() + '/' + slug;
    const data = this._removeIdFromContentData( this.state.contentData );
    
    axios[method](url, data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
      }
    )
    .then(response => {
      const path = '/admin/' + this._getContentTypeSlug();
      browserHistory.push(path);
    })
    .catch(error => {
      console.log('page save error');
      console.log(error);
    });
  }

}