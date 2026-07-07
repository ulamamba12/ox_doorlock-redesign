import { Box, Group, Switch, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { BsQuestionCircle } from 'react-icons/bs';

interface Props {
  label: string;
  infoCircle?: string;
  value: boolean;
  toggle: () => void;
}

const TooltipSwitch: React.FC<Props> = ({ infoCircle, label, value, toggle }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 76,
        padding: '12px 14px',
        borderRadius: 18,
        background: value
          ? 'linear-gradient(180deg, rgba(72,58,34,0.88) 0%, rgba(24,22,18,0.92) 100%)'
          : 'linear-gradient(180deg, rgba(42,42,42,0.78) 0%, rgba(18,18,18,0.86) 100%)',
        border: value
          ? '1px solid rgba(255, 205, 110, 0.48)'
          : '1px solid rgba(255, 205, 110, 0.20)',
        boxShadow: value
          ? `
            inset 0 1px 0 rgba(255,255,255,0.09),
            inset 0 -6px 12px rgba(0,0,0,0.32),
            0 9px 20px rgba(0,0,0,0.28),
            0 0 20px rgba(255,196,82,0.18)
          `
          : `
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -6px 12px rgba(0,0,0,0.28),
            0 7px 16px rgba(0,0,0,0.22),
            0 0 12px rgba(255,196,82,0.08)
          `,
        transition: 'all 180ms cubic-bezier(.2, .9, .2, 1.15)',

        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: value ? 'rgba(255, 224, 145, 0.68)' : 'rgba(255, 205, 110, 0.36)',
          boxShadow: value
            ? `
              inset 0 1px 0 rgba(255,255,255,0.12),
              inset 0 -6px 12px rgba(0,0,0,0.34),
              0 11px 24px rgba(0,0,0,0.34),
              0 0 26px rgba(255,196,82,0.26)
            `
            : `
              inset 0 1px 0 rgba(255,255,255,0.07),
              inset 0 -6px 12px rgba(0,0,0,0.30),
              0 9px 20px rgba(0,0,0,0.28),
              0 0 18px rgba(255,196,82,0.13)
            `,
        },
      }}
    >
      <Group position="apart" align="center" noWrap spacing={12}>
        <Box sx={{ minWidth: 0 }}>
          <Text
            sx={{
              color: value ? '#ffe1a3' : '#f4d08a',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
              textShadow: value
                ? '0 1px 4px rgba(0,0,0,0.55), 0 0 12px rgba(255,196,82,0.22)'
                : '0 1px 4px rgba(0,0,0,0.48)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </Text>

          <Text
            sx={{
              marginTop: 4,
              color: value ? 'rgba(255, 224, 168, 0.64)' : 'rgba(255, 224, 168, 0.48)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.45,
              textTransform: 'uppercase',
            }}
          >
            {value ? 'Enabled' : 'Disabled'}
          </Text>
        </Box>

        <Group spacing={10} noWrap>
          {infoCircle && (
            <Tooltip
              label={infoCircle}
              withArrow
              arrowSize={10}
              multiline
              width={230}
              position="bottom"
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
                    0 0 18px rgba(255,196,82,0.25)
                  `,
                },
                arrow: {
                  borderColor: 'rgba(255, 205, 110, 0.62)',
                },
              }}
            >
              <ThemeIcon
                variant="outline"
                radius={12}
                sx={{
                  width: 32,
                  height: 32,
                  border: '1px solid rgba(255, 205, 110, 0.34)',
                  background:
                    'linear-gradient(180deg, rgba(58,58,58,0.92) 0%, rgba(22,22,22,0.96) 100%)',
                  color: '#f4c56a',
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.07),
                    inset 0 -4px 8px rgba(0,0,0,0.26),
                    0 5px 12px rgba(0,0,0,0.22),
                    0 0 10px rgba(255,196,82,0.12)
                  `,
                  transition: 'all 160ms cubic-bezier(.2, .9, .2, 1.15)',

                  '&:hover': {
                    color: '#ffe1a3',
                    transform: 'translateY(-1px) scale(1.05)',
                    borderColor: 'rgba(255, 224, 145, 0.62)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.10),
                      inset 0 -4px 8px rgba(0,0,0,0.28),
                      0 7px 14px rgba(0,0,0,0.26),
                      0 0 16px rgba(255,196,82,0.22)
                    `,
                  },
                }}
              >
                <BsQuestionCircle size={17} />
              </ThemeIcon>
            </Tooltip>
          )}

          <Switch
            checked={value}
            onChange={toggle}
            size="md"
            styles={{
              root: {
                cursor: 'pointer',
              },

              track: {
                width: 54,
                height: 30,
                cursor: 'pointer',
                borderRadius: 999,
                border: value
                  ? '1px solid rgba(255, 230, 170, 0.82)'
                  : '1px solid rgba(255, 205, 110, 0.26)',
                background: value
                  ? 'linear-gradient(180deg, rgba(255, 205, 110, 0.95) 0%, rgba(145, 94, 25, 0.98) 100%)'
                  : 'linear-gradient(180deg, rgba(48,48,48,0.95) 0%, rgba(16,16,16,0.96) 100%)',
                boxShadow: value
                  ? `
                    inset 0 1px 0 rgba(255,255,255,0.28),
                    inset 0 -5px 10px rgba(0,0,0,0.30),
                    0 0 18px rgba(255,196,82,0.30)
                  `
                  : `
                    inset 0 1px 0 rgba(255,255,255,0.06),
                    inset 0 -5px 10px rgba(0,0,0,0.34),
                    0 6px 14px rgba(0,0,0,0.22)
                  `,
                transition: 'all 180ms cubic-bezier(.2, .9, .2, 1.15)',
              },

              thumb: {
                width: 24,
                height: 24,
                border: value
                  ? '1px solid rgba(255, 248, 220, 0.95)'
                  : '1px solid rgba(255, 205, 110, 0.34)',
                background: value
                  ? 'linear-gradient(180deg, rgba(255,248,220,1) 0%, rgba(244,197,106,1) 100%)'
                  : 'linear-gradient(180deg, rgba(155,155,155,1) 0%, rgba(70,70,70,1) 100%)',
                boxShadow: value
                  ? `
                    0 0 12px rgba(255,196,82,0.55),
                    inset 0 1px 0 rgba(255,255,255,0.60)
                  `
                  : `
                    0 3px 8px rgba(0,0,0,0.38),
                    inset 0 1px 0 rgba(255,255,255,0.28)
                  `,
              },

              input: {
                cursor: 'pointer',
              },
            }}
          />
        </Group>
      </Group>
    </Box>
  );
};

export default TooltipSwitch;