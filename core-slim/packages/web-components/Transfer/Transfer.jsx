import React, { useCallback } from 'react';
import { Transfer as AntTransfer } from 'antd';
import { Table } from '../Table';

/**
 * @component Transfer
 * @desc legacy transfer component; basically a more versatile multi-select alternative
 * @memberof module:@abst/web-components
 * @alias LegacyTransfer
 *
 * @deprecated seems to be project-specific; needs `form-web` input instead
 * @todo refactor
 *
 * @param {object} props
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Transfer } from '@abst/web-components';
 */
export function Transfer({ columns, ...rest }) {
  const render = useCallback((listProps) => {
    const {
      filteredItems,
      disabled: listDisabled,
      selectedKeys: listSelectedKeys,
      onItemSelect,
      onItemSelectAll
    } = listProps;
    const rowSelection = {
      getCheckboxProps: () => ({ disabled: listDisabled }),
      onSelect: ({ key }, selected) => { onItemSelect(key, selected); },
      onSelectAll: (selected, selectedRows) => {
        const treeSelectedKeys = selectedRows
        .filter(item => !item.disabled)
        .map(({ key }) => key);
        const diffKeys = selected
          ? _.difference(treeSelectedKeys, listSelectedKeys)
          : _.difference(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
      },
      selectedRowKeys: listSelectedKeys

    };

    return (
      <Table
        rowSelection={ rowSelection }
        columns={ columns || [{ dataIndex: 'title', title: 'Part' }] }
        dataSource={ filteredItems }
        pagination={ false }
        showHeader={ false }
      />
    );
  }, []);

  return <AntTransfer { ...rest }>{ render }</AntTransfer>;
}
