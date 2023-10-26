// import { Band } from "./addBand.js"
// import { Artist } from "./addArtist.js"
// import prompt from "prompt-sync";
// const promptSync = prompt();

//Test för att se att det går att kalla på metoden från addBand
// Band.addBand('Testband', 'Testestet', 2000, 0, ['Hans', 'Kalle']);




// Artist.addArtist('Jens', 'Har en bil', 1992, 'Arn', 'Leif', ['Gitarr', 'Bas']);


// function mainMenu() {
//   const promptSync = prompt();

//   while (true) {
//     console.clear
//     console.log("-----> Welcome to your artist and band collection <-----");
//     console.log("\nMake a selection from the menu below:\n");
//     console.log("1. Add Musician");
//     console.log("2. Add Band");
//     console.log("3. Remove Musician");
//     console.log("4. Remove Band");
//     console.log("5. Exit");

//     const choice = promptSync("\nEnter your choice: ");

//     switch (choice) {
//       case "1":
//         // Hämta addartist
//         console.log("You selected 'Add Musician'");
//         break;
//       case "2":
//         // Hämta addband
//         console.log("You selected 'Add Band'");
//         break;
//       case "3":
//         // Hämta removeartist
//         console.log("You selected 'Remove Musician'");
//         break;
//       case "4":
//         // Hämta removeband
//         console.log("You selected 'Remove Band'");
//         break;
//       case "5":
//         console.log("Exiting the program.");
//         return;
//       default:
//         console.log("Invalid choice. Please select between 1 - 5");
//     }
//   }
// }

// mainMenu();


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

      // ------------------- LÄGGA TILL ARTIST ---------------------

      case "1":
        console.log("You selected Add Artist");

        let name = "";

        while (name.length < 3) {
          name = this.promptSync("Type artists name (at least 3 characters): ")
          if (name.length < 3) {
            console.log("You must type at least 3 characters.");
          }
        }

        let infoText = "";

        while (infoText.length < 5) {
          infoText = this.promptSync("Type information about the artist (at least 5 characters): ")
          if (infoText.length < 5) {
            console.log("You must type at least 5 characters.");
          }
        }

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

        const activeBands = [];
        const previousBands = [];

        const filePath = "Bands.json";
        const fileChecker = new FileCheck(filePath);

        if (fileChecker.isFileNotEmpty()) {
          let addBandChoice = false;

          while (!addBandChoice) {
            const confirm = this.promptSync("Do you want to add a band to this artist? (yes/no): ");

            switch (confirm.toLowerCase()) {
              case "yes":
                Band.listBands();
                addBandChoice = true;

                const bandID = this.promptSync("Enter the ID of the band to add to the artist: ");
                const selectedBand = Band.getBandById(bandID);

                if (selectedBand) {
                  const artistName = newArtist.name;
                  const instrument = this.promptSync(`Enter the instrument ${artistName} plays in the band: `);
                  const joinYear = this.promptSync(`Enter the year ${artistName} joined the band: `);

                  newArtist.associateWithBand(selectedBand.name, instrument, joinYear);

                  selectedBand.addActiveMember(artistName, instrument, joinYear);

                  fs.writeFileSync("Artists.json", JSON.stringify(Artists, null, 2), "utf-8");
                  fs.writeFileSync("Bands.json", JSON.stringify(Bands, null, 2), "utf-8");
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
          console.log("There are no bands in your directory. Please add bands in order to add them to artists.");
        }



        Artist.addArtist(name, infoText, birthDay, activeBands, previousBands, instruments)
        break;

      // --------------------- TA BORT ARTIST --------------------


      case "2":
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
        break;


      // -------------------- VISA LISTA MED ARTISTER ---------------------


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

      // -------------------- TILLBAKA TILL HUVUDMENY -------------------

      case "4":
        return;
      default:
        console.log("Invalid choice. Please select a number between 1 - 4");
    }
  }
}