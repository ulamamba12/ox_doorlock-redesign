import { Box, Stack, Text } from '@mantine/core';
import Inputs from './components/Inputs';
import Switches from './components/Switches';

const General: React.FC = () => {
  return (
    <Stack
      justify="space-between"
      spacing={14}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          .maula-general-scroll::-webkit-scrollbar {
            width: 9px;
          }

          .maula-general-scroll::-webkit-scrollbar-track {
            background: rgba(12, 12, 12, 0.86);
            border-radius: 20px;
            border: 1px solid rgba(255, 205, 110, 0.12);
            box-shadow: inset 0 0 8px rgba(0,0,0,0.35);
          }

          .maula-general-scroll::-webkit-scrollbar-thumb {
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

          .maula-general-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
              180deg,
              rgba(255, 238, 180, 1),
              rgba(190, 135, 45, 1)
            );
          }
        `}
      </style>

      <Box
        className="maula-general-scroll"
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
            marginBottom: 14,
            padding: '14px 16px',
            borderRadius: 16,
            background:
              'linear-gradient(180deg, rgba(42,42,42,0.84) 0%, rgba(18,18,18,0.90) 100%)',
            border: '1px solid rgba(255, 205, 110, 0.28)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.07),
              inset 0 -6px 12px rgba(0,0,0,0.30),
              0 8px 18px rgba(0,0,0,0.26),
              0 0 16px rgba(255,196,82,0.10)
            `,
          }}
        >
          <Text
            sx={{
              color: '#f4d08a',
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: 'uppercase',
              textShadow: `
                0 1px 0 rgba(255,255,255,0.14),
                0 3px 8px rgba(0,0,0,0.50),
                0 0 12px rgba(255,196,82,0.18)
              `,
            }}
          >
            General Settings
          </Text>

          <Text
            sx={{
              marginTop: 4,
              color: 'rgba(255, 224, 168, 0.58)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
            }}
          >
            Configure basic doorlock information, distance, passcode, and main behavior.
          </Text>
        </Box>

        <Box
          sx={{
            width: '100%',
            padding: 14,
            borderRadius: 18,
            background:
              'linear-gradient(180deg, rgba(42,42,42,0.72) 0%, rgba(18,18,18,0.82) 100%)',
            border: '1px solid rgba(255, 205, 110, 0.22)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.05),
              inset 0 -6px 12px rgba(0,0,0,0.28),
              0 8px 18px rgba(0,0,0,0.22),
              0 0 14px rgba(255,196,82,0.08)
            `,
          }}
        >
          <Inputs />
        </Box>

        <Box
          sx={{
            width: '100%',
            marginTop: 14,
            padding: 14,
            borderRadius: 18,
            background:
              'linear-gradient(180deg, rgba(42,42,42,0.72) 0%, rgba(18,18,18,0.82) 100%)',
            border: '1px solid rgba(255, 205, 110, 0.22)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.05),
              inset 0 -6px 12px rgba(0,0,0,0.28),
              0 8px 18px rgba(0,0,0,0.22),
              0 0 14px rgba(255,196,82,0.08)
            `,
          }}
        >
          <Switches />
        </Box>
      </Box>
    </Stack>
  );
};

export default General;