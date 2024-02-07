import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import TableHeader from './TableHeader';
import { FaHand } from 'react-icons/fa6';
import AddTable from './AddTable';
export default function TurboNode({ data }) {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: 'cloud gradient', children: _jsx("div", { children: _jsx(FaHand, {}) }) }), _jsx("div", { className: 'wrapper gradient', children: _jsx("div", { className: 'inner', children: data.label === 'Add New Table' ? (_jsx(AddTable, { data: data })) : (_jsx(TableHeader, { data: data })) }) })] }));
}
TurboNode.displayName = 'TurboNode';
