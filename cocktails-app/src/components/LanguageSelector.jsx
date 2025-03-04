import React from 'react';
import styled from 'styled-components';

const LanguageContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 2rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1000;
`;

const LanguageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const languages = [
  { code: 'en', label: '🇬🇧 EN' },
  { code: 'es', label: '🇪🇸 ES' },
  { code: 'de', label: '🇩🇪 DE' }
];

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <LanguageContainer>
      {languages.map(({ code, label }) => (
        <LanguageButton
          key={code}
          active={currentLanguage === code}
          onClick={() => onLanguageChange(code)}
        >
          {label}
        </LanguageButton>
      ))}
    </LanguageContainer>
  );
};

export default LanguageSelector;