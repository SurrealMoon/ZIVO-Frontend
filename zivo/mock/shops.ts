// mock/shops.ts

export const mockShops = [
    {
      id: '1',
      name: 'Habibi Beauty Salon',
      description: '123 Example Street, City, Country',
      address: '123 Example Street, City, Country',
      saveUpTo: 'Save up to 10%',
      rating: 4.9,
      coordinates: { latitude: 34.0522, longitude: -118.2437 },
      image: 'https://i.pinimg.com/736x/3c/e1/b8/3ce1b8629e77d4105835203049abf3fc.jpg',
      services: [
        { name: 'Hair Cut', price: 40 , duration : 30},
        { name: 'Color', price: 100 , duration : 60},
        { name: 'Facial', price: 50 , duration : 45},
      ],
      reviews: [
        {
          id: 'r1',
          name: 'Leyla K.',
          rating: 5,
          comment: 'Amazing service! Will definitely come again.',
          date: '2024-04-12',
        },
        {
          id: 'r2',
          name: 'Sarah M.',
          rating: 4,
          comment: 'Clean place and friendly staff.',
          date: '2024-03-28',
        },
      ],
    },
    {
      id: '2',
      name: 'Elite Barber',
      image: 'https://i.pinimg.com/736x/17/89/a7/1789a7d36266eda5d942886722d48ef7.jpg',
      description: '456 Market Road, Another City',
      address: '456 Market Road, Another City',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
      saveUpTo: 'Save up to 20%',
      rating: 4.5,
      services: [
        { name: 'Beard Trim', price: 30 , duration : 20},
        { name: 'Hair Styling', price: 60 , duration : 40},
        { name: 'Classic Cut', price: 50 , duration : 30},
      ],
      reviews: [
        {
          id: 'r1',
          name: 'Leyla K.',
          rating: 5,
          comment: 'Amazing service! Will definitely come again.',
          date: '2024-04-12',
          
        },
        {
          id: 'r2',
          name: 'Sarah M.',
          rating: 4,
          comment: 'Clean place and friendly staff.',
          date: '2024-03-28',
          
        },
      ],
    },
  ];
  