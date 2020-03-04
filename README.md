# storefront-ci
Automated tasks for default Storefront setup and first deploy


## Endpoints

storefront-ci exposes the endpoint (settings is bypass to display a store):

* **GET /deploy**

  Body:

  ```json
  {
    "name": "repository name",
    "gotrue": {
      "store_id": "9999",
      "name": "username",
      "email": "user3@user.com",
      "password": "xxxxx",
    },
    "settings": {
      "store_id": "9999",
      "..."
    },
  }
  ```
