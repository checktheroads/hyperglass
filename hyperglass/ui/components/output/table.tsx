import { Flex } from '@chakra-ui/react';
import { useConfig } from '~/context';
import { Table } from '~/components';
import { Cell } from './cell';

import type { CellProps } from 'react-table';
import type { TColumn, TParsedDataField } from '~/types';
import type { TBGPTable } from './types';

function makeColumns(fields: TParsedDataField[]): TColumn[] {
  return fields.map(pair => {
    const [header, accessor, align] = pair;

    let columnConfig = {
      align,
      accessor,
      hidden: false,
      Header: header,
    } as TColumn;

    if (align === null) {
      columnConfig.hidden = true;
    }

    return columnConfig;
  });
}

export const BGPTable = (props: TBGPTable) => {
  const { children: data, ...rest } = props;
  const { parsed_data_fields } = useConfig();
  const columns = makeColumns(parsed_data_fields);

  return (
    <Flex my={8} maxW={['100%', '100%', '100%', '100%']} w="100%" {...rest}>
      <Table
        columns={columns}
        data={data.routes}
        rowHighlightProp="active"
        cellRender={(d: CellProps<TRouteField>) => <Cell data={d} rawData={data} />}
        bordersHorizontal
        rowHighlightBg="green"
      />
    </Flex>
  );
};