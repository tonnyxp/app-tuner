Vue.component('Metronome', {
  template: '#metronome',
  props: ['sounds'],
  data: function () {
    return {
      isPlay: false,
      isEditBitOpen: false,
      isEditSizeOpen: false,
      editSizeOpen: 'editSizeOpen',
      editSizeClose: 'editSizeClose',
      blinkTestActive: 'blinkTestActive',
      blinkTestInactive: 'blinkTestInactive',
      metronomeBlinkOn: 'metronomeBlinkOn',
      metronomeBlinkOff: 'metronomeBlinkOff',
      bitNodes: [],
      btnNodeWidth: 0,
      btnNodeStyle: {},
      currentSize: {
        bit: 4,
        part: 4
      },
      partVar: [1, 2, 4, 8, 16, 32],
      partVarIndex: 2,
      bpm: 120,
      onebitLength: 0,
      blinkStatus: false,
      stopTick: null,
      tickCounter: 0,
      audio: { a: null, b: null },
      activeSoundBank: {
        first: this.sounds[0].strong,
        second: this.sounds[0].weak
      },
      isAccentNow: true
    }
  },
  methods: {
    setInputTemp(e) {
      this.createBit();
    },
    setTemp(status) {
      this.createBit();
      status === 'up' ? this.bpm += 1 : status === 'down' ? this.bpm -= 1 : 'none';
      if (this.bpm <= 0) { this.bpm = 0 };
    },
    playMetronome() {
      this.isPlay = !this.isPlay;
      this.createBit();
    },
    openCloseEditBit() {
      this.isEditBitOpen = !this.isEditBitOpen;
    },
    handleEditSize() {
      this.isEditSizeOpen = !this.isEditSizeOpen;
    },
    bitUp() {
      this.currentSize.bit += 1;
      this.createBitNodes();
    },
    bitDown() {
      this.currentSize.bit <= 1 ? this.currentSize.bit = 1 : this.currentSize.bit -= 1;
      this.createBitNodes();
    },
    partUp() {
      this.partVarIndex >= this.partVar.length - 1 ? this.partVarIndex = this.partVar.length - 1 : this.partVarIndex += 1;
      this.currentSize.part = this.partVar[this.partVarIndex];
      this.createBit();
    },
    partDown() {
      this.partVarIndex <= 0 ? this.partVarIndex = 0 : this.partVarIndex -= 1;
      this.currentSize.part = this.partVar[this.partVarIndex];
      this.createBit();
    },
    setBitNodeWidth() {
      this.btnNodeWidth = 300 / this.currentSize.bit;
      this.btnNodeStyle = { width: `${300 / this.currentSize.bit}px` };
    },
    createBitNodes() {
      this.bitNodes = [];
      this.setBitNodeWidth();
      for (let i = 0; i < this.currentSize.bit; i++) {
        this.bitNodes.push({ id: i + 1, status: i === 0 ? true : false, key: `point${i}`, isTickNow: false });
      }
    },
    setActiveTick() {
      this.bitNodes.forEach((value, index) => {
        if (index === this.tickCounter % this.currentSize.bit) {
          this.isAccentNow = value.status;
          value.isTickNow = true;
        } else {
          value.isTickNow = false;
        }
      });
    },
    setPoint(id) {
      this.bitNodes.map((value) => {
        if (value.id === id && value.status !== true) {
          value.status = true;
        } else if (value.id === id && value.status === true) {
          value.status = false;
        }
        return value;
      });
    },
    createBit() {
      if (this.stopTick) { clearInterval(this.stopTick); };
      if (this.isPlay) {
        this.onebitLength = 60 * (4 / this.currentSize.part) / this.bpm * 1000;
        this.stopTick = setInterval(() => {
          this.createTestBlink();
          this.setActiveTick();
          this.soundBit();
        }, this.onebitLength / 2);
      } else {
        return;
      }
    },
    createAudioSample() {
      this.audio = {
        a: this.activeSoundBank.second,
        b: this.activeSoundBank.first
      };
    },
    soundBit() {
      this.isAccentNow ? this.audio.a.play() : this.audio.b.play();
    },
    stopSound() {
      if (!this.isAccentNow) {
        this.audio.a.currentTime = 0;
        this.audio.a.pause();
        this.audio.b.currentTime = 0;
        this.audio.b.pause();
      };
    },
    createTestBlink() {
      if (!this.blinkStatus) {
        this.blinkStatus = true;
        this.tickCounter += 1;
      } else {

        setTimeout(() => {
          this.stopSound();
          this.blinkStatus = false;
        }, this.onebitLength / 15);
      }
    }
  },
  mounted: function () {
    this.setBitNodeWidth();
    this.createBitNodes();
    this.createAudioSample();
    this.createBit();
  },
  computed: {
    ret() {
      return this.blinkStatus;
    },
    tickIndex() {
      return this.tickCounter % 4;
    },
    currentBpm() {
      return this.bpm;
    },
    toNum() {
      return +this.bpm;
    }
  }
});

new Vue({
  el: '#app',
  data: {
    soundsURL: [
      {
        name: 'kit1',
        strong: new Audio('https://s3.amazonaws.com/iamjoshellis-codepen/pens-of-rock/drums/Snare.mp3'),
        weak: new Audio('https://s3.amazonaws.com/iamjoshellis-codepen/pens-of-rock/drums/Hi-Hat-Closed.mp3')
      }
    ]
  }
});
