import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { APIStatus } from 'src/api/MainApi';

import { ERoutes } from 'src/app/app';
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
    if (status === APIStatus.IDLE || pokemonData === null) {
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
        <ul>
          {pokemonData.map(({ id, name, imageUrl }) => (
            <li key={id}>
              <Link to={`${ERoutes.POKEMON.split(':')[0] + name}`}>
                <img src={imageUrl} alt={name} />
                <span>{name}</span>
              </Link>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </StyledHomePage>
  );
}

export default HomePage;
