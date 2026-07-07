import { Box, Stack } from '@mantine/core';
import Header from './components/Header';
import DoorTable from './components/DoorTable';

const Doors: React.FC = () => {
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
        perspective: 1200,
        background: 'transparent',
      }}
    >
      <style>
        {`
          .maula-doorlock-layout {
            animation: maulaDoorlockLayoutPop 260ms cubic-bezier(.16, 1.15, .28, 1.35);
          }

          @keyframes maulaDoorlockLayoutPop {
            0% {
              opacity: 0;
              transform: translateY(18px) scale(0.96);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      <Stack
        className="maula-doorlock-layout"
        spacing={18}
        sx={{
          width: 780,
          height: 620,
          maxWidth: '94vw',
          maxHeight: '90vh',
          minHeight: 0,
          padding: 0,
          overflow: 'visible',
          background: 'transparent',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: '100%',
            flexShrink: 0,
            overflow: 'visible',
            position: 'relative',
            zIndex: 20,
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
          }}
        >
          <Header />
        </Box>

        {/* Door table wrapper - transparent supaya tidak double container */}
        <Box
          sx={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            position: 'relative',
            zIndex: 10,
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: 0,
            borderRadius: 0,
          }}
        >
          <DoorTable />
        </Box>
      </Stack>
    </Box>
  );
};

export default Doors;