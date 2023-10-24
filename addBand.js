import fs from "fs"

let Bands = [];

export class Band {

  static nextBandId = 1;

  static loadBands() {
    try {
      const data = fs.readFileSync("Bands.json", "utf-8");
      Bands = JSON.parse(data);

      Band.nextBandId = Math.max(0, ...Bands.map((band) => band.id)) + 1;
    } catch (error) {
      Band.nextBandId = 1;
    }
  }

  static listBands() {
    console.log("List of Bands:");
    Bands.forEach((band) => {
      console.log(`ID: ${band.id}, Name: ${band.name}`);
    });
  }

  static getBandById(id) {
    return Bands.find((band) => band.id === id);
  }

  static removeBand(id) {
    const index = Bands.findIndex((band) => band.id === id);

    if (index !== -1) {
      Bands.splice(index, 1);
      fs.writeFileSync("Bands.json", JSON.stringify(Bands, null, 2), "utf-8");
      console.log(`Band with ID ${id} removed successfully.`);
    } else {
      console.log(`Band with ID ${id} not found.`);
    }
  }

  constructor(name, infoText, yearCreated, yearDissolved = 0, bandMemebers = []) {
    this.id = Band.nextBandId++;
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

Band.loadBands();
