import { Injectable } from '@nestjs/common';
import { Crud } from 'src/Interfaces/crud.interface';
import { HttpResponse } from 'src/Types/HttpResponse';

@Injectable()
export class CuidadorService implements Crud {
    Create(data: Object): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
    Read(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
    Update(data: Object, id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
    Delete(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
}
