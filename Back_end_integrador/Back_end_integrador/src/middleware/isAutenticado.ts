import { Request, Response, NextFunction } from 'express';
import { verify, Secret } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

declare module 'express' {
    interface Request {
        user_id?: string;
    }
}

export function isAutenticado(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const autToken = req.headers.authorization;

    if (!autToken) {
        return res.status(401).json({ dados: 'Token Inválido' });
    }

    const [, token] = autToken.split(' ');

    if (!token || token === '' || token === 'null') {
        return res.status(401).json({ dados: 'Token Inválido' });
    }

    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET as Secret
        ) as Payload;
        req.user_id = sub;
        return next();
    } catch (err) {
        return res.status(401).json({ dados: 'Token Inválido ou Expirado' });
    }
}

