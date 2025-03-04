import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const NavBar = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover, &:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.95);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
  font-size: 1.1rem;
  background: transparent;
  color: #333;
  
  &::placeholder {
    color: #999;
    font-weight: 300;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #666;
  margin-right: 12px;
  font-size: 1.2rem;
  opacity: 0.8;
`;

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <NavBar>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </SearchContainer>
    </NavBar>
  );
};

export default SearchBar;