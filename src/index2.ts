
import { combineReducers } from 'redux';
import blog, { BlogState } from './blog/blogs.reducer';

export interface IRootState {
   readonly blog: BlogState;
//   readonly categorie: CategorieState;
}

const rootReducer = combineReducers<IRootState>({
    blog,
//   categorie,
 
});

export default rootReducer;  
