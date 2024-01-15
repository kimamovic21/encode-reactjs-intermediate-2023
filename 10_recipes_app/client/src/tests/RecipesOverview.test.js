import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/configureStore';
import RecipesOverview from '../views/RecipesOverview';

describe('Recipes Overview test', () => {
    it('Check if title and button exists', () => {
        render(
            <Provider store={store}>
                <RecipesOverview />
            </Provider>
        );
        const title = screen.getByText('Recipes Overview');
        expect(title).toBeInTheDocument();
        const buttonElement = screen.getByText('New Recipe');
        expect(buttonElement).toBeInTheDocument();
    })
})

describe('Recipes Overview test', () => {
    it('Check if MUI Input exists', () => {
        render(
            <Provider store={store}>
                <RecipesOverview />
            </Provider>
        );

        // const nameInputElement = screen.getByTestId('name-input');
        // expect(nameInputElement).toHaveValue('');

        // fireEvent.change(nameInputElement, { target: { value: 'omlet' }});
        // expect(nameInputElement).toHaveValue('omlet');
    })
})