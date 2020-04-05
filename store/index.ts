import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    chatMessages: '',
    titleFromUser: ''
})

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
    SET_MESSAGE(state: any, chatMessage: string) {
        state.chatMessages += chatMessage
    }
}

export const actions: ActionTree<RootState, RootState> = {
    FORMAT_MESSAGE({ commit }, chatMessage: string) {
        const chatMessageFmt = `${new Date().toLocaleString()}: ${chatMessage}\r\n`
        commit('SET_MESSAGE', chatMessageFmt)
    }
}