import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PokemonPageProps {}

const StyledPokemonPage = styled.div`
  color: pink;
`;

export function PokemonPage(props: PokemonPageProps) {
  return (
    <StyledPokemonPage>
      <h1>Welcome to PokemonPage!</h1>
    </StyledPokemonPage>
  );
}

export default PokemonPage;
