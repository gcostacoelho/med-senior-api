import * as bcrypt from 'bcrypt'

export class Cuidador {
    private nome: string;
    private telefone: string;
    private dataNasc: Date;
    private codigoIdoso: string
    private email: string;
    private senha: string;

    constructor(
        nome: string,
        telefone: string,
        dataNasc: Date,
        codigoIdoso: string,
        email: string,
        senha: string,
    ) {
        this.nome = nome;
        this.telefone = telefone;
        this.dataNasc = dataNasc;
        this.codigoIdoso = codigoIdoso
        this.email = email;
        this.senha = senha;
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