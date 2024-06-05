# Создание базы данных MarketDB 
use MarketDB; 

# Создание коллекции orders с полями buyerName, buyerEmail, selectedProducts 
db.createCollection("orders"); 

# Создание коллекции users с полями email, name, phone 
db.createCollection("users"); 

# Создание коллекции products с полями Name, Price, Description 
db.createCollection("products"); 

db.products.insertMany( [
  {
    "Name": "Процессор",
    "Price": 1000,
    "Description": "Intel Core i7"
  },
  {
    "Name": "Материнская плата",
    "Price": 500,
    "Description": "ASUS Prime Z390-A"
  },
  {
    "Name": "Оперативная память",
    "Price": 200,
    "Description": "8GB DDR4 3200MHz"
  },
  {
    "_id": ObjectId("6653a11b6de206ba95748f0e"),
    "Name": "Жесткий диск",
    "Price": 150,
    "Description": "SSD 256GB NVMe"
  },
  {
    "Name": "Видеокарта",
    "Price": 300,
    "Description": "NVIDIA GeForce GTX 1060"
  },
  {
    "Name": "Блок питания",
    "Price": 250,
    "Description": "Corsair RMx 750W"
  },
  {
    "Name": "Кулер",
    "Price": 120,
    "Description": "Cooler Master Hyper H411R"
  },
  {
    "Name": "Системный блок",
    "Price": 400,
    "Description": "Thermaltake Versa H15"
  },
  {
    "Name": "Монитор",
    "Price": 350,
    "Description": "Acer R240HY bidx 23.8-Inch IPS"
  },
  {
    "Name": "Клавиатура",
    "Price": 80,
    "Description": "Logitech K120 Wired Keyboard"
  },
  {
    "Name": "Клава",
    "Price": 200,
    "Description": "Норм",
  },
  {
    "Name": "Клаваа",
    "Price": 1300,
    "Description": "нет",
  }
]); 
db.orders.insertMany( [
  {
    "buyerEmail": "ivanov@example.com",
    "buyerName": "Иван",
    "selectedProducts": [
      {
        "component": "Процессор",
        "quantity": 1
      },
      {
        "component": "Оперативная память",
        "quantity": 2
      }
    ]
  },
  {
    "buyerEmail": "petrov@example.com",
    "buyerName": "Петр",
    "selectedProducts": [
      {
        "component": "Видеокарта",
        "quantity": 1
      },
      {
        "component": "Блок питания",
        "quantity": 1
      }
    ]
  },
  {
    "buyerEmail": "andreeva@example.com",
    "buyerName": "Анна",
    "selectedProducts": [
      {
        "component": "Материнская плата",
        "quantity": 1
      },
      {
        "component": "Системный блок",
        "quantity": 1
      }
    ]
  },
  {
    "buyerEmail": "dmitriev@example.com",
    "buyerName": "Дмитрий",
    "selectedProducts": [
      {
        "component": "Монитор",
        "quantity": 1
      },
      {
        "component": "Клавиатура",
        "quantity": 1
      }
    ]
  },
  {
    "buyerEmail": "elenova@example.com",
    "buyerName": "Елена",
    "selectedProducts": [
      {
        "component": "Процессор",
        "quantity": 2
      },
      {
        "component": "Оперативная память",
        "quantity": 4
      }
    ]
  },
  {
    "buyerEmail": "alekseev@example.com",
    "buyerName": "Алексей",
    "selectedProducts": [
      {
        "component": "Видеокарта",
        "quantity": 2
      },
      {
        "component": "Блок питания",
        "quantity": 2
      }
    ]
  },
  {
    "buyerEmail": "nikolaev@example.com",
    "buyerName": "Николай",
    "selectedProducts": [
      {
        "component": "Жесткий диск",
        "quantity": 2
      },
      {
        "component": "Кулер",
        "quantity": 2
      }
    ]
  },
  {
    "buyerEmail": "tatyaninova@example.com",
    "buyerName": "Татьяна",
    "selectedProducts": [
      {
        "component": "Материнская плата",
        "quantity": 2
      },
      {
        "component": "Системный блок",
        "quantity": 2
      }
    ]
  },
  {
    "buyerEmail": "mikhailov@example.com",
    "buyerName": "Михаил",
    "selectedProducts": [
      {
        "component": "Монитор",
        "quantity": 2
      },
      {
        "component": "Клавиатура",
        "quantity": 2
      }
    ]
  }
], {
  ordered: false
}); 
db.users.insertMany( [
  {
    "email": "ivanov@example.com",
    "name": "Ivan",
    "phone": "+79123456789"
  },
  {
    "email": "petrov@example.com",
    "name": "Петр",
    "phone": "+79123456790"
  },
  {
    "email": "sergeev@example.com",
    "name": "Сергей",
    "phone": "+79123456791"
  },
  {
    "email": "andreeva@example.com",
    "name": "Анна",
    "phone": "+79123456792"
  },
  {
    "email": "dmitriev@example.com",
    "name": "Дмитрий",
    "phone": "+79123456793"
  },
  {
    "email": "elenova@example.com",
    "name": "Елена",
    "phone": "+79123456794"
  },
  {
    "email": "alekseev@example.com",
    "name": "Алексей",
    "phone": "+79123456795"
  },
  {
    "email": "mikhailov@example.com",
    "name": "Михаил",
    "phone": "+79123456798"
  },
  {
    "name": "Алекс",
    "email": "pl@gmail.com",
    "phone": "+7858275720"
  }
]); 
db.products.aggregate( [
  {
    $group: {
      _id: "$name",
      count: { $sum: 1 }
    }
  }
]) 
db.users.countDocuments() 
db.orders.countDocuments() 
db.products.aggregate( [
  {
    $group: {
      _id: null,
      avgPrice: { $avg: "$price" }
    }
  }
])
db.orders.aggregate( [
  { $unwind: "$selectedProducts" },
  {
    $group: {
      _id: "$selectedProducts.component",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } },
])

db.createUser(
  {
    user: "admin",
    pwd: "123456",
    roles: [{ role: "readWriteAnyDatabase", db: "MarketDB" }]
  }
);

db.createUser(
  {
    user: "reader",
    pwd: "1234",
    roles: [
      {
        "role": "read",
        "db": "MarketDB"
      }
    ]
  }
);

db.createUser(
  {
    user: "editor",
    pwd: "12345",
    roles: [
      {
        "role": "readWrite",
        "db": "MarketDB"
      }
    ]
  }
);
