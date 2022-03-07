import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'



//load Vuex
Vue.use(Vuex);

//export store module
export default new Vuex.Store({
    state: {
        cards: []
    },
    mutations: {
        SET_CARDS(state, cards) {
            state.cards = cards
        },
        ADD_CARDS(state, cards) {
            state.cards.push(cards);
        },
        DELETE_CARD(state, id) {
            state.cards = state.cards.filter(cards => cards.id !== id)
        },
        UPDATE_CARD(state, cards) {
            let index = state.cards.findIndex((c) => c.id == cards.id);
            if (index > -1) {
              state.cards[index] = cards.status;
            }
        }
    },
    actions: {
        getCards({ commit }) {
            axios
                .get('http://localhost:3000/cards')
                .then(response => {
                    commit('SET_CARDS', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addCards({ commit }, payload) {
            axios
                .post(`http://localhost:3000/cards`, payload)
                .then(() => {
                    commit('ADD_CARDS', payload)
                })
        },
        deleteCards({ commit }, id) {
            axios.delete(`http://localhost:3000/cards/${id}`)
                .then(() => {
                    commit('DELETE_CARD', id)   
                });
        },
        updateCard({commit}, payload){
            axios
                .patch(`http://localhost:3000/cards/${payload.id}`, payload)
                .then(() => {
                    commit('UPDATE_CARD', payload)
                })
        }
    },
    getters: {
      
    }

})
