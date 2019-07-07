<template>
  <div class="row">
    <div class="container-fluid container_">
      <div class="row header">
        <div class="col-6 text-left">
          <div class="col-12 header_big-text form-group">
            <label for="exampleInputEmail1 row">{{name_}}</label>
            <div class="row col-12 align-items-center" 
            v-if="showSearcCity">
            <input 
              type="name"
              class="form-control col-10" 
              aria-describedby="emailHelp" 
              placeholder=""
              v-model="searchSity">
              <div class="col-2 curs_pointer" v-on:click="getListCity">
                Поиск
              </div>
            </div>
          </div>
          <div class="col-12 header_small-text curs_pointer" 
          v-on:click="toggleshowSearcCity">
            Сменить город
          </div>
        </div>
        
        <div class="col-6">
          <div class="col-12 text-right row justify-content-end">
            <div  :class="{active: !faCel}" 
                  v-on:click="toggleFaCel()" 
                  class="text-left left_">
              C
            </div>
            <div  :class="{active: faCel}" 
                  v-on:click="toggleFaCel()" 
                  class="text-left right_">
              F
            </div>
          </div>
          <div class="col-12 text-right row justify-content-end">
            <div class="text-right header_small-text curs_pointer" v-on:click="update_">
              <i class="fa fa-location-arrow" aria-hidden="true"></i>
              Мое местоположение
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="arrCitiResp.length">
      <div  v-for="element in arrCitiResp">
        <p v-model="element.country" v-bind:key="element.id" v-on:click="getData">
          {{element.name_}}, {{element.country}}
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6 row justify-content-end">
          <div class="6">
            <img src="../assets/test.png" class="pict" alt="">
          </div>  
        </div>
        <div class="col-6">
          <p class="grad text-white">
            {{temp}}
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <p class="weather">
          {{description}}
        </p>
      </div>
    </div>
  
  <div class="container text-white">
    <div class="row">
      <div class="col-3">
        <p class="text-left footer_small-text">Ветер</p>
        <p class="text-left">
          {{wind.speed}} м\с, {{wind.side}}
        </p>
      </div>
      <div class="col-3">
        <p class="text-left footer_small-text">Давление</p>
        <p class="text-left">{{pressure}} мм рт.ст</p>
      </div>
      <div class="col-3">
        <p class="text-left footer_small-text">Влажность</p>
        <p class="text-left">{{humidity}} %</p>
      </div>
      <div class="col-3">
        <p class="text-left footer_small-text">Вероятность дождя</p>
        <p class="text-left"> {{rain}}%</p>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import axios from 'axios';
function cityTranlateEngToRu(ruEng) {
  let rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь -".split(/ +/g),
  eng = "shh sh ch cz yu ya yo zh `` y e a b v g d e z i j k l m n o p r s t u f x ` -".split(/ +/g),
  text = [];
  return function(str) {
    if (!str) return null;
    str = str.toLowerCase();
    if (ruEng) {
      for (let x = 0; x < str.length; x++) {
        text.push(eng[rus.indexOf(str[x])])
      }
      return text[0].toUpperCase() + text.slice(1).join('');
    }
  for (let x = 0; x < str.length; x++) {
      text.push(rus[eng.indexOf(str[x])])
    }
    return text[0].toUpperCase() + text.slice(1).join('');
  }
}
  function getSide(deg) {
    switch(true) {
      case (deg > 22.5 && deg <= 67.5):
       return 'Северо-восточный'
      case (deg > 67.5 && deg <= 112.5):
       return 'Восточный'
      case (deg > 112.5 && deg <= 157.5):
       return 'Юго-восточный'
      case (deg > 157.5 && deg <= 202.5):
       return 'Южный'
      case (deg > 202.5 && deg <= 247.5):
       return 'Юго-западный'
      case (deg > 247.5 && deg <= 292.5):
       return 'Западный'
      case (deg > 292.5 && deg <= 337.5):
       return 'Северо-западный'
      case (deg > 337.5 || deg <= 22.5):
       return 'Северо-западный'
    }
  }
let des = {};
export default {
  name: 'HelloWorld',
  data () {
    return {
      rain: 0,
      arrCitiResp: [],
      showSearcCity: false,
      searchSity:'',
      name_: '',
      faCel: false,
      pressure: 0,
      temp: 0,
      humidity: 0,
      description: '',
      wind: {
        side: '',
        speed: 0
      }
    }
  },
  methods: {
    getListCity: function () {
      let cityName;
      this.arrCitiResp = [];
      if (this.searchSity == 'Москва') {
        cityName = {cityName: 'Moscow'}
      } else{
        cityName = {cityName: cityTranlateEngToRu(true)(this.searchSity)};
      }
      axios
        .post('http://localhost:3000/find-city', cityName)
        .then((response) => {
          if (response.data.error) {
            alert('Город не найден');
            return
          }
            this.name_ = this.searchSity;
            this.wind = {
              side: getSide(response.data.wind.deg),
              speed: Math.round(response.data.wind.speed)
            };
            this.pressure = Math.round(response.data.main.pressure / 1.333);
            this.humidity = Math.round(response.data.main.humidity)
            this.temp = Math.round(response.data.main.temp - 273.15);
            if(this.faCel) {
              this.temp = Math.round((this.temp * 9/5) + 32);
            }
            let desc = response.data.weather[0].description;
            this.description = desc[0].toUpperCase() + desc.slice(1);
            if (response.data.rain) {
              this.rain = response.data.rain['3h'] * 100
            }
          })
        .catch(err => {console.log(err)});
          // axios
          //   .post('http://localhost:3000/find-city', cityName)
          //   .then((response) => {
          //     for (let element of response.data.list) {
          //       this.arrCitiResp.push({
          //         id: element.id,
          //         name_: element.name,
          //         country: element.sys.country
          //       })
          //     }
          // this.name_ = response.data.name.toLowerCase()
          // this.wind = {
          //   side: getSide(response.data.wind.deg),
          //   speed: Math.round(response.data.wind.speed)
          // };
          // this.pressure = Math.round(response.data.main.pressure / 1.333);
          // this.humidity = Math.round(response.data.main.humidity)
          // this.temp = Math.round(response.data.main.temp - 273.15);
          // let desc = response.data.weather[0].description;
          // this.description = desc[0].toUpperCase() + desc.slice(1);
          //   })
          // .catch(err => (console.log(err)));
    },
    getData: function(event) {
      console.log(event)
    },
    update_: function() {
      this.getGeolocation()
    },
    toggleFaCel: function ()  {
      this.faCel = !this.faCel
      if (this.faCel) {
        this.temp = Math.round((this.temp * 9/5) + 32);
      } else {
        this.temp = Math.round((this.temp - 32) * 5/9);
      }
    },
    toggleshowSearcCity: function () {
      this.showSearcCity = !this.showSearcCity
    },
    getGeolocation: function () {
      let coords = '';
      navigator.geolocation.getCurrentPosition((position) => {
        coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
      axios
        .post('http://localhost:3000/json', coords)
        .then((response) => {
            this.name_ = cityTranlateEngToRu(false)(response.data.name.toLowerCase())
            this.wind = {
              side: getSide(response.data.wind.deg),
              speed: Math.round(response.data.wind.speed)
            };
            this.pressure = Math.round(response.data.main.pressure / 1.333);
            this.humidity = Math.round(response.data.main.humidity)
            this.temp = Math.round(response.data.main.temp - 273.15);
            if(this.faCel) {
              this.temp = Math.round((this.temp * 9/5) + 32);
            }
            let desc = response.data.weather[0].description;
            this.description = desc[0].toUpperCase() + desc.slice(1);
            if (response.data.rain) {
              this.rain = response.data.rain['3h'] * 100
            }
          })
        .catch(err => (console.log(err)));
      });
    }
  },
  mounted() {
    this.getGeolocation()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.curs_pointer {
  cursor: pointer;
}
.grad {
  font-size: 100px
}
.pict {
  width: 100%
}
.header_big-text{
  text-transform: capitalize;
}
.header_big-text, .weather {
  
  color: #fff;
  font-size: 30px;
}
.header_small-text, .footer_small-text {
  color: #91baf3;
  font-size: 20px
}
.left_, .right_ {
  padding: 0px 10px;
  cursor: pointer;
  border: 1px solid #ffffff;
}
.left_ {
  border-radius: 10px 0 0 10px;
  border-right: none;
}
.right_ {
  border-radius: 0 10px 10px 0;
  border-left: none;
}
.active { 
  background-color: #6da3ef; 
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
  