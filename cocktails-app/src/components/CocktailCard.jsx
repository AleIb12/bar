import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const CardContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  position: relative;
  
  &:hover {
    animation: ${bounceAnimation} 1s ease;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    font-size: 1.2rem;
    color: ${props => props.isFavorite ? '#e74c3c' : '#666'};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 4px solid #f0f0f0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Category = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  padding: 0.25rem 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
  display: inline-block;
  margin-right: 0.5rem;
`;

const Instructions = styled.div`
  color: #444;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const CocktailCard = ({ cocktail, translations, isFavorite, onToggleFavorite }) => {
  return (
    <CardContainer>
      <FavoriteButton
        onClick={() => onToggleFavorite(cocktail)}
        isFavorite={isFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </FavoriteButton>
      <CardImage 
        src={cocktail.strDrinkThumb} 
        alt={cocktail.strDrink}
      />
      <CardContent>
        <Title>{cocktail.strDrink}</Title>
        <div>
          <Category>{translations.category}: {cocktail.strCategory}</Category>
          <Category>{translations.glass}: {cocktail.strGlass}</Category>
        </div>
        <Instructions>
          <strong>{translations.instructions}:</strong><br />
          {cocktail.strInstructions}
        </Instructions>
      </CardContent>
    </CardContainer>
  );
};

export default CocktailCard;