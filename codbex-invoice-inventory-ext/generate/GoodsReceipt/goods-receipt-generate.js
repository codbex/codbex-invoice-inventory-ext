const viewData = {
    id: 'goods-receipt-generate',
    label: 'Generate Goods Receipt',
    link: '/services/web/codbex-invoice-inventory-ext/generate/GoodsReceipt/generate-goods-receipt.html',
    perspective: 'purchaseinvoice',
    view: 'PurchaseInvoice',
    type: 'entity',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}