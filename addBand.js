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

  static activeArtistsAdd(selectedBand, artistName, instrument, joinYear) {
    selectedBand.bandMembers.push({ artistName, instrument, joinYear });
  }


  static listBands() {
    console.log("List of Bands:");
    Bands.forEach((band) => {
      console.log(`ID: ${band.id}, Name: ${band.name}`);
    });
  }

  static listBandsExtended() {
    console.log("List of Bands (Extended):");
    Bands.forEach((band) => {
      console.log(`ID: ${band.id}, Name: ${band.name}`);
      console.log(`Info Text ${band.infoText}`);

      const activeMemberInfo = band.bandMembers.map(membersInfo => {
        return `Name: ${membersInfo.artistName}, Instrument: ${membersInfo.instrument}, Started in band: ${membersInfo.joinYear}`;
      });
      console.log(`Active Members: ${activeMemberInfo.join(', ')}`);
      console.log(`Previous Members: ${band.previousMembers.join(', ')}`);
      console.log(`Year the band was disolved: ${band.yearDissolved}`);
      console.log("\n");
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

  constructor(name, infoText, yearCreated, yearDissolved = 0, bandMembers = [], previousMembers = []) {
    this.id = Band.nextBandId++;
    this.name = name;
    this.infoText = infoText;
    this.yearCreated = yearCreated;
    this.yearDissolved = yearDissolved;
    this.bandMembers = bandMembers;
    this.previousMembers = previousMembers;
  }

  static createBand(name, infoText, yearCreated, yearDissolved = 0, bandMembers = [], previousMembers = []) {
    return new Band(name, infoText, yearCreated, yearDissolved, bandMembers, previousMembers);
  }

  static addBand(name, infoText, yearCreated, yearDissolved, bandMembers, previousMembers) {
    const newBand = new Band(name, infoText, yearCreated, yearDissolved, bandMembers, previousMembers);
    Bands.push(newBand);

    fs.writeFileSync("Bands.json", JSON.stringify(Bands, null, 2), "utf-8");

    console.log("Band added successfully.");
  }
}


Band.loadBands();

export { Bands }