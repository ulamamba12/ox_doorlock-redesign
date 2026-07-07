import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { debugData } from './utils/debugData';
import { MantineProvider } from '@mantine/core';
import { customTheme } from './theme';
import { isEnvBrowser } from './utils/misc';
import { HashRouter } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';
import { DoorColumn } from './store/doors';

const previewDoors: DoorColumn[] = [
  {
    name: 'MRPD Front Door',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 1,
    zone: 'Mission Row',
    characters: ['charid1', 'charid2'],
    groups: {
      police: 0,
      ambulance: 1,
    },
    items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 15.2,
    state: true,
    doors: true,
    auto: true,
    lockpick: true,
    hideUi: true,
    doorRate: null,
    holdOpen: true,
  },
  {
    name: 'MRPD Back Door',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 2,
    zone: 'Mission Row',
    characters: ['charid1', 'charid2'],
    groups: {
      police: 0,
    },
    items: [{ name: 'mrpd_key', metadata: 'lspd_key', remove: true }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 15.2,
    state: true,
    doors: true,
    auto: true,
    lockpick: true,
    hideUi: true,
    doorRate: null,
    holdOpen: true,
  },
  {
    name: 'Hospital Main Door',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 3,
    zone: 'Pillbox',
    characters: ['charid1', 'charid2'],
    groups: {
      ambulance: 0,
    },
    items: [{ name: 'hospital_key', metadata: 'ems_key', remove: false }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 12.5,
    state: true,
    doors: true,
    auto: true,
    lockpick: false,
    hideUi: false,
    doorRate: null,
    holdOpen: false,
  },
  {
    name: 'Bank Vault',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 4,
    zone: 'Pacific Bank',
    characters: ['charid1', 'charid2'],
    groups: {
      police: 2,
    },
    items: [{ name: 'vault_keycard', metadata: 'bank_card', remove: true }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 8.0,
    state: true,
    doors: true,
    auto: true,
    lockpick: true,
    hideUi: false,
    doorRate: null,
    holdOpen: false,
  },
  {
    name: 'Mechanic Garage',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 5,
    zone: 'Bennys',
    characters: ['charid1', 'charid2'],
    groups: {
      mechanic: 0,
    },
    items: [{ name: 'mechanic_key', metadata: 'garage_key', remove: false }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 18.0,
    state: true,
    doors: true,
    auto: true,
    lockpick: true,
    hideUi: false,
    doorRate: null,
    holdOpen: true,
  },
  {
    name: 'Government Office',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 6,
    zone: 'City Hall',
    characters: ['charid1', 'charid2'],
    groups: {
      police: 0,
      gov: 0,
    },
    items: [{ name: 'gov_key', metadata: 'office_key', remove: false }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 12.0,
    state: true,
    doors: true,
    auto: true,
    lockpick: false,
    hideUi: false,
    doorRate: null,
    holdOpen: false,
  },
  {
    name: 'Warehouse Gate',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 7,
    zone: 'Docks',
    characters: ['charid1', 'charid2'],
    groups: {
      police: 1,
    },
    items: [{ name: 'warehouse_key', metadata: 'dock_key', remove: false }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 20.0,
    state: true,
    doors: true,
    auto: true,
    lockpick: true,
    hideUi: false,
    doorRate: null,
    holdOpen: true,
  },
  {
    name: 'Luxury Apartment',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 8,
    zone: 'Eclipse',
    characters: ['charid1', 'charid2'],
    groups: {},
    items: [{ name: 'apartment_key', metadata: 'eclipse_key', remove: false }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 10.0,
    state: true,
    doors: true,
    auto: true,
    lockpick: true,
    hideUi: false,
    doorRate: null,
    holdOpen: false,
  },
  {
    name: 'Jewelry Store',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 9,
    zone: 'Rockford Hills',
    characters: ['charid1', 'charid2'],
    groups: {
      police: 2,
    },
    items: [{ name: 'jewelry_key', metadata: 'store_key', remove: true }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 12.0,
    state: true,
    doors: true,
    auto: true,
    lockpick: true,
    hideUi: false,
    doorRate: null,
    holdOpen: false,
  },
  {
    name: 'Evidence Room',
    passcode: 'Supersecret123',
    autolock: 300,
    id: 10,
    zone: 'Mission Row',
    characters: ['charid1', 'charid2'],
    groups: {
      police: 2,
    },
    items: [{ name: 'evidence_key', metadata: 'pd_key', remove: false }],
    lockpickDifficulty: [],
    lockSound: null,
    unlockSound: null,
    maxDistance: 8.5,
    state: true,
    doors: true,
    auto: true,
    lockpick: false,
    hideUi: false,
    doorRate: null,
    holdOpen: false,
  },
];

debugData<DoorColumn[]>([
  {
    action: 'updateDoorData',
    data: previewDoors,
  },
]);

debugData(
  [
    {
      action: 'setVisible',
      data: undefined,
    },
  ],
  600
);

debugData<string[]>([
  {
    action: 'setSoundFiles',
    data: ['button-remote', 'door-bolt-4', 'metal-locker', 'metallic-creak'],
  },
]);

if (isEnvBrowser()) {
  const root = document.getElementById('root');

  if (root) {
    root.style.background = 'transparent';
    root.style.backgroundImage = 'none';
    root.style.backgroundSize = 'cover';
    root.style.backgroundRepeat = 'no-repeat';
    root.style.backgroundPosition = 'center';
  }

  document.body.style.background = 'transparent';
}

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles theme={customTheme}>
      <ModalsProvider modalProps={{ transition: 'pop', centered: true }}>
        <HashRouter>
          <App />
        </HashRouter>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);