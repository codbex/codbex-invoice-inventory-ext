import { PurchaseInvoiceRepository as PurchaseInvoiceDao } from "../../../../codbex-invoices/gen/codbex-invoices/dao/purchaseinvoice/PurchaseInvoiceRepository";
import { PurchaseInvoiceItemRepository as PurchaseInvoiceItemDao } from "../../../../codbex-invoices/gen/codbex-invoices/dao/purchaseinvoice/PurchaseInvoiceItemRepository";

import { Controller, Get } from "sdk/http";

@Controller
class GenerateGoodsReceiptService {

    private readonly purchaseInvoiceDao;
    private readonly purchaseInvoiceItemDao;

    constructor() {
        this.purchaseInvoiceDao = new PurchaseInvoiceDao();
        this.purchaseInvoiceItemDao = new PurchaseInvoiceItemDao();
    }

    @Get("/purchaseInvoiceData/:purchaseInvoiceId")
    public purchaseInvoiceData(_: any, ctx: any) {
        const purchaseInvoiceId = ctx.pathParameters.purchaseInvoiceId;

        let purchaseInvoice = this.purchaseInvoiceDao.findById(purchaseInvoiceId);

        return {
            "Date": purchaseInvoice.Date,
            "Due": purchaseInvoice.Due,
            "Supplier": purchaseInvoice.Supplier,
            "Net": purchaseInvoice.Net,
            "Currency": purchaseInvoice.Currency,
            "Gross": purchaseInvoice.Gross,
            "Discount": purchaseInvoice.Discount,
            "Taxes": purchaseInvoice.Taxes,
            "VAT": purchaseInvoice.VAT,
            "Total": purchaseInvoice.Total,
            "Conditions": purchaseInvoice.Conditions,
            "PaymentMethod": purchaseInvoice.PaymentMethod,
            "SentMethod": purchaseInvoice.SentMethod,
            "Company": purchaseInvoice.Company,
            "PurchaseOrderStatus": 1,
            "Operator": purchaseInvoice.Operator,
            "Reference": purchaseInvoice.UUID,
            // "Store": purchaseInvoice.Store
        };
    }

    @Get("/purchaseInvoiceItemsData/:purchaseInvoiceId")
    public purchaseInvoiceItemsData(_: any, ctx: any) {
        const purchaseInvoiceId = ctx.pathParameters.purchaseInvoiceId;

        let purchaseInvoice = this.purchaseInvoiceDao.findById(purchaseInvoiceId);

        let purchaseInvoiceItems = this.purchaseInvoiceItemDao.findAll({
            $filter: {
                equals: {
                    PurchaseInvoice: purchaseInvoice.Id
                }
            }
        });

        return purchaseInvoiceItems;
    }
}