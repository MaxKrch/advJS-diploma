import Vampire from '../characters/Vampire';
import Undead from '../characters/Undead';
import Daemon from '../characters/Daemon';

import { characterGenerator, generateTeam } from '../generators';

const listCharacters = [Vampire, Undead, Daemon];

test("create 11 characters", () => {
	const generatorCharacter = characterGenerator(listCharacters, 5);
	const characters = [];

	for(let i = 0; i < 11; i++) {
		const newCharacter = generatorCharacter.next().value;
		characters.push(newCharacter);
	}

	const received = characters.length;
	const expected = 11;

	expect(received).toBe(11)

})



test("created characters is currect levels", () => {
	const newTeam = generateTeam(listCharacters, 5, 9);

	const levelsCharacters = []; 

	for (let i = 0; i < newTeam.team.length; i++) {
		levelsCharacters.push(newTeam.team[i].level);
	}

	const minLvl = Math.min(...levelsCharacters);
	const maxLvl = Math.max(...levelsCharacters);

	expect(minLvl > 0 && maxLvl <= maxLvl).toBeTruthy();

})