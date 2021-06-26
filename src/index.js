/*
 * Vilike.js
 * (c) 2021 Feng L.H.
 * Released under the MIT License.
*/

  import fetch from 'cross-fetch';

  'use strict';
  const Vilike = {};

  Vilike.version = '0.3.0';

  const BASE_API_PATH = 'https://api.countapi.xyz';

  /**
   * @description: Execute views/likes by pkey/skey
   * @param {String} pkey Primary Key
   * @param {String} skey Sub Key
   * @param {Number} mode Use localstorage or not
   * @return {Object}
   */
  Vilike.exec = function (pkey, skey, mode) {
    return new Promise(function (resolve, reject) {
      if (
        pkey === undefined ||
        pkey === '' ||
        skey === undefined ||
        skey === ''
      ) {
        reject('pkey and skey must be set.');
        return;
      }
      switch (mode){
        case 0:
          fetchJson(`${BASE_API_PATH}/hit/${pkey}/${skey}`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });  
          break;
        case 1:
          const keyVal = localStorage.getItem(pkey);
          let newRes = {};
          if (keyVal === null){
            localStorage.setItem(pkey, skey);
            fetchJson(`${BASE_API_PATH}/hit/${pkey}/${skey}`)
            .then((res) => {
              Object.assign(newRes,res,{isHit:true});
              resolve(newRes);
            })
            .catch((err) => {
              reject(err);
            });  
          }else{
            fetchJson(`${BASE_API_PATH}/get/${pkey}/${skey}`)
            .then((res) => {
              Object.assign(newRes,res,{isHit:true});
              resolve(newRes);
            })
            .catch((err) => {
              reject(err);
            }); 
          }
          break;
        default:
          reject('mode must be 0 or 1');
      }
    });
  };

  /**
   * @description: Create new data by customized
   * @param {String} pkey Primary Key
   * @param {String} skey Sub Key
   * @param {String} value Initial Value
   * @param {String} ctrl Allows the key to be resetted
   * @param {String} upperbound Restrict update to not add more than this number.
   * @return {Object}
   */
  Vilike.create = function (pkey, skey, value, ctrl, upperbound) {
    return new Promise(function (resolve, reject) {
      if (
        pkey === undefined ||
        pkey === '' ||
        skey === undefined ||
        skey === ''
      ) {
        reject('pkey and skey must be set.');
        return;
      }
      value = value === undefined || value === '' ? 0 : value;
      ctrl = ctrl === undefined || ctrl === '' ? 0 : ctrl;
      upperbound = upperbound === undefined || upperbound === '' ? 1 : upperbound;

      fetchJson(
        `${BASE_API_PATH}/create?namespace=${pkey}&key=${skey}&value=${value}&enable_reset=${ctrl}&update_upperbound=${upperbound}&update_lowerbound=0`
      )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * @description: Update value from countapi.xyz /set/ and /update/ method
   * @param {String} pkey Primary Key
   * @param {String} skey Sub Key
   * @param {String} value Target value or addition value
   * @param {Number} type update value by 0 / add value by 1
   * @return {Object}
   */
  Vilike.update = function (pkey, skey, value, type) {
    return new Promise(function (resolve, reject) {
      if (
        pkey === undefined ||
        pkey === '' ||
        skey === undefined ||
        skey === ''
      ) {
        reject('pkey and skey must be set.');
        return;
      }

      switch (type) {
        case 0:
          value = value === undefined || value === '' ? 0 : value;

          fetchJson(`${BASE_API_PATH}/set/${pkey}/${skey}?value=${value}`)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
          break;
        case 1:
          value = value === undefined || value === '' ? 1 : value;

          fetchJson(`${BASE_API_PATH}/update/${pkey}/${skey}?amount=${value}`)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });

          break;
        default:
          reject('type must be 0 or 1.');
      }
    });
  };

  /**
   * @description: Fetch info by pkey/skey
   * @param {String} pkey Primary Key
   * @param {String} skey Sub Key
   * @return {Object}
   */
  Vilike.info = function (pkey, skey) {
    return new Promise(function (resolve, reject) {
      if (
        pkey === undefined ||
        pkey === '' ||
        skey === undefined ||
        skey === ''
      ) {
        reject('pkey and skey must be set.');
        return;
      }
      fetchJson(`${BASE_API_PATH}/info/${pkey}/${skey}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * @description: Fetch json from api
   * @param {String} url response from url
   * @return {Object}
   */
  function fetchJson(url) {
    return new Promise((resolve) => {
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(function(data) {
          resolve(data);
        })
        .catch(err => {
          console.error(err);
        });
    });
  }


  if (typeof window !== 'undefined') {
    window.Vilike = Vilike;
  }

export default Vilike;
