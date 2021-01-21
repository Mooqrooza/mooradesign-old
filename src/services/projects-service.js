import * as axios  from 'axios';

const fs = require('fs');

export default class ProjectsService {
  _baseUrl = 'https://us-central1-mooradesign-2020.cloudfunctions.net/api';
  cancelToken = axios.CancelToken;
  cancel = null;

  async getProjects() {
    const res = await axios(this._baseUrl+'/projects');
    return res.data;
  };

  async getProjectImages(id) {
    try {this.cancel()} catch(err) {}
    const res = await axios.get(
      this._baseUrl+'/project-images/'+id,
      { cancelToken: new this.cancelToken(c => {this.cancel = c})}
    );
    const toDataUrl = res.data.map( item => ('data:image/jpeg;base64,'+item) );
    return toDataUrl;
  };

  async getBgAudio() {
   const res = await axios(this._baseUrl+'/sound');
   const toDataUrl = 'data:audio/mpeg;base64,'+res.data;
   return toDataUrl;
  };

 cancelAxToken() { try {this.cancel()} catch(err) {} };

};
