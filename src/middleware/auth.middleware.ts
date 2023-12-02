import axios from 'axios';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.headers.authorization) {
                const token: string = req.headers.authorization.split(" ")[1];
                const url = process.env.IP_ADDRESS || "localhost"
                
                const { data, status } = await axios.get(`http://${url}:5001/authentication/validate/${token}`);

                return status == 200 ? next() : res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized');
            }

           return res.status(HttpStatus.UNAUTHORIZED).json('Unauthorized');

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    }
}