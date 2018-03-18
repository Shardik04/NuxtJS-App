<template>
  <section>


    <v-container fluid>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Search By Name, Gender, Birth Year:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          name="input-1"
          label="Search By Name, Gender, Birth Year"
          id="testing"
          v-model="search"
        ></v-text-field>
      </v-flex>
     </v-layout>
     </v-container> 

    <div
      id="e3"
      style="max-width: 400px; margin: auto;"
      class="grey lighten-3"
      v-for="p in filteredData" :key="p.name"
      >
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card target="_blank" href="javascript:void(0)" color="blue" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs7>
                      <div>
                        <div class="red--text">Name : {{ p.personName }} </div>
                        <div v-if="p.personGender != 'n/a'" class="deep-purple--text">Gender : {{ p.personGender }} </div>
                        <div v-if="p.personByear != 'unknown'">Birth Year : {{ p.personByear }} </div>
                        <div class="orange--text">Films : 
                            <ul class="text-md-center" v-for="film in p.results" :key="film">
                              <li>{{film}}</li>  
                            </ul>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

          </v-layout>
        </v-container>

      </div>

   <!--  <div v-for="p in getData.re" :key="p.name" >
      <div>Name : {{ p.personName }} </div>
      <div>Gender : {{ p.personGender }} </div>
      <div v-if="p.personByear != 'unknown'">Birth Year : {{ p.personByear }} </div>
      <div>Films : 
          <ul v-for="film in p.results" :key="film">
            <li>{{film}}</li>  
          </ul>
      </div>
    </div> -->

    <div class="text-md-center">
      <v-btn color="red" v-if="getData.previous != null" @click="getPrevious">Previous</v-btn>
      <v-btn color="blue" v-if="getData.next != null" @click="getNext">Next</v-btn>
    </div>
    <!-- <button v-if="getData.previous != null" @click="getPrevious">Previous</button> -->
    <!-- <button v-if="getData.next != null" @click="getNext">Next</button> -->

  </section>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import axios from 'axios'

  export default {
    async fetch({
      store
    }) {
      await store.dispatch('SET_PEOPLE_DATA', store.getters.peoples.page);
    },
    computed: {
      getData() {
        return this.$store.getters.people(this.currentPage);
      },
      filteredData() {
        var vm = this;
        return this.getData.re.filter((item) => {
          return item.personName.toLowerCase().indexOf(vm.search.toLowerCase()) > -1 || 
                item.personGender.toLowerCase().indexOf(vm.search.toLowerCase()) > -1 || 
                item.personByear.toLowerCase().indexOf(vm.search.toLowerCase()) > -1;
        });
      }
    },
    methods: {
      async getNext() {
        await this.$store.dispatch('SET_PEOPLE_DATA', this.$store.getters.peoples.page);
        this.currentPage++;
      },
      getPrevious() {
        this.currentPage--;
      }
    },
    data() {
      return {
        currentPage: 0,
        search: ''
      }
    }
  }
</script>

<style>
li {
  list-style: none;
}
</style>
