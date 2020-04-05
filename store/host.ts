import { GetterTree, ActionTree, MutationTree } from 'vuex'
export const state = () => ({
  hello: false,
  helloFail: false,
  progress: 0,
  sample: 341,
  sample2: 243,
  sample2b: '243b',
  someObj: {
    id: 0,
    msg: ''
  }
});

export type RootState = ReturnType<typeof state>;

export const mutations: MutationTree<RootState> = {
  SET_PROGRESS(state, progress: number) {
    state.progress = progress
  },

  SET_SAMPLE(state, sample: number) {
    state.sample = sample
  },

  SET_SAMPLE2(state, sample2: number) {
    state.sample2 = sample2
  },

  SET_SAMPLE2B(state, sample2b: string) {
    state.sample2b = sample2b
  },

  SET_SOMEOBJ(state, someObj: {}) {
    Object.assign(state, { someObj })
  }
}