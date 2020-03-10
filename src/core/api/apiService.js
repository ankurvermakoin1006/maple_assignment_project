import axios from 'axios';

import ApiJson from './apiConfigJson';

let apiFailCounter = 0;

axios.defaults.baseURL = "https://api.inquickerstaging.com/v3";  

const prepareDataObject = (_data_, paramObj) => {
  for (let key in _data_) {
    if (paramObj[key] || paramObj[key] === false) {
      _data_[key] = paramObj[key];
    } else {
      if (typeof _data_[key] !== 'object') _data_[key] = '';
    }
  }
  return _data_;
};

const injectParamsToUrl = (_url_, paramObj) => {
  var url = _url_;
  for (let key in paramObj) {
    url = url.replace(':' + key, paramObj[key]);
  }
  return url;
};

const handleErrorByStatus = error => {
  if (error && error.status === 'Error') {
    const message = error.message;
   // showErrorToast(message);
  }
};

const myApiService = (apiKeyName, data) => {
  let apiDetails = ApiJson[apiKeyName];
  if (!apiDetails) {
    console.log(
      'Api configuration do not found in api-json, please check api-json.js'
    );
    throw new Error(
      'Api configuration do not found in api-json, please check api-json.js'
    );
  }

  let requestObject = Object.assign({}, apiDetails);
  requestObject.data = prepareDataObject(requestObject.data, data);
  requestObject.url = injectParamsToUrl(requestObject.url, data);

  console.log('requestObject ',requestObject);

  return axios(requestObject)
    .then(function(result) {
      console.log(result);
      apiFailCounter = 0;
      if (result.data && result.data.status === 'Success') {
        if (result.data.message) {
          const message = result.data.message;
          if (requestObject.showResultMessage === true){
          }    
        }
      } else {
        handleErrorByStatus(result.data);
      }
      return result;
    })
    .catch(function(error) {
      console.log('error', error);
      if (error && error.response) {
        if (requestObject.showErrorMessage === true)
          handleErrorByStatus(error.response);
      }

      if (
        error.config.maxContentLength - 1 &&
        error.toString().indexOf('Network Error') > -1
      ) {
        apiFailCounter++;
        if (apiFailCounter >= 3) {          
          window.open(window.location.origin, '_self');
        }
      }
      return error.response;
    });
};

export default myApiService;
