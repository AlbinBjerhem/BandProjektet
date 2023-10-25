import fs from "fs";

let Artists = [];

export class Artist {

  static nextArtistId = 1;

  static loadArtists() {
    try {
      const data = fs.readFileSync("Artists.json", "utf-8");
      Artists = JSON.parse(data);

      Artist.nextArtistId = Math.max(0, ...Artists.map((artist) => artist.id)) + 1;
    } catch (error) {
      Artist.nextArtistId = 1;
    }
  }

  static listArtists() {
    console.log("List of Artists:");
    Artists.forEach((artist) => {
      console.log(`ID: ${artist.id}, Name: ${artist.name}`);
    });
  }

  static getArtistById(id) {
    return Artists.find((artist) => artist.id === id);
  }

  static removeArtist(id) {
    const index = Artists.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      Artists.splice(index, 1);
      fs.writeFileSync("Artists.json", JSON.stringify(Artists, null, 2), "utf-8");
      console.log(`Artist with ID ${id} removed successfully.`);
    } else {
      console.log(`Artist with ID ${id} not found.`);
    }
  }

  constructor(name, infoText, birthDay, activeBands = "", previousBands = "", instruments = []) {
    this.id = Artist.nextArtistId++;
    this.name = name;
    this.infoText = infoText;
    this.birthDay = birthDay;
    this.activeBands = activeBands;
    this.previousBands = previousBands;
    this.instruments = instruments;
  }

  static createArtist(name, infoText, birthDay, activeBands = "", previousBands = "", instruments = []) {
    return new Artist(name, infoText, birthDay, activeBands, previousBands, instruments);
  }

  static addArtist(name, infoText, birthDay, activeBands, previousBands, instruments) {
    const newArtist = new Artist(name, infoText, birthDay, activeBands, previousBands, instruments);
    Artists.push(newArtist);

    fs.writeFileSync("Artists.json", JSON.stringify(Artists, null, 2), "utf-8");

    console.log("Artist added successfully.");
  }
}

Artist.loadArtists();

