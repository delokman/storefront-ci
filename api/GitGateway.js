const uuid = require('uuid/v4');

const axios = require('axios').create({
  baseURL: process.env.STOREFRONT_CI_GITGATEWAY_URL,
  headers: {
    'Authorization': `Bearer ${process.env.STOREFRONT_CI_OPERATOR_TOKEN}`
  }
});


class GitGateway {

  deploy(payload) {
    return new Promise((resolve, reject) => {
      this.createInstance(payload)
        .then(({ data }) => resolve(data))
        .catch(error => reject({
          step: 'gitgateway',
          status: error.status,
          error: error.statusText,
          details: error.data.msg
        }))
    })
  }

  createInstance(payload) {
    return new Promise((resolve, reject) => {
      const storeId = payload.gotrue.store_id ? payload.gotrue.store_id : payload.settings.store_id;
      const owner = payload.owner ? payload.owner : process.env.STOREFRONT_CI_GITHUB_DEFAULT_OWNER;
      const headers = {
        'Authorization': `Bearer ${process.env.STOREFRONT_CI_OPERATOR_TOKEN}`
      }
      const data = {
        uuid: uuid(),
        config: {
          jwt: {
            secret: process.env.STOREFRONT_CI_OPERATOR_TOKEN
          },
          github: {
            access_token: process.env.STOREFRONT_CI_GITHUB_TOKEN,
            repo: `${owner}/${payload.name}`
          },
          roles: [`s${storeId}`]
        }
      }
      axios.post('/instances', data, headers)
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
  }
}

module.exports = new GitGateway();