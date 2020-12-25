import * as articles from './index';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getArticles = (sort) => {
    return async(dispatch,getState)=>{
        try{
            const arts = await axios.post(`/api/articles/loadmore`,sort);
            const prevArts = getState().articles.articles;
            let newArts = [...arts.data];

            if(prevArts){
                newArts = [...prevArts,...arts.data];
            }
            dispatch(articles.getArticles(newArts));
        } catch(error){
            dispatch(articles.errorGlobal('Upps error loading articles'))
        }
    }
}

export const getArticle = (id) => {
    return async (dispatch)=>{
        try{
            const request = await axios.get(`/api/articles/get_byid/${id}`);
            dispatch(articles.getArticle(request.data[0]))
        } catch(error){
            dispatch(articles.errorGlobal(error.response.data.message))
        }
    }
}


