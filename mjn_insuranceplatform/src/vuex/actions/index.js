import * as actionTypes from './types';
import * as mutationTypes from '../mutations/types';
import { fetch } from '@/http/index';
import * as connectURL from '@/http/common/connectURL.js';


// Action
const actions = function () {
    return {
        [actionTypes.SET_ACTION_DEFAULT]: function ( { commit }, options ) {

            fetch( connectURL.defaultRandom, {
                type: 'GET',
                params: {
                    projectId:8024,
                    projectName:'test'
                }
            })
            .then( res => {
                console.log( '数据请求成功' )
                let result = res.data.data.projects;
                // 改变state共享数据
                 commit(mutationTypes.SET_MUTATION_RANDOM, result)
            })
            .catch( err => {
                console.log( err )
            });
        },
    }
}
export default actions