<template>
  <div class="cardholder" :class="cardlist.card_status !== 'active' ? 'card-disabled' : ''">
    <div class="d-flex justify-content-left">
      <div class="card text-white">
        <div class="text-right mb-2">
          <div class="px-2">
            <img src="../assets/images/aspire-logo-white.svg" width="85" />
          </div>
        </div>
        <div class="px-2 mt-2">
          <h5 class="cardHolder__name">{{ cardlist.card_name }}</h5>
        </div>
        <div class="d-flex flex-row align-items-center px-2">
          <div class="dots mr-4">
            <span></span> <span></span> <span></span> <span></span>
          </div>
          <div class="dots mr-4">
            <span></span> <span></span> <span></span> <span></span>
          </div>
          <div class="dots mr-4">
            <span></span> <span></span> <span></span> <span></span>
          </div>
          <span class="cardHolder__number">{{
            cardlist.card_number.slice(-4)
          }}</span>
        </div>
        <div class="d-flex justify-content-start align-items-center mt-3 px-2">
          <span class="cardHolder__validity mr-5"
            >Thru: <span>{{ cardlist.card_expire_date }}</span></span
          >
          <span class="cardHolder__ccv">CCV: <span>***</span></span>
        </div>
        <div class="d-flex justify-content-end align-items-center mt-3 px-2">
          <img src="../assets/images/visa-logo.svg" width="70" />
        </div>
      </div>
    </div>
    <div class="rightblock-cardaction text-center">
      <b-row class="justify-content-center">
        <b-col class="p-0">
            <a href="" @click.prevent="statusCard(cardlist.id, cardlist.card_status)">
          <img src="../assets/images/freeze-card.svg" />
          <span>Freeze<br />card</span>
            </a>
        </b-col>
        <b-col class="p-0">
          <img src="../assets/images/set-spend-limit.svg" />
          <span>Set spend<br />limit</span>
        </b-col>
        <b-col class="p-0">
          <img src="../assets/images/gpay.svg" />
          <span>Add to<br />GPay</span>
        </b-col>
        <b-col class="p-0">
          <img src="../assets/images/replace-card.svg" />
          <span>Replace<br />card</span>
        </b-col>
        <b-col class="p-0">
          <a href=""  @click.prevent="deleteCard(cardlist.id)">
            <img src="../assets/images/deactivate-card.svg" />
            <span>Cancel<br />card</span></a
          >
        </b-col>
      </b-row>
    </div>
  </div>
  
</template>
<script>
export default {
  props: {
    cardlist: Object,
  },
  methods: {
    deleteCard: function (id) {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then((value) => {
            if(value){
              this.$store.dispatch("deleteCards", id);
              this.$store.dispatch("getCards");
            }
          })
          .catch(err => {
            console.log(err);
          })

     
    },
    statusCard: function(id, isActive){
      isActive = isActive != 'active' ? 'active' : 'inactive';
      
      this.$store.dispatch("updateCard", {id: id, card_status: isActive});
      this.$store.dispatch("getCards");
    }
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  background: #01d167;
  border-radius: 10px;
  border: none;
  padding: 27px;
}
.cardholder.card-disabled .card{
  background: #8a8a8a;
  cursor: no-drop;
}
.dots span {
  height: 9px;
  width: 9px;
  margin-right: 3px;
  margin-bottom: 2px !important;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  display: inline-block;
}
.cardHolder__name {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}
.cardHolder__number {
  font-size: 14px;
  font-weight: 600;
  margin-top: -1px;
  letter-spacing: 4px;
}
.cardHolder__validity,
.cardHolder__ccv {
  font-size: 13px;
  font-weight: 600;
}

.cardHolder__ccv span {
  font-size: 24px;
  font-weight: 700;
}
.rightblock-cardaction {
  background: #edf3ff;
  padding: 20px 30px;
  border-radius: 15px;
  margin-top: 60px;
}
.rightblock-cardaction span {
  text-align: center;
  color: #0c365a;
  font-size: 13px;
  display: block;
  line-height: normal;
  margin-top: 8px;
  font-weight: 500;
}


@media only screen and (max-width: 768px) {
  .card {
    padding: 27px 15px;
  }
}
</style>