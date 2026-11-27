import pool from "../config/database";                              // la conexión a la base
import { hashPassword, comparePassword } from "../utils/password";  // encriptar y comparar contraseñas
import { generateToken } from "../utils/jwt";                       // crear el token

// ==================== REGISTRO ====================

export interface RegisterData {   // los datos que trae el registro
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const email = data.email.trim().toLowerCase();           // email en minúscula y sin espacios

  const existing = await pool.query(                       // ¿ya existe ese email?
    "SELECT id FROM users WHERE email = $1",
    [email]
  );
  if (existing.rows.length > 0) {                          // si existe, no crea nada
    return null;
  }

  const passwordHash = await hashPassword(data.password);  // encripta la contraseña

  const result = await pool.query(                         // guarda el usuario
    `INSERT INTO users (first_name, last_name, email, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, first_name, last_name, email`,
    [data.firstName.trim(), data.lastName.trim(), email, passwordHash]
  );

  return result.rows[0];                                   // devuelve el usuario creado
}

// ==================== LOGIN ====================

export async function loginUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();      // email en minúscula y sin espacios (igual que en el registro)

  const result = await pool.query(                         // busca el usuario por email
    "SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = $1",
    [normalizedEmail]
  );
  const user = result.rows[0];                             // el usuario encontrado (o undefined si no existe)
  if (!user) {
    console.log("Login fallido: el email no existe");          // ← solo lo ves vos en la terminal
    return null;
  }

  const passwordOk = await comparePassword(password, user.password_hash);
  if (!passwordOk) {
    console.log("Login fallido: contraseña incorrecta");       // ← solo lo ves vos en la terminal
    return null;
  }

  const token = generateToken(user.id);                    // crea el token con el id del usuario

  return {                                                 // devuelve el token y los datos del usuario
    token,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,                                   // sin la contraseña, nunca se devuelve
    },
  };
}
// ==================== QUIÉN SOY ====================

export async function getUserById(id: string) {
  const result = await pool.query(                                  // busca el usuario por id
    "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
    [id]
  );
  const user = result.rows[0];

  if (!user) {                                                      // si no existe (ej.: lo borraron)
    return null;
  }

  return {                                                          // sus datos, sin contraseña
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  };
}