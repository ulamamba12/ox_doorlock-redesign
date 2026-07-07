import { Box, SimpleGrid, Text } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import TooltipSwitch from './TooltipSwitch';

const Switches: React.FC = () => {
  const locked = useStore((state) => state.state);
  const double = useStore((state) => state.doors);
  const automatic = useStore((state) => state.auto);
  const lockpick = useStore((state) => state.lockpick);
  const hideUi = useStore((state) => state.hideUi);
  const holdOpen = useStore((state) => state.holdOpen);

  const toggleCheckbox = useSetters((setter) => setter.toggleCheckbox);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <style>
        {`
          .maula-switches-grid {
            animation: maulaSwitchesPop 220ms cubic-bezier(.16, 1.15, .28, 1.35);
          }

          @keyframes maulaSwitchesPop {
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
          Door Behaviour
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
          Enable or disable door state, double door, automatic movement, lockpick and UI behavior.
        </Text>
      </Box>

      <SimpleGrid
        className="maula-switches-grid"
        cols={2}
        spacing={14}
        verticalSpacing={14}
        sx={{
          width: '100%',
        }}
      >
        <TooltipSwitch
          label="Locked"
          infoCircle="Sets whether the targeting door is locked by default"
          value={locked || false}
          toggle={() => toggleCheckbox('state')}
        />

        <TooltipSwitch
          label="Double"
          infoCircle="Enable if the targeting door is a double door"
          value={double || false}
          toggle={() => toggleCheckbox('doors')}
        />

        <TooltipSwitch
          label="Automatic"
          infoCircle="Enable if the targeting door is moving automatically (Garage, poles, etc...)"
          value={automatic || false}
          toggle={() => toggleCheckbox('auto')}
        />

        <TooltipSwitch
          label="Lockpick"
          infoCircle="Enables the targeting door to be lockpicked. Can define skill check difficulties in Lockpick tab, otherwise uses config defaults"
          value={lockpick || false}
          toggle={() => toggleCheckbox('lockpick')}
        />

        <TooltipSwitch
          label="Hide UI"
          infoCircle="Hides UI indicators for the targeting door"
          value={hideUi || false}
          toggle={() => toggleCheckbox('hideUi')}
        />

        <TooltipSwitch
          label="Hold Open"
          infoCircle="Sets whether the targeting door(s) should stay open while unlocked"
          value={holdOpen || false}
          toggle={() => toggleCheckbox('holdOpen')}
        />
      </SimpleGrid>
    </Box>
  );
};

export default Switches;