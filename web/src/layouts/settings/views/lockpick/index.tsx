import { Box, Text } from '@mantine/core';
import { useEffect } from 'react';
import Layout from '../../Layout';
import { useSetters } from '../../../../store';
import LockpickFields from './components/LockpickFields';

const Lockpick: React.FC = () => {
  const setLockpickFields = useSetters((setter) => setter.setLockpickDifficulty);

  useEffect(() => {
    return () => {
      setLockpickFields((prevState) => prevState.filter((field, index) => index === 0 || field !== ''));
    };
  }, [setLockpickFields]);

  return (
    <Layout setter={() => setLockpickFields((prevState) => [...prevState, ''])}>
      <Box
        sx={{
          width: '100%',
          marginBottom: 12,
          padding: '14px 16px',
          borderRadius: 16,
          background:
            'linear-gradient(180deg, rgba(42,42,42,0.84) 0%, rgba(18,18,18,0.90) 100%)',
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
          Add lockpick difficulty presets or custom skillcheck settings for this doorlock.
        </Text>
      </Box>

      <LockpickFields />
    </Layout>
  );
};

export default Lockpick;