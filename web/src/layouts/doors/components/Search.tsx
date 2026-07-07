import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';

interface SearchProps {
  value?: string;
  onSearch?: (value: string) => void;
  width?: number | string;
}

const Search: React.FC<SearchProps> = ({ value, onSearch, width = '100%' }) => {
  const [localValue, setLocalValue] = useState('');

  const currentValue = value !== undefined ? value : localValue;

  const handleSearch = (text: string) => {
    const query = text ?? '';

    if (value === undefined) {
      setLocalValue(query);
    }

    if (onSearch) {
      onSearch(query);
    }

    window.dispatchEvent(
      new CustomEvent('maula-doorlock-search', {
        detail: query,
      })
    );
  };

  return (
    <TextInput
      value={currentValue}
      onChange={(event) => handleSearch(event.currentTarget.value)}
      placeholder="Search door name, id, or zone..."
      icon={<TbSearch size={18} />}
      sx={{
        width,
      }}
      styles={{
        input: {
          height: 46,
          width: '100%',
          borderRadius: 16,
          border: '1px solid rgba(255, 205, 110, 0.36)',
          background:
            'linear-gradient(180deg, rgba(20,20,20,0.92) 0%, rgba(10,10,10,0.96) 100%)',
          color: '#f5d89a',
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 0.4,
          paddingLeft: 46,
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.06),
            inset 0 -5px 10px rgba(0,0,0,0.34),
            0 6px 14px rgba(0,0,0,0.26),
            0 0 12px rgba(255,196,82,0.10)
          `,
          transition: 'all 170ms cubic-bezier(.2, .9, .2, 1.12)',

          '&::placeholder': {
            color: 'rgba(255, 224, 168, 0.42)',
            fontWeight: 700,
          },

          '&:hover': {
            borderColor: 'rgba(255, 214, 140, 0.54)',
          },

          '&:focus': {
            borderColor: 'rgba(255, 214, 140, 0.78)',
            background:
              'linear-gradient(180deg, rgba(28,24,16,0.98) 0%, rgba(8,8,8,0.98) 100%)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.08),
              inset 0 -5px 10px rgba(0,0,0,0.36),
              0 8px 18px rgba(0,0,0,0.32),
              0 0 20px rgba(255,196,82,0.24)
            `,
          },
        },

        icon: {
          color: '#f4c56a',
          width: 46,
        },
      }}
    />
  );
};

export default Search;