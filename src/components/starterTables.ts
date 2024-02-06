import { Table } from "../vite-env";

const starterTables: Table[] = [
    {
      name: 'planets',
      columns: [
        '_id',
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'population',
      ],
      foreignKeys: [],
    },

    {
      name: 'species',
      columns: [
        '_id',
        'name',
        'classification',
        'average_height',
        'average_lifespan',
        'hair_colors',
        'skin_colors',
        'eye_colors',
        'language',
        'homeworld_id',
      ],
      foreignKeys: [
        {
          columnName: 'homeworld_id',
          foreignTableName: 'planets',
          foreignColumnName: '_id',
        },
      ],
    },

    {
      name: 'people',
      columns: ['_id', 'name', 'species_id', 'homeworld_id'],
      foreignKeys: [
        {
          columnName: 'species_id',
          foreignTableName: 'species',
          foreignColumnName: '_id',
        },
        {
          columnName: 'homeworld_id',
          foreignTableName: 'planets',
          foreignColumnName: '_id',
        },
      ],
    },
  ];

  export default starterTables;
