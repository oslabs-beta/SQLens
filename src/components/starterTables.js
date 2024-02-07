const starterTables = [
    {
        name: 'films',
        columns: [
            '_id',
            'title',
            'director',
            'release_date',
        ],
        foreignKeys: [],
    },
    {
        name: 'planets',
        columns: [
            '_id',
            'name',
            'gravity',
            'terrain',
            'surface_water',
            'population',
        ],
        foreignKeys: [],
    },
    {
        name: 'planets_in_films',
        columns: ['_id', 'film_id', 'planet_id'],
        foreignKeys: [
            {
                columnName: 'film_id',
                foreignTableName: 'films',
                foreignColumnName: '_id',
            },
            {
                columnName: 'planet_id',
                foreignTableName: 'planets',
                foreignColumnName: '_id',
            },
        ],
    },
    {
        name: 'species',
        columns: [
            '_id',
            'name',
            'classification',
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
        name: 'people_in_films',
        columns: ['_id', 'name', 'homeworld_id', 'species_id'],
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
