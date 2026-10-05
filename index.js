// Si usas FakeStore: 'https://fakestoreapi.com'
// Si usas DummyJSON: 'https://dummyjson.com'
const API_URL = 'https://dummyjson.com';

const args = process.argv.slice(2);
const [method, path, ...extraArgs] = args;

async function main() {
  if (!method || !path) {
    console.log('❌ Error: Por favor especifica un método y una ruta.');
    console.log('Ejemplo de uso: npm run start GET products');
    return;
  }

  const [resource, id] = path.split('/');

  if (resource !== 'products') {
    console.log(`❌ Recurso no soportado: "${resource}". Solo se admite "products".`);
    return;
  }

  try {
    switch (method.toUpperCase()) {
      case 'GET': {
        const endpoint = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;
        
        const response = await fetch(endpoint, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          }
        });
        
        if (!response.ok) {
          console.log(`⚠️ No se pudo obtener la información (Status: ${response.status})`);
          return;
        }

        const data = await response.json();
        
        if (id) {
          if (!data || Object.keys(data).length === 0) {
            console.log(`⚠️ No se encontró el producto con ID: ${id}`);
          } else {
            console.log('📦 Producto encontrado:');
            console.log(data);
          }
        } else {
          // Extraemos el array y el total según la API utilizada
          const productsList = Array.isArray(data) ? data : (data.products || []);
          const totalCount = Array.isArray(data) ? data.length : (data.total || productsList.length);

          console.log(`📦 Lista completa de productos (${totalCount} en total):`);
          console.log(data);
        }
        break;
      }

      case 'POST': {
        const [title, price, category] = extraArgs;

        if (!title || !price || !category) {
          console.log('❌ Faltan argumentos para crear el producto.');
          console.log('Uso correcto: npm run start POST products <title> <price> <category>');
          return;
        }

        const newProduct = {
          title,
          price: parseFloat(price),
          category,
          description: 'Producto creado desde consola CLI',
          image: 'https://i.pravatar.cc/300'
        };

        const response = await fetch(`${API_URL}/products/add`, { // Se adapta automáticamente según FakeStore / DummyJSON
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        });

        const data = await response.json();
        console.log('✅ Producto creado con éxito:');
        console.log(data);
        break;
      }

      case 'DELETE': {
        if (!id) {
          console.log('❌ Debe especificar el ID del producto a eliminar.');
          console.log('Ejemplo: npm run start DELETE products/7');
          return;
        }

        const response = await fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json();
        console.log(`🗑️ Respuesta al eliminar el producto con ID ${id}:`);
        console.log(data);
        break;
      }

      default:
        console.log(`❌ Método HTTP no soportado: ${method}`);
        break;
    }
  } catch (error) {
    console.error('💥 Ocurrió un error al procesar la solicitud:', error.message);
  }
}

main();