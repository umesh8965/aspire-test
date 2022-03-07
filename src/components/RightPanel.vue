<template>
  <div class="rightblock">
    <div class="rightblock-holder px-lg-4">
      <span>Available balance</span>
      <div class="rightblock-cards mt-2">
        <b-row alignH="between">
          <b-col lg="4" cols="6">
            <span
              class="
                rightblock-cards__currency
                d-inline-block
                rounded
                text-center
                align-middle
              "
              >S$</span
            >
            <span class="rightblock-cards__amt d-inline-block ml-3 align-middle"
              >3,000</span
            >
          </b-col>
          <b-col lg="4" cols="6" class="text-right">
            <b-button v-b-modal.my-modal class="rightblock__addcards"
              ><img src="../assets/images/add.svg" /> New card</b-button
            >
            <!-- The modal -->
            <b-modal id="my-modal" @ok="handleSubmit">
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Name"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                  :state="nameState"
                >
                  <b-form-input
                    id="name-input"
                    v-model="card_name"
                    :state="nameState"
                    required
                  ></b-form-input>
                </b-form-group>
              </form>
            </b-modal>
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-2" alignH="left">
          <b-col cols="12">
            <span
              class="
                rightblock-cards__tab
                d-inline-block
                rounded
                text-center
                align-middle
              "
              ><a class="active" href="javascript:void(0);"
                >My debit cards</a
              ></span
            >
            <span class="rightblock-cards__tab d-inline-block ml-3 align-middle"
              ><a href="javascript:void(0);">All company cards</a></span
            >
          </b-col>
        </b-row>
        <b-row
          class="flex-lg-row rounded rightblock-content-border m-0"
          alignH="around"
        >
          <b-col lg="6" class="rightblock-content-left p-0">
            <div class="rightblock-showcard mb-3">
              <img src="../assets/images/showcard.svg" />
              <span class="rightblock-showcard__showcardnumber ml-2"
                >Show card number</span
              >
            </div>
            <div class="">
              <b-carousel id="card-carousel" fade :interval="0" indicators>
                <b-carousel-slide
                  img-blank
                  v-for="(cardlist, index) in cards"
                  :key="index"
                  v-model="cardtrack"
                >
                  <Card v-bind:cardlist="cardlist" />
                </b-carousel-slide>
              </b-carousel>
            </div>
          </b-col>
          <b-col lg="6" class="rightblock-content-right p-0">
            <b-row alignH="start" class="rightblock-content-right-topspace">
              <b-col class="p-0">
                <CardDetails />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "./Card.vue";
import CardDetails from "./CardDetails.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      card_name: "",
      cardtrack: "",
      nameState: null,
      sliding: null,
    };
  },
  mounted() {
    //this.onDataLoad();
    this.$store.dispatch("getCards");
  },
  computed: {
    ...mapState(["cards"]),
  },
  methods: {
    onSlideStart: function () {
      this.sliding = true;
    },
    onSlideEnd: function () {
      this.sliding = false;
    },
    onDataLoad: function () {
      /* axios
        .get(`http://localhost:3000/cards`)
        .then((response) => {
          this.cards = response.data;
        })
        .catch((e) => {
          console.log(e);
        });*/

      return this.$store.state.posts;
    },

    async handleSubmit() {
      try {
        const valid = this.$refs.form.checkValidity();
        if (valid) {
          const c_id = this.getCCVNumber();
          const c_name = this.card_name;
          const c_number = this.getRandomNumber(16);
          const c_expire_date = this.getRandomDate();
          const c_ccv = this.getCCVNumber();
          const c_status = "active";

          this.$store.dispatch("addCards", {
            id: c_id,
            card_name: c_name,
            card_number: c_number,
            card_expire_date: c_expire_date,
            card_ccv: c_ccv,
            card_status: c_status,
          });

          this.card_name = "";

          this.$store.dispatch("getCards");

          /*const res = await axios.post(`http://localhost:3000/cards`, {
            id: c_id,
            card_name: c_name,
            card_number: c_number,
            card_expire_date: c_expire_date,
            card_ccv: c_ccv,
          });
          this.cards = [...this.cards, res.data];
          this.card_name = "";
          this.onDataLoad();*/
        }
      } catch (e) {
        console.error(e);
      }
    },
    getRandomNumber: function (digit) {
      return Math.random()
        .toFixed(digit)
        .split(".")[1]
        .match(/.{1,4}/g)
        .join("-");
    },
    getRandomDate: function () {
      let randomMonth = parseInt(Math.random() * (12 - 1) + 1);
      let randomYear = parseInt(Math.random() * (2030 - 2022) + 2022);
      return randomMonth + "/" + randomYear;
    },
    getCCVNumber: function () {
      return parseInt(Math.random().toFixed(3).split(".")[1]);
    },
    deleteCard() {},
  },
  components: {
    Card,
    CardDetails,
  },
};
</script>
<style scoped>
.rightblock-holder {
  max-width: 955px;
}
.rightblock-cards__currency {
  width: 40px;
  color: #fff;
  padding: 3px;
  background-color: #01d167;
  font-size: 13px;
}
.rightblock-cards__amt {
  font-weight: 700;
  font-size: 26px;
}
.rightblock__addcards {
  background-color: #325baf;
}
.rightblock-cards__tab a {
  color: #dddddd;
  font-weight: 500;
  text-decoration: none;
  margin-right: 20px;
}
.rightblock-cards__tab a:hover {
  text-decoration: none;
}
.rightblock-cards__tab a.active {
  color: #333333;
}
.rightblock-content-border {
  border: solid 1px #ddd;
  padding: 60px 40px;
}
.rightblock-showcard__showcardnumber {
  color: #01d167;
  font-size: 12px;
  font-weight: 600;
}
.rightblock-showcard {
  text-align: right;
}
.rightblock-content-left {
  max-width: 414px;
  margin-right: 40px;
}
.rightblock-content-right {
  max-width: 366px;
}

.rightblock-content-right-topspace {
  margin: 37px 0 0 0;
}

@media only screen and (max-width: 768px) {
  .rightblock-holder {
    color: #ffffff;
  }
  .rightblock-content-border {
    border: 0;
    padding: 60px 0;
  }
  .rightblock-content-right {
    max-width: inherit;
  }
  .rightblock-content-left {
    max-width: inherit;
    margin-right: 0px;
  }

  .rightblock__addcards {
    background-color: transparent;
    border: 0;
    color: #23cefd;
  }
  .rightblock__addcards svg {
    fill: #23cefd;
  }
  .rightblock-cards__tab a{
	color: #3b6b94;
}
  .rightblock-cards__tab a.active {
	color: #ffffff;
}
.rightblock-content-border{
	padding: 20px 0;
}
}
</style>