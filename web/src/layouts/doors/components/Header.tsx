import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onAddDoor?: () => void;
  onClose?: () => void;
  addRoute?: string;
  closeRoute?: string;
}

const FuturisticLockIcon: React.FC = () => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(255, 203, 96, 0.45))',
      }}
    >
      <path
        d="M7.5 10V7.8C7.5 5.3 9.5 3.4 12 3.4C14.5 3.4 16.5 5.3 16.5 7.8V10"
        stroke="#f4c56a"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.8 10H17.2C18.1 10 18.8 10.7 18.8 11.6V18.2C18.8 19.1 18.1 19.8 17.2 19.8H6.8C5.9 19.8 5.2 19.1 5.2 18.2V11.6C5.2 10.7 5.9 10 6.8 10Z"
        stroke="#f4c56a"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 14V16.5" stroke="#f4c56a" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="13.4" r="1" fill="#f4c56a" />
    </svg>
  );
};

const SearchIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M10.8 18.1C14.8325 18.1 18.1 14.8325 18.1 10.8C18.1 6.76752 14.8325 3.5 10.8 3.5C6.76752 3.5 3.5 6.76752 3.5 10.8C3.5 14.8325 6.76752 18.1 10.8 18.1Z"
      stroke="rgba(255, 214, 140, 0.85)"
      strokeWidth="1.8"
    />
    <path
      d="M16.4 16.4L20.5 20.5"
      stroke="rgba(255, 214, 140, 0.85)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19" stroke="#f4c56a" strokeWidth="2.3" strokeLinecap="round" />
    <path d="M5 12H19" stroke="#f4c56a" strokeWidth="2.3" strokeLinecap="round" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M6.5 6.5L17.5 17.5" stroke="#f4c56a" strokeWidth="2.1" strokeLinecap="round" />
    <path d="M17.5 6.5L6.5 17.5" stroke="#f4c56a" strokeWidth="2.1" strokeLinecap="round" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({
  searchValue,
  onSearchChange,
  onAddDoor,
  onClose,
  addRoute = '/settings/general',
}) => {
  const navigate = useNavigate();

  const [localSearch, setLocalSearch] = useState('');
  const [showAddTooltip, setShowAddTooltip] = useState(false);
  const [hoverAdd, setHoverAdd] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);

  const value = searchValue ?? localSearch;

  const handleSearch = (newValue: string) => {
  const query = newValue ?? '';

  setLocalSearch(query);
  onSearchChange?.(query);

  window.dispatchEvent(
    new CustomEvent('maula-doorlock-search', {
      detail: query,
    })
  );
};

  const handleAddDoor = () => {
    if (onAddDoor) {
      onAddDoor();
      return;
    }

    navigate(addRoute);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    try {
      const resource =
        typeof window !== 'undefined' && (window as any).GetParentResourceName
          ? (window as any).GetParentResourceName()
          : 'ox_doorlock';

      fetch(`https://${resource}/exit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({}),
      }).catch(() => {});
    } catch {
      // Browser preview fallback
    }

    const root = document.getElementById('root');

    if (root) {
      root.style.display = 'none';
    }
  };

  return (
    <div
      style={{
        width: '100%',
        marginBottom: '22px',
        position: 'relative',
        zIndex: 20,
        overflow: 'visible',
      }}
    >
      <style>
        {`
          .maula-doorlock-search::placeholder {
            color: rgba(255, 224, 168, 0.42);
          }

          .maula-header-action:active {
            transform: translateY(2px) scale(0.96) !important;
          }
        `}
      </style>

      <div
        style={{
          width: '100%',
          borderRadius: '24px',
          padding: '16px',
          background:
            'linear-gradient(180deg, rgba(47,47,47,0.96) 0%, rgba(24,24,24,0.96) 100%)',
          border: '1px solid rgba(255, 205, 110, 0.48)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.09),
            inset 0 -10px 22px rgba(0,0,0,0.38),
            0 14px 30px rgba(0,0,0,0.45),
            0 0 24px rgba(255, 194, 87, 0.14)
          `,
          overflow: 'visible',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '28px',
            right: '28px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,230,170,0.75), transparent)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '-55px',
            right: '-65px',
            width: '210px',
            height: '210px',
            background: 'radial-gradient(circle, rgba(255,193,77,0.18), transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: '66px',
              height: '66px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '18px',
              background:
                'linear-gradient(180deg, rgba(72,72,72,0.95) 0%, rgba(32,32,32,0.98) 100%)',
              border: '1px solid rgba(255, 205, 110, 0.45)',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.10),
                inset 0 -7px 14px rgba(0,0,0,0.35),
                0 8px 18px rgba(0,0,0,0.38),
                0 0 16px rgba(255, 196, 82, 0.18)
              `,
              clipPath:
                'polygon(18% 0%, 82% 0%, 100% 18%, 100% 82%, 82% 100%, 18% 100%, 0% 82%, 0% 18%)',
              filter: 'drop-shadow(0 0 8px rgba(255, 203, 96, 0.22))',
            }}
          >
            <FuturisticLockIcon />
          </div>

          <div
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: '29px',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '2.8px',
                textTransform: 'uppercase',
                color: '#f4d08a',
                textShadow: `
                  0 1px 0 rgba(255,255,255,0.18),
                  0 3px 8px rgba(0,0,0,0.55),
                  0 0 14px rgba(255, 196, 82, 0.18)
                `,
                whiteSpace: 'nowrap',
              }}
            >
              OX DOORLOCK
            </div>

            <div
              style={{
                marginTop: '7px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'rgba(255, 224, 168, 0.74)',
                textShadow: '0 1px 4px rgba(0,0,0,0.45)',
                whiteSpace: 'nowrap',
              }}
            >
              Redesign By Maula-Store
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              flexShrink: 0,
              overflow: 'visible',
              zIndex: 100,
            }}
            onMouseEnter={() => {
              setShowAddTooltip(true);
              setHoverAdd(true);
            }}
            onMouseLeave={() => {
              setShowAddTooltip(false);
              setHoverAdd(false);
            }}
            onFocus={() => setShowAddTooltip(true)}
            onBlur={() => setShowAddTooltip(false)}
          >
            <button
              className="maula-header-action"
              type="button"
              onClick={handleAddDoor}
              title="Add New Doorlock"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 205, 110, 0.55)',
                background: hoverAdd
                  ? 'linear-gradient(180deg, rgba(95,76,40,0.98) 0%, rgba(34,30,22,0.98) 100%)'
                  : 'linear-gradient(180deg, rgba(70,70,70,0.96) 0%, rgba(28,28,28,0.98) 100%)',
                boxShadow: hoverAdd
                  ? `
                    inset 0 1px 0 rgba(255,255,255,0.14),
                    inset 0 -6px 12px rgba(0,0,0,0.36),
                    0 10px 22px rgba(0,0,0,0.36),
                    0 0 22px rgba(255, 196, 82, 0.30)
                  `
                  : `
                    inset 0 1px 0 rgba(255,255,255,0.10),
                    inset 0 -6px 12px rgba(0,0,0,0.35),
                    0 8px 18px rgba(0,0,0,0.32),
                    0 0 14px rgba(255, 196, 82, 0.15)
                  `,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 180ms cubic-bezier(.2, .9, .2, 1.2)',
                transform: hoverAdd ? 'translateY(-1px) scale(1.04)' : 'translateY(0) scale(1)',
              }}
            >
              <PlusIcon />
            </button>

            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                left: '50%',
                transform: showAddTooltip
                  ? 'translateX(-50%) translateY(-10px) scale(1)'
                  : 'translateX(-50%) translateY(16px) scale(0.72)',
                opacity: showAddTooltip ? 1 : 0,
                pointerEvents: 'none',
                transition: 'all 220ms cubic-bezier(.16, 1.15, .28, 1.35)',
                padding: '11px 15px',
                borderRadius: '14px',
                background:
                  'linear-gradient(180deg, rgba(54,48,34,0.98) 0%, rgba(20,20,20,0.98) 100%)',
                border: '1px solid rgba(255, 205, 110, 0.70)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.12),
                  inset 0 -5px 12px rgba(0,0,0,0.35),
                  0 12px 26px rgba(0,0,0,0.55),
                  0 0 24px rgba(255, 196, 82, 0.34)
                `,
                color: '#ffe1a3',
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.9px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                zIndex: 9999,
                textShadow: `
                  0 1px 3px rgba(0,0,0,0.65),
                  0 0 10px rgba(255,196,82,0.35)
                `,
              }}
            >
              Add New Doorlock

              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  width: '12px',
                  height: '12px',
                  transform: 'translateX(-50%) rotate(45deg)',
                  background: 'rgba(26,24,20,0.98)',
                  borderRight: '1px solid rgba(255, 205, 110, 0.65)',
                  borderBottom: '1px solid rgba(255, 205, 110, 0.65)',
                  boxShadow: '4px 4px 10px rgba(0,0,0,0.30)',
                }}
              />
            </div>
          </div>

          <button
            className="maula-header-action"
            type="button"
            onClick={handleClose}
            title="Close Menu"
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 205, 110, 0.42)',
              background: hoverClose
                ? 'linear-gradient(180deg, rgba(85,54,42,0.98) 0%, rgba(30,22,20,0.98) 100%)'
                : 'linear-gradient(180deg, rgba(58,58,58,0.96) 0%, rgba(22,22,22,0.98) 100%)',
              boxShadow: hoverClose
                ? `
                  inset 0 1px 0 rgba(255,255,255,0.10),
                  inset 0 -6px 12px rgba(0,0,0,0.34),
                  0 8px 18px rgba(0,0,0,0.34),
                  0 0 16px rgba(255, 120, 80, 0.16)
                `
                : `
                  inset 0 1px 0 rgba(255,255,255,0.08),
                  inset 0 -6px 12px rgba(0,0,0,0.34),
                  0 8px 18px rgba(0,0,0,0.32)
                `,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 180ms cubic-bezier(.2, .9, .2, 1.2)',
              transform: hoverClose ? 'translateY(-1px) scale(1.04)' : 'translateY(0) scale(1)',
              flexShrink: 0,
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <div
          style={{
            marginTop: '16px',
            height: '46px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 205, 110, 0.32)',
            background:
              'linear-gradient(180deg, rgba(25,25,25,0.86) 0%, rgba(14,14,14,0.88) 100%)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.05),
              inset 0 -5px 10px rgba(0,0,0,0.28),
              0 8px 16px rgba(0,0,0,0.25)
            `,
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            gap: '10px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <SearchIcon />

          <input
            className="maula-doorlock-search"
            value={value}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search doorlock name, id, or zone..."
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: '#f5d89a',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.4px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;