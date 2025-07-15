'use client';
import { useState } from 'react';

export const SyscomTokenStatus = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<string>('');

  const checkTokenStatus = async () => {
    setStatus('loading');
    setResult('');

    try {
      // Probar con un ID de producto conocido
      const response = await fetch('/api/syscom/144598');
      
      if (response.ok) {
        const data = await response.json();
        setStatus('success');
        setResult(`✅ Token funcionando correctamente. Producto: ${data.titulo || 'Sin título'}`);
      } else {
        const errorData = await response.json();
        setStatus('error');
        setResult(`❌ Error ${response.status}: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      setStatus('error');
      setResult(`❌ Error de red: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Estado del Token de Syscom</h3>
      
      <button
        onClick={checkTokenStatus}
        disabled={status === 'loading'}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          status === 'loading'
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {status === 'loading' ? 'Verificando...' : 'Verificar Token'}
      </button>

      {result && (
        <div className={`mt-4 p-3 rounded border ${
          status === 'success' 
            ? 'bg-green-100 border-green-400 text-green-800' 
            : 'bg-red-100 border-red-400 text-red-800'
        }`}>
          {result}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Configuración requerida:</strong></p>
        <ul className="list-disc ml-4 mt-1">
          <li>Variable de entorno: <code className="bg-gray-200 px-1 rounded">SYSCOM_TOKEN</code></li>
          <li>Archivo: <code className="bg-gray-200 px-1 rounded">.env.local</code></li>
          <li>Formato: <code className="bg-gray-200 px-1 rounded">SYSCOM_TOKEN=tu_token_aqui</code></li>
        </ul>
      </div>
    </div>
  );
}; 