// export default Band
import fs from "fs"

const Bands = [];

class Band {

  name;
  infoText;
  yearCreated;
  yearDissolved;
  bandMemebers

  constructor(name, infoText, yearCreated, yearDissolved = 0, bandMemebers = []) {
    this.name = name;
    this.infoText = infoText;
    this.yearCreated = yearCreated;
    this.yearDissolved = yearDissolved;
    this.bandMemebers = bandMemebers;
  }

  static createBand(name, infoText, yearCreated, yearDissolved = 0, bandMemebers) {
    return new Band(name, infoText, yearCreated, yearDissolved = 0, bandMemebers)
  }
  static addBand(name, infoText, yearCreated, yearDissolved, bandMemebers) {
    const newBand = new Band(name, infoText, yearCreated, yearDissolved, bandMemebers);
    Bands.push(newBand);

    fs.writeFileSync("Bands.json", JSON.stringify(Bands, null, 2), "utf-8");

    console.log("Band added successfully.");
  }

}

//Testdata
Band.addBand('Albin', 'HejsanHejsa', 1990, 1999, ['Albin', 'Pelle']);