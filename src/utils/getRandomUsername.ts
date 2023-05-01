import { generate } from 'canihazusername';

function getRandomUsername() {
  const username = generate('{character}_{english}');
  const getRandomNumber = () => Math.round(Math.random() * 100);
  return `${username}${getRandomNumber()}`;
}
export default getRandomUsername;
