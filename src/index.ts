import "dotenv/config";                                // carga las variables del archivo .env
import app from "./app";                               // trae la aplicación configurada

const PORT = process.env.PORT || 3000;                 // usa el puerto del .env, o 3000 si no hay

app.listen(PORT, () => {                               // enciende el servidor
  console.log(`Servidor en http://localhost:${PORT}`); // avisa en la terminal que arrancó
});