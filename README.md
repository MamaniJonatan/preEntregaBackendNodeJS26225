Proyectos de Pre-Entrega: 
CLI Gestión de Productos (Node.js)
Este proyecto es una interfaz de línea de comandos (CLI) desarrollada en Node.js que interactúa con una API REST de productos mediante peticiones asíncronas (fetch). 
Permite consultar, crear y eliminar productos utilizando argumentos ingresados directamente desde la terminal (process.argv).   
🚀 Requisitos PreviosNode.js: Versión 18.x o superior.npm: Gestor de paquetes incluido con Node.js.
🛠️ Instalación y ConfiguraciónClonar el repositorio o descargar los archivos del proyecto.Abrir la terminal en la carpeta raíz del proyecto y ejecutar:npm install
Verificar que el archivo package.json tenga configurada la propiedad "type": "module" para el soporte de ESModules.
📌 Comandos DisponiblesEl proyecto se ejecuta a través del script start configurado en el package.json.   
1. Consultar todos los productosDevuelve la lista completa de productos disponibles: 
npm run start GET products
2. Consultar un producto específico
Devuelve la información de un producto pasando su ID: 
npm run start GET products/15
3. Crear un producto nuevo
Envía una petición POST con los campos: <title> <price> <category>: 
npm run start POST products T-Shirt-Rex 300 remeras
4. Eliminar un producto
Envía una petición DELETE especificando el ID a eliminar: 
npm run start DELETE products/7


⚠️ Nota Importante sobre la API (FakeStore vs. DummyJSON)La consigna original especifica el uso de la API FakeStore ([https://fakestoreapi.com](https://fakestoreapi.com)). 
Sin embargo, en ocasiones el servidor de FakeStore puede experimentar caídas temporales o bloqueos de disponibilidad (errores HTTP 521 / Cloudflare).   
¿Cómo cambiar de API si FakeStore está fuera de servicio?En el archivo index.js, en la línea 3, se encuentra definida la variable base de la URL: // Servidor principal :
const API_URL = 'https://fakestoreapi.com';

// Servidor alternativo (si FakeStore no responde):
// const API_URL = 'https://dummyjson.com';

Nota: El código está adaptado con lógica dual para soportar el formato de respuesta de ambas APIs sin romper la aplicación ni el conteo de productos. 
Si FakeStore no responde durante la corrección, se puede alternar el comentario a https://dummyjson.com.
