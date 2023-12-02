export class Consulta {
    dataHoraConsulta: Date
    local: string
    especialidade: string
    medico: string
    documentos: string
    idosoId: string

    constructor(
        dataHoraConsulta: Date,
        local: string,
        especialidade: string,
        idosoId: string,
        medico: string,
        documentos: string,
    ) {
        this.dataHoraConsulta = dataHoraConsulta;
        this.local = local;
        this.especialidade = especialidade;
        this.idosoId = idosoId;
        this.medico = medico;
        this.documentos = documentos;
    }

    public verificarSemana(datasSemana: Array<Date>): boolean {
        let resp = 0;
        
        for (let index in datasSemana) {
            if (datasSemana[index].getDate() == this.dataHoraConsulta.getDate() ) {
                resp = 1;
            }
        }

        if (resp == 0) {
            return false;
        } else {
            return true;
        }
    }


}