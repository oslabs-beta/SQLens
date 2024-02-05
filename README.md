# SQLens

SQLens is a powerful SQL database visualizer designed to simplify the complexities of managing and understanding relational databases with extensive foreign key relationships. In the world of database administration and development, keeping track of intricate relationships and optimizing queries across large datasets can be daunting. SQLens addresses these challenges head-on by providing a dynamic, graphical representation of your database schema, making it easier and more enjoyable to visualize, analyze, and manage data relationships.

<p align="center">
<img src="https://github.com/oslabs-beta/SQLens/assets/21320155/0442c96a-f287-4b4d-8289-0ffdc0b84fc4" >
</p>

## Visualize Your Data

<p align="center">
<img src="https://github.com/oslabs-beta/SQLens/assets/21320155/969f8cfd-d7cf-47a4-a788-fc9e86415b7f" >
</p>

## Getting Started

### Initial Setup
1. Fork and clone this repository.
2. Run npm install to install dependancies.
3. Run npm build to ensure any dependancy updates are reflected.
4. Run npm start to spin up a server locally, and view your data on localhost:3000

### Using the app

<p align="center">
<img src="https://github.com/oslabs-beta/SQLens/assets/21320155/bdb12a63-5001-4a14-9e78-3b3486d3819c">
</p>

- Simply enter in a URI string for your postgres database
- Click and drag to view foreign-key relationships between tables

<p align="center">
<img src="https://github.com/oslabs-beta/SQLens/assets/21320155/5da53966-188f-43d4-a80b-4604c204079d">
</p>

- Add a new table using the + button on the Add New Table component
- Add a column from the drop-down table to the right
- In the pop-out, name the column and select its data type from the drop-down menu
- Click Save to add.
  
<p align="center">
<img src="https://github.com/oslabs-beta/SQLens/assets/21320155/aa79febe-e4f7-4dc9-a69f-13a09ad18aaf">
</p>

- To rename columns, use the pencil tool
- To delete a column, simply click the trashcan, you will be asked "Are you sure?"
- To delete a table, use the menu to the right
- To download a migration file of any changes made, use the menu at the top left corner of the browser

<p align="center">
<img src="https://github.com/oslabs-beta/SQLens/assets/21320155/5586206d-06a9-453b-b2c8-32b7e218e084">
</p>

- SQLens ensures data integrity and operational reliability, leveraging the fact that PostgreSQL databases are ACID-compliant, which means invalid column or table names are automatically rejected by PostgreSQL and will not be saved.
<p align="center">
<img src="https://github.com/oslabs-beta/SQLens/assets/21320155/8a5a92a9-a19a-4ac9-86c0-9ab7558a1e1a">
</p>

## Contributing 

- To run the app in dev mode, simply npm run dev
- To ensure updates are compatible with all functional components, run unit tests with npm run test

### Contribution Guidelines

- Fork this repository
- Checkout from dev to a new feature branch with the format <your-name/your-new-feature>
- Test code before PR with npm run test
- Make a Pull Request 

### Features to Work On


| Feature                                                                               | Status    |
|---------------------------------------------------------------------------------------|-----------|
| Migration to use TurboNode styling for React Flow component                           | ✅        |
| Add, delete, edit table and column names                                              | ✅        |
| Apollo Server graphQL cacheing                                                        | ✅        |
| Downloadable migration file                                                           | ✅        |
| Clean way to view row data                                                            | ⏳        |
| Update algorithm for best visual rendering of foreign key relationships               | ⏳        |
| Allow user to add/edit relationships between tables w/ GUI                            | ⏳        |
| Build docker container for CI/CD w/ github actions                                    | 🙏🏻        |

- ✅ = Ready to use
- ⏳ = In progress
- 🙏🏻 = Looking for contributors

## License 

SQLens is free and open-source licensed under the [MIT License](https://github.com/oslabs-beta/SQLens/blob/main/LICENSE)


## Technologies Used
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
<img src="https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white" />
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor" />
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/Miro-F7C922?style=for-the-badge&logo=Miro&logoColor=050036" />


## Contributors 

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/oslabs-beta/SQLens/assets/21320155/b69ce72b-a556-400a-8292-ab26fb867633" width="140px;" alt=""/>
      <br />
      <sub><b>Alex Palazzo</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/alexpalazzo/">🖇️</a>
      <a href="https://github.com/alexpalazzo">🐙</a>
    </td>
    <td align="center">
      <img src="https://github.com/oslabs-beta/SQLens/assets/21320155/e1b01912-421b-4fe2-9788-747804fcfe8d" width="140px;" alt=""/>
      <br />
      <sub><b>Jarod Crawford</b></sub>
      <br />
      <a href="http://www.linkedin.com/in/jarod-crawford-b83096253">🖇️</a>
      <a href="https://github.com/JarodCrawford">🐙</a>
    </td>
    <td align="center">
      <img src="https://github.com/oslabs-beta/SQLens/assets/21320155/c9a1a4e3-e9ad-4569-b9f8-5cca777ec966" width="140px;" alt=""/>
      <br />
      <sub><b>Jenny Ouk</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/jenny-ouk-a3668814/">🖇️</a>
      <a href="https://github.com/jennyouk">🐙</a>
    </td>
    <td align="center">
      <img src="https://github.com/oslabs-beta/SQLens/assets/21320155/c4116f00-617a-4122-bb86-f7a65055e08b" width="140px;" alt=""/>
      <br />
      <sub><b>Margaret Hatch</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/margarethatch/">🖇️</a>
      <a href="https://github.com/margarethatch">🐙</a>
    </td>
  </tr>
</table>


- 🖇️ = LinkedIn
- 🐙 = Github
