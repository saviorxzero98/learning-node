import * as bcrypt from 'bcrypt';

let runHashSample = async (password: string, saltRounds: number) => {
    console.log(`Plain text: ${password}`);

    let salt = await bcrypt.genSaltSync(saltRounds);
    let hash = await bcrypt.hashSync(password, salt);

    console.log(`Hash text: ${hash}`);
}

let runVerfiySample = async (password: string, hash: string)  => {
    let isPass = await bcrypt.compareSync(password, hash);
    console.log(`Is pass: ${isPass}`);
}

const passwordPlainText = '123456789';
runHashSample(passwordPlainText, 11)
    .then(() => {
        runVerfiySample(`123456789`, `$2b$11$vwnX7VXsvCQKiRfvj2NzDOdFEuRUNt3CVmMqF1Enm1zHCPIyvjHIC`);
    });

