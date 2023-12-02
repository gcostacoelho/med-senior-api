import * as bcrypt from 'bcrypt';

export class Idoso {
    private nome: string;
    private telefone: string;
    private dataNasc: Date;
    private email: string;
    private senha: string;
    private doencas: Array<string>

    constructor(
        nome: string,
        telefone: string,
        dataNasc: Date,
        email: string,
        senha: string,
        doencas: Array<string>
    ) {
        this.nome = nome;
        this.telefone = telefone;
        this.dataNasc = dataNasc;
        this.email = email;
        this.senha = senha;
        this.doencas = doencas;
    }


    /**
    * encriptyPassword
    */
    public async encriptyPassword(): Promise<string> {
        const saltOrRounds = 10;
        const password = this.senha;
        const hash = await bcrypt.hash(password, saltOrRounds);

        return hash;
    }

    /**
     * compareHashWithPass
     */
    public async compareHashWithPass(hash: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(this.senha, hash);

        return isMatch;
    }
}