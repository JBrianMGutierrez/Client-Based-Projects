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
    this.generateItemsInArray = function () {
        var array = [];
        for(var id in this.items) {
            array.push(this.items[id]);
        }
        return array;
      };
};