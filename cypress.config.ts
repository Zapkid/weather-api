import { defineConfig } from "cypress";
import * as fs from "fs";
import * as path from "path";

const directory = "cypress/fixtures";

export default defineConfig({
  // experimentalInteractiveRunEvents: true,
  e2e: {
    baseUrl: 'https://www.weatherapi.com/api-explorer.aspx#search',
    setupNodeEvents(on, config) {
      on("before:spec", (details) => {
        removeFixtures();
      });
    },
  },
});

function removeFixtures() {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

