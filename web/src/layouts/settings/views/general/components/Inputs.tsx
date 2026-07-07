import { Box, Grid, Text } from '@mantine/core';
import Input from './Input';
import { useStore, useSetters } from '../../../../../store';

const Inputs: React.FC = () => {
  const doorName = useStore((state) => state.name);
  const passcode = useStore((state) => state.passcode);
  const autolockInterval = useStore((state) => state.autolock);
  const interactDistance = useStore((state) => state.maxDistance);
  const doorRate = useStore((state) => state.doorRate);

  const setDoorName = useSetters((setter) => setter.setName);
  const setPasscode = useSetters((setter) => setter.setPasscode);
  const setAutolockInterval = useSetters((setter) => setter.setAutolock);
  const setInteractDistance = useSetters((setter) => setter.setMaxDistance);
  const setDoorRate = useSetters((setter) => setter.setDoorRate);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <style>
        {`
          .maula-general-inputs-grid {
            animation: maulaGeneralInputsPop 220ms cubic-bezier(.16, 1.15, .28, 1.35);
          }

          @keyframes maulaGeneralInputsPop {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.97);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      <Box
        sx={{
          width: '100%',
          marginBottom: 14,
          padding: '12px 14px',
          borderRadius: 16,
          background:
            'linear-gradient(180deg, rgba(45,45,45,0.78) 0%, rgba(18,18,18,0.86) 100%)',
          border: '1px solid rgba(255, 205, 110, 0.20)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.06),
            inset 0 -6px 12px rgba(0,0,0,0.28),
            0 8px 18px rgba(0,0,0,0.22),
            0 0 14px rgba(255,196,82,0.08)
          `,
        }}
      >
        <Text
          sx={{
            color: '#f4d08a',
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 0.9,
            textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.48)',
          }}
        >
          Basic Information
        </Text>

        <Text
          sx={{
            marginTop: 3,
            color: 'rgba(255, 224, 168, 0.52)',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          Setup door name, passcode, distance and automatic door behavior.
        </Text>
      </Box>

      <Grid
        className="maula-general-inputs-grid"
        columns={2}
        gutter={14}
        sx={{
          width: '100%',
          margin: 0,
          fontSize: 16,

          '.mantine-Grid-col': {
            paddingTop: 7,
            paddingBottom: 7,
          },
        }}
      >
        <Input
          label="Door name"
          type="text"
          value={doorName || ''}
          setValue={(value: string) => setDoorName(value)}
        />

        <Input
          label="Passcode"
          type="text"
          value={passcode || ''}
          setValue={(value: string) => setPasscode(value)}
        />

        <Input
          label="Autolock Interval"
          type="number"
          value={autolockInterval || 0}
          setValue={(value: number) => setAutolockInterval(value)}
          infoCircle="Time in seconds after which the door will be locked"
        />

        <Input
          label="Interact Distance"
          type="number"
          value={interactDistance || 0}
          setValue={(value: number) => setInteractDistance(value)}
          infoCircle="Controls the distance from which the player can interact with the door"
        />

        <Input
          label="Door Rate"
          type="number"
          span={2}
          value={doorRate || 0}
          setValue={(value: number) => setDoorRate(value)}
          infoCircle="Speed the automatic door will move at"
        />
      </Grid>
    </Box>
  );
};

export default Inputs;