import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { AppDispatch } from 'src/store';
import { getPokemonDataAsync } from 'src/store/pokemon/actions';
import { selectPokemonData, selectStatus } from 'src/store/pokemon/selectors';

import { FullPageLoader } from 'src/components/common/FullPageLoader';

/* eslint-disable-next-line */
export interface HomePageProps {}

const StyledHomePage = styled.div`
  color: pink;
`;

export function HomePage(props: HomePageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonData = useSelector(selectPokemonData);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === APIStatus.IDLE) {
      dispatch(getPokemonDataAsync());
    }
  }, []);

  if (status === APIStatus.PENDING) {
    return <FullPageLoader />;
  }
  return (
    <StyledHomePage>
      <h1>Welcome to HomePage!</h1>

      {pokemonData && (
        <li>
          {pokemonData.map(({ id, name, imageUrl }) => (
            <li key={id}>
              <img src={imageUrl} alt={name} />
              <span>{name}</span>
              <hr />
            </li>
          ))}
        </li>
      )}
    </StyledHomePage>
  );
}

export default HomePage;
