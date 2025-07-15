import { SyscomTokenStatus } from '@/components/debug/SyscomTokenStatus';

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Página de Debug - Syscom Integration</h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Verificador de Token</h2>
            <SyscomTokenStatus />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Configuración Requerida</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">1. Archivo .env.local</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Crea o edita este archivo en la raíz del proyecto:
                </p>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-sm overflow-x-auto">
                  <code>{`# .env.local
SYSCOM_TOKEN=tu_token_real_aqui
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_ENV=development`}</code>
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">2. Reiniciar el servidor</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Después de configurar el token, reinicia el servidor:
                </p>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-sm">
                  <code>npm run dev</code>
                </pre>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Endpoints Disponibles</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-mono text-sm">GET /api/syscom/[id]</span>
                <span className="text-sm text-gray-600">Obtener producto por ID</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-mono text-sm">GET /oneproduct?id=[id]</span>
                <span className="text-sm text-gray-600">Página de producto</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pruebas Rápidas</h2>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium text-gray-900">Producto de ejemplo:</h3>
                <a 
                  href="/oneproduct?id=144598" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  /oneproduct?id=144598
                </a>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">API directa:</h3>
                <a 
                  href="/api/syscom/144598" 
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /api/syscom/144598
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 