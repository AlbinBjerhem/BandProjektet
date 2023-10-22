export default Artist

class Artist {

  name;
  infoText;
  birthYear;
  activeBands;
  previousBands;
  instruments;

  constructor(name = "", infoText = "", birthYear = 0, activeBands = [], previousBands = [], instruments = []) {
    this.name = name;
    this.infoText = infoText;
    this.birthYear = birthYear;
    this.activeBands = activeBands;
    this.previousBands = previousBands;
    this.instruments = instruments;
  }

}