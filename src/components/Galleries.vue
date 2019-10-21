<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Please select a gallery to explore!
        </h1>
      </v-flex>
      

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">Please Select a Gallery to Continue: </h2>
        <p class="subheading font-weight-regular">
          This class fetches 100 results at a time, if there are more than 100 results, a next page button will appear below!
        </p>
        <p class="subheading font-weight-regular">
          If there are no results, this page will remain empty! Try Again :D
        </p>
        <v-layout justify-center>
      </v-layout>
        <!-- Inspo for this: https://codepen.io/pen/?&editable=true&editors=101 -->
        <v-layout justify-center>
        <v-item-group>
        <v-container>
            <v-row>
            <v-col
                v-for="(next) in galleries"
                :key="next"
                class="align-center"
                target="_blank"
                cols="12"
                md="4"
            >
                <v-item v-slot:default="{ active, toggle }">
                <v-card
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center"
                    dark
                    height="200"
                    @click="toggle"
                    v-on:click="fetchObjects(next.id)"
                >
                    <v-scroll-y-transition>
                    <div
                        v-if="active"
                        class="display-3 flex-grow-1 text-center"
                    >
                        Fetching Info
                    </div>
                    <div
                        v-else
                        class="flex-grow-1 text-center"
                    >
                        {{ next.name }}
                    </div>
                    </v-scroll-y-transition>
                </v-card>
                </v-item>
            </v-col>
            </v-row>
        </v-container>
         </v-item-group>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted(){
      this.getAllGalleries();
  },
  methods: {
      async getAllGalleries(){
          let gal = await fetch('https://api.harvardartmuseums.org/gallery?apikey=3a942490-d002-11e9-9498-734205a7ab16&size=100');
          let json = await gal.json();
          let data = json.records;
          for(let i in data)
          {
              let pair = {name: data[i].name, id: data[i].galleryid};
              this.galleries.push(pair);
          }
      },
      fetchObjects(galleryName){
          this.$emit("selected", galleryName)
      }
  },
  data: () => ({
    galleries: [],
  }),
};
</script>
