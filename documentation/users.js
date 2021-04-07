/**
 * @api {post} /user/login Iniciar Sesión
 * @apiVersion 0.1.0
 * @apiName Inicio de sesión
 * @apiGroup Usuario
 * @apiDescription Ruta que nos permite generar un token para poder utilizar las APIs que requieren token.
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam (Body){String} Email Correo Electronico del usuario.
 * @apiParam (Body){String} Password Contraseña para acceder a la aplicación.
 *
 * @apiParamExample {json} Ejemplo de solicitud:
 *      {
 *          "email": "masanchez@compusoluciones.com",
 *          "password": "12345"
 *      }
 *
 * @apiSuccess (200) {String} token para poder utilizar las APIs que requieren token con vigencia de 1 año.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hdXJvIEVkdWFyZG8iLCJsYXN0X25hbWUiOiJTw6FuY2hleiBTaW1lbnRhbCIsImVtYWlsIjoibWFzYW5jaGV6QGNvbXB1c29sdWNpb25lcy5jb20iLCJvd25lcl9jb21wYW55X2lkIjoxLCJidXNpbmVzc19uYW1lIjoiQ29tcHVzb2x1Y2lvbmVzIiwiaWF0IjoxNTk4Mjk1MzM0LCJleHAiOjE2Mjk4MzEzMzR9.tonRla0M6aYFALAUHuwDo8h1vTu285qYp_1r6oRcmd8"
 *      }
 * @apiError (400) {String} status Código de error.
 * @apiError (400) {String} message Mensaje de error.
 * @apiError (400) {Array} data Objeto con informacion de la operacion.
 * @apiError (400) {String} [data[email]] Correo Electronico del usuario con el cual se realizo la operación.
 *
 * @apiErrorExample Error-Response:
 *      HTTP/1.1 400 Bad Request
 *      {
 *          "status": 400,
 *          "message": "Has ingresado un correo de usuario o contraseña no válido.",
 *          "data": {
 *              "email": "masanchez@compusoluciones.com"
 *           }
 *      }
 */
