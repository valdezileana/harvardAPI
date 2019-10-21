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
          Nice Pick! Here is more info on your selection!
        </h1>
        <p class="subheading font-weight-regular">
          Click on a picture to expand it to full size!
        </p>
      </v-flex>
<v-flex
    mb-5
    xs12
>
        <!-- Inspo for this: https://vuetifyjs.com/en/components/simple-tables -->
<v-layout justify-center>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Attribute Name</th>
            <th class="text-left">Attribute Contents</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{{ name }}</td>
          </tr>
          <tr>
            <td>Object Number</td>
            <td>{{ objectNumber }}</td>
          </tr>
          <tr>
            <td>Place</td>
            <td>{{ place }}</td>
          </tr>
          <tr>
            <td>Person</td>
            <td>{{ person }}</td>
          </tr>
          <tr>
            <td>Period</td>
            <td>{{ period }}</td>
          </tr>
          <tr>
            <td>Year Made</td>
            <td>{{ yearmade }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    </v-layout>
    </v-flex>
    
      <v-flex
        mb-5
        xs12
      >
        <!-- Inspo for this: https://codepen.io/pen/?&editable=true&editors=101 -->
        <v-layout justify-center>


    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(img) in images"
                :key="img"
                class="d-flex child-flex"
                cols="4"
              >
                <v-card flat tile class="d-flex">
                  <v-img
                    :src=img
                    aspect-ratio="1"
                    class="grey lighten-2"
                    v-on:click="openImage(img)"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

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
props: {
    objnumber: String
},
  methods: {
      async getAllGalleries(){
          let link = 'https://api.harvardartmuseums.org/object?apikey=3a942490-d002-11e9-9498-734205a7ab16&size=100&objectnumber=' + this.$props.objnumber;
          let gal = await fetch(link);
          let json = await gal.json();
          let data = json.records;
          let object = data[0];
          let images = object.images;
            this.name = object.title;
            this.objectNumber = object.objectNumber;
            this.place = object.place;
            this.person = object.person;
            this.period = object.period;
            this.yearmade = object.yearmade;
            for(let i in images)
          {
              let url = images[i].iiifbaseuri + "/full/full/0/native.jpg";
              this.images.push(url);
          }
      },
      openImage(img) { 
          window.open(img, "_blank");    
      }
  },
  data: () => ({
    name: "",
    objectNumber: "",
    images: [],
    place: "",
    person: "",
    period: "",
    yearmade: ""
  }),
};
</script>