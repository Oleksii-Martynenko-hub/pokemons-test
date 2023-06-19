import { render } from '@testing-library/react';

import PokemonList from './pokemon-list';

describe('PokemonList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonList />);
    expect(baseElement).toBeTruthy();
  });
});
