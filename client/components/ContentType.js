import React from 'react';
import axios from 'axios';
import AuthService from '../utils/AuthService';
import getSlug from 'speakingurl';


export default class ContentType extends React.Component {
  constructor(props) {
    super(props);
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
    const url = process.env.SERVER_URL + '/types/' + this._getContentTypeSlug() + '/' + this.props.params.slug;
    
    axios.get(url)
      .then(res => {
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

  _getSaveUrl() {
    var url = process.env.SERVER_URL + '/types/' + this._getContentTypeSlug() + '/';
    const slug = this.props.params.slug;
    url += (slug) ? slug : 'new';
    return url;
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
    const url = this._getSaveUrl();
    const data = this._removeIdFromContentData( this.state.contentData );
    
    axios.post(url, data,
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