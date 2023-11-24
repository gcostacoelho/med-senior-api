export function cronPatternConsult(date: Date): string {
    try {
        const dateObject = new Date(date);

        const minutos = dateObject.getUTCMinutes();
        const hora = dateObject.getUTCHours();
        const diaDoMes = dateObject.getUTCDate();
        const mes = dateObject.getUTCMonth() + 1; // Os meses são baseados em zero, então adicionamos 1

        return `${minutos} ${hora} ${diaDoMes} ${mes} *`;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export function cronPatternUsoMedicacao(intervalo: number): string {
    try {
        // TODO: utilizar a datas final para montar o cron pattern 

        const hora = intervalo.toString().split('.');

        let horas = parseInt(hora[0])
    
        // Limita o máximo de horas para 23
        if (horas > 23) {
            horas = 23;
        }
    
        return `0 */${horas} * * *`;
    } catch (error) {
        return "";
    }
}