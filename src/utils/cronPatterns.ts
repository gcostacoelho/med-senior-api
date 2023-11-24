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

export function cronPatternUsoMedicacao(dateObject: Date): string {
    try {
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