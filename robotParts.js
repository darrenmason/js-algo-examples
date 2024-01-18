/*

All robots are made of the same types of parts, and we have a string of all of the parts required to form a complete robot. 
Given a list of available parts, return the collection of robot names for which we can build at least one complete robot.

N: Number of elements in `all_parts`
K: Number of robots
M: Number of elements in `required_parts`

Time Complexity:

O(N + K * M)

*Can be approximated as O(N) if the number of required parts in relation to the number of parts/robots is negligible.

Space Complexity:

O(N)
based on the growth of the robots object


*/


function extractRobotName(part) {
  return part.split("_")[0];
}

function get_robots(all_parts, required_parts) {
  const requiredPartsArray = required_parts.split(",");
  const robots = {};

  for (let part of all_parts) {
    const robotName = extractRobotName(part);

    if (!robots.hasOwnProperty(robotName)) {
      robots[robotName] = [];
    }

    robots[robotName].push(part);
  }

  const result = [];

  for (let robotName in robots) {
    const parts = robots[robotName];
    const hasAllRequiredParts = requiredPartsArray.every(requiredPart =>
      parts.includes(`${robotName}_${requiredPart}`)
    );

    if (hasAllRequiredParts) {
      result.push(robotName);
    }
  }

  return result;
}

// test usage:

const all_parts = [
  "Rosie_claw",
  "Rosie_sensors",
  "Optimus_sensors",
  "Dustie_case",
  "Rust_sensors",
  "Rosie_case",
  "Rust_case",
  "Optimus_speaker",
  "Rosie_wheels",
  "Rosie_speaker",
  "Dustie_case",
  "Dustie_arms",
  "Rust_claw",
  "Dustie_case",
  "Dustie_speaker",
  "Optimus_case",
  "Optimus_wheels",
  "Rust_legs",
  "Optimus_sensors"
];

const required_parts_1 = "sensors,case,speaker,wheels";
const required_parts_2 = "sensors,case,speaker,wheels,claw";
const required_parts_3 = "sensors,motors,claw";

console.log(get_robots(all_parts, required_parts_1)); // Output: ["Optimus", "Rosie"]
console.log(get_robots(all_parts, required_parts_2)); // Output: ["Rosie"]
console.log(get_robots(all_parts, required_parts_3)); // Output: []
