import * as mutationTypes from './types';

// Mutation
const mutations = function ( state ) {
    return {
        [mutationTypes.SET_MUTATION_DEFAULT]: function( state ) {
            state.count ++
        },
        [mutationTypes.SET_MUTATION_RANDOM]: function ( state, options ) {
            state.resultData = options;
        },
        [mutationTypes.AAA]: function(state, options) {
            state.isActiveData = options;
            console.log( 12321321321, options )
        }
    }
}
export default mutations