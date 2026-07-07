import React from 'react';
import { Box, Select, Stack, Text } from '@mantine/core';
import { TbLock, TbLockOpen, TbVolume } from 'react-icons/tb';
import { useSetters, useStore } from '../../../../store';

const Sound: React.FC = () => {
  const sounds = useSetters((state) => state.sounds);
  const lockSound = useStore((state) => state.lockSound);
  const unlockSound = useStore((state) => state.unlockSound);
  const setLockSound = useSetters((setter) => setter.setLockSound);
  const setUnlockSound = useSetters((setter) => setter.setUnlockSound);

  const selectStyles = {
    label: {
      color: '#f4d08a',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      textShadow: '0 1px 4px rgba(0,0,0,0.45)',
      marginBottom: 6,
    },

    input: {
      height: 44,
      borderRadius: 14,
      border: '1px solid rgba(255, 205, 110, 0.36)',
      background:
        'linear-gradient(180deg, rgba(17,17,17,0.98) 0%, rgba(8,8,8,0.98) 100%)',
      color: '#f5d89a',
      fontSize: 13,
      fontWeight: 800,
      letterSpacing: 0.4,
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.06),
        inset 0 -5px 10px rgba(0,0,0,0.34),
        0 6px 14px rgba(0,0,0,0.28)
      `,
      transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.12)',

      '&::placeholder': {
        color: 'rgba(255, 224, 168, 0.42)',
        fontWeight: 700,
      },

      '&:hover': {
        borderColor: 'rgba(255, 214, 140, 0.54)',
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.07),
          inset 0 -5px 10px rgba(0,0,0,0.34),
          0 8px 18px rgba(0,0,0,0.30),
          0 0 16px rgba(255,196,82,0.14)
        `,
      },

      '&:focus': {
        borderColor: 'rgba(255, 214, 140, 0.78)',
        background:
          'linear-gradient(180deg, rgba(28,24,16,0.98) 0%, rgba(8,8,8,0.98) 100%)',
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.08),
          inset 0 -5px 10px rgba(0,0,0,0.36),
          0 8px 18px rgba(0,0,0,0.32),
          0 0 20px rgba(255,196,82,0.24)
        `,
      },
    },

    icon: {
      color: '#f4c56a',
    },

    rightSection: {
      color: '#f4c56a',
    },

    dropdown: {
      zIndex: 99999,
      borderRadius: 14,
      border: '1px solid rgba(255, 205, 110, 0.62)',
      background: 'rgb(12, 12, 12)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.08),
        inset 0 -8px 16px rgba(0,0,0,0.46),
        0 18px 34px rgba(0,0,0,0.78),
        0 0 24px rgba(255,196,82,0.24)
      `,
      overflow: 'hidden',
      backdropFilter: 'none',
    },

    itemsWrapper: {
      background: 'rgb(12, 12, 12)',
      padding: 6,
    },

    item: {
      minHeight: 34,
      color: '#f5d89a',
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.4,
      borderRadius: 10,
      backgroundColor: 'rgb(12, 12, 12)',

      '&[data-hovered]': {
        background:
          'linear-gradient(180deg, rgba(88,70,38,1) 0%, rgba(30,27,20,1) 100%)',
        color: '#ffe1a3',
      },

      '&[data-selected]': {
        background:
          'linear-gradient(180deg, rgba(255,205,110,0.96) 0%, rgba(145,94,25,0.98) 100%)',
        color: '#151515',
        fontWeight: 900,
      },
    },

    nothingFound: {
      color: 'rgba(255, 224, 168, 0.60)',
      fontSize: 12,
      fontWeight: 800,
      background: 'rgb(12, 12, 12)',
    },
  } as any;

  const SoundSelect = ({
    label,
    value,
    onChange,
    icon,
  }: {
    label: string;
    value: string;
    onChange: (value: string | null) => void;
    icon: React.ReactNode;
  }) => (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        padding: 12,
        borderRadius: 18,
        background:
          'linear-gradient(180deg, rgba(42,42,42,0.92) 0%, rgba(18,18,18,0.96) 100%)',
        border: '1px solid rgba(255, 205, 110, 0.28)',
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.06),
          inset 0 -6px 12px rgba(0,0,0,0.34),
          0 8px 18px rgba(0,0,0,0.30),
          0 0 14px rgba(255,196,82,0.10)
        `,
        transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.15)',

        '&:hover': {
          transform: 'translateY(-1px)',
          borderColor: 'rgba(255, 205, 110, 0.44)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -6px 12px rgba(0,0,0,0.36),
            0 10px 22px rgba(0,0,0,0.34),
            0 0 18px rgba(255,196,82,0.15)
          `,
        },
      }}
    >
      <Select
        data={sounds}
        label={label}
        value={value || ''}
        searchable
        clearable
        nothingFound="No such sound"
        placeholder="Select sound"
        icon={icon}
        onChange={onChange}
        withinPortal
        zIndex={99999}
        maxDropdownHeight={150}
        styles={selectStyles}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        paddingRight: 4,
      }}
    >
      <style>
        {`
          .maula-sound-page {
            animation: maulaSoundPop 220ms cubic-bezier(.16, 1.15, .28, 1.35);
          }

          @keyframes maulaSoundPop {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.97);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .mantine-Select-dropdown {
            z-index: 99999 !important;
            background: rgb(12, 12, 12) !important;
            backdrop-filter: none !important;
          }

          .mantine-Select-item {
            background-color: rgb(12, 12, 12);
          }
        `}
      </style>

      <Stack className="maula-sound-page" spacing={14}>
        <Box
          sx={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 16,
            background:
              'linear-gradient(180deg, rgba(42,42,42,0.86) 0%, rgba(18,18,18,0.94) 100%)',
            border: '1px solid rgba(255, 205, 110, 0.30)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.07),
              inset 0 -6px 12px rgba(0,0,0,0.32),
              0 8px 18px rgba(0,0,0,0.28),
              0 0 16px rgba(255,196,82,0.12)
            `,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 205, 110, 0.38)',
                background:
                  'linear-gradient(180deg, rgba(58,58,58,0.95) 0%, rgba(22,22,22,0.98) 100%)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  inset 0 -5px 10px rgba(0,0,0,0.30),
                  0 6px 14px rgba(0,0,0,0.26),
                  0 0 12px rgba(255,196,82,0.12)
                `,
              }}
            >
              <TbVolume
                size={22}
                color="#f4c56a"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255,196,82,0.30))',
                }}
              />
            </Box>

            <Box>
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
                Doorlock Sound
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
                Select custom lock and unlock sounds for this door.
              </Text>
            </Box>
          </Box>
        </Box>

        <SoundSelect
          label="Lock sound"
          value={lockSound || ''}
          onChange={(value) => setLockSound(value)}
          icon={<TbLock size={18} />}
        />

        <SoundSelect
          label="Unlock sound"
          value={unlockSound || ''}
          onChange={(value) => setUnlockSound(value)}
          icon={<TbLockOpen size={18} />}
        />
      </Stack>
    </Box>
  );
};

export default Sound;