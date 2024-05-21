# Online Banking System

## Users Endpoints

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

- **Method:** GET
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
