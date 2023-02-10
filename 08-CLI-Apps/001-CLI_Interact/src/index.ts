import * as interact from 'cli-interact';

try {
    let answer = interact.question('What is your favorite food? :');
    console.log(answer);
} catch (e) {
    console.error(e);
}