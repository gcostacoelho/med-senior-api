import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsultaService } from 'src/Services/consulta.service';

@ApiTags('Consulta')
@Controller('consulta')
export class ConsultaController {
    constructor(private readonly consultaService: ConsultaService) { }
}
