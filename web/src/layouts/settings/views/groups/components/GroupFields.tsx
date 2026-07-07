import React from 'react';
import { ActionIcon, Box, Group, NumberInput, Text, TextInput, Tooltip } from '@mantine/core';
import { TbBriefcase, TbTrash } from 'react-icons/tb';
import { useStore, useSetters } from '../../../../../store';

const GroupFields: React.FC = () => {
  const groups = useStore((state) => state.groups);
  const setGroups = useSetters((setter) => setter.setGroups);

  const handleChange = (
    value: string | number | null | undefined,
    index: number,
    property: 'name' | 'grade'
  ) => {
    setGroups((prevState) => {
      return prevState.map((item, indx) => (index === indx ? { ...item, [property]: value } : item));
    });
  };

  const handleRowDelete = (index: number) => {
    setGroups((prevState) => {
      if (prevState.length <= 1) return [{ name: '', grade: null }];
      return prevState.filter((_obj, indx) => indx !== index);
    });
  };

  const inputStyles = {
    input: {
      height: 42,
      borderRadius: 14,
      border: '1px solid rgba(255, 205, 110, 0.30)',
      background:
        'linear-gradient(180deg, rgba(25,25,25,0.86) 0%, rgba(14,14,14,0.90) 100%)',
      color: '#f5d89a',
      fontSize: 13,
      fontWeight: 800,
      letterSpacing: 0.4,
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.05),
        inset 0 -5px 10px rgba(0,0,0,0.28),
        0 6px 14px rgba(0,0,0,0.20)
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
  };

  return (
    <>
      <style>
        {`
          .maula-group-delete:active {
            transform: translateY(2px) scale(0.94) !important;
          }
        `}
      </style>

      {groups.map((field, index) => {
        const canDelete = groups.length > 1;

        return (
          <Box
            key={`group-field-${index}`}
            sx={{
              width: '100%',
              marginTop: index === 0 ? 0 : 12,
              padding: 12,
              borderRadius: 18,
              background:
                'linear-gradient(180deg, rgba(42,42,42,0.84) 0%, rgba(18,18,18,0.90) 100%)',
              border: '1px solid rgba(255, 205, 110, 0.24)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.06),
                inset 0 -6px 12px rgba(0,0,0,0.30),
                0 8px 18px rgba(0,0,0,0.24),
                0 0 14px rgba(255,196,82,0.08)
              `,
              transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.15)',

              '&:hover': {
                transform: 'translateY(-1px)',
                borderColor: 'rgba(255, 205, 110, 0.42)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  inset 0 -6px 12px rgba(0,0,0,0.32),
                  0 10px 22px rgba(0,0,0,0.30),
                  0 0 18px rgba(255,196,82,0.14)
                `,
              },
            }}
          >
            <Group position="apart" noWrap spacing={12}>
              <Group spacing={10} noWrap sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    flexShrink: 0,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 205, 110, 0.34)',
                    background:
                      'linear-gradient(180deg, rgba(58,58,58,0.92) 0%, rgba(22,22,22,0.96) 100%)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.08),
                      inset 0 -5px 10px rgba(0,0,0,0.28),
                      0 6px 14px rgba(0,0,0,0.24),
                      0 0 12px rgba(255,196,82,0.10)
                    `,
                  }}
                >
                  <TbBriefcase
                    size={22}
                    color="#f4c56a"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(255,196,82,0.30))',
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Text
                    sx={{
                      marginBottom: 5,
                      color: '#f4d08a',
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: 0.8,
                      textTransform: 'uppercase',
                      textShadow: '0 1px 4px rgba(0,0,0,0.45)',
                    }}
                  >
                    Group #{index + 1}
                  </Text>

                  <Group spacing={10} noWrap>
                    <TextInput
                      sx={{ width: '100%' }}
                      placeholder="Group"
                      value={(field.name as string) ?? ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target.value, index, 'name')
                      }
                      styles={inputStyles}
                    />

                    <NumberInput
                      sx={{ width: 120, flexShrink: 0 }}
                      placeholder="Grade"
                      value={typeof field.grade === 'number' ? field.grade : undefined}
                      onChange={(value) => handleChange(value as number | undefined, index, 'grade')}
                      hideControls
                      min={0}
                      styles={inputStyles}
                    />
                  </Group>
                </Box>
              </Group>

              <Tooltip
                label={canDelete ? 'Delete row' : 'At least one row required'}
                withArrow
                arrowSize={10}
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
                <Box component="span">
                  <ActionIcon
                    className="maula-group-delete"
                    disabled={!canDelete}
                    variant="outline"
                    onClick={() => handleRowDelete(index)}
                    sx={{
                      width: 42,
                      height: 42,
                      minWidth: 42,
                      borderRadius: 14,
                      color: '#ffb0a0',
                      border: '1px solid rgba(255, 120, 90, 0.28)',
                      background:
                        'linear-gradient(180deg, rgba(58,35,31,0.78) 0%, rgba(25,20,20,0.84) 100%)',
                      boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.06),
                        inset 0 -5px 10px rgba(0,0,0,0.28),
                        0 6px 14px rgba(0,0,0,0.22)
                      `,
                      transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.15)',

                      '&:hover': {
                        color: '#ffd3ca',
                        transform: 'translateY(-2px) scale(1.05)',
                        borderColor: 'rgba(255, 120, 90, 0.52)',
                        background:
                          'linear-gradient(180deg, rgba(92,42,34,0.96) 0%, rgba(34,22,20,0.98) 100%)',
                        boxShadow: `
                          inset 0 1px 0 rgba(255,255,255,0.10),
                          inset 0 -6px 12px rgba(0,0,0,0.34),
                          0 10px 22px rgba(0,0,0,0.32),
                          0 0 18px rgba(255,100,70,0.20)
                        `,
                      },

                      '&:disabled': {
                        opacity: 0.35,
                        cursor: 'not-allowed',
                        color: 'rgba(255,176,160,0.35)',
                        borderColor: 'rgba(255,120,90,0.12)',
                        background:
                          'linear-gradient(180deg, rgba(40,30,29,0.62) 0%, rgba(16,16,16,0.76) 100%)',
                      },
                    }}
                  >
                    <TbTrash size={22} />
                  </ActionIcon>
                </Box>
              </Tooltip>
            </Group>
          </Box>
        );
      })}
    </>
  );
};

export default GroupFields;