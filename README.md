# Online Banking System

## USERS ENDPOINTS

### Register
Register a new user.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/users/register`
- **Body:**
  ```json
  {
    "username": "example",
    "password": "test123"
  }


### Login
Login with your account

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/users/login`
- **Body:**
  ```json
  {
    "username": "example",
    "password": "test123"
  }



## BANKING OPERATION ENDPOINTS

### Balance
Retrieve the balance of a user by their ID.

- **Method:** GET
- **Endpoint:** `http://localhost:${PORT}/api/banking-operation/balance/${id}`


### Deposit
Deposit funds into a user's account.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/banking-operation/deposit`
- **Body:**
  ```json
  {
    "username": "example",
    "amount": 250
  }


### Withdraw
Withdraw funds from a user's account.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/banking-operation/withdraw`
- **Body:**
  ```json
  {
    "username": "example",
    "amount": 950
  }


### Transfer
Transfer funds from one user's account to another.

- **Method:** POST
- **Endpoint:** `http://localhost:${PORT}/api/banking-operation/transfer`
- **Body:**
 ```json
  {
    "fromUsername": "example1",
    "toUsername": "example2",
    "amount": 250
  }
```

## TICKETS ENDPOINTS

### Tickets
Obtain user tickets.

- **Method:** GET
- **Endpoint:** `http://localhost:9998/api/tickets/${id}`
- **Body:**
  ```json
  {
    "sessionId": "9e0a9db1-03b0-4f8d-ae95-4d6bbdaed717"
  }
- **Return:**  
 ```json
  {
    [
      {
        "id": "9e0a9db1-03b0-4f8d-ae95-4d6bbdaed717",
        "operation": "Deposit",
        "username": "User123",
        "amount": 123,
        "date": "12/6/2024, 19:57:22"
      },
      {
        "id": "9e0a9db1-03b0-4f8d-ae95-4d6bbdaed717",
        "operation": "Withdraw",
        "username": "User123",
        "amount": 123,
        "date": "12/6/2024, 19:57:29"
      },
      {
        "id": "fa684e48-8afa-45ef-9880-99c78c3d34a0",
        "operation": "Transfer",
        "fromUsername": "User123",
        "toUsername": "User456",
        "amount": 321,
        "date": "12/6/2024, 20:01:54"
      }
    ]
  }
