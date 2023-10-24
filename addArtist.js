import fs from "fs";

let nextArtistId = 1;
const Artists = [];

export class Artist {
  constructor(name, infoText, birthYear, activeBands = "", previousBands = "", instruments = []) {
    this.id = nextArtistId++;
    this.name = name;
    this.infoText = infoText;
    this.birthYear = birthYear;
    this.activeBands = activeBands;
    this.previousBands = previousBands;
    this.instruments = instruments;
  }

  static createArtist(name, infoText, birthYear, activeBands = "", previousBands = "", instruments = []) {
    return new Artist(name, infoText, birthYear, activeBands, previousBands, instruments);
  }

  static addArtist(name, infoText, birthYear, activeBands, previousBands, instruments) {
    const newArtist = new Artist(name, infoText, birthYear, activeBands, previousBands, instruments);
    Artists.push(newArtist);

    fs.writeFileSync("Artists.json", JSON.stringify(Artists, null, 2), "utf-8");

    console.log("Artist added successfully.");
  }
}

// Test data
Artist.addArtist('Albin', 'Bor i en lägenhet', 1990, 'Håkan', 'Bengt', ['Piano', 'Trummor']);
