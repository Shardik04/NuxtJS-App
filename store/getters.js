export default {
  peoples: state => {
    return state.peoples;
  },
  people: state => current => {
    return state.peoples["people"][current];
  }
}
