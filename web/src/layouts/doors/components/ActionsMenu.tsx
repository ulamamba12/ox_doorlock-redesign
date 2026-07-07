import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { TbDots, TbSettings, TbTrash } from 'react-icons/tb';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { GiTeleport } from 'react-icons/gi';
import { DoorColumn } from '../../../store/doors';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { convertData } from '../../../utils/convertData';
import { useClipboard } from '../../../store/clipboard';
import { fetchNui } from '../../../utils/fetchNui';
import { openConfirmModal } from '@mantine/modals';
import { CellContext } from '@tanstack/react-table';
import { useVisibility } from '../../../store/visibility';

const ActionsMenu: React.FC<{ data: CellContext<DoorColumn, unknown> }> = ({ data }) => {
  const navigate = useNavigate();
  const setClipboard = useClipboard((state) => state.setClipboard);
  const setVisible = useVisibility((state) => state.setVisible);

  return (
    <>
      <style>
        {`
          .maula-actions-dropdown {
            animation: maulaActionsPop 180ms cubic-bezier(.16, 1.15, .28, 1.35);
          }

          @keyframes maulaActionsPop {
            0% {
              opacity: 0;
              transform: translateY(-8px) scale(0.88);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .maula-actions-item {
            transition: all 160ms cubic-bezier(.2, .9, .2, 1.15);
          }

          .maula-actions-item:hover {
            transform: translateX(3px);
          }
        `}
      </style>

      <Menu
        position="right-start"
        width={220}
        shadow="xl"
        radius={16}
        offset={8}
        withinPortal
        styles={{
          dropdown: {
            padding: 8,
            borderRadius: 18,
            border: '1px solid rgba(255, 205, 110, 0.45)',
            background:
              'linear-gradient(180deg, rgba(48,48,48,0.98) 0%, rgba(18,18,18,0.98) 100%)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.09),
              inset 0 -10px 20px rgba(0,0,0,0.36),
              0 14px 30px rgba(0,0,0,0.52),
              0 0 22px rgba(255, 196, 82, 0.16)
            `,
            overflow: 'hidden',
          },
          item: {
            minHeight: 42,
            borderRadius: 13,
            marginBottom: 5,
            color: 'rgba(255, 232, 184, 0.88)',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 0.35,
            background:
              'linear-gradient(180deg, rgba(42,42,42,0.72) 0%, rgba(24,24,24,0.76) 100%)',
            border: '1px solid rgba(255, 205, 110, 0.12)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.04),
              inset 0 -5px 10px rgba(0,0,0,0.22)
            `,
          },
        }}
      >
        <Menu.Target>
          <Tooltip
            label="Door actions"
            withArrow
            position="bottom"
            offset={10}
            styles={{
              tooltip: {
                borderRadius: 12,
                padding: '8px 11px',
                background:
                  'linear-gradient(180deg, rgba(54,48,34,0.98) 0%, rgba(20,20,20,0.98) 100%)',
                border: '1px solid rgba(255, 205, 110, 0.62)',
                color: '#ffe1a3',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 0.7,
                textTransform: 'uppercase',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.10),
                  0 10px 22px rgba(0,0,0,0.45),
                  0 0 18px rgba(255, 196, 82, 0.25)
                `,
              },
              arrow: {
                borderColor: 'rgba(255, 205, 110, 0.62)',
              },
            }}
          >
            <ActionIcon
              variant="transparent"
              sx={{
                width: 40,
                height: 40,
                borderRadius: 14,
                color: '#f4c56a',
                border: '1px solid rgba(255, 205, 110, 0.42)',
                background:
                  'linear-gradient(180deg, rgba(62,62,62,0.92) 0%, rgba(23,23,23,0.96) 100%)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  inset 0 -5px 10px rgba(0,0,0,0.28),
                  0 7px 16px rgba(0,0,0,0.30),
                  0 0 12px rgba(255, 196, 82, 0.12)
                `,
                transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.15)',

                '&:hover': {
                  transform: 'translateY(-2px) scale(1.05)',
                  color: '#ffe1a3',
                  background:
                    'linear-gradient(180deg, rgba(88,70,38,0.96) 0%, rgba(30,27,20,0.98) 100%)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.13),
                    inset 0 -6px 12px rgba(0,0,0,0.32),
                    0 9px 18px rgba(0,0,0,0.36),
                    0 0 20px rgba(255, 196, 82, 0.26)
                  `,
                },

                '&:active': {
                  transform: 'translateY(1px) scale(0.96)',
                },
              }}
            >
              <TbDots size={24} />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown className="maula-actions-dropdown">
          <Menu.Item
            className="maula-actions-item"
            icon={<TbSettings size={18} color="#f4c56a" />}
            sx={{
              '&:hover': {
                color: '#ffe1a3',
                background:
                  'linear-gradient(180deg, rgba(78,62,34,0.95) 0%, rgba(30,27,20,0.96) 100%)',
                borderColor: 'rgba(255, 205, 110, 0.38)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  0 0 16px rgba(255, 196, 82, 0.18)
                `,
              },
            }}
            onClick={() => {
              useStore.setState(convertData(data.row.original), true);
              navigate('/settings/general');
            }}
          >
            Settings
          </Menu.Item>

          <Menu.Item
            className="maula-actions-item"
            icon={<HiOutlineClipboardCopy size={18} color="#f4c56a" />}
            sx={{
              '&:hover': {
                color: '#ffe1a3',
                background:
                  'linear-gradient(180deg, rgba(78,62,34,0.95) 0%, rgba(30,27,20,0.96) 100%)',
                borderColor: 'rgba(255, 205, 110, 0.38)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  0 0 16px rgba(255, 196, 82, 0.18)
                `,
              },
            }}
            onClick={() => {
              setClipboard(convertData(data.row.original));
              fetchNui('notify', 'Settings copied');
            }}
          >
            Copy settings
          </Menu.Item>

          <Menu.Item
            className="maula-actions-item"
            icon={<GiTeleport size={18} color="#f4c56a" />}
            sx={{
              '&:hover': {
                color: '#ffe1a3',
                background:
                  'linear-gradient(180deg, rgba(78,62,34,0.95) 0%, rgba(30,27,20,0.96) 100%)',
                borderColor: 'rgba(255, 205, 110, 0.38)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  0 0 16px rgba(255, 196, 82, 0.18)
                `,
              },
            }}
            onClick={() => {
              setVisible(false);
              fetchNui('teleportToDoor', data.row.getValue('id'));
            }}
          >
            Teleport to door
          </Menu.Item>

          <Menu.Item
            className="maula-actions-item"
            icon={<TbTrash size={18} color="#ff8f7a" />}
            sx={{
              color: '#ffb0a0',
              border: '1px solid rgba(255, 120, 90, 0.20)',
              background:
                'linear-gradient(180deg, rgba(58,35,31,0.78) 0%, rgba(25,20,20,0.82) 100%)',

              '&:hover': {
                color: '#ffd3ca',
                background:
                  'linear-gradient(180deg, rgba(92,42,34,0.96) 0%, rgba(34,22,20,0.98) 100%)',
                borderColor: 'rgba(255, 120, 90, 0.46)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  0 0 16px rgba(255, 100, 70, 0.18)
                `,
              },
            }}
            onClick={() =>
              openConfirmModal({
                title: 'Confirm deletion',
                centered: true,
                withCloseButton: false,
                children: (
                  <Text
                    sx={{
                      color: 'rgba(255, 232, 184, 0.88)',
                      fontWeight: 700,
                      letterSpacing: 0.3,
                    }}
                  >
                    Are you sure you want to delete
                    <Text
                      component="span"
                      weight={900}
                      sx={{
                        color: '#f4c56a',
                        textShadow: '0 0 10px rgba(255,196,82,0.22)',
                      }}
                    >
                      {` ${data.row.getValue('name')}`}
                    </Text>
                    ?
                  </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                confirmProps: {
                  color: 'red',
                  sx: {
                    borderRadius: 12,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                  },
                },
                cancelProps: {
                  sx: {
                    borderRadius: 12,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                  },
                },
                styles: {
                  modal: {
                    borderRadius: 22,
                    background:
                      'linear-gradient(180deg, rgba(45,45,45,0.98) 0%, rgba(18,18,18,0.98) 100%)',
                    border: '1px solid rgba(255, 205, 110, 0.42)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.09),
                      inset 0 -10px 22px rgba(0,0,0,0.38),
                      0 16px 34px rgba(0,0,0,0.48),
                      0 0 22px rgba(255, 196, 82, 0.16)
                    `,
                  },
                  title: {
                    color: '#f4d08a',
                    fontWeight: 900,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    textShadow: '0 1px 5px rgba(0,0,0,0.55)',
                  },
                  body: {
                    paddingTop: 12,
                  },
                },
                onConfirm: () => {
                  fetchNui('deleteDoor', data.row.getValue('id'));
                },
              })
            }
          >
            Delete door
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ActionsMenu;