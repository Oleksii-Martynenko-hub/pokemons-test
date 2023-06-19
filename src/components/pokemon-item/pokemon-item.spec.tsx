import { render } from '@testing-library/react';

import PokemonItem from './pokemon-item';

describe('PokemonItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonItem />);
    expect(baseElement).toBeTruthy();
  });
});
