export default {
  'SET_PEOPLE_DATA' (state, payload) {
    state.peoples['people'].push(payload);
    state.peoples.page++;
  }
}
