import { Band } from "./addBand.js"
import { Artist } from "./addArtist.js"
import prompt from "prompt-sync";
const promptSync = prompt();

//Test för att se att det går att kalla på metoden från addBand
Band.addBand('Testband', 'Testestet', 2000, 0, ['Hans', 'Kalle']);




Artist.addArtist('Jens', 'Har en bil', 1992, 'Arn', 'Leif', ['Gitarr', 'Bas']);





