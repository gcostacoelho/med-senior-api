import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificacaoService } from 'src/Services/notificacao.service';

@ApiTags('Notificacao')
@Controller('notificacao')
export class NotificacaoController {
    constructor(private readonly notificacaoService: NotificacaoService) { }
}
