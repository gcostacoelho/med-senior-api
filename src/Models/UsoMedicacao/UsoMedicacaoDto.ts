import { ApiProperty } from "@nestjs/swagger";
import { MedicacaoDto } from "../Medicacao/MedicacaoDto";

export class UsoMedicacaoDto {
    @ApiProperty()
    dosagem: number

    @ApiProperty()
    intervalo: number

    @ApiProperty()
    horaInicial: Date

    @ApiProperty()
    dataFinal: Date

    @ApiProperty()
    idosoId: string

    @ApiProperty()
    medId: string
}
// Response
export class UsoMedicacaoResponseDto {
    @ApiProperty()
    dosagem: number;
  
    @ApiProperty()
    intervalo: number;
  
    @ApiProperty()
    horaInicial: Date;
  
    @ApiProperty()
    dataFinal: Date;
  
    @ApiProperty()
    idosoId: string;
  
    @ApiProperty()
    medId: string;
  
    @ApiProperty()
    medicacao: MedicacaoDto; // Apenas na resposta
}