const app = angular.module('templateApp', ['ideUI', 'ideView']);
app.controller('templateController', ['$scope', '$http', 'ViewParameters', 'messageHub', function ($scope, $http, ViewParameters, messageHub) {
    const params = ViewParameters.get();
    $scope.showDialog = true;

    const purchaseInvoiceDataUrl = "/services/ts/codbex-invoice-inventory-ext/generate/GoodsReceipt/api/GenerateGoodsReceiptService.ts/purchaseOrderData/" + params.id;
    $http.get(purchaseInvoiceDataUrl)
        .then(function (response) {
            $scope.PurchaseInvoiceData = response.data;
        })
        .catch(function (error) {
            console.error("Error retrieving purchase invoice data:", error);
        });

    const purchaseInvoiceItemsUrl = "/services/ts/codbex-invoice-inventory-ext/generate/GoodsReceipt/api/GenerateGoodsReceiptService.ts/purchaseOrderItemsData/" + params.id;
    $http.get(purchaseInvoiceItemsUrl)
        .then(function (response) {
            $scope.PurchaseInvoiceItemsData = response.data;
        })
        .catch(function (error) {
            console.error("Error retrieving purchase invoice items data:", error);
        });

    $scope.generateGoodsReceipt = function () {
        const items = $scope.PurchaseInvoiceItemsData;

        const goodsReceiptUrl = "/services/ts/codbex-inventory/gen/codbex-inventory/api/GoodsReceipts/GoodsReceiptService.ts/";

        $http.post(goodsReceiptUrl, $scope.PurchaseOrderData)
            .then(function (response) {
                $scope.GoodsReceipt = response.data

                if ($scope.PurchaseInvoiceItemsData && $scope.PurchaseInvoiceItemsData.length > 0) {
                    items.forEach(invoiceItem => {
                        const goodsReceiptItem = {
                            "GoodsReceipt": $scope.GoodsReceipt.Id,
                            "Product": invoiceItem.Product,
                            "Quantity": invoiceItem.Quantity,
                            "UoM": invoiceItem.UoM,
                            "Price": invoiceItem.Price,
                            "Net": invoiceItem.Net,
                            "VAT": invoiceItem.VAT,
                            "Gross": invoiceItem.Gross
                        };
                        const goodsReceiptItemUrl = "/services/ts/codbex-inventory/gen/codbex-inventory/api/GoodsReceipts/GoodsReceiptItemService.ts/"
                        $http.post(goodsReceiptItemUrl, goodsReceiptItem)
                    });
                }

                console.log("GoodsReceipt created successfully:", response.data);
                //alert("GoodsReceipt created successfully");
                $scope.closeDialog();
            })
            .catch(function (error) {
                console.error("Error creating GoodsReceipt:", error);
                //alert("Error creating purchase GoodsReceipt: ");
                $scope.closeDialog();
            });
    };

    $scope.closeDialog = function () {
        $scope.showDialog = false;
        messageHub.closeDialogWindow("goods-receipt-generate");
    };

    document.getElementById("dialog").style.display = "block";
}]);