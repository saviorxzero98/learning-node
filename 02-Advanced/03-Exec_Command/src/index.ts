import { exec } from 'child_process';

let executeAsync = (command: string) : Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (stdout) {
                resolve(stdout);
            }

            if (stderr) {
                reject(error);
            }

            if (error) {
                reject(error);
            }
        });
    })
}


executeAsync('node --version').then((value) => {
    console.log(value);
});