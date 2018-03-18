import Vuex from "vuex"

import actions from "~/store/actions"
import mutations from "~/store/mutations"
import getters from "~/store/getters"

export default () => {
  return new Vuex.Store({
    state: {
      peoples: {
        "people": [],
        "page": 1
      }
    },
    mutations,
    getters,
    actions
  })
}
