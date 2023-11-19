export class Sintoma { 
    private descricao: string
    private idosoId: string
    private ocorrencia: Array<Date>

    constructor (
        descricao: string,
        idosoId: string,
        ocorrencia: Array<Date>
    ){
        this.descricao = descricao,
        this.idosoId = idosoId,
        this.ocorrencia = ocorrencia
    }

    public async adcionarOcorrencia(data: Date): Promise<void>{
        this.ocorrencia.push(data);
    }

}