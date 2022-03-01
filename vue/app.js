var vm = new Vue({
  el: "#app",
  data() {
    return {
      instrumento: {
        id: 1,
        nombre: "Ukelele",
        imagen: "images/instruments/ukulele.svg"
      },
      instrumentos: [
        {
          id: 1,
          nombre: "Ukelele",
          imagen: "images/instruments/ukulele.svg"
        },
        {
          id: 2,
          nombre: "Guitarra",
          imagen: "images/instruments/guitarra.svg"
        },
        {
          id: 3,
          nombre: "Bajo",
          imagen: "images/instruments/bajo.svg"
        },
        {
          id: 4,
          nombre: "Violin",
          imagen: "images/instruments/violin.svg"
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    onClickInstrumento(instrumento) {
      this.instrumento = instrumento;
      $('.mobile-btn').removeClass('active');
      $('.menu-mobile').removeClass('active');
    }
  }
});
