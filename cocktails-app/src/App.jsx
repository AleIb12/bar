import { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchBar from './components/SearchBar'
import CocktailCard from './components/CocktailCard'
import LoadingSpinner from './components/LoadingSpinner'
import LanguageSelector from './components/LanguageSelector'
import { translations } from './translations'

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  color: #1a1a1a;
  font-size: 3rem;
  font-weight: 700;
  margin: 2rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  width: 100%;
  min-height: 50vh;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  padding: 1rem;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const NoResultsMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
`;

function App() {
  const [search, setSearch] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const savedFavorites = localStorage.getItem('cocktailFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cocktailFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
      .then(response => response.json())
      .then(data => {
        const fetchDetails = data.drinks.slice(0, 9).map(drink =>
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
            .then(res => res.json())
            .then(detail => {
              const cocktail = detail.drinks[0];
              const instructions = cocktail[`strInstructions${language === 'en' ? '' : language.toUpperCase()}`] 
                || cocktail.strInstructions;
              return { ...cocktail, strInstructions: instructions };
            })
        );
        return Promise.all(fetchDetails);
      })
      .then(detailedCocktails => {
        setCocktails(detailedCocktails);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [language]);

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        .then(response => response.json())
        .then(data => {
          const translatedCocktails = data.drinks?.map(cocktail => ({
            ...cocktail,
            strInstructions: cocktail[`strInstructions${language === 'en' ? '' : language.toUpperCase()}`] 
              || cocktail.strInstructions
          })) || [];
          setCocktails(translatedCocktails);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [search, language]);

  const toggleFavorite = (cocktail) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.idDrink === cocktail.idDrink);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.idDrink !== cocktail.idDrink);
      } else {
        return [...prevFavorites, cocktail];
      }
    });
  };

  const displayedCocktails = showFavorites ? favorites : cocktails;

  return (
    <AppContainer>
      <LanguageSelector 
        currentLanguage={language} 
        onLanguageChange={setLanguage} 
      />
      <SearchBar 
        value={search} 
        onChange={setSearch}
        placeholder={t.searchPlaceholder}
      />
      <MainContent>
        <Title>{t.title}</Title>
        
        <FilterContainer>
          <FilterButton
            active={!showFavorites}
            onClick={() => setShowFavorites(false)}
          >
            {t.showAll}
          </FilterButton>
          <FilterButton
            active={showFavorites}
            onClick={() => setShowFavorites(true)}
          >
            {t.showFavorites}
          </FilterButton>
        </FilterContainer>

        <Grid>
          {loading ? (
            <LoadingSpinner text={t.loading} />
          ) : displayedCocktails.length > 0 ? (
            displayedCocktails.map(cocktail => (
              <CocktailCard 
                key={cocktail.idDrink} 
                cocktail={cocktail}
                translations={t}
                isFavorite={favorites.some(fav => fav.idDrink === cocktail.idDrink)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <NoResultsMessage>
              {showFavorites ? t.noFavorites : t.noResults}
            </NoResultsMessage>
          )}
        </Grid>
      </MainContent>
    </AppContainer>
  );
}

export default App
