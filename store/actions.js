import request from 'axios'

export default {
  async SET_PEOPLE_DATA({
    commit
  }, payload) {

    return request.get(`https://swapi.co/api/people/?page=${payload}`)
      .then((res) => {
        // if (res.status == 200) {
        //   console.log(res.data);
        //   commit('SET_PEOPLE_DATA', res.data)
        // }
        return new Promise((response, resolve) => {
          const arr = [];
          const resFilms = res.data.results.forEach((f) => {
            arr.push(getFilmDataForPerson(f));
          });

          //   new Promise((x, y) => {
          Promise.all(arr).then(re => {
            response({
              re,
              next: res.data.next,
              previous: res.data.previous
            });
          })
          //   })
        })

      }).then((rp) => {
        commit('SET_PEOPLE_DATA', rp)
      }).catch((error) => {
        console.log(error)
      })
  }
}

function getFilmDataForPerson(person) {
  let personName = person.name;
  let personGender =  person.gender;
  let personByear =  person.birth_year;
  let filmUrls = person.films;
  let promies = [];

  filmUrls.forEach(film => {
    promies.push(new Promise((res, rej) => {
      request.get(film)
        .then((resp) => {
          res(resp.data.title)
        }).catch((error) => {
          console.log(error)
        })
    }));
  });

  return new Promise((res, rej) => {

    Promise.all(promies).then(results => {
      res({
        personName,
        personGender,
        personByear,
        results
      })
    })
  });
}