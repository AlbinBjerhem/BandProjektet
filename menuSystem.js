import { Band } from "./addBand.js"
import { Artist } from "./addArtist.js"
import fs from "fs"
import prompt from "prompt-sync";
const promptSync = prompt();

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
      console.log("Artist Menu\n");
      console.log("1. Add Artist");
      console.log("2. Remove Artist");
      console.log("3. Show Artists");
      console.log("4. Go back to Main Menu");

      const artistMenuChoice = this.promptSync('Enter your choice: ')

      switch (artistMenuChoice) {
        case "1":
          console.log("You selected Add Artist");
          const name = this.promptSync("Type artists name: ");
          const infoText = this.promptSync("Type artist information: ");

          let birthDay;
          while (true) {
            birthDay = this.promptSync("Type when the artist was borne (yyyy-mm-dd): ");
            if (/^\d{4}-\d{2}-\d{2}$/.test(birthDay)) {
              const inputDate = new Date(birthDay);
              const currentDate = new Date();

              if (inputDate <= currentDate) {
                break;
              } else {
                console.log("The artist haven´t been borne yet! Enter valid birthday.");
              }
            } else {
              console.log("Invalid format. Please use yyyy-mm-dd format (e.g., 1990-12-31).");
            }
          }

          const activeBands = [];
          const previousBands = [];
          const instruments = [];

          while (true) {
            const instrument = this.promptSync("Type the type of instrument the artist plays, you need to at least add one (press enter when finished): ");
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


          Artist.addArtist(name, infoText, birthDay, activeBands, previousBands, instruments)
          break;
        case "2":
          Artist.listArtists();

          let artistToRemove;

          while (true) {
            const removeArtist = this.promptSync("Type the ID of the artist you want to remove: ");
            artistToRemove = Artist.getArtistById(parseInt(removeArtist));

            if (artistToRemove) {
              break; // Exit the loop if a valid artist is found
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
          break;
        case "3":
          Artist.listArtists();

          let userInput = false;

          while (!userInput) {
            const extendedInfo = this.promptSync("Do you want to see more information about the artists? (yes/no): ")

            switch (extendedInfo.toLocaleLowerCase()) {
              case "yes":
                Artist.listArtistsExtended();
                userInput = true;
              case "no":
                userInput = true;
                break;
              default:
                console.log("Invalid input. Please enter 'yes' or 'no'.");
            }
          }
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
      console.log("Band Menu\n");
      console.log("1. Add Band");
      console.log("2. Remove Band");
      console.log("3. Show Bands");
      console.log("4. Go back to Main Menu");

      const bandMenuChoice = this.promptSync('Enter your choice: ')

      switch (bandMenuChoice) {
        case "1":
          console.log("You selected Add Band");
          const name = promptSync("Type bands name: ")
          const infoText = promptSync("Type in band information: ");
          const yearCreated = promptSync("Type in the year tha band whas created: ");
          const yearDissolved = promptSync("What year was the band dissolved: ");
          const bandMemebers = promptSync("Who are the bands members: ");
          Band.addBand(name, infoText, yearCreated, yearDissolved, bandMemebers)
          break;
        case "2":
          Band.listBands();

          let bandToRemove;

          while (true) {
            const removeBand = this.promptSync("Type the ID of the band you want to remove: ");
            bandToRemove = Band.getBandById(parseInt(removeBand));

            if (bandToRemove) {
              break; // Exit the loop if a valid band is found
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
          break;

        case "3":
          Band.listBands();
          break;
        case "4":
          return;
        default:
          console.log("Invalid choice. Please select a number between 1 - 4");
      }
    }
  }
}