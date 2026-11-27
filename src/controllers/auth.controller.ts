import { Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "../services/auth.service";  // + getUserById
import { AuthRequest } from "../middlewares/auth.middleware";                     // + el tipo con userId

// ==================== REGISTRO ====================

export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;               // datos que llegan

  if (!firstName || !lastName || !email || !password) {                    // ¿falta algo?
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);            // ¿formato de email?
  if (!emailValido) {
    return res.status(400).json({ error: "El email no es válido" });
  }

  if (password.length < 8) {                                               // ¿mínimo 8 caracteres?
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  try {
    await registerUser({ firstName, lastName, email, password });          // crea el usuario
    return res.status(201).json({                                          // mismo mensaje siempre
      message: "Registro recibido. Ya podés iniciar sesión.",
    });
  } catch (error) {
    console.error(error);                                                  // muestra el error en la terminal
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

// ==================== LOGIN ====================

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;                                    // datos que llegan

  if (!email || !password) {                                               // ¿falta alguno?
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const result = await loginUser(email, password);                       // intenta loguear

    if (!result) {                                                         // si devolvió null…
      return res.status(401).json({ error: "Email o contraseña incorrectos" }); // …mensaje genérico
    }

    return res.status(200).json(result);                                   // OK: devuelve token y usuario
  } catch (error) {
    console.error(error);                                                  // muestra el error en la terminal
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
// ==================== QUIÉN SOY ====================

export async function me(req: AuthRequest, res: Response) {
  try {
    const user = await getUserById(req.userId as string);   // usa el id que anotó el middleware

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.status(200).json({ user });                         // devuelve los datos del usuario logueado
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}