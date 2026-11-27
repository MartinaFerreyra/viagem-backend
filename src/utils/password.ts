import bcrypt from "bcrypt";                    // trae la librería que encripta contraseñas

const SALT_ROUNDS = 10;                         // vueltas de triturado (10 es el estándar)

export async function hashPassword(password: string): Promise<string> {   // encripta (para el registro)
  return bcrypt.hash(password, SALT_ROUNDS);                               // devuelve el hash
}

export async function comparePassword(password: string, hash: string): Promise<boolean> { // compara (para el login)
  return bcrypt.compare(password, hash);                                                    // devuelve true o false
}