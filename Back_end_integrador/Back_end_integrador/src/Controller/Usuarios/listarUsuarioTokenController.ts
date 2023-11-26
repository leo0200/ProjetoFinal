import { Request, Response } from 'express';
import { ListarUsuarioTokenServices } from '../../Services/Usuarios/ListarUsuarioTokenServices';

// fiz uma interface para estender o tipo Request
interface RequestWithUserId extends Request {
  user_id: string; 
}

class ListarUsuarioTokenController {
  async handle(req: RequestWithUserId, res: Response) {
    const id = req.user_id;
    const listarUsuarioToken = new ListarUsuarioTokenServices();
    const resposta = await listarUsuarioToken.execute({
      id
    });
    return res.json(resposta);
  }
}

export { ListarUsuarioTokenController };
