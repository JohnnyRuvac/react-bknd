import React from 'react';
import ListItems from '../ListItems/ListItems';
import axios from 'axios';


export default class ItemsInCategory extends ListItems {
  deleteItem(slug) {
    const confirm = window.confirm('Move this item to uncategorized?');

    if (!confirm) {
      return;
    }

    const url = this.serverUrl + '/api/categories/removeFromCategory/' + this.props.categorySlug + '/' + slug;    
    axios
      .patch(url, null, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
      })
      .then( result => {
        const filtered = this.state.items.filter( item => item.slug !== result.data.slug);
        this.setState({
          items: filtered,
        });
      });
  
  }
}