exports.seed = function (knex) {
  const initTable = [
    {
      id: 1,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'BMW',
      descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
      codigo: 'P0002',
      foto: 'https://picsum.photos/200',
      precio: 751,
      stock: 8
    },
    {
      id: 2,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'Kleenex',
      descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
      codigo: 'P0005',
      foto: 'https://picsum.photos/200',
      precio: 898,
      stock: 12
    },
    {
      id: 3,
      timestamp: 'Apr 4 05:06:07',
      nombre: 'Johnson & Johnson',
      descripcion: 'Esta primavera en mi cabaña, Absolutamente nada, Absolutamente todo',
      codigo: 'P0002',
      foto: 'https://picsum.photos/200',
      precio: 570,
      stock: 7
    },
    {
      id: 4,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'Colgate',
      descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
      codigo: 'P0001',
      foto: 'https://picsum.photos/200',
      precio: 613.56,
      stock: 25
    },
    {
      id: 5,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'Pampers',
      descripcion: 'Anoche cubrí, mis hijos dormidos, y el ruido del mar.',
      codigo: 'P0003',
      foto: 'https://picsum.photos/200',
      precio: 856,
      stock: 21
    },
    {
      id: 6,
      timestamp: 'Apr 4 05:06:09',
      nombre: 'Nike',
      descripcion: 'Mil pequeños peces blancos, Como si hirviera, El color del agua',
      codigo: 'P0005',
      foto: 'https://picsum.photos/200',
      precio: 796,
      stock: 12
    },
    {
      id: 7,
      timestamp: 'Apr 4 05:06:09',
      nombre: 'Disney',
      descripcion: 'Pareciera que el sapo, Va a expeler, una nube',
      codigo: 'P0004',
      foto: 'https://picsum.photos/200',
      precio: 121,
      stock: 16
    },
    {
      id: 8,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'Pampers',
      descripcion: 'Mi cuenco de mendigar, Acepta hojas caídas',
      codigo: 'P0005',
      foto: 'https://picsum.photos/200',
      precio: 514,
      stock: 1
    },
    {
      id: 9,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'Audi',
      descripcion: 'Bajo la lluvia de verano, El sendero, Desapareció',
      codigo: 'P0002',
      foto: 'https://picsum.photos/200',
      precio: 247,
      stock: 15
    }
  ];

  return knex('productos')
    .del()
    .then(() => knex('productos').insert(initTable));
};
