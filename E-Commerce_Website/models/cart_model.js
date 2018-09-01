module.exports = function Cart(oldCart){
  this.items = oldCart.items || {};
  this.totalQuantity = oldCart.totalQuantity || 0;
  this.totalCost = oldCart.totalCost || 0;

  this.add = function (item, id) {
      var storedItem = this.items[id];
      if (!storedItem) {
          storedItem = this.items[id] = {item: item, quantity: 0, price: 0};
      }
      storedItem.quantity++;
      storedItem.price = storedItem.item.price * storedItem.quantity;
      this.totalQuantity++;
      this.totalCost += storedItem.item.price;
  };

  this.reduceByOne = function(id) {
      this.items[id].quantity--;
      this.items[id].price -= this.items[id].item.price;
      this.totalQuantity--;
      this.totalCost -= this.items[id].item.price;

      if(this.items[id].quantity <= 0) {
          delete this.items[id];
      }
  };

  this.addByOne = function(id) {
      this.items[id].quantity++;
      this.items[id].price += this.items[id].item.price;
      this.totalQuantity++;
      this.totalCost += this.items[id].item.price;

      if(this.items[id].quantity >= 99) {
          this.items[id].quantity = 99;
      }
  };

  this.removeItem = function(id) {
      this.totalQuantity -= this.items[id].quantity;
      this.totalCost -= this.items[id].price;
      delete this.items[id];
  };

  this.generateItemsInArray = function () {
      var array = [];
      for(var id in this.items){
          array.push(this.items[id]);
      }
      return array;
  };
};