import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

interface DataTypeSelectorProps {
  handleDataTypeChange: (event: SelectChangeEvent<string>) => void;
  selectedDataType: string;
  // disabled: boolean;
}

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

const dataTypes = ['bit(8)',
'bool',
'box',
'bytea',
'char(10)',
'cidr',
'circle',
'date',
'decimal (8, 2)',
'float4',
'float8',
'inet',
'int',
'int2',
'int4',
'int8',
'interval (6)',
'json',
'jsonb',
'line',
'lseg',
'macaddr',
'macaddr8',
'money',
'path',
'pg_lsn',
'pg_snapshot',
'point',
'polygon',
'serial2',
'serial4',
'serial8',
'text',
'time (3) without time zone',
'timestamp (6) without time zone',
'timestamptz',
'timetz',
'tsquery',
'tsvector',
'txid_snapshot',
'uuid',
'varbit(16)',
'varchar (255)',
'xml'];

export default function DataTypeSelector({
  handleDataTypeChange,
  selectedDataType,
  // disabled
}: DataTypeSelectorProps) {

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={selectedDataType}
          onChange={handleDataTypeChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          // disabled={disabled}
        >
          <MenuItem disabled value=''>
            <em>Select Data Type</em>
          </MenuItem>
          {dataTypes.map((dataType: string) => (
            <MenuItem key={dataType} value={dataType}>
              {dataType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
