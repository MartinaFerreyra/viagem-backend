# VIAGEM — Backend

## Descripción

VIAGEM es una aplicación de billetera multidivisa simulada,
diseñada para viajeros que necesitan gestionar diferentes
monedas desde una única plataforma.

El backend se encarga de gestionar la lógica de negocio,
la comunicación con la base de datos y los servicios
consumidos por el frontend mediante una API REST.

Este proyecto forma parte del Proyecto Final de la carrera
Full Stack Developer de Henry.

## Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL
- Railway
- Swagger / OpenAPI
- Git y GitHub
- dotenv
- CORS

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/MartinaFerreyra/viagem-backend.git
```

Ingresar al directorio del proyecto:

```bash
cd viagem-backend
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto,
utilizando `.env.example` como referencia.

```env
PORT=3000
DATABASE_URL=
```

La variable DATABASE_URL debe contener la cadena de
conexión a PostgreSQL.

Las credenciales de acceso no deben compartirse
públicamente ni subirse al repositorio.

## Ejecución del proyecto

### Modo desarrollo

```bash
npm run dev
```

### Compilación

```bash
npm run build
```

### Modo producción

```bash
npm start
```

## Base de datos

El proyecto utiliza PostgreSQL, alojado en Railway.

### Tablas

| Tabla | Descripción |
| --- | --- |
| users | Información de los usuarios. |
| wallets | Billeteras asociadas a los usuarios. |
| balances | Saldos disponibles por moneda. |
| transactions | Registro de movimientos y conversiones. |

### Relaciones

- Un usuario puede tener una única billetera.
- Una billetera pertenece a un usuario.
- Una billetera puede tener múltiples saldos.
- Una billetera puede tener múltiples transacciones.
- Cada moneda es única dentro de una misma billetera.

### Modelo relacional

```text
users
  |
  | 1:1
  |
wallets
  |
  |--- 1:N --- balances
  |
  |--- 1:N --- transactions
```

### Scripts SQL

Los scripts de creación de las tablas se encuentran
en el directorio `src/database/`.

Deben ejecutarse en el siguiente orden:

1. 000_create_users.sql
2. 001_create_wallets.sql
3. 002_create_balances.sql
4. 003_create_transactions.sql

La base de datos utiliza claves primarias UUID,
claves foráneas y restricciones de integridad.

## API REST

### Health Check

```http
GET /health
```

Permite comprobar el estado del servidor y,
en la versión actual de desarrollo, verificar
la conexión con PostgreSQL.

Respuesta esperada:

```json
{
  "status": "ok",
  "database": "connected"
}
```

## Documentación de la API

La documentación se realiza mediante Swagger y OpenAPI 3.0.

Entorno local:

http://localhost:3000/api-docs

Entorno de producción:

https://viagem-backend-production.up.railway.app/api-docs

La documentación en producción estará disponible
una vez integrados y desplegados los cambios.

## Despliegue

El backend y la base de datos están alojados en Railway.

URL pública del backend:

https://viagem-backend-production.up.railway.app

El despliegue del backend está vinculado a la rama `main`.

## Control de versiones

- main: versión de producción.
- develop: integración de funcionalidades.
- feature/*: desarrollo de funcionalidades individuales.

Los cambios se integran mediante Pull Requests.

## Estado del proyecto

Actualmente implementado en la rama de desarrollo
de base de datos:

- Configuración del servidor Express.
- Conexión con PostgreSQL.
- Modelo relacional de la base de datos.
- Scripts SQL de creación de tablas.
- Verificación de conexión mediante Health Check.
- Documentación interactiva con Swagger.

Funcionalidades en desarrollo o pendientes de integración:

- Registro y autenticación de usuarios.
- Gestión de billeteras.
- Consulta de saldos.
- Depósitos y retiros simulados.
- Conversión de monedas.
- Historial de transacciones.

## Proyecto académico

Proyecto Final — Full Stack Developer — Henry.



