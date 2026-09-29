import {useState} from 'react';

type ServiceItem = {
  id: number;
  name: string;
  price: number;
};

export function App() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] =
    useState<ServiceItem | null>(null);

  const handleLoadServices = async () => {
    const response = await fetch('http://localhost:3001/api/services');
    const data: ServiceItem[] = await response.json();

    setServices(data);
  };

  const handleLoadService = async (id: number) => {
    const response = await fetch(
      `http://localhost:3001/api/services/${id}`,
    );

    const data: ServiceItem = await response.json();
    setSelectedService(data);
  };

  return (
    <div>
      <button type="button" onClick={handleLoadServices}>
        Загрузить услуги
      </button>

      {services.map((service) => (
        <div key={service.id}>
          {service.name} — {service.price} ₽

          <button
            type="button"
            onClick={() => handleLoadService(service.id)}
          >
            Открыть
          </button>
        </div>
      ))}

      {selectedService && (
        <div>
          <h2>{selectedService.name}</h2>
          <p>Цена: {selectedService.price} ₽</p>
        </div>
      )}
    </div>
  );
}