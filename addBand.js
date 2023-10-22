export default Band

class Band {

  name;
  infoText;
  yearCreated;
  yearDissolved;
  bandMemebers

  constructor(name = "", infoText = "", yearCreated = 0, yearDissolved = 0, bandMemebers = []) {
    this.name = name
    this.infoText = infoText
    this.yearCreated = yearCreated
    this.yearDissolved = yearDissolved
    this.bandMemebers = bandMemebers
  }


}