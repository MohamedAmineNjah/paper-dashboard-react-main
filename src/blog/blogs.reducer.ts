import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../action-type.util';
import { IBlog } from './blog.model';
import pick from 'lodash/pick';

export const ACTION_TYPES = {
  SEARCH_BLOGS: 'blog/SEARCH_BLOGS',
  FETCH_BLOG_LIST: 'blog/FETCH_BLOG_LIST',
  FETCH_BLOG: 'blog/FETCH_BLOG',
  FETCH_BLOG_LISTSEARCH: 'blog/FETCH_BLOG_LISTSEARCH',
  RESET: 'blog/RESET',
  CREATE_BLOG: 'blog/CREATE_BLOG'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as any,
  entity: {} as any,
  updating: false,
  totalPages: 0,
  updateSuccess: false,
};

export type BlogState = Readonly<typeof initialState>;

// Reducer

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: BlogState = initialState, action: { type: any; payload: { data: { content: any; totalPages: string; }; }; }): BlogState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BLOGS):
    case REQUEST(ACTION_TYPES.FETCH_BLOG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BLOG):
    case REQUEST(ACTION_TYPES.FETCH_BLOG_LISTSEARCH):
    case REQUEST(ACTION_TYPES.CREATE_BLOG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };

    case FAILURE(ACTION_TYPES.SEARCH_BLOGS):
    case FAILURE(ACTION_TYPES.FETCH_BLOG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BLOG):
    case FAILURE(ACTION_TYPES.FETCH_BLOG_LISTSEARCH):
    case FAILURE(ACTION_TYPES.CREATE_BLOG):

      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,

      };
    case SUCCESS(ACTION_TYPES.SEARCH_BLOGS):
    case SUCCESS(ACTION_TYPES.FETCH_BLOG_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
       // totalPages: parseInt(action.payload.data.totalPages, 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOG_LISTSEARCH):
      return {
        ...state,
        loading: false,
        entities: action.payload.data.content,
       // totalPages: parseInt(action.payload.data.totalPages, 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data.content,
      };
      case SUCCESS(ACTION_TYPES.CREATE_BLOG):      
          return {
            ...state,
            updating: false,
            updateSuccess: true,
            entity: action.payload.data
          };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'http://localhost:8080/api/blogs';

// Actions



export const getAllBlogs = () => {
  const requestUrl = `${apiUrl}`;
  return {
    type: ACTION_TYPES.FETCH_BLOG_LIST,
    payload: axios.get<IBlog>(`${requestUrl}`)
  };
};
export const createEntity = (entity: any) => {
  const result = ({
    type: ACTION_TYPES.CREATE_BLOG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const getEntity = (id:any) => {
  const requestUrl = `api/blog_/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BLOG,
    payload: axios.get(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const cleanEntity = (entity:any) => {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

  return pick(entity, keysToKeep);
};