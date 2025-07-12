import { Truck, HeadphonesIcon, Shield, CreditCard } from 'lucide-react';

type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: <Truck size={24} />,
    title: 'Envío en 24 horas',
    description: 'Para pedidos antes de las 3 PM en días hábiles',
  },
  {
    icon: <HeadphonesIcon size={24} />,
    title: 'Soporte Técnico 24/7',
    description: 'Asistencia técnica disponible todos los días',
  },
  {
    icon: <Shield size={24} />,
    title: 'Garantía de 2 años',
    description: 'En todos nuestros productos contra defectos de fábrica',
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Pagos Seguros',
    description: 'Transacciones protegidas con certificados SSL',
  },
];

export function Benefits() {
  return (
    <section className="container-custom py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="bg-primary/10 p-4 md:p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              {benefit.icon}
            </div>
            <h3 className="font-semibold mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-500">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}