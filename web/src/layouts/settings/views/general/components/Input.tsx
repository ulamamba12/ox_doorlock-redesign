import { Box, Grid, Tooltip, TextInput, NumberInput, ThemeIcon } from '@mantine/core';
import { BsQuestionCircle } from 'react-icons/bs';

interface Props {
  label: string;
  type: 'text' | 'number';
  value?: string | number;
  setValue: (value: any) => void;
  infoCircle?: string;
  span?: number;
}

const inputStyles = {
  label: {
    color: '#f4d08a',
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.7,
    textTransform: 'uppercase' as const,
    textShadow: '0 1px 4px rgba(0,0,0,0.45)',
    marginBottom: 6,
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

    '&::placeholder': {
      color: 'rgba(255, 224, 168, 0.42)',
      fontWeight: 700,
    },

    '&:hover': {
      borderColor: 'rgba(255, 214, 140, 0.50)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.06),
        inset 0 -5px 10px rgba(0,0,0,0.30),
        0 8px 18px rgba(0,0,0,0.26),
        0 0 16px rgba(255,196,82,0.14)
      `,
    },

    '&:focus': {
      borderColor: 'rgba(255, 214, 140, 0.72)',
      background:
        'linear-gradient(180deg, rgba(34,31,24,0.92) 0%, rgba(15,15,15,0.94) 100%)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.07),
        inset 0 -5px 10px rgba(0,0,0,0.30),
        0 8px 18px rgba(0,0,0,0.28),
        0 0 18px rgba(255,196,82,0.22)
      `,
    },
  },

  rightSection: {
    width: 42,
  },
};

const tooltipStyles = {
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
    textTransform: 'uppercase' as const,
    boxShadow: `
      inset 0 1px 0 rgba(255,255,255,0.10),
      0 10px 22px rgba(0,0,0,0.45),
      0 0 18px rgba(255,196,82,0.25)
    `,
  },

  arrow: {
    borderColor: 'rgba(255, 205, 110, 0.62)',
  },
};

const Input: React.FC<Props> = ({ label, type, infoCircle, span, value, setValue }) => {
  const InfoIcon = infoCircle ? (
    <Tooltip
      label={infoCircle}
      withArrow
      arrowSize={10}
      multiline
      width={230}
      position="bottom"
      styles={tooltipStyles}
    >
      <ThemeIcon
        variant="outline"
        radius={12}
        sx={{
          width: 30,
          height: 30,
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
  ) : undefined;

  return (
    <Grid.Col span={span || 1}>
      <Box
        sx={{
          width: '100%',
          padding: 12,
          borderRadius: 18,
          background:
            'linear-gradient(180deg, rgba(42,42,42,0.78) 0%, rgba(18,18,18,0.86) 100%)',
          border: '1px solid rgba(255, 205, 110, 0.20)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -6px 12px rgba(0,0,0,0.28),
            0 7px 16px rgba(0,0,0,0.22),
            0 0 12px rgba(255,196,82,0.08)
          `,
          transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.15)',

          '&:hover': {
            transform: 'translateY(-1px)',
            borderColor: 'rgba(255, 205, 110, 0.36)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.07),
              inset 0 -6px 12px rgba(0,0,0,0.30),
              0 9px 20px rgba(0,0,0,0.28),
              0 0 18px rgba(255,196,82,0.13)
            `,
          },
        }}
      >
        {type === 'text' ? (
          <TextInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label={label}
            placeholder={label}
            rightSection={InfoIcon}
            rightSectionWidth={infoCircle ? 44 : undefined}
            styles={inputStyles}
          />
        ) : (
          <NumberInput
            label={label}
            step={0.1}
            precision={1}
            value={typeof value === 'number' ? value : undefined}
            onChange={(value) => setValue(value as number)}
            hideControls
            placeholder={label}
            rightSection={InfoIcon}
            rightSectionWidth={infoCircle ? 44 : undefined}
            styles={inputStyles}
          />
        )}
      </Box>
    </Grid.Col>
  );
};

export default Input;