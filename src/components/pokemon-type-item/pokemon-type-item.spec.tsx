import { render } from '@testing-library/react';

import PokemonTypeItem from './pokemon-type-item';

describe('PokemonTypeItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonTypeItem />);
    expect(baseElement).toBeTruthy();
  });
});
