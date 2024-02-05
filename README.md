# SQLens

SQLens is a powerful SQL database visualizer designed to simplify the complexities of managing and understanding relational databases with extensive foreign key relationships. In the world of database administration and development, keeping track of intricate relationships and optimizing queries across large datasets can be daunting. SQLens addresses these challenges head-on by providing a dynamic, graphical representation of your database schema, making it easier and more enjoyable to visualize, analyze, and manage data relationships.

<SQLens-logo goes here>

<SQLens-dynamic move goes here>

## Getting Started

### Initial Setup
1. Fork and clone this repository.
2. Run npm install to install dependancies.
3. Run npm build to ensure any dependancy updates are reflected.
4. Run npm start to spin up a server locally, and view your data on localhost:3000

### Using the app
- Simply enter in a URI string for a postgres database
<Gif of homepage>
- Click and drag to view foreign-key relationships between tables
<Gif of dynamic-move>
- Add a new table using the + button on the Add New Table component
- Add a column from the drop-down table to the right
- In the pop-out, name the column and select its data type from the drop-down menu
- Click Save to add.
- To rename columns, use the pencil tool
- To delete a column, simply click the trashcan, you will be asked "Are you sure?"
- To delete a table, use the menu to the right
<Gif of functional-tests>

- To download a migration file of any changes made, use the menu at the top left corner of the browser
<Gif of download-migration>

## Contributing 

- To run the app in dev mode, simply npm run dev
- To ensure updates are compatible with all functional components, run unit tests with npm run test

### Contribution Guidelines

- Fork this repository
- Checkout from dev to a new feature branch with the formate <your-name/your-new-feature>

### Features to Work On

< TODO: THIS NEEDS TO BE COMPLETED WITH TEAM >

## License 

< link to MIT license >

## Contributors 

  <table>
  <tr>
    <td align="center">
      <img src="TODO: photo here" width="140px;" alt=""/>
      <br />
      <sub><b>Alex Palazzo</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/alexpalazzo/">🖇️</a>
      <a href="https://github.com/alexpalazzo">🐙</a>
    </td>
    <td align="center">
      <img src="TODO: DEV PHOTO" width="140px;" alt=""/>
      <br />
      <sub><b>Jarod Crawford</b></sub>
      <br />
      <a href="TODO: LINKEDIN LINK">🖇️</a>
      <a href="TODO: GITHUB LINK>🐙</a>
    </td>
    <td align="center">
      <img src="TODO: DEV PHOTO" width="140px;" alt=""/>
      <br />
      <sub><b>Jenny Ouk</b></sub>
      <br />
      <a href="TODO: Linkedin Link">🖇️</a>
      <a href="TODO: GITHUB LINK>🐙</a>
    </td>
     <td align="center">
      <img src="TODO: DEV PHOTO" width="140px;" alt=""/>
      <br />
      <sub><b>Margaret Hatch</b></sub>
      <br />
      <a href="TODO: LinkedIN LInk">🖇️</a>
      <a href="TODO: GITHUB LINK>🐙</a>
    </td>

</table>

- 🖇️ = LinkedIn
- 🐙 = Github