var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { PurchaseOrderRepository as PurchaseOrderDao } from "../../../../codbex-orders/gen/dao/purchaseorder/PurchaseOrderRepository";
import { PurchaseOrderItemRepository as PurchaseOrderItemDao } from "../../../../codbex-orders/gen/dao/purchaseorder/PurchaseOrderItemRepository";
import { Controller, Get } from "sdk/http";
let GenerateGoodsReceiptService = (() => {
    let _classDecorators = [Controller];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _purchaseOrderData_decorators;
    let _purchaseOrderItemsData_decorators;
    var GenerateGoodsReceiptService = _classThis = class {
        constructor() {
            this.purchaseOrderDao = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this.purchaseOrderDao = new PurchaseOrderDao();
            this.purchaseOrderItemDao = new PurchaseOrderItemDao();
        }
        purchaseOrderData(_, ctx) {
            const purchaseOrderId = ctx.pathParameters.purchaseOrderId;
            let purchaseOrder = this.purchaseOrderDao.findById(purchaseOrderId);
            return {
                "Date": purchaseOrder.Date,
                "Due": purchaseOrder.Due,
                "Supplier": purchaseOrder.Supplier,
                "Net": purchaseOrder.Net,
                "Currency": purchaseOrder.Currency,
                "Gross": purchaseOrder.Gross,
                "Discount": purchaseOrder.Discount,
                "Taxes": purchaseOrder.Taxes,
                "VAT": purchaseOrder.VAT,
                "Total": purchaseOrder.Total,
                "Conditions": purchaseOrder.Conditions,
                "PaymentMethod": purchaseOrder.PaymentMethod,
                "SentMethod": purchaseOrder.SentMethod,
                "Company": purchaseOrder.Company,
                "PurchaseOrderStatus": 1,
                "Operator": purchaseOrder.Operator,
                "Reference": purchaseOrder.UUID
            };
        }
        purchaseOrderItemsData(_, ctx) {
            const purchaseOrderId = ctx.pathParameters.purchaseOrderId;
            let purchaseOrder = this.purchaseOrderDao.findById(purchaseOrderId);
            let purchaseOrderItems = this.purchaseOrderItemDao.findAll({
                $filter: {
                    equals: {
                        PurchaseOrder: purchaseOrder.Id
                    }
                }
            });
            return purchaseOrderItems;
        }
    };
    __setFunctionName(_classThis, "GenerateGoodsReceiptService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _purchaseOrderData_decorators = [Get("/purchaseOrderData/:purchaseOrderId")];
        _purchaseOrderItemsData_decorators = [Get("/purchaseOrderItemsData/:purchaseOrderId")];
        __esDecorate(_classThis, null, _purchaseOrderData_decorators, { kind: "method", name: "purchaseOrderData", static: false, private: false, access: { has: obj => "purchaseOrderData" in obj, get: obj => obj.purchaseOrderData }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _purchaseOrderItemsData_decorators, { kind: "method", name: "purchaseOrderItemsData", static: false, private: false, access: { has: obj => "purchaseOrderItemsData" in obj, get: obj => obj.purchaseOrderItemsData }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GenerateGoodsReceiptService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GenerateGoodsReceiptService = _classThis;
})();
