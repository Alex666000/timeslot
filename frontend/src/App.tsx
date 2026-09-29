import { useState } from 'react';

type ServiceItem = {
  id: number;
  name: string;
  price: number;
};

export function App() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  const handleLoadServices = async () => {
    const response = await fetch('http://localhost:3001/api/services');
    const data: ServiceItem[] = await response.json();

    setServices(data);
  };

  return (
    <div>
      <button type="button" onClick={handleLoadServices}>
        Загрузить услуги
      </button>

      {services.map((service) => (
        <div key={service.id}>
          {service.name} — {service.price} ₽
        </div>
      ))}
    </div>
  );
}