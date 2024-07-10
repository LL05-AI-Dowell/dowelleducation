Here is the `README.md` file with the setup instructions:

```markdown
# Dowell Education Setup Instructions

## Clone the Repository

Clone the repository using the following command:
```bash
git clone https://github.com/LL05-AI-Dowell/dowelleducation.git
```

## Create Environment File

Create a `.env` file in the root directory and add the following content:
```plaintext
PORT=5000
```

## Start Docker

### Run Docker Compose

Execute the following command in the terminal to start the application using Docker Compose:
```bash
docker compose up
```

### Additional Commands

- **Stop the Containers**
    ```bash
    docker compose down
    ```

- **Check Container Logs**
    ```bash
    docker logs <container_name> -f
    ```

### Accessing the Application

- **Backend Health Check**: Visit [Backend](http://localhost:5000/) to ensure that the backend server is running correctly.

- **Frontend Access**: The frontend of the Exchange Thought application is accessible at [Frontend](http://localhost:5173/).
```