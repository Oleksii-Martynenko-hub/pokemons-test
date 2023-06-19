import { render } from '@testing-library/react';

import PokemonTypesFilter from './pokemon-types-filter';

describe('PokemonTypesFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokemonTypesFilter />);
    expect(baseElement).toBeTruthy();
  });
});
