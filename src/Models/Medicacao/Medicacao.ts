export class Medicacao { 
    nome: string
    modoAdm: string
    descricao: string
    estoque: number
    falhas: Array<Date>
    idosoId: string

    constructor (
        nome: string,
        modoAdm: string,
        descricao: string,
        idosoId: string,
        falhas: Array<Date>,
        estoque: number
    ){
        this.nome = nome;
        this.modoAdm = modoAdm;
        this.descricao = descricao;
        this.idosoId = idosoId;
        this.falhas = falhas;
        this.estoque = estoque;
    }
    
    public async aumentarEstoque(qtde: number): Promise<void>{
        this.estoque += qtde;
    } 

    public diminuirEstoque(qtde: number): boolean{
        if (this.estoque == 0){
            return false;
        }else{
            this.estoque -= qtde;
            return true;
        }
    }
}