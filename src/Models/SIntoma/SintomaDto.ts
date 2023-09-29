import { ApiProperty } from "@nestjs/swagger";

export class SintomaDto {
    @ApiProperty()
    descricao: string

    @ApiProperty()
    ocorrencia: Array<Date>

}