import { createTournament } from "./application/CreateTournament";

async function run() {
  try {
    createTournament.call();
  } catch (e) {
    console.error(e);
  }
}

run();
