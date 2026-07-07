import React from 'react';
import { Box, Button, Stack, Tooltip } from '@mantine/core';
import { TbPlus } from 'react-icons/tb';

interface Props {
  children: React.ReactNode;
  setter: () => void;
}

const Layout: React.FC<Props> = ({ children, setter }) => {
  return (
    <Stack
      justify="space-between"
      align="stretch"
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          .maula-settings-layout-scroll::-webkit-scrollbar {
            width: 9px;
          }

          .maula-settings-layout-scroll::-webkit-scrollbar-track {
            background: rgba(12, 12, 12, 0.86);
            border-radius: 20px;
            border: 1px solid rgba(255, 205, 110, 0.12);
            box-shadow: inset 0 0 8px rgba(0,0,0,0.35);
          }

          .maula-settings-layout-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(
              180deg,
              rgba(255, 224, 145, 0.96),
              rgba(145, 94, 25, 0.96)
            );
            border-radius: 20px;
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.25),
              inset 0 -4px 8px rgba(0,0,0,0.28),
              0 0 14px rgba(255,196,82,0.34);
          }

          .maula-settings-layout-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              180deg,
              rgba(255, 238, 180, 1),
              rgba(190, 135, 45, 1)
            );
          }

          .maula-add-row-btn:active {
            transform: translateY(2px) scale(0.97) !important;
          }
        `}
      </style>

      <Box
        className="maula-settings-layout-scroll"
        sx={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: 8,
          paddingBottom: 6,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {children}
        </Box>

        <Tooltip
          label="Create a new row"
          withArrow
          arrowSize={10}
          position="bottom"
          transition="pop"
          transitionDuration={180}
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
          <Button
            className="maula-add-row-btn"
            mt={16}
            fullWidth
            variant="subtle"
            onClick={setter}
            sx={{
              height: 48,
              borderRadius: 16,
              border: '1px solid rgba(255, 205, 110, 0.44)',
              background:
                'linear-gradient(180deg, rgba(58,58,58,0.94) 0%, rgba(22,22,22,0.96) 100%)',
              color: '#f4c56a',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -6px 12px rgba(0,0,0,0.32),
                0 8px 18px rgba(0,0,0,0.28),
                0 0 14px rgba(255, 196, 82, 0.12)
              `,
              transition: 'all 180ms cubic-bezier(.2, .9, .2, 1.15)',

              '&:hover': {
                color: '#ffe1a3',
                transform: 'translateY(-2px) scale(1.01)',
                borderColor: 'rgba(255, 224, 145, 0.68)',
                background:
                  'linear-gradient(180deg, rgba(88,70,38,0.96) 0%, rgba(30,27,20,0.98) 100%)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.12),
                  inset 0 -6px 12px rgba(0,0,0,0.34),
                  0 10px 22px rgba(0,0,0,0.34),
                  0 0 22px rgba(255, 196, 82, 0.28)
                `,
              },
            }}
          >
            <TbPlus
              size={26}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 196, 82, 0.35))',
              }}
            />
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Layout;