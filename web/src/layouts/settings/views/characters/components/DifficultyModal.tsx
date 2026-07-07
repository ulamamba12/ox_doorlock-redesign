import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, NumberInput, Select, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSetters, useStore } from '../../../../../store';

interface Props {
  selectData: { value: string; label: string }[];
  setModal: React.Dispatch<React.SetStateAction<{ opened: boolean; index: number }>>;
  modal: { opened: boolean; index: number };
}

interface FormProps {
  select: string | null;
  areaSize: number | null;
  speedMultiplier: number | null;
}

const inputStyles = {
  label: {
    color: '#f4d08a',
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.7,
    textTransform: 'uppercase' as const,
    textShadow: '0 1px 4px rgba(0,0,0,0.45)',
  },

  description: {
    color: 'rgba(255, 224, 168, 0.52)',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.3,
  },

  input: {
    height: 44,
    borderRadius: 14,
    border: '1px solid rgba(255, 205, 110, 0.32)',
    background:
      'linear-gradient(180deg, rgba(25,25,25,0.88) 0%, rgba(14,14,14,0.92) 100%)',
    color: '#f5d89a',
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 0.4,
    boxShadow: `
      inset 0 1px 0 rgba(255,255,255,0.05),
      inset 0 -5px 10px rgba(0,0,0,0.28),
      0 6px 14px rgba(0,0,0,0.22)
    `,
    transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.12)',

    '&:focus': {
      borderColor: 'rgba(255, 214, 140, 0.72)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.07),
        inset 0 -5px 10px rgba(0,0,0,0.30),
        0 8px 18px rgba(0,0,0,0.28),
        0 0 18px rgba(255,196,82,0.22)
      `,
    },

    '&:disabled': {
      opacity: 0.45,
      color: 'rgba(255, 224, 168, 0.40)',
      background:
        'linear-gradient(180deg, rgba(30,30,30,0.62) 0%, rgba(12,12,12,0.72) 100%)',
      borderColor: 'rgba(255, 205, 110, 0.14)',
    },
  },

  error: {
    color: '#ffb0a0',
    fontWeight: 800,
    letterSpacing: 0.3,
  },
};

const DifficultyModal: React.FC<Props> = ({ selectData, setModal, modal }) => {
  const [select, setSelect] = useState<string | null>(null);

  const lockpickDifficulty = useStore((store) => store.lockpickDifficulty);
  const setLockpickDifficulty = useSetters((setter) => setter.setLockpickDifficulty);

  const lockpickData = useMemo(() => {
    return lockpickDifficulty[modal.index];
  }, [modal.index, lockpickDifficulty]);

  const form = useForm<FormProps>({
    initialValues: {
      select: null,
      areaSize: null,
      speedMultiplier: null,
    },

    validate: {
      select: (value) => (value === null ? 'Difficulty is required' : null),
      areaSize: (value, values) =>
        value === null && values.select === 'custom' ? 'Area size is required' : null,
      speedMultiplier: (value, values) =>
        value === null && values.select === 'custom' ? 'Speed multiplier is required' : null,
    },
  });

  useEffect(() => {
    const nextSelect = typeof lockpickData === 'string' ? lockpickData : 'custom';

    setSelect(nextSelect);

    form.setValues({
      select: nextSelect,
      areaSize: typeof lockpickData === 'object' ? lockpickData.areaSize : null,
      speedMultiplier: typeof lockpickData === 'object' ? lockpickData.speedMultiplier : null,
    });
  }, [lockpickData]);

  useEffect(() => {
    form.setFieldValue('select', select);
  }, [select]);

  const handleSubmit = (values: FormProps) => {
    const data =
      values.select === 'custom'
        ? {
            areaSize: values.areaSize,
            speedMultiplier: values.speedMultiplier,
          }
        : values.select;

    if (!data) return;

    setModal((modal) => ({
      ...modal,
      opened: false,
    }));

    setLockpickDifficulty((prevState) => {
      const array = [...prevState];

      // @ts-ignore
      array[modal.index] = data;

      return array;
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <style>
        {`
          .maula-difficulty-modal input::placeholder {
            color: rgba(255, 224, 168, 0.42) !important;
            font-weight: 700;
          }

          .maula-difficulty-confirm:active {
            transform: translateY(2px) scale(0.98) !important;
          }
        `}
      </style>

      <Stack
        className="maula-difficulty-modal"
        spacing={14}
        sx={{
          width: '100%',
          padding: 4,
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 16,
            background:
              'linear-gradient(180deg, rgba(42,42,42,0.86) 0%, rgba(18,18,18,0.92) 100%)',
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
            Lockpick Difficulty
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
            Select preset difficulty or create custom skillcheck behavior.
          </Text>
        </Box>

        <Select
          data={selectData}
          placeholder="Difficulty"
          {...form.getInputProps('select')}
          value={select}
          onChange={setSelect}
          required
          styles={{
            ...inputStyles,
            dropdown: {
              borderRadius: 16,
              border: '1px solid rgba(255, 205, 110, 0.42)',
              background:
                'linear-gradient(180deg, rgba(44,44,44,0.98) 0%, rgba(16,16,16,0.98) 100%)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.08),
                0 12px 26px rgba(0,0,0,0.46),
                0 0 18px rgba(255,196,82,0.14)
              `,
            },
            item: {
              borderRadius: 12,
              color: 'rgba(255, 232, 184, 0.90)',
              fontWeight: 800,

              '&[data-selected]': {
                background:
                  'linear-gradient(180deg, rgba(255, 205, 110, 0.95) 0%, rgba(145, 94, 25, 0.98) 100%)',
                color: '#161616',
              },

              '&[data-hovered]': {
                background:
                  'linear-gradient(180deg, rgba(78,62,34,0.95) 0%, rgba(30,27,20,0.96) 100%)',
                color: '#ffe1a3',
              },
            },
          }}
        />

        <NumberInput
          label="Area size"
          description="Skill check area size in degrees"
          disabled={select !== 'custom'}
          max={360}
          hideControls
          required={select === 'custom'}
          {...form.getInputProps('areaSize')}
          styles={inputStyles}
        />

        <NumberInput
          label="Speed multiplier"
          description="Number the indicator speed will be multiplied by"
          disabled={select !== 'custom'}
          hideControls
          precision={2}
          required={select === 'custom'}
          {...form.getInputProps('speedMultiplier')}
          styles={inputStyles}
        />

        <Button
          className="maula-difficulty-confirm"
          type="submit"
          uppercase
          sx={{
            height: 46,
            marginTop: 4,
            borderRadius: 16,
            border: '1px solid rgba(255, 230, 170, 0.70)',
            background:
              'linear-gradient(180deg, rgba(255, 205, 110, 0.95) 0%, rgba(145, 94, 25, 0.98) 100%)',
            color: '#161616',
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 1,
            textShadow: '0 1px 0 rgba(255,255,255,0.28)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.30),
              inset 0 -7px 14px rgba(0,0,0,0.30),
              0 10px 22px rgba(0,0,0,0.32),
              0 0 22px rgba(255,196,82,0.24)
            `,
            transition: 'all 180ms cubic-bezier(.2, .9, .2, 1.15)',

            '&:hover': {
              transform: 'translateY(-2px) scale(1.01)',
              background:
                'linear-gradient(180deg, rgba(255, 226, 150, 1) 0%, rgba(174, 116, 32, 1) 100%)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.38),
                inset 0 -7px 14px rgba(0,0,0,0.32),
                0 12px 26px rgba(0,0,0,0.36),
                0 0 28px rgba(255,196,82,0.36)
              `,
            },
          }}
        >
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default DifficultyModal;