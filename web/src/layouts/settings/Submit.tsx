import { ActionIcon, Box, Button, Center, Text, Tooltip } from '@mantine/core';
import { useStore } from '../../store';
import { fetchNui } from '../../utils/fetchNui';
import { HiOutlineClipboardCheck, HiOutlineTrash } from 'react-icons/hi';
import { useClipboard } from '../../store/clipboard';
import { useVisibility } from '../../store/visibility';
import { openConfirmModal } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';

const Submit: React.FC = () => {
  const navigate = useNavigate();

  const clipboard = useClipboard((state) => state.clipboard);
  const setVisible = useVisibility((state) => state.setVisible);

  const currentDoorId = useStore((state) => state.id);
  const currentDoorName = useStore((state) => state.name);

  const handleSubmit = () => {
    const data = { ...useStore.getState() };

    if (data.name === '') data.name = null;
    if (data.passcode === '') data.passcode = null;
    if (data.lockSound === '') data.lockSound = null;
    if (data.unlockSound === '') data.unlockSound = null;

    data.autolock = data.autolock || null;
    data.maxDistance = data.maxDistance || 2;
    data.doorRate = data.doorRate ? data.doorRate + 0.0 : null;
    data.auto = data.auto || null;
    data.lockpick = data.lockpick || null;
    data.hideUi = data.hideUi || null;
    data.holdOpen = data.holdOpen || null;

    if (data.items && data.items.length > 0) {
      const items = [];

      for (let i = 0; i < data.items.length; i++) {
        const itemField = data.items[i];

        if (itemField.name && itemField.name !== '') {
          if (itemField.metadata === '') itemField.metadata = null;
          if (!itemField.remove) itemField.remove = null;

          items.push(itemField);
        }
      }

      // @ts-ignore
      data.items = items;
    }

    if (data.characters && data.characters.length > 0) {
      const charactersArr: Array<string | number> = [];

      for (let i = 0; i < data.characters.length; i++) {
        const characterField = data.characters[i];

        if (characterField && characterField !== '') {
          charactersArr.push(Number.isNaN(+characterField) ? characterField : +characterField);
        }
      }

      // @ts-ignore
      data.characters = charactersArr;
    }

    if (data.groups && data.groups.length > 0) {
      const groupsObj: { [key: string]: number } = {};

      for (let i = 0; i < data.groups.length; i++) {
        const groupField = data.groups[i];

        if (groupField.name && groupField.name !== '') {
          groupsObj[groupField.name] = groupField.grade || 0;
        }
      }

      // @ts-ignore
      data.groups = groupsObj;
    } else {
      // @ts-ignore
      data.groups = null;
    }

    if (data.lockpickDifficulty && data.lockpickDifficulty.length > 0) {
      const lockpickArr = [];

      for (let i = 0; i < data.lockpickDifficulty.length; i++) {
        const field = data.lockpickDifficulty[i];

        if (field !== '') lockpickArr.push(field);
      }

      data.lockpickDifficulty = lockpickArr;
    }

    setVisible(false);
    fetchNui('createDoor', data);
  };

  const handleApplyClipboard = () => {
    if (!clipboard) return;

    useStore.setState(
      {
        name: '',
        passcode: clipboard.passcode,
        autolock: clipboard.autolock,
        items: clipboard.items,
        characters: clipboard.characters,
        groups: clipboard.groups,
        maxDistance: clipboard.maxDistance,
        doorRate: clipboard.doorRate,
        lockSound: clipboard.lockSound,
        unlockSound: clipboard.unlockSound,
        auto: clipboard.auto,
        state: clipboard.state,
        lockpick: clipboard.lockpick,
        hideUi: clipboard.hideUi,
        doors: clipboard.doors,
        lockpickDifficulty: clipboard.lockpickDifficulty,
        holdOpen: clipboard.holdOpen,
      },
      true
    );

    fetchNui('notify', 'Settings applied');
  };

  const handleDeleteDoor = () => {
    openConfirmModal({
      title: 'Confirm deletion',
      centered: true,
      withCloseButton: false,
      children: (
        <Text
          sx={{
            color: 'rgba(255, 232, 184, 0.88)',
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          Are you sure you want to delete
          <Text
            component="span"
            weight={900}
            sx={{
              color: '#f4c56a',
              textShadow: '0 0 10px rgba(255,196,82,0.28)',
            }}
          >
            {` ${currentDoorName || 'this door'}`}
          </Text>
          ?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: {
        color: 'red',
        sx: {
          borderRadius: 12,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        },
      },
      cancelProps: {
        sx: {
          borderRadius: 12,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        },
      },
      onConfirm: () => {
        fetchNui('deleteDoor', currentDoorId);
        navigate('/');
      },
    });
  };

  const actionButtonSx = {
    width: 46,
    height: 46,
    minWidth: 46,
    borderRadius: 16,
    color: '#f4c56a',
    border: '1px solid rgba(255, 205, 110, 0.42)',
    background:
      'linear-gradient(180deg, rgba(58,58,58,0.94) 0%, rgba(22,22,22,0.96) 100%)',
    boxShadow: `
      inset 0 1px 0 rgba(255,255,255,0.08),
      inset 0 -6px 12px rgba(0,0,0,0.32),
      0 8px 18px rgba(0,0,0,0.28),
      0 0 14px rgba(255, 196, 82, 0.12)
    `,
    transition: 'all 180ms cubic-bezier(.2, .9, .2, 1.15)',

    '&:hover': {
      color: '#ffe1a3',
      transform: 'translateY(-2px) scale(1.05)',
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

    '&:active': {
      transform: 'translateY(2px) scale(0.96)',
    },

    '&:disabled': {
      opacity: 0.35,
      cursor: 'not-allowed',
      color: 'rgba(255, 224, 168, 0.35)',
      borderColor: 'rgba(255, 205, 110, 0.14)',
      background:
        'linear-gradient(180deg, rgba(38,38,38,0.72) 0%, rgba(16,16,16,0.78) 100%)',
    },
  };

  return (
    <Center
      sx={{
        width: '100%',
        gap: 14,
      }}
    >
      <style>
        {`
          .maula-submit-icon {
            filter: drop-shadow(0 0 8px rgba(255, 196, 82, 0.28));
          }
        `}
      </style>

      <Button
        fullWidth
        uppercase
        onClick={handleSubmit}
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

          '&:active': {
            transform: 'translateY(2px) scale(0.98)',
          },
        }}
      >
        Confirm door
      </Button>

      <Tooltip
        label={!clipboard ? 'No door settings copied' : 'Apply copied settings'}
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
              0 0 18px rgba(255, 196, 82, 0.25)
            `,
          },
          arrow: {
            borderColor: 'rgba(255, 205, 110, 0.62)',
          },
        }}
      >
        <Box component="span">
          <ActionIcon
            variant="outline"
            disabled={!clipboard}
            onClick={handleApplyClipboard}
            sx={actionButtonSx}
          >
            <HiOutlineClipboardCheck className="maula-submit-icon" size={22} />
          </ActionIcon>
        </Box>
      </Tooltip>

      <Tooltip
        label={!currentDoorId ? 'No door selected' : 'Delete door'}
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
              0 0 18px rgba(255, 196, 82, 0.25)
            `,
          },
          arrow: {
            borderColor: 'rgba(255, 205, 110, 0.62)',
          },
        }}
      >
        <Box component="span">
          <ActionIcon
            variant="outline"
            disabled={!currentDoorId}
            onClick={handleDeleteDoor}
            sx={{
              ...actionButtonSx,
              color: '#ffb0a0',
              border: '1px solid rgba(255, 120, 90, 0.28)',
              background:
                'linear-gradient(180deg, rgba(58,35,31,0.78) 0%, rgba(25,20,20,0.84) 100%)',

              '&:hover': {
                color: '#ffd3ca',
                transform: 'translateY(-2px) scale(1.05)',
                borderColor: 'rgba(255, 120, 90, 0.52)',
                background:
                  'linear-gradient(180deg, rgba(92,42,34,0.96) 0%, rgba(34,22,20,0.98) 100%)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.10),
                  inset 0 -6px 12px rgba(0,0,0,0.34),
                  0 10px 22px rgba(0,0,0,0.34),
                  0 0 18px rgba(255,100,70,0.20)
                `,
              },

              '&:disabled': {
                opacity: 0.35,
                cursor: 'not-allowed',
                color: 'rgba(255, 176, 160, 0.35)',
                borderColor: 'rgba(255, 120, 90, 0.12)',
                background:
                  'linear-gradient(180deg, rgba(40,30,29,0.62) 0%, rgba(16,16,16,0.76) 100%)',
              },
            }}
          >
            <HiOutlineTrash size={22} />
          </ActionIcon>
        </Box>
      </Tooltip>
    </Center>
  );
};

export default Submit;