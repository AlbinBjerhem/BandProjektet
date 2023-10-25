import fs from "fs";

let Artists = [];

export class Artist {

  static nextArtistId = 1;

  static loadArtists() {
    try {
      const data = fs.readFileSync("Artists.json", "utf-8");
      Artists = JSON.parse(data);

      Artists.forEach((artist) => {
        artist.birthDay = new Date(artist.birthDay);
      });

      Artist.nextArtistId = Math.max(0, ...Artists.map((artist) => artist.id)) + 1;
    } catch (error) {
      Artist.nextArtistId = 1;
    }
  }


  static calculateAge(birthDay) {
    const today = new Date();
    const birthDayAge = new Date(birthDay);

    let age = today.getFullYear() - birthDayAge.getFullYear();

    if (
      today.getMonth() < birthDayAge.getMonth() ||
      (today.getMonth() === birthDayAge.getMonth() && today.getDate() < birthDayAge.getDate())
    ) {
      age--;
    }

    return age;
  }


  static listArtists() {
    console.log("List of Artists:");
    Artists.forEach((artist) => {
      const age = Artist.calculateAge(artist.birthDay);
      console.log(`ID: ${artist.id}, Name: ${artist.name} Age: ${age} years`);
    });
  }
  static listArtistsExtended() {
    console.log("List of Artists (Extended):");
    Artists.forEach((artist) => {
      const age = Artist.calculateAge(artist.birthDay);
      console.log(`ID: ${artist.id}, Name: ${artist.name}, Age: ${age} years`);
      console.log(`Info Text: ${artist.infoText}`);
      console.log(`Active Bands: ${artist.activeBands.join(', ')}`);
      console.log(`Previous Bands: ${artist.previousBands.join(', ')}`);
      console.log(`Instruments: ${artist.instruments.join(', ')}`);
      console.log("\n");
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

