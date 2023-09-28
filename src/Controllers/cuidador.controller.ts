import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CuidadorService } from 'src/Services/cuidador.service';

@ApiTags('Cuidador')
@Controller('cuidador')
export class CuidadorController {
    constructor(private readonly cuidadorService: CuidadorService) { }
}
