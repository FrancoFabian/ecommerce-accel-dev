'use client'
import './styles.css';

export const Desglose = () => {
    return (
        <div className="mt-6"> {/* Contenedor principal */}
            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                Desglose
            </div>
            <div className="mt-2 " > {/* Contenedor con scroll personalizado */}
                <dl className="flex flex-col gap-4 mr-2">
                    <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Total parcial</dt>
                        <dd className="text-sm font-semibold text-gray-700">$159.96</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Entrega</dt>
                        <dd className="text-sm font-semibold text-gray-700">$0.00</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Impuesto</dt>
                        <dd className="text-sm font-semibold text-gray-700">$23.99</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Descuento</dt>
                        <dd className="text-sm font-semibold text-green-500">-$10.99</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};