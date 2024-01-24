import * as React from 'react';
import { Theme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const dataTypes = [
    'bigint',
    'bigserial',
    'bit [ (n) ]',
    'bit varying [ (n) ]',
    'boolean',
    'box',
    'bytea',
    'character [ (n) ]',
    'character varying [ (n) ]',
    'cidr',
    'circle',
    'date',
    'double precision',
    'inet',
    'integer',
    'interval [ fields ] [ (p) ]',
    'json',
    'jsonb',
    'line',
    'lseg',
    'macaddr',
    'macaddr8',
    'money',
    'numeric [ (p, s) ]',
    'path',
    'pg_lsn',
    'pg_snapshot',
    'point',
    'polygon',
    'real',
    'smallint',
    'smallserial',
    'serial',
    'text',
    'time [ (p) ] [ without time zone ]',
    'time [ (p) ] with time zone',
    'timestamp [ (p) ] [ without time zone ]',
    'timestamp [ (p) ] with time zone',
    'tsvector',
    'txid_snapshot',
    'uuid',
    'xml'
  ];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DataTypeSelector() {
//   const theme = useTheme();
  const [selectedDataType, setSelectedDataType] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedDataType>) => {
    const {
      target: { value },
    } = event;
    setSelectedDataType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
        //   multiple
          displayEmpty
          value={selectedDataType}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Data Type</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select Data Type</em>
          </MenuItem>
          {dataTypes.map((dataType:string) => (
            <MenuItem
              key={dataType}
              value={dataType}
            //   style={getStyles(dataType, personName, theme)}
            >
              {dataType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}