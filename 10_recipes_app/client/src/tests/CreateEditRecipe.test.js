import { render, screen } from "@testing-library/react"
import CreateEditRecipe from "../components/CreateEditRecipe"
import { Provider } from "react-redux"
import { store } from '../redux/configureStore';
describe('Create edit recipe', () => {
    it('Create edit modal is open and exists', () => {
        render(
            <Provider store={store}>
                <CreateEditRecipe
                    open={true}
                    handleClose={() => { }}
                    isEditMode={false}
                    recipeToEdit={null}
                />
            </Provider>
        );
        const titleElement = screen.getByText('Create recipe');
        expect(titleElement).toBeInTheDocument();
    })
})