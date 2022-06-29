# Patient Manager
To run the app :
1. Clone the repository.
2. Install dependencies.
    > npm install
3. Fake database is created using **json-server** package, which is using the **db.json** file present under **/server** folder.
    1. To run the server, run the following command inside **/server** folder :
        > json-server --watch db.json --routes routes.json --port 5000
4. Finally, run the following command to run the app on localhost :
    > npm start
