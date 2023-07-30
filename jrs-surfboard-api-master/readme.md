# Surfboard API

An api to manage surfboards.

## Getting Started

This section is intended for software developers. If you have rights to the repo, simply clone. If not, you may fork and clone the repo.

After you fork, clone, and install dependencies:

```
git clone <clone url>
cd surfboard-api
npm install
```

## Environment Variables

You'll need to create a local **.env** file to store your application's secrets and other configuration values. Follow these steps to generate and store the secrets.

1. `PORT` - Create a `PORT` environment variable. Set the value to an unused port number for your machine.
2. `COUCH_HOSTNAME=https://{user}:{pwd}@{dbhostname}/`
3. `COUCH_DBNAME=surfboards`

**.env** file example:

```
PORT=5000
COUCH_HOSTNAME=https://admin:e324234sasd@jeff.jrscode.cloud/
COUCH_DBNAME=surfboards
```

## Load some test data

Optionally, you can load some test data in your CouchDB database by running `npm run load`. This will take the array of document within **load-data.js** and bulk add them into the database.

```
npm run load
```

## Start the api

Run the following command to start the api on the designated port.

```
npm start
```

## Endpoints

This api allows you to create, read, update, delete and list surfboards.

## Create a surfboard - `POST /boards`

Add a surfboard to the collection surfboards by providing a new board resource in the request body.

The `name`, `category`, `price`, and `sku` properties are required.

**Example**

```
POST /boards

{
    "name": "shred",
    "category": "fish",
    "price": 399.99,
    "sku": "12345"
}
```

### Response 200 OK

Returned when the operation successfully add the surfboard.

```
{
  "ok": true,
  "id": "board_12345",
  "rev": "1-A6157A5EA545C99B00FF904EEF05FD9F"
}
```

### Response 400 Bad request

Returned when the supplied request body is missing or if required fields are missing.

### Response 404 Not Found

The requested resource could not be found. You may be trying to access a record that does not exist, or you may have supplied an invalid URL.

### Response 500 Internal Server Error

An unexpected error has occurred on our side. You should never receive this response, but if you do please let us know and we'll fix it.

## Get a single board - `GET /boards/{sku}`

Retrieve a single surfboard resource from the collection of boards. Use the sku to identify a single board.

**Example**

```
GET /boards/12345
```

If found, the board will be returned in the response body.

```
{
  "_id": "board_12345",
  "_rev": "1-1f4ee97e8aec1687a16afceed4d97355",
  "name": "shred",
  "category": "fish",
  "price": 399.99,
  "sku": "12345",
  "type": "board"
}
```

### Response 200 OK

Returned when the operation successfully retrieves the board.

### Response 404 Not Found

The requested resource could not be found. You may be trying to access a record that does not exist, or you may have supplied an invalid URL.

### Response 500 Internal Server Error

An unexpected error has occurred on our side. You should never receive this response, but if you do please let us know and we'll fix it.

## Update a board - `PUT /boards/{sku}`

Edits a board. Provide the `sku` in the path to identify the board. Provide the updated board in the body of the request.

The `_id`, `_rev`, `type`, `name`, `category`, `price`, and `sku` properties are required.

**Example**

Here's an example of updating the price of a surfboard to 599.99

```
PUT /boards/58748

{
  "_id": "board_58748",
  "_rev": "1-10e675d267f4a1961c278014f38aec1f",
  "name": "brah",
  "category": "longboard",
  "price": 599.99,
  "sku": "58748",
  "type": "board"
}
```

### Response 200 OK

Returned when the operation successfully update the surfboard.

```
{
  "ok": true,
  "id": "add",
  "rev": "2-A6157A5EA545C99B00FF904EEF05FD9F"
}
```

### Response 400 Bad request

Returned when the supplied request body is missing or if any required fields are missing or if the `sku` provided in the path does not match the `sku` property value in the request body.

### Response 404 Not Found

The requested resource could not be found. You may be trying to access a record that does not exist, or you may have supplied an invalid URL.

### Response 409 Conflict

Indicates that the request could not be processed because of conflict in the request. If the document already exists, you must specify the most recent revision `_rev`, otherwise a conflict will occur.

### Response 500 Internal Server Error

An unexpected error has occurred on our side. You should never receive this response, but if you do please let us know and we'll fix it.

## Delete a board `DELETE /boards/{sku}`

Deletes a board for the given sku.

```
DELETE /boards/{sku}
```

### Response 404 Not Found

### Response 500 Internal Server Error

An unexpected error has occurred on our side. You should never receive this response, but if you do please let us know and we'll fix it.
