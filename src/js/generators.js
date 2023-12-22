import Team from "./Team";


export function* characterGenerator(allowedTypes, maxLevel) {
		const countTypes = allowedTypes.length;
		
	while(true) {
		const indexNewCharacterCharacter = Math.floor(Math.random() * countTypes);
		const level = Math.floor(1 + (Math.random() * maxLevel));
		const ClassNewCharacter = allowedTypes[indexNewCharacterCharacter];
		let newCharacter = new ClassNewCharacter(level);
		if(level > 1) {
			newCharacter = upCharacteristic(newCharacter, level);
		}
		yield newCharacter;
	}
}

const upCharacteristic = (character, level) => {
	for(let i = 0; i < level; i += 1) {
		character.attack = Math.round(character.attack * 1.3);
		character.defence = Math.round(character.defence * 1.3);
	}
	return character;
}

export function upTeamLvl(team) {
	let newListCharacters = []
	for(let positionCharacter of team) {
		const character = positionCharacter.character;
		const health = character.health;
		character.attack = Math.round(Math.max(character.attack, character.attack * (80 + health) / 100));
		character.defence = Math.round(Math.max(character.defence, character.defence * (80 + health) / 100));
		const newHealth = health + 80;
		character.health = (newHealth > 100) ? 100 : newHealth;
		character.level += 1;
		newListCharacters.push(character);
	}
	const newTeam = new Team(newListCharacters)
	return newTeam;
}

export function generateTeam(allowedTypes, maxLevel, characterCount, name) {
	const listCharacters = [];
	const generatorCharacters = characterGenerator(allowedTypes, maxLevel);

	for(let i = 0; i < characterCount; i++) {
		const newCharacter = generatorCharacters.next().value;
		listCharacters.push(newCharacter);
	}

  const newTeam = new Team(listCharacters);
  return newTeam;
}
