import { Medicacao } from '../Medicacao/Medicacao';

export class UsoMedicacao {
    dosagem: number
    intervalo: number
    horaInicial: Date
    dataFinal: Date
    idosoId: string
    medicacao: Medicacao
    tomar: Date

    constructor(
        dosagem: number,
        intervalo: number,
        horaInicial: Date,
        idosoId: string,
        dataFinal: Date,
        medicacao: Medicacao
    ) {
        this.dosagem = dosagem;
        this.intervalo = intervalo;
        this.horaInicial = horaInicial;
        this.idosoId = idosoId;
        this.dataFinal = dataFinal;
        this.medicacao = medicacao;
    }

    public calcularDia(): boolean {
        var horaProximoConsumo = new Date(this.horaInicial.getTime() + this.intervalo * 60 * 60 * 1000);

        if (horaProximoConsumo < this.dataFinal) {
            var meiaNoiteAtual = new Date();
            meiaNoiteAtual.setHours(23, 59, 59, 999);
            if (horaProximoConsumo <= meiaNoiteAtual) {
                this.tomar = horaProximoConsumo;
                return true;
            } else{
                return false;
            }
        }
    }

}