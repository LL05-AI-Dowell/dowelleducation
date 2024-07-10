
# API Documentation

## Server Health
**GET** `http://localhost:5000`

```bash
curl -X GET http://localhost:5000
```

## API Health
**GET** `http://localhost:5000/api/v1/auth/health`

```bash
curl -X GET http://localhost:5000/api/v1/auth/health
```

## Login
**POST** `http://localhost:5000/api/v1/auth/login`
**Content-Type**: `application/json`

Request Body:
```json
{
    "username": "manish_test_error_login",
    "password": "Q1e2r3s4$",
    "workspace_id": "6385c0f18eca0fb652c94558",
    "institution_name": "mvj_college_of_engineering"
}
```

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
        "username":"manish_test_error_login",
        "password":"Q1e2r3s4$",
        "workspace_id":"6385c0f18eca0fb652c94558",
        "institution_name":"mvj_college_of_engineering"
      }'
```

## User Profile
**GET** `http://localhost:5000/api/v1/auth/user-details`
**Content-Type**: `application/json`
**Authorization**: `Bearer access_token`

```bash
curl -X GET http://localhost:5000/api/v1/auth/user-details \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer access_token"
```

## Logout
**GET** `http://localhost:5000/api/v1/auth/logout`
**Authorization**: `Bearer access_token`

```bash
curl -X GET http://localhost:5000/api/v1/auth/logout \
  -H "Authorization: Bearer access_token"
```

## Create Link
**POST** `http://localhost:5000/api/v1/link/generate-link`
**Content-Type**: `application/json`

Request Body:
```json
{
    "workspaceId": "6385c0f18eca0fb652c94558",
    "institutionName": "mvj_college_of_engineering",
    "username": "manish"
}
```

```bash
curl -X POST http://localhost:5000/api/v1/link/generate-link \
  -H "Content-Type: application/json" \
  -d '{
        "workspaceId": "6385c0f18eca0fb652c94558",
        "institutionName": "mvj_college_of_engineering",
        "username": "manish"
      }'
```

## Get Link
**GET** `http://localhost:5000/api/v1/link/6385c0f18eca0fb652c94558`

```bash
curl -X GET http://localhost:5000/api/v1/link/6385c0f18eca0fb652c94558
```

## Save Links from Scale Product
**POST** `http://localhost:5000/api/v1/scale-link/save`
**Content-Type**: `application/json`
**Authorization**: `Bearer access_token`

Request Body:
```json
{
    "workspaceId": "653637a4950d738c6249aa9a",
    "username": "CustomerSupport"
}
```

```bash
curl -X POST http://localhost:5000/api/v1/scale-link/save \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer access_token" \
  -d '{
        "workspaceId": "653637a4950d738c6249aa9a",
        "username": "CustomerSupport"
      }'
```
