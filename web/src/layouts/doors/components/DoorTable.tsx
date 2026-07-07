import {
  Table,
  UnstyledButton,
  Text,
  Group,
  Center,
  Stack,
  Pagination,
  Box,
} from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { TbSelector, TbChevronDown, TbChevronUp, TbSearch } from 'react-icons/tb';
import { useDoors, type DoorColumn } from '../../../store/doors';
import ActionsMenu from './ActionsMenu';

const DoorTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const data = useDoors((state) => state.doors);

  useEffect(() => {
    const handleHeaderSearch = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setSearchValue(customEvent.detail || '');
    };

    window.addEventListener('maula-doorlock-search', handleHeaderSearch);

    return () => {
      window.removeEventListener('maula-doorlock-search', handleHeaderSearch);
    };
  }, []);

  const filteredData = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) return data;

    return data.filter((door) => {
      const id = String(door.id ?? '').toLowerCase();
      const name = String(door.name ?? '').toLowerCase();
      const zone = String(door.zone ?? '').toLowerCase();

      return id.includes(query) || name.includes(query) || zone.includes(query);
    });
  }, [data, searchValue]);

  const columns = useMemo<ColumnDef<DoorColumn>[]>(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'zone',
        header: 'Zone',
        accessorKey: 'zone',
        cell: (info) => info.getValue(),
        enableHiding: false,
      },
      {
        id: 'options-menu',
        header: '',
        cell: (data) => <ActionsMenu data={data} />,
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    initialState: {
      pagination: {
        pageSize: 8,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setCurrentPage(1);
    table.setPageIndex(0);
  }, [searchValue, filteredData.length]);

  useEffect(() => {
    table.setPageIndex(currentPage - 1);
  }, [currentPage, table]);

  return (
    <Stack
      justify="space-between"
      align="stretch"
      spacing={14}
      sx={{
        width: '100%',
        height: '100%',
        padding: '0 0 8px 0',
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          .maula-door-table-scroll::-webkit-scrollbar {
            width: 7px;
          }

          .maula-door-table-scroll::-webkit-scrollbar-track {
            background: rgba(18, 18, 18, 0.72);
            border-radius: 20px;
          }

          .maula-door-table-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(255, 210, 120, 0.85), rgba(150, 103, 34, 0.85));
            border-radius: 20px;
            box-shadow: 0 0 10px rgba(255, 196, 82, 0.25);
          }

          .maula-door-table-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, rgba(255, 226, 150, 0.95), rgba(184, 132, 47, 0.95));
          }
        `}
      </style>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: 0,
          borderRadius: 22,
          padding: 0,
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 24,
            right: 24,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,230,170,0.65), transparent)',
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 210,
            height: 210,
            background: 'radial-gradient(circle, rgba(255,193,77,0.15), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {table.getRowModel().rows.length > 0 ? (
          <Box
            className="maula-door-table-scroll"
            sx={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingRight: 6,
            }}
          >
            <Table
              verticalSpacing={10}
              horizontalSpacing={14}
              sx={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 9px',

                thead: {
                  position: 'sticky',
                  top: 0,
                  zIndex: 5,
                },

                'thead tr': {
                  background:
                    'linear-gradient(180deg, rgba(65,58,42,0.98) 0%, rgba(28,26,22,0.98) 100%)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.08),
                    inset 0 -6px 12px rgba(0,0,0,0.25),
                    0 8px 18px rgba(0,0,0,0.28)
                  `,
                },

                'thead th': {
                  color: '#f4d08a',
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255, 205, 110, 0.28)',
                  paddingTop: 13,
                  paddingBottom: 13,
                  background: 'transparent',
                  textShadow: '0 1px 4px rgba(0,0,0,0.55)',
                },

                'thead th:first-of-type': {
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                },

                'thead th:last-of-type': {
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  textAlign: 'right',
                },

                tbody: {
                  position: 'relative',
                  zIndex: 2,
                },

                'tbody tr': {
                  background:
                    'linear-gradient(180deg, rgba(42,42,42,0.88) 0%, rgba(23,23,23,0.90) 100%)',
                  borderRadius: 16,
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.05),
                    inset 0 -6px 12px rgba(0,0,0,0.28),
                    0 8px 18px rgba(0,0,0,0.25)
                  `,
                  transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.2)',
                },

                'tbody tr:hover': {
                  transform: 'translateY(-2px) scale(1.006)',
                  background:
                    'linear-gradient(180deg, rgba(65,54,33,0.92) 0%, rgba(28,25,20,0.94) 100%)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.08),
                    inset 0 -6px 12px rgba(0,0,0,0.30),
                    0 10px 22px rgba(0,0,0,0.34),
                    0 0 18px rgba(255, 196, 82, 0.16)
                  `,
                },

                'tbody td': {
                  color: 'rgba(255, 232, 184, 0.88)',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  borderTop: '1px solid rgba(255, 205, 110, 0.14)',
                  borderBottom: '1px solid rgba(0,0,0,0.25)',
                  paddingTop: 13,
                  paddingBottom: 13,
                  textShadow: '0 1px 3px rgba(0,0,0,0.45)',
                },

                'tbody td:first-of-type': {
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                  borderLeft: '1px solid rgba(255, 205, 110, 0.18)',
                  color: '#f4c56a',
                  width: 80,
                },

                'tbody td:last-of-type': {
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  borderRight: '1px solid rgba(255, 205, 110, 0.18)',
                  textAlign: 'right',
                  width: 80,
                },
              }}
            >
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const canSort = header.column.getCanSort();

                      return (
                        <th key={header.id}>
                          {canSort ? (
                            <UnstyledButton
                              onClick={header.column.getToggleSortingHandler()}
                              sx={{
                                width: '100%',
                                color: '#f4d08a',
                                transition: 'all 160ms ease',

                                '&:hover': {
                                  color: '#ffe1a3',
                                  filter: 'drop-shadow(0 0 7px rgba(255, 196, 82, 0.25))',
                                },
                              }}
                            >
                              <Group spacing={7} noWrap>
                                <Text
                                  sx={{
                                    fontSize: 12,
                                    fontWeight: 900,
                                    letterSpacing: 1.2,
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </Text>

                                {header.column.getIsSorted() === 'desc' ? (
                                  <TbChevronDown size={17} />
                                ) : header.column.getIsSorted() === 'asc' ? (
                                  <TbChevronUp size={17} />
                                ) : (
                                  <TbSelector size={17} />
                                )}
                              </Group>
                            </UnstyledButton>
                          ) : (
                            <Text
                              sx={{
                                fontSize: 12,
                                fontWeight: 900,
                                letterSpacing: 1.2,
                                textTransform: 'uppercase',
                                color: '#f4d08a',
                              }}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </Text>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getAllCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        ) : (
          <Center
            sx={{
              height: '100%',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Stack
              align="center"
              spacing={10}
              sx={{
                padding: '34px 44px',
                borderRadius: 20,
                background:
                  'linear-gradient(180deg, rgba(45,45,45,0.86) 0%, rgba(18,18,18,0.90) 100%)',
                border: '1px solid rgba(255, 205, 110, 0.32)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.06),
                  inset 0 -8px 16px rgba(0,0,0,0.32),
                  0 12px 26px rgba(0,0,0,0.35),
                  0 0 18px rgba(255, 196, 82, 0.12)
                `,
              }}
            >
              <TbSearch size={48} color="#f4c56a" />

              <Text
                size="lg"
                sx={{
                  color: '#f4d08a',
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                  textShadow: '0 1px 5px rgba(0,0,0,0.55)',
                }}
              >
                No results found
              </Text>
            </Stack>
          </Center>
        )}
      </Box>

      {table.getPageCount() > 1 && (
        <Center
          sx={{
            width: '100%',
            paddingTop: 6,
            paddingBottom: 4,
          }}
        >
          <Pagination
            page={currentPage}
            total={table.getPageCount()}
            onChange={(page) => setCurrentPage(page)}
            sx={{
              '.mantine-Pagination-item': {
                borderRadius: 12,
                border: '1px solid rgba(255, 205, 110, 0.38)',
                background:
                  'linear-gradient(180deg, rgba(55,55,55,0.95) 0%, rgba(22,22,22,0.96) 100%)',
                color: '#f4d08a',
                fontWeight: 900,
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.07),
                  inset 0 -4px 8px rgba(0,0,0,0.28),
                  0 6px 14px rgba(0,0,0,0.24)
                `,
              },

              '.mantine-Pagination-item[data-active]': {
                background:
                  'linear-gradient(180deg, rgba(255, 205, 110, 0.95) 0%, rgba(145, 94, 25, 0.98) 100%)',
                color: '#161616',
                border: '1px solid rgba(255, 230, 170, 0.85)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.30),
                  inset 0 -5px 10px rgba(0,0,0,0.28),
                  0 0 18px rgba(255, 196, 82, 0.30)
                `,
              },
            }}
          />
        </Center>
      )}
    </Stack>
  );
};

export default DoorTable;