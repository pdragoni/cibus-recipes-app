import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Context from './context/Context';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FoodsDetail from './pages/FoodsDetail';
import Drinks from './pages/Drinks';
import DrinksDetail from './pages/DrinksDetail';
import Explorer from './pages/Explorer';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import ExploreFoods from './pages/ExplorerFoods';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationality from './pages/ExploreFoodsNationality';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

function App() {
  // const { results } = useContext(Context);
  // const { idMeal } = results[0];
  // const { idDrink } = results[0];

  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="foods/:idMeal" component={ FoodsDetail } />
          <Route exact path="drinks/:idDrink" component={ DrinksDetail } />
          {/* <Route exact path="/foods/{id-da-receita}/in-progress" component={} />
          <Route exact path="/drinks/{id-da-receita}/in-progress" component={} /> */}
          <Route exact path="/explore" component={ Explorer } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationality }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="" component={ NotFound } />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
