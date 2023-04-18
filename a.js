{
  "items": [
      {
          "itemId": "c99ab38f-1b5f-4fca-a0bf-9c06658374b8",
          "quantity": 1
      }
  ]
}

interface reqAddCart {
  items: {
    itemId: string;
    quantity: number;
  }[];
}