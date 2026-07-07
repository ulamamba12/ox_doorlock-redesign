import { Box, Stack, Tabs, Text } from '@mantine/core';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  TbSettings,
  TbBriefcase,
  TbBottle,
  TbBell,
  TbArrowBackUp,
  TbUser,
  TbLock,
} from 'react-icons/tb';
import General from './views/general';
import Characters from './views/characters';
import Groups from './views/groups';
import Items from './views/items';
import Sound from './views/sound';
import Submit from './Submit';
import { useStore } from '../../store';
import Lockpick from './views/lockpick';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lockpick = useStore((state) => state.lockpick);

  const activeTab = location.pathname.replace('/settings/', '') || 'general';

  const tabSx = {
    height: 46,
    borderRadius: 14,
    marginBottom: 8,
    color: 'rgba(255, 232, 184, 0.78)',
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
    border: '1px solid rgba(255, 205, 110, 0.14)',
    background:
      'linear-gradient(180deg, rgba(42,42,42,0.78) 0%, rgba(20,20,20,0.86) 100%)',
    boxShadow: `
      inset 0 1px 0 rgba(255,255,255,0.05),
      inset 0 -5px 10px rgba(0,0,0,0.26),
      0 6px 14px rgba(0,0,0,0.20)
    `,
    transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.15)',

    '&:hover': {
      color: '#ffe1a3',
      transform: 'translateX(4px)',
      borderColor: 'rgba(255, 205, 110, 0.40)',
      background:
        'linear-gradient(180deg, rgba(76,61,35,0.92) 0%, rgba(28,25,20,0.96) 100%)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.09),
        inset 0 -5px 10px rgba(0,0,0,0.30),
        0 8px 18px rgba(0,0,0,0.28),
        0 0 18px rgba(255,196,82,0.16)
      `,
    },

    '&[data-active]': {
      color: '#161616',
      borderColor: 'rgba(255, 230, 170, 0.85)',
      background:
        'linear-gradient(180deg, rgba(255, 205, 110, 0.96) 0%, rgba(145, 94, 25, 0.98) 100%)',
      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.30),
        inset 0 -6px 12px rgba(0,0,0,0.26),
        0 8px 20px rgba(0,0,0,0.30),
        0 0 22px rgba(255,196,82,0.30)
      `,
    },

    '&[data-disabled]': {
      opacity: 0.35,
      cursor: 'not-allowed',
      transform: 'none',
    },
  };

  const iconStyle = {
    filter: 'drop-shadow(0 0 7px rgba(255, 196, 82, 0.24))',
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        overflow: 'visible',
        background: 'transparent',
        perspective: 1200,
      }}
    >
      <style>
        {`
          .maula-settings-layout {
            animation: maulaSettingsPop 260ms cubic-bezier(.16, 1.15, .28, 1.35);
          }

          @keyframes maulaSettingsPop {
            0% {
              opacity: 0;
              transform: translateY(18px) scale(0.96);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .maula-settings-content::-webkit-scrollbar {
            width: 9px;
          }

          .maula-settings-content::-webkit-scrollbar-track {
            background: rgba(12, 12, 12, 0.86);
            border-radius: 20px;
            border: 1px solid rgba(255, 205, 110, 0.12);
            box-shadow: inset 0 0 8px rgba(0,0,0,0.35);
          }

          .maula-settings-content::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(255, 224, 145, 0.96), rgba(145, 94, 25, 0.96));
            border-radius: 20px;
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.25),
              inset 0 -4px 8px rgba(0,0,0,0.28),
              0 0 14px rgba(255,196,82,0.34);
          }
        `}
      </style>

      <Box
        className="maula-settings-layout"
        sx={{
          width: 780,
          height: 620,
          maxWidth: '94vw',
          maxHeight: '90vh',
          display: 'flex',
          gap: 18,
          padding: 18,
          borderRadius: 26,
          background:
            'linear-gradient(180deg, rgba(35,35,35,0.84) 0%, rgba(12,12,12,0.90) 100%)',
          border: '1px solid rgba(255, 205, 110, 0.34)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -14px 28px rgba(0,0,0,0.36),
            0 18px 38px rgba(0,0,0,0.44),
            0 0 26px rgba(255,194,87,0.12)
          `,
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 28,
            right: 28,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(255,230,170,0.65), transparent)',
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: -90,
            right: -90,
            width: 240,
            height: 240,
            background: 'radial-gradient(circle, rgba(255,193,77,0.16), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Sidebar */}
        <Box
          sx={{
            width: 190,
            flexShrink: 0,
            borderRadius: 22,
            padding: 14,
            background:
              'linear-gradient(180deg, rgba(48,48,48,0.88) 0%, rgba(17,17,17,0.92) 100%)',
            border: '1px solid rgba(255, 205, 110, 0.30)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.07),
              inset 0 -10px 20px rgba(0,0,0,0.34),
              0 12px 26px rgba(0,0,0,0.34),
              0 0 18px rgba(255,196,82,0.10)
            `,
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden',
          }}
        >
          <Text
            sx={{
              color: '#f4d08a',
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              marginBottom: 4,
              textShadow: `
                0 1px 0 rgba(255,255,255,0.16),
                0 3px 8px rgba(0,0,0,0.50),
                0 0 14px rgba(255,196,82,0.18)
              `,
            }}
          >
            Settings
          </Text>

          <Text
            sx={{
              color: 'rgba(255, 224, 168, 0.58)',
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Doorlock Config
          </Text>

          <Tabs
            orientation="vertical"
            value={activeTab}
            onTabChange={(value) => {
              if (!value) return;

              if (value === 'back') {
                navigate('/');
                return;
              }

              navigate(`/settings/${value}`);
            }}
            sx={{
              width: '100%',
              height: 'calc(100% - 54px)',

              '.mantine-Tabs-tabsList': {
                width: '100%',
                border: 'none',
              },

              '.mantine-Tabs-list': {
                width: '100%',
                border: 'none',
              },

              '.mantine-Tabs-tabIcon': {
                marginRight: 9,
              },

              '.mantine-Tabs-tabLabel': {
                fontWeight: 900,
              },
            }}
          >
            <Tabs.List>
              <Tabs.Tab
                value="back"
                icon={<TbArrowBackUp size={20} color="#f4c56a" style={iconStyle} />}
                sx={{
                  ...tabSx,
                  marginBottom: 18,
                  color: '#ffdfb5',
                  borderColor: 'rgba(255, 150, 95, 0.24)',
                  background:
                    'linear-gradient(180deg, rgba(58,35,31,0.76) 0%, rgba(25,20,20,0.84) 100%)',

                  '&:hover': {
                    color: '#ffe1a3',
                    transform: 'translateX(-4px)',
                    borderColor: 'rgba(255, 150, 95, 0.46)',
                    background:
                      'linear-gradient(180deg, rgba(92,42,34,0.92) 0%, rgba(34,22,20,0.96) 100%)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.08),
                      0 0 16px rgba(255,100,70,0.16)
                    `,
                  },
                }}
              >
                Doors
              </Tabs.Tab>

              <Tabs.Tab
                value="general"
                icon={<TbSettings size={20} color="#f4c56a" style={iconStyle} />}
                sx={tabSx}
              >
                General
              </Tabs.Tab>

              <Tabs.Tab
                value="characters"
                icon={<TbUser size={20} color="#f4c56a" style={iconStyle} />}
                sx={tabSx}
              >
                Characters
              </Tabs.Tab>

              <Tabs.Tab
                value="groups"
                icon={<TbBriefcase size={20} color="#f4c56a" style={iconStyle} />}
                sx={tabSx}
              >
                Groups
              </Tabs.Tab>

              <Tabs.Tab
                value="items"
                icon={<TbBottle size={20} color="#f4c56a" style={iconStyle} />}
                sx={tabSx}
              >
                Items
              </Tabs.Tab>

              <Tabs.Tab
                value="lockpick"
                disabled={!lockpick}
                icon={<TbLock size={20} color="#f4c56a" style={iconStyle} />}
                sx={tabSx}
              >
                Lockpick
              </Tabs.Tab>

              <Tabs.Tab
                value="sound"
                icon={<TbBell size={20} color="#f4c56a" style={iconStyle} />}
                sx={tabSx}
              >
                Sound
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Box>

        {/* Content */}
        <Stack
          spacing={14}
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            className="maula-settings-content"
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: 16,
              paddingRight: 20,
              borderRadius: 22,
              background:
                'linear-gradient(180deg, rgba(43,43,43,0.84) 0%, rgba(18,18,18,0.92) 100%)',
              border: '1px solid rgba(255, 205, 110, 0.30)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.07),
                inset 0 -12px 24px rgba(0,0,0,0.34),
                0 14px 30px rgba(0,0,0,0.34),
                0 0 22px rgba(255,194,87,0.10)
              `,
            }}
          >
            <Routes>
              <Route path="/general" element={<General />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/items" element={<Items />} />
              <Route path="/sound" element={<Sound />} />
              <Route path="/lockpick" element={<Lockpick />} />
            </Routes>
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              borderRadius: 20,
              padding: 12,
              background:
                'linear-gradient(180deg, rgba(42,42,42,0.86) 0%, rgba(17,17,17,0.92) 100%)',
              border: '1px solid rgba(255, 205, 110, 0.28)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.07),
                inset 0 -8px 16px rgba(0,0,0,0.32),
                0 10px 22px rgba(0,0,0,0.30),
                0 0 16px rgba(255,196,82,0.10)
              `,
            }}
          >
            <Submit />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Settings;