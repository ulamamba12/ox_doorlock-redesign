import React, { useEffect, useMemo } from 'react';
import { Box, Button, Stack, Switch, Text, TextInput, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TbDatabase, TbTrash } from 'react-icons/tb';
import { StringField, useSetters, useStore } from '../../../../../store';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<{ opened: boolean; index: number }>>;
  modal: { opened: boolean; index: number };
}

const ItemsModal: React.FC<Props> = ({ modal, setModal }) => {
  const itemFields = useStore((state) => state.items);
  const setItemFields = useSetters((setter) => setter.setItems);

  const itemData = useMemo(() => {
    return itemFields[modal.index];
  }, [modal.index, itemFields]);

  const form = useForm({
    initialValues: {
      metadata: itemData?.metadata ?? '',
      remove: itemData?.remove ?? false,
    },
  });

  useEffect(() => {
    form.setValues({
      metadata: itemData?.metadata ?? '',
      remove: itemData?.remove ?? false,
    });
  }, [itemData]);

  const handleSubmit = (values: { metadata: StringField; remove: boolean | null }) => {
    setModal((state) => ({ ...state, opened: false }));

    setItemFields((prevState) => {
      return prevState.map((item, index) => {
        if (index === modal.index) {
          return {
            ...item,
            metadata: values.metadata,
            remove: values.remove,
          };
        }

        return item;
      });
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <style>
        {`
          .maula-items-modal-input::placeholder {
            color: rgba(255, 224, 168, 0.42);
            font-weight: 700;
            letter-spacing: 0.4px;
          }

          .maula-items-modal-confirm:active {
            transform: translateY(2px) scale(0.98) !important;
          }
        `}
      </style>

      <Stack spacing={14}>
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
              fontSize: 15,
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
            Item Options
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
            Configure metadata and remove behavior for this item.
          </Text>
        </Box>

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
          }}
        >
          <TextInput
            classNames={{
              input: 'maula-items-modal-input',
            }}
            label="Metadata type"
            placeholder="Metadata type"
            icon={
              <TbDatabase
                size={18}
                style={{
                  color: '#f4c56a',
                  filter: 'drop-shadow(0 0 8px rgba(255,196,82,0.28))',
                }}
              />
            }
            {...form.getInputProps('metadata')}
            styles={{
              label: {
                color: '#f4d08a',
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 0.7,
                textTransform: 'uppercase',
                textShadow: '0 1px 4px rgba(0,0,0,0.45)',
                marginBottom: 6,
              },

              icon: {
                color: '#f4c56a',
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
            }}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            minHeight: 72,
            padding: '12px 14px',
            borderRadius: 18,
            background: form.values.remove
              ? 'linear-gradient(180deg, rgba(72,58,34,0.88) 0%, rgba(24,22,18,0.92) 100%)'
              : 'linear-gradient(180deg, rgba(42,42,42,0.78) 0%, rgba(18,18,18,0.86) 100%)',
            border: form.values.remove
              ? '1px solid rgba(255, 205, 110, 0.48)'
              : '1px solid rgba(255, 205, 110, 0.20)',
            boxShadow: form.values.remove
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Text
                sx={{
                  color: form.values.remove ? '#ffe1a3' : '#f4d08a',
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                  textShadow: form.values.remove
                    ? '0 1px 4px rgba(0,0,0,0.55), 0 0 12px rgba(255,196,82,0.22)'
                    : '0 1px 4px rgba(0,0,0,0.48)',
                }}
              >
                Remove on use
              </Text>

              <Text
                sx={{
                  marginTop: 4,
                  color: form.values.remove
                    ? 'rgba(255, 224, 168, 0.64)'
                    : 'rgba(255, 224, 168, 0.48)',
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 0.45,
                  textTransform: 'uppercase',
                }}
              >
                {form.values.remove ? 'Enabled' : 'Disabled'}
              </Text>
            </Box>

            <Tooltip
              label="Remove item from player inventory after use"
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
              <Switch
                checked={!!form.values.remove}
                onChange={(event) => form.setFieldValue('remove', event.currentTarget.checked)}
                size="md"
                styles={{
                  track: {
                    width: 54,
                    height: 30,
                    cursor: 'pointer',
                    borderRadius: 999,
                    border: form.values.remove
                      ? '1px solid rgba(255, 230, 170, 0.82)'
                      : '1px solid rgba(255, 205, 110, 0.26)',
                    background: form.values.remove
                      ? 'linear-gradient(180deg, rgba(255, 205, 110, 0.95) 0%, rgba(145, 94, 25, 0.98) 100%)'
                      : 'linear-gradient(180deg, rgba(48,48,48,0.95) 0%, rgba(16,16,16,0.96) 100%)',
                    boxShadow: form.values.remove
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
                    border: form.values.remove
                      ? '1px solid rgba(255, 248, 220, 0.95)'
                      : '1px solid rgba(255, 205, 110, 0.34)',
                    background: form.values.remove
                      ? 'linear-gradient(180deg, rgba(255,248,220,1) 0%, rgba(244,197,106,1) 100%)'
                      : 'linear-gradient(180deg, rgba(155,155,155,1) 0%, rgba(70,70,70,1) 100%)',
                    boxShadow: form.values.remove
                      ? `
                        0 0 12px rgba(255,196,82,0.55),
                        inset 0 1px 0 rgba(255,255,255,0.60)
                      `
                      : `
                        0 3px 8px rgba(0,0,0,0.38),
                        inset 0 1px 0 rgba(255,255,255,0.28)
                      `,
                  },
                }}
              />
            </Tooltip>
          </Box>
        </Box>

        <Button
          className="maula-items-modal-confirm"
          uppercase
          type="submit"
          sx={{
            height: 46,
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

export default ItemsModal;