export class Medicacao { 
    private nome: string
    private modoAdm: string
    private descricao: string
    private estoque: number
    private falhas: Array<Date>
    private idosoId: string

    constructor (
        nome: string,
        modoAdm: string,
        descricao: string,
        idosoId: string
    ){
        this.nome = nome;
        this.modoAdm = modoAdm,
        this.descricao = descricao,
        this.idosoId = idosoId
    }
    
    public async aumentarEstoque(qtde: number): Promise<void>{
        this.estoque += qtde;
    } 

    public async diminuirEstoque(qtde: number): Promise<boolean>{
        if (this.estoque == 0){
            return true;
        }else{
            this.estoque -= qtde;
            return true;
        }
    }
}