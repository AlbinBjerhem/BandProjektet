import { Band, Bands } from "./addBand.js"
import { Artist, Artists } from "./addArtist.js"
import { FileCheck } from "./Utility.js";
import fs from "fs"
import prompt from "prompt-sync";
const promptSync = prompt();

const filePathBands = "Bands.json";
const filePathArtists = "Artists.json";
const fileCheckerBands = new FileCheck(filePathBands);
const fileCheckerArtists = new FileCheck(filePathArtists);

export class Menu {
  constructor() {
    this.promptSync = prompt();
  }


  mainMenu() {
    while (true) {
      // console.clear();
      console.log("-----> Welcome to your artist and band collection <-----");
      console.log("\nMain Menu\n");
      console.log("1. Manage Artists");
      console.log("2. Manage Bands");
      console.log("3. Exit");

      const mainMenuChoice = this.promptSync('Enter your choice:')

      switch (mainMenuChoice) {
        case "1":
          this.artistMenu();
          break;
        case "2":
          this.bandMenu();
          break;
        case "3":
          console.log("-----> Thank you for using the program <----- \n Now exiting program!");
          return;
        default:
          console.log("Invalid choice. Please select a number between 1 - 3");
      }
    }
  }


  artistMenu() {
    while (true) {
      // console.clear();
      console.log("\nArtist Menu\n");
      console.log("1. Add Artist");
      console.log("2. Remove Artist");
      console.log("3. Show Artists");
      console.log("4. Go back to Main Menu");

      const artistMenuChoice = this.promptSync('Enter your choice: ')

      switch (artistMenuChoice) {
        case "1":
          this.addArtistInformation();
          break;
        case "2":
          this.removeArtist();
          break;
        case "3":
          this.showArtistInfo();
          break;
        case "4":
          return;
        default:
          console.log("Invalid choice. Please select a number between 1 - 4");
      }
    }
  }



  bandMenu() {
    while (true) {
      // console.clear();
      console.log("n\Band Menu\n");
      console.log("1. Add Band");
      console.log("2. Remove Band");
      console.log("3. Show Bands");
      console.log("4. Go back to Main Menu");

      const bandMenuChoice = this.promptSync('Enter your choice: ')

      switch (bandMenuChoice) {

        case "1":
          this.addBandInformation();
          break;
        case "2":
          this.removeBandInformation();
          break;
        case "3":
          this.displayBandInformation();
          break;
        case "4":
          return;
        default:
          console.log("Invalid choice. Please select a number between 1 - 4");
      }
    }
  }











  // -------------------- METODER FÖR MENYN -----------------------------

  // ------------------- LÄGGA TILL ARTIST ---------------------


  addArtistInformation() {
    console.log("You selected Add Artist");

    let name = "";

    while (name.length < 3) {
      name = this.promptSync("Type artist's name (at least 3 characters): ");
      if (name.length < 3) {
        console.log("You must type at least 3 characters.");
      }
    }

    let infoText = "";

    while (infoText.length < 5) {
      infoText = this.promptSync("Type information about the artist (at least 5 characters): ");
      if (infoText.length < 5) {
        console.log("You must type at least 5 characters.");
      }
    }

    let birthDay;
    while (true) {
      birthDay = this.promptSync("Type the artist's birthdate (yyyy-mm-dd): ");
      if (/^\d{4}-\d{2}-\d{2}$/.test(birthDay)) {
        const inputDate = new Date(birthDay);
        const currentDate = new Date();

        if (inputDate <= currentDate) {
          break;
        } else {
          console.log("The artist hasn't been born yet! Enter a valid birthdate.");
        }
      } else {
        console.log("Invalid format. Please use yyyy-mm-dd format (e.g., 1990-12-31).");
      }
    }

    const instruments = [];

    while (true) {
      const instrument = this.promptSync("Type the type of instrument the artist plays. You need to add at least one (press Enter when finished): ");
      if (instrument === "") {
        if (instruments.length > 0) {
          break;
        } else {
          console.log("Please add at least one instrument.");
        }
      } else {
        instruments.push(instrument);
        console.log(`Instrument "${instrument}" added to the artist's instruments.`);
      }
    }

    const activeBands = [];
    const previousBands = [];

    const newArtist = new Artist(name, infoText, birthDay, activeBands, previousBands, instruments);

    if (fileCheckerBands.isFileNotEmpty()) {
      let addBandChoice = false;

      while (!addBandChoice) {
        const confirm = this.promptSync("Do you want to add a band to this artist? (yes/no): ");

        switch (confirm.toLowerCase()) {
          case "yes":
            Band.listBands();
            addBandChoice = true;

            const bandID = this.promptSync("Type the ID of the band you want to add to this artist: ");
            const selectedBand = Band.getBandById(parseInt(bandID));

            if (selectedBand) {
              const artistName = newArtist.name;
              console.log("The artist's available instruments: ");

              instruments.forEach((instrument, index) => {
                console.log(`${index + 1}. ${instrument}`);
              });

              const instrumentIndex = parseInt(this.promptSync("Type the ID of the instrument played by the artist: "));

              if (instrumentIndex >= 1 && instrumentIndex <= instruments.length) {
                const selectedInstrument = instruments[instrumentIndex - 1];

                const joinYear = this.promptSync(`Enter the year ${artistName} joined the band: `);

                Artist.activeBandsAdd(newArtist, selectedBand.name, selectedInstrument, joinYear);

                Band.activeArtistsAdd(selectedBand, artistName, selectedInstrument, joinYear);

                fs.writeFileSync("Artists.json", JSON.stringify(Artists, null, 2), "utf-8");
                fs.writeFileSync("Bands.json", JSON.stringify(Bands, null, 2), "utf-8");
              } else {
                console.log("Invalid instrument selection. Please choose a valid instrument.");
              }
            } else {
              console.log("Invalid band ID. The selected band does not exist.");
            }
            break;
          case "no":
            addBandChoice = true;
            break;
          default:
            console.log("Invalid input. Please enter 'yes' or 'no'.");
        }
      }
    } else {
      console.log("\nThere are no bands in your directory. Please add bands in order to add them to artists.\n");
    }

    Artist.addArtist(name, infoText, birthDay, activeBands, previousBands, instruments);
  }
  // -------------------------------------------------------------------------------------
  // --------------------- TA BORT ARTIST --------------------

  removeArtist() {
    if (fileCheckerArtists.isFileNotEmpty()) {
      Artist.listArtists();

      let artistToRemove;

      while (true) {
        const removeArtist = this.promptSync("Type the ID of the artist you want to remove: ");
        artistToRemove = Artist.getArtistById(parseInt(removeArtist));

        if (artistToRemove) {
          break;
        } else {
          console.log("Invalid artist ID. Please enter a valid ID.");
        }
      }

      console.log(`Removing artist with ID ${artistToRemove.id} - ${artistToRemove.name}`);

      let validInput = false;

      while (!validInput) {
        const confirm = this.promptSync("Are you sure you want to remove this artist? (yes/no): ");

        switch (confirm.toLowerCase()) {
          case "yes":
            Artist.removeArtist(artistToRemove.id);
            validInput = true;
            break;
          case "no":
            validInput = true;
            break;
          default:
            console.log("Invalid input. Please enter 'yes' or 'no'.");
        }
      }
    } else {
      console.log("There are no Artists in your directory. Please add some.");
    }
  }

  // -----------------------------------------------------------------------------
  // -------------------- VISA LISTA MED ARTISTER ---------------------
  showArtistInfo() {
    if (fileCheckerArtists.isFileNotEmpty()) {
      Artist.listArtists();

      let userInput = false;

      while (!userInput) {
        const extendedInfo = this.promptSync("Do you want to see more information about the artists? (yes/no): ");

        switch (extendedInfo.toLocaleLowerCase()) {
          case "yes":
            Artist.listArtistsExtended();
            userInput = true;
            break;
          case "no":
            userInput = true;
            break;
          default:
            console.log("Invalid input. Please enter 'yes' or 'no'.");
        }
      }
    } else {
      console.log("There are no Artists in your directory. Please add some.");
    }
  }
  // ----------------------------------------------------------------------------------
  // ----------------- LÄGGA TILL BAND -------------------
  addBandInformation() {
    console.log("You selected Add Band");

    let name = "";

    while (name.length < 3) {
      name = this.promptSync("Type band's name (at least 3 characters): ");
      if (name.length < 3) {
        console.log("You must type at least 3 characters.");
      }
    }

    let infoText = "";

    while (infoText.length < 5) {
      infoText = this.promptSync("Type information about the band (at least 5 characters): ");
      if (infoText.length < 5) {
        console.log("You must type at least 5 characters.");
      }
    }

    let yearCreated;
    while (true) {
      yearCreated = this.promptSync("Type what year the band was created (yyyy): ");
      if (/^\d{4}$/.test(yearCreated)) {
        const inputYear = new Date(yearCreated);
        const currentYear = new Date();

        if (inputYear <= currentYear) {
          break;
        } else {
          console.log("The band might be created in the future but it's hard to know right now :). Please enter a valid year!");
        }
      } else {
        console.log("Invalid format. Please use yyyy (e.g., 1969).");
      }
    }

    const yearDissolved = "";
    const bandMembers = [];
    const previousMembers = [];
    Band.addBand(name, infoText, yearCreated, yearDissolved, bandMembers, previousMembers);
  }
  // ----------------------------------------------------------------------------------------
  // -------------------- TA BORT BAND --------------------
  removeBandInformation() {
    if (fileCheckerBands.isFileNotEmpty()) {
      Band.listBands();

      let bandToRemove;

      while (true) {
        const removeBand = this.promptSync("Type the ID of the band you want to remove: ");
        bandToRemove = Band.getBandById(parseInt(removeBand));

        if (bandToRemove) {
          break;
        } else {
          console.log("Invalid band ID. Please enter a valid ID.");
        }
      }

      console.log(`Removing band with ID ${bandToRemove.id} - ${bandToRemove.name}`);

      let validInput = false;

      while (!validInput) {
        const confirm = this.promptSync("Are you sure you want to remove this band? (yes/no): ");

        switch (confirm.toLowerCase()) {
          case "yes":
            Band.removeBand(bandToRemove.id);
            validInput = true;
            break;
          case "no":
            validInput = true;
            break;
          default:
            console.log("Invalid input. Please enter 'yes' or 'no'.");
        }
      }
    } else {
      console.log("There are no bands in the directory. Add some bands first.");
    }
  }
  // --------------------------------------------------------------------------------
  // ------------------------- VISA LISTA MED BAND ---------------------
  displayBandInformation() {
    if (fileCheckerBands.isFileNotEmpty()) {
      Band.listBands();

      let userInput = false;

      while (!userInput) {
        const extendedInfo = this.promptSync("Do you want to see more information about the band? (yes/no): ")

        switch (extendedInfo.toLocaleLowerCase()) {
          case "yes":
            Band.listBandsExtended();
            userInput = true;
            break;
          case "no":
            userInput = true;
            break;
          default:
            console.log("Invalid input. Please enter 'yes' or 'no'.");
        }
      }
    } else {
      console.log("There are no bands in the directory. Add some bands first.");
    }
  }

}









