import { render } from '@testing-library/react';

import PokemonPage from './pokemon-page';

describe('PokemonPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonPage />);
    expect(baseElement).toBeTruthy();
  });
});
